export default class CardService {
    constructor(cardRepo) {
        this.cardRepo = cardRepo;
    }
    async getAllCards(tags = []) {
        return this.cardRepo.getCardsByTags(tags);
    }

    async promoteCardIfCorrect(cardId, isCorrect) {
        const card = await this.cardRepo.getCardById(cardId);
        if (isCorrect) {
            if (card.category === 'SEVENTH') {
                await this.cardRepo.removeCard(cardId);
            } else {
                const nextCategory = this.getNextCategory(card.category);
                await this.cardRepo.updateCard(cardId, {category: nextCategory, lastUpdated: Date.now()});
            }
        } else {
            await this.cardRepo.updateCard(cardId, {category: 'FIRST', lastUpdated: Date.now()});
        }
    }

    async getCardsToReview(date) {
        const allCards = await this.cardRepo.getCards();
        const quizzDate = date ? new Date(date) : new Date();
        quizzDate.setUTCHours(0, 0, 0, 0);
        return allCards.filter(card => {
            const lastUpdated = new Date(card.lastUpdated);
            lastUpdated.setUTCHours(0, 0, 0, 0);

            const daysUntilNextReview = this.getDaysUntilNextReview(card.category);
            const nextReviewDate = new Date(lastUpdated);
            if (card.category !== 'FIRST') {
                nextReviewDate.setUTCDate(nextReviewDate.getUTCDate() + daysUntilNextReview);
            }
            return nextReviewDate <= quizzDate;
        });

    }


    getDaysUntilNextReview(category) {
        const intervals = {
            'FIRST': 1,
            'SECOND': 2,
            'THIRD': 4,
            'FOURTH': 8,
            'FIFTH': 16,
            'SIXTH': 32,
            'SEVENTH': 64
        };
        return intervals[category] || 0;
    }


    getNextCategory(currentCategory) {
        const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH'];
        const currentIdx = categories.indexOf(currentCategory);
        return categories[currentIdx + 1] || 'DONE';
    }
}