import {getCards, createCard} from "../../src/controller/cardController";


export default async function handler(req, res) {
    if (req.method === 'GET') {
          return await getCards(req, res);
    }
    else if (req.method === 'POST') {
        return await createCard(req, res);
    } 
    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
