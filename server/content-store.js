const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA_KEY = 'primecore:data:v1';
const ROOT = path.join(__dirname, '..');
const LOCAL_DATA_FILE = path.join(ROOT, 'data', 'primecore-data.json');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readScriptArray(fileName, variableName) {
  const source = fs.readFileSync(path.join(ROOT, 'js', fileName), 'utf8');
  const sandbox = {};
  vm.runInNewContext(source + '\nresult = ' + variableName + ';', sandbox);
  return clone(sandbox.result || []);
}

function defaultData() {
  return normalizeData({
    products: readScriptArray('products-data.js', 'products'),
    packages: readScriptArray('packages-data.js', 'packages')
  });
}

function normalizeText(value, fallback) {
  if (value == null) return fallback || '';
  return String(value).trim();
}

function normalizeCurrency(value) {
  const raw = normalizeText(value);
  const upper = raw.toUpperCase();

  if (upper === 'SAR') return 'SAR';
  if (upper === 'USD') return 'USD';
  if (upper === 'YER' || upper === 'YEM' || upper === 'RIAL YEMENI') return 'YER';
  if (raw.includes('سعود')) return 'SAR';
  if (raw.includes('دولار')) return 'USD';
  if (raw.includes('يمن')) return 'YER';

  return 'SAR';
}

function normalizeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : 0;
}

function normalizeImages(images) {
  if (!Array.isArray(images)) return [];
  return images.map((image) => normalizeText(image)).filter(Boolean);
}

function normalizeSpecs(specifications) {
  if (!specifications || typeof specifications !== 'object' || Array.isArray(specifications)) {
    return {};
  }

  return Object.keys(specifications).reduce((next, key) => {
    const cleanKey = normalizeText(key);
    if (cleanKey) next[cleanKey] = normalizeText(specifications[key]);
    return next;
  }, {});
}

function normalizeFeatures(features) {
  if (!Array.isArray(features)) return [];
  return features.map((feature) => normalizeText(feature)).filter(Boolean);
}

function normalizeProduct(product, index) {
  return {
    id: normalizeNumber(product.id) || index + 1,
    name: normalizeText(product.name, 'منتج بدون اسم'),
    category: ['laptops', 'phones', 'accessories'].includes(product.category) ? product.category : 'accessories',
    condition: product.condition === 'used' ? 'used' : 'new',
    price: normalizeNumber(product.price),
    currency: normalizeCurrency(product.currency),
    shortDescription: normalizeText(product.shortDescription),
    fullDescription: normalizeText(product.fullDescription),
    specifications: normalizeSpecs(product.specifications),
    images: normalizeImages(product.images),
    featured: Boolean(product.featured),
    active: product.active !== false,
    dateAdded: normalizeText(product.dateAdded, new Date().toISOString().slice(0, 10))
  };
}

function normalizePackage(pkg, index) {
  return {
    id: normalizeNumber(pkg.id) || index + 1,
    name: normalizeText(pkg.name, 'باقة بدون اسم'),
    type: normalizeText(pkg.type, 'satellite'),
    speed: normalizeText(pkg.speed),
    dataLimit: normalizeText(pkg.dataLimit, 'لا محدود'),
    priceMonthly: normalizeNumber(pkg.priceMonthly),
    currency: normalizeCurrency(pkg.currency),
    description: normalizeText(pkg.description),
    features: normalizeFeatures(pkg.features),
    featured: Boolean(pkg.featured),
    active: pkg.active !== false
  };
}

function normalizeData(data) {
  const products = Array.isArray(data && data.products) ? data.products : [];
  const packages = Array.isArray(data && data.packages) ? data.packages : [];

  return {
    updatedAt: normalizeText(data && data.updatedAt, new Date().toISOString()),
    products: products.map(normalizeProduct),
    packages: packages.map(normalizePackage)
  };
}

function publicData(data) {
  return {
    updatedAt: data.updatedAt,
    products: data.products.filter((product) => product.active !== false),
    packages: data.packages.filter((pkg) => pkg.active !== false)
  };
}

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvCommand(command) {
  const response = await fetch(process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.KV_REST_API_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) {
    throw new Error('KV request failed: ' + response.status);
  }

  const body = await response.json();

  if (body.error) {
    throw new Error(body.error);
  }

  return body.result;
}

async function readKvData() {
  const result = await kvCommand(['GET', DATA_KEY]);
  if (!result) return null;

  if (typeof result === 'string') {
    return JSON.parse(result);
  }

  return result;
}

async function writeKvData(data) {
  await kvCommand(['SET', DATA_KEY, JSON.stringify(data)]);
}

async function readLocalData() {
  if (!fs.existsSync(LOCAL_DATA_FILE)) {
    return null;
  }

  return JSON.parse(await fs.promises.readFile(LOCAL_DATA_FILE, 'utf8'));
}

async function writeLocalData(data) {
  await fs.promises.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.promises.writeFile(LOCAL_DATA_FILE, JSON.stringify(data, null, 2));
}

async function readData() {
  let data = null;

  if (hasKvConfig()) {
    data = await readKvData();
  } else if (!process.env.VERCEL) {
    data = await readLocalData();
  }

  return normalizeData(data || defaultData());
}

async function writeData(nextData) {
  const data = normalizeData({
    products: nextData.products,
    packages: nextData.packages,
    updatedAt: new Date().toISOString()
  });

  if (hasKvConfig()) {
    await writeKvData(data);
  } else if (!process.env.VERCEL) {
    await writeLocalData(data);
  } else {
    const error = new Error('KV_REST_API_URL and KV_REST_API_TOKEN are required for persistent production storage.');
    error.statusCode = 500;
    throw error;
  }

  return data;
}

module.exports = {
  defaultData,
  publicData,
  readData,
  writeData
};
