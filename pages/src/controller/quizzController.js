import CardService from '../service/cardService';
import CardRepository from '../db/cardRepository';

const cardService = new CardService(new CardRepository());

export async function getQuiz(req, res) {
    const {date} = req.query;
    const cards = await cardService.getCardsToReview(date)
    res.json(cards)

}