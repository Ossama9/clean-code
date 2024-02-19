export default function handler(req, res) {
    if (req.method === 'GET') {
        // Récupérer la date de la requête
        const { date } = req.query;

        // Logique pour récupérer les cartes pour le quiz
        // ...

        res.status(200).json({ cards: [] });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
