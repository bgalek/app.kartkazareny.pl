import * as fs from 'fs';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import slugify from 'slug';
import translate from 'translate-google';

const doc = new GoogleSpreadsheet(
    '157urwMMADPpPj6ka7l1YRaTaQPgPSamCNS8AYu_wyd0'
);

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
});

await doc.loadInfo();

const allProductsSheet = doc.sheetsByIndex[0];
const allProductsRows = await allProductsSheet.getRows();

const categoriesSheet = doc.sheetsByIndex[1];
const categoriesRows = await categoriesSheet.getRows();

const categories = [...categoriesRows].map((it) => ({
    id: it['kategoria'],
    name: {
        PL: it['kategoria'],
        UA: it['kategoria']
    }
}));

const products = [...allProductsRows]
    .filter((it) => it['przedmiot'])
    .reduce((acc, entry) => {
        const id = slugify(`${entry['przedmiot']}-${entry['kategoria']}-${entry['miara']}`);
        acc[id] = {
            name: {
                PL: entry['przedmiot'],
                UA: entry['przedmiot']
            },
            category: {
                id: entry['kategoria'],
                name: {
                    PL: entry['kategoria'],
                    UA: entry['kategoria']
                }
            },
            unit: {
                PL: entry['miara'],
                UA: entry['miara']
            }
        };
        return acc;
    }, {});

const batch = split(Object.entries(products).map(entry => ({ id: entry[0], string: entry[1].name.UA })), 30);
const translatedBatch = await Promise.all(batch.map((batch) => translate(batch, {
    from: 'pl',
    to: 'en',
    except: ['id']
})));
translatedBatch.flat(1).forEach(translation => {
    products[translation.id].name.UA = translation.string;
})

fs.writeFileSync(
    './categories_data.json',
    JSON.stringify({ createdAt: new Date(), items: categories }, null, 2)
);

fs.writeFileSync(
    './products_data.json',
    JSON.stringify({ createdAt: new Date(), items: products }, null, 2)
);

function split(arr, len) {
    let chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}
