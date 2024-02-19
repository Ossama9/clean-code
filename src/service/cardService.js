export default class CardService {
    constructor(cardRepo) {
        this.cardRepo = cardRepo;
    }

    async promoteCardIfCorrect(cardId, isCorrect) {
        const card = await this.cardRepo.getCardById(cardId);
        if (!card) {
            throw new Error('Card not found');
        }

        if (isCorrect) {
            if (card.category === 'SEVENTH') {
                await this.cardRepo.removeCard(cardId); // La carte ne sera plus proposée
            } else {
                const nextCategory = this.getNextCategory(card.category);
                await this.cardRepo.updateCardCategory(cardId, nextCategory);
            }
        } else {
            await this.cardRepo.resetCardCategory(cardId); // En cas de réponse incorrecte, retour à la catégorie 'FIRST'
        }
    }

    getNextCategory(currentCategory) {
        const categories = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH'];
        const currentIdx = categories.indexOf(currentCategory);
        return categories[currentIdx + 1] || 'DONE';
    }
}