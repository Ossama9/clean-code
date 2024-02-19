export default function handler(req, res) {
    if (req.method === 'GET') {
        // Récupérer les tags de la requête
        const { tags } = req.query;

        // Logique pour récupérer les cartes
        // ...

        res.status(200).json({ cards: [] });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    // Dans la fonction handler existante
    if (req.method === 'POST') {
        // Logique pour créer une nouvelle carte
        // ...

        res.status(201).json({ card: {} });
    }

}
