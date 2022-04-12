import * as fs from "fs";
import { GoogleSpreadsheet } from "google-spreadsheet";
import slugify from "slug";
import translate from "translate-google";

const forceTranslations = {
  "szt.": "хамма",
};

const doc = new GoogleSpreadsheet(
  "1jTYPj_NZ5LcZmPePom_NYX5Aukr0auCm1VCwU0N_5Cw"
);

await doc.useServiceAccountAuth({
  client_email: "app-kartkazareny-pl@avid-truth-346317.iam.gserviceaccount.com",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUmNyYYVeKVnY7\nT26rQ964g3Zl7gdDfKdsLQRxIwrabtOEZQCvkVoCrkvLQVv9pcM9D8zeqCtyoR0K\nYULWklZqgoYnC9CzAibfqPs62IUGVkObT745OmjHk2G6FkmE2yfpn51J6tUva//K\nrvyPcTV+4lcahVw2E4fCYpzVS13VIIhpMSIJNcsCj40/IdZlP4xSfNfQI+rUIUTM\njV2sA8XSrfNc/F9JQhxo13WxHhQzdUI+7SEkP9y18vj8+EwKaN0PdRWyjHDqbcOs\n8uVDF3c/aGv7VrwL+beLKQWo0WVmBfM9DK/0bMaIdg6ZlLIJ+BDh71wYfipuIzkk\nFSaGzX1nAgMBAAECggEAMXcJqJjJhgH9C2q9bLLjcNoBo9DAtuabi9Njm7FUFqO/\nqifYA4GVyFbmgrnH3hoB9cSl3c6SIV80QxSDOSqeWbTZ4t7gZa4j/lkybywus11B\n6LKip20cMQdtLx99ZqCZRkXhkm/Fv31o7C9Py05DbKzcKGsMG/bqWQOZyxT4lZxK\nFfYAfAhibdsyN9SqtrlC3zxka6YEP27cItdZDo1+wjnShMVpNK7eM/6wUxavKrTr\nzcGnZHBAD/heL87m3hxJnl6Ys5Xsxoey8TYGd7vDUVi6MFhYl6AxqS6QM6c57/15\nZU69lrr29OTruNgJC82xWaBfYHi58ZA3zzP5yDYmwQKBgQDwBeHwcKuTxBQQcHZ5\nEvIVIEHil3EBfKNJR5q+8fXUS6/3fMZwvNkJ/rC0oVW7NXbJzB17Oau7CdHPIwZX\np2HnDo0JuL0WNHC7BMF0nBOeltp67u2QXXuBu2MvF7mKX9ZyEk1qzwGAYeQ1sqQN\nm2rQuvWgDKRQ/9JhamcjI/J+QQKBgQDiv6DHTpr605RKlX1UYijoLuBl3Q0ihBbM\niqf2jsOslNusIxjuFdCiSUxL3Vdfju2Qc/7UbWrutQMIqE7vW8N3mZpbTHDnhGDz\nhZE7gQKi/fT9MZrw+Pqbwxf8haLfG8kWh6TsF4RpZotj34gtb/mK32b6PfaIssj9\n8hwP9SbhpwKBgFWq09R8clDAOCUR7scR4wN1Su6z/Kp6MNFz1CB4vbPy+7BKgY01\nagWuOKWPu8igsXAfARq9H7UXMSJMLvRUEpZkVCR3Ik3tk5q8fMvA9SOyVfJwmqvf\nIbjRB/qD7j4cLK70J1uK3M9UoR4lT3Zn1T0ArbBdMrySQiVw07TwHJnBAoGAIIQG\nVE5rXwi0PTXOsSkaYKFIQJNAbPCwLEi96Vdzq+30ymyGCK5MKtmD/WUSQHvIiWx4\n4JGIQg7nDnjESQLJtv7p6am+jxSmqoU+3F+VtzXfyecxJtktZuTFLcskHgZoAbkV\n510/+bVgy8OkTY+/IzECHWSBU/z/YZs0dv1axAUCgYAdL88kqgUl/mKu/jQ40ywa\nA1OtElNVgTZ/R4gwOmdCvOwPD4gsoBjbH1ACrbs/phLG5hl19DivOxPpqlVaBkyn\nJnXQMPIUHVF3H3r3VSKO8UQM0a8sQnnIEyEL1SGmigRdseM8UGICP5fWsrHkwjK4\nwmKrn4uimhuSbkYqDJ+hNA==\n-----END PRIVATE KEY-----\n",
});

await doc.loadInfo();

let allRows = await Promise.all([
  doc.sheetsByIndex[0].getRows(),
  await doc.sheetsByIndex[1].getRows(),
]);

allRows = allRows
  .flat()
  .filter((row) => row["PRZEDMIOT"] != "")
  .map((row) => ({
    ...row,
    Kategoria: row.Kategoria || "Brak",
    Miara: row.Miara || "Brak",
  }));

// categories
const categoryStrings = [...new Set(allRows.map((row) => row.Kategoria))];
const categoryStringsUK = await translate(categoryStrings, {
  from: "pl",
  to: "uk",
});

const categories = {};
console.log("categoryStrings :>> ", categoryStrings);
categoryStrings.forEach((category, index) => {
  categories[slugify(category)] = {
    PL: category,
    UK: assignTranslation(category, categoryStringsUK[index]),
  };
});

writeToFile("./categories_data.json", categories);

// units
const unitStrings = [...new Set(allRows.map((row) => row.Miara))];
const unitStringsUK = await translate(unitStrings, {
  from: "pl",
  to: "uk",
});

const units = {};
unitStrings.forEach((unit, index) => {
  units[slugify(unit)] = {
    PL: unit,
    UK: assignTranslation(unit, unitStringsUK[index]),
  };
});

writeToFile("./units_data.json", units);

// products
const products = [...allRows].reduce((acc, entry) => {
  const productId = slugify(
    `${entry["PRZEDMIOT"]}-${entry["Kategoria"]}-${entry["Miara"]}`
  );
  const categporyId = slugify(entry["Kategoria"]);
  const unitId = slugify(entry["Miara"]);

  acc[productId] = {
    name: {
      PL: entry["PRZEDMIOT"],
      UK: entry["PRZEDMIOT"],
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
    from: "pl",
    to: "uk",
    except: ["id"],
  });

  translatedBatch.push(...translatedChunk);
}

translatedBatch.forEach((translation) => {
  products[translation.id].name.UK = assignTranslation(
    products[translation.id].name.UK,
    translation.product
  );
});

writeToFile("./products_data.json", products);

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
