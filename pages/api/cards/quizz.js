import {getQuiz} from "../../../src/controller/quizzController";
const fs = require('fs');
const path = require('path');
const datesFilePath = path.join(process.cwd(), 'data', 'dates.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const today = new Date().toISOString().split('T')[0];
        const datesData = JSON.parse(fs.readFileSync(datesFilePath));
        if (datesData.includes(today)) {
            res.status(403).send('Questionnaire déjà déclenché ce jour.');
        } else {
            datesData.push(today);
            fs.writeFileSync(datesFilePath, JSON.stringify(datesData, null, 2));
            return await getQuiz(req,res)
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
