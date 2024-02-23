import {createCard, getCards} from "../../../src/controller/cardController";
const fs = require('fs');
const path = require('path');
const datesFilePath = path.join(process.cwd(), 'data', 'dates.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { tags } = req.query;
        const today = new Date().toISOString().split('T')[0];
        const datesData = JSON.parse(fs.readFileSync(datesFilePath));
        if (datesData.includes(today)) {
          res.status(403).send('Questionnaire déjà déclenché ce jour.');
        } else {
          datesData.push(today);
          fs.writeFileSync(datesFilePath, JSON.stringify(datesData, null, 2));
          return await getCards(req, res);
        }
    } 
    else if (req.method === 'POST') {
        return await createCard(req, res);
    } 
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
