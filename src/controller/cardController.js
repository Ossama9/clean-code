import CardService from '../service/cardService';
import CardRepository from '../db/cardRepository';

const cardService = new CardService(new CardRepository());

export async function answerCard(req, res) {
    const cardId = req.query.cardId;
    const { isValid } = req.body;

    try {
        const updatedCard = await cardService.promoteCardIfCorrect(cardId, isValid);
        res.status(204);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}