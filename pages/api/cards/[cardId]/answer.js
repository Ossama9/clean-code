export default function handler(req, res) {
    if (req.method === 'PATCH') {
        const { cardId } = req.query;
        const { isValid } = req.body;

        // Logique pour traiter la réponse à une carte
        // ...

        res.status(204).end();
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
