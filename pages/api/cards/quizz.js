import {getQuiz} from "../../../src/controller/quizzController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getQuiz(req,res)
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
