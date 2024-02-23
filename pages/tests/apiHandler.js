import { createCard, getCards } from "../../src/controller/cardController";

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const cards = await getCards(); 
      res.status(200).json({ cards });
    } else if (req.method === 'POST') {
      const card = await createCard(req.body); 
      res.status(201).json({ card });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
