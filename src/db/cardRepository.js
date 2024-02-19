export default class CardRepository {
    constructor() {
        this.cards = [];
    }

    async findCardById(cardId) {
        return this.cards.find(card => card.id === cardId);
    }

    async updateCardCategory(cardId, newCategory) {
        const card = await this.findCardById(cardId);
        if (card) {
            card.category = newCategory;
        }
        return card;
    }
    async resetCardCategory(cardId) {
        // Code to reset the card category to 'FIRST' in the database
    }
}
