import {answerCard} from "../../../../src/controller/cardController";

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await answerCard(req, res);
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
