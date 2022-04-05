import * as fs from 'fs';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet('1jTYPj_NZ5LcZmPePom_NYX5Aukr0auCm1VCwU0N_5Cw');

await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
});

await doc.loadInfo();

const sheet = doc.sheetsByIndex[0];
const rows = await sheet.getRows();

const sheet2 = doc.sheetsByIndex[1];
const rows2 = await sheet.getRows();

const items = [...rows, ...rows2].filter(it => it['PRZEDMIOT']).map(it => ({
    name: it['PRZEDMIOT'],
    category: it['Kategoria'] || 'Brak kategorii'
}));

fs.writeFileSync('./data.json', JSON.stringify({ createdAt: new Date(), items }, null, 2));