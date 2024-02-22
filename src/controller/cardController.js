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
    try {
        const cards = await cardRepository.getCards(req.body); 
        res.status(200).json({
            message: "Cards retrieved successfully",
            cards,
        });
    } catch (error) {
        res.status(400).json({ message: "Error geting cards", error: error.toString() });
    }
}

export async function updateCard(req, res) {
    const cardId = req.query.cardId;
    const update = { category: 'FIRST' };
    try {
        const cards = await cardRepository.updateCard(cardId,update); 
        res.status(200).json({
            message: "Card updated successfully",
            cards,
        });
    } catch (error) {
        res.status(400).json({ message: "Error updating card", error: error.toString() });
    }
}