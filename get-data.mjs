import * as fs from "fs";
import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(
  "157urwMMADPpPj6ka7l1YRaTaQPgPSamCNS8AYu_wyd0"
);

await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
});

await doc.loadInfo();

const allProductsSheet = doc.sheetsByIndex[0];
const allProductsRows = await allProductsSheet.getRows();

const categoriesSheet = doc.sheetsByIndex[1];
const categoriesRows = await categoriesSheet.getRows();

const products = [...allProductsRows]
  .filter((it) => it["przedmiot"])
  .map((it) => ({
    id: `${it["przedmiot"]}-${it["kategoria"]}-${it["miara"]}`,
    name: {
      PL: it["przedmiot"],
      UK: it["przedmiot uk"],
    },
    category: {
      PL: it["kategoria"],
      UK: it["kategoria uk"],
    },
    unit: {
      PL: it["miara"],
      UK: it["miara uk"],
    },
  }));

const categories = [...categoriesRows].map((it) => ({
  id: it["kategoria"],
  name: {
    PL: it["kategoria"],
    UK: it["kategoria uk"],
  },
}));

fs.writeFileSync(
  "./categories_data.json",
  JSON.stringify({ createdAt: new Date(), items: categories }, null, 2)
);

fs.writeFileSync(
  "./products_data.json",
  JSON.stringify({ createdAt: new Date(), items: products }, null, 2)
);