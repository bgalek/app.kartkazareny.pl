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

const fetchedRows = await Promise.all([
  doc.sheetsByIndex[0].getRows(),
  await doc.sheetsByIndex[1].getRows(),
]);

const foodRows = fetchedRows[0].filter((row) => row.PRZEDMIOT != '');
const otherRows = fetchedRows[1]
  .filter((row) => row['"PRZEDMIOT"'] != '')
  .map((row) => {
    return {
      PRZEDMIOT: row['"PRZEDMIOT"'],
      ...row,
    };
  });

const allRows = [...foodRows, ...otherRows];

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

// products
const products = [...allRows].reduce((acc, entry) => {
  const productId = slugify(
    `${entry['PRZEDMIOT']}-${entry['Kategoria']}-${entry['Miara']}`
  );
  const categporyId = slugify(entry['Kategoria']);
  acc[productId] = {
    name: {
      PL: entry['PRZEDMIOT'],
      UK: entry['PRZEDMIOT'],
    },
    category: {
      id: categporyId,
      name: categories[categporyId],
    },
    unit: {
      PL: entry['Miara'],
      UK: entry['Miara'],
    },
  };
  return acc;
}, {});

const batch = Object.entries(products).map((entry) => ({
  id: entry[0],
  productName: entry[1].name.UK,
  productUnit: entry[1].unit.UK,
}));
const translatedBatch = await translate(batch, {
  from: 'pl',
  to: 'uk',
  except: ['id'],
});

translatedBatch.forEach((translation) => {
  products[translation.id].name.UK = assignTranslation(
    products[translation.id].name.UK,
    translation.productName
  );
  products[translation.id].unit.UK = assignTranslation(
    products[translation.id].unit.UK,
    translation.productUnit
  );
});

writeToFile('./products_data.json', products);

function assignTranslation(original, translated) {
  return forceTranslations[original] || translated;
}

function writeToFile(filePath, items) {
  fs.writeFileSync(
    filePath,
    JSON.stringify({ createdAt: new Date(), items }, null, 2)
  );
}
