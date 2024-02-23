import CardService from '../service/cardService';
import CardRepository from '../db/cardRepository';

const cardService = new CardService(new CardRepository());
const cardRepository = new CardRepository();

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

export async function createCard(req, res) {
    try {
        const newCard = cardRepository.addCard(req.body);
        res.status(201).json({
            message: "Card added successfully",
            card: newCard,
        });
    } catch (error) {
        res.status(400).json({ message: "Error adding card", error: error.toString() });
    }
}

export async function getCards(req, res) {
    const tags = req.query.tags ? req.query.tags.split(',') : [];
    try {
        const cards = await cardService.getAllCards(tags);
        res.status(200).json(cards);
    } catch (error) {
        res.status(400).json({ message: "Error geting cards", error: error.toString() });
    }
}

export async function updateCard(req, res) {
    const cardId = req.query.cardId;
    const { isValid } = req.body;
    try {
        const updatedCard = await cardService.promoteCardIfCorrect(cardId, isValid);
        return res.status(204).json()
    } catch (error) {
        return  res.status(400).json({ error: error.message });
    }
}