import * as fs from 'fs';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import slugify from 'slug';
import translate from 'translate-google';

const forceTranslations = {
  'szt.': 'хамма',
};

const doc = new GoogleSpreadsheet(
  '1jTYPj_NZ5LcZmPePom_NYX5Aukr0auCm1VCwU0N_5Cw'
);

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
});

await doc.loadInfo();

let allRows = await Promise.all([
  doc.sheetsByIndex[0].getRows(),
  await doc.sheetsByIndex[1].getRows(),
]);

allRows = allRows.flat().filter((row) => row['PRZEDMIOT'] != '');

// categories
const categoryStrings = [...new Set(allRows.map((row) => row.Kategoria))];
const categoryStringsUK = await translate(categoryStrings, {
  from: 'pl',
  to: 'uk',
});

const categories = {};
categoryStrings.forEach((category, index) => {
  categories[slugify(category)] = {
    PL: category,
    UK: assignTranslation(category, categoryStringsUK[index]),
  };
});

writeToFile('./categories_data.json', categories);

// units
const unitStrings = [...new Set(allRows.map((row) => row.Miara))];
const unitStringsUK = await translate(unitStrings, {
  from: 'pl',
  to: 'uk',
});

const units = {};
unitStrings.forEach((unit, index) => {
  units[slugify(unit)] = {
    PL: unit,
    UK: assignTranslation(unit, unitStringsUK[index]),
  };
});

writeToFile('./units_data.json', units);

// products
const products = [...allRows].reduce((acc, entry) => {
  const productId = slugify(
    `${entry['PRZEDMIOT']}-${entry['Kategoria']}-${entry['Miara']}`
  );
  const categporyId = slugify(entry['Kategoria']);
  const unitId = slugify(entry['Miara']);

  acc[productId] = {
    name: {
      PL: entry['PRZEDMIOT'],
      UK: entry['PRZEDMIOT'],
    },
    category: {
      id: categporyId,
      name: categories[categporyId],
    },
    unit: units[unitId],
  };
  return acc;
}, {});

const batch = Object.entries(products).map((entry) => ({
  id: entry[0],
  product: entry[1].name.UK,
}));

// we need to split the batch because of Google Translate translation length limitations
const splittedBatch = split(batch, 30);

// Google Translate is not allowung many request from single IP at once, so we need to translate in sequence
const translatedBatch = [];
for (const chunk of splittedBatch) {
  const translatedChunk = await translate(chunk, {
    from: 'pl',
    to: 'uk',
    except: ['id'],
  });

  translatedBatch.push(...translatedChunk);
}

translatedBatch.forEach((translation) => {
  products[translation.id].name.UK = assignTranslation(
    products[translation.id].name.UK,
    translation.product
  );
});

writeToFile('./products_data.json', products);

function assignTranslation(original, translated) {
  return forceTranslations[original] || translated;
}

function split(arr, len) {
  let chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

function writeToFile(filePath, items) {
  fs.writeFileSync(
    filePath,
    JSON.stringify({ createdAt: new Date(), items }, null, 2)
  );
}
