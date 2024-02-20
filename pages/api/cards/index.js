import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'cards.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { tags } = req.query;
        res.status(200).json({ cards: [] });
    } 
    else if (req.method === 'POST') {
        const newCard = {
            ...req.body,
            category: 'FIRST', 
        };
        let cards = [];
        if (fs.existsSync(dataFilePath)) {
            const rawData = fs.readFileSync(dataFilePath);
            cards = JSON.parse(rawData);
        }
        cards.push(newCard);
        fs.writeFileSync(dataFilePath, JSON.stringify(cards, null, 2));
        //await new Promise(resolve => setTimeout(resolve, 1000));
        res.status(201).json(newCard);
    } 
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
