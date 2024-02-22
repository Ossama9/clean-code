const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

class CardRepository {
    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'data', 'cards.json');
        this.cards = this.loadCardsFromFile();
    }

    loadCardsFromFile() {
        if (fs.existsSync(this.dataFilePath)) {
            const rawData = fs.readFileSync(this.dataFilePath);
            return JSON.parse(rawData);
        } else {
            return []; 
        }
    }

    saveCardsToFile() {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(this.cards, null, 2), 'utf8');
    }

    addCard(cardData) {
        const newCard = {
            id: uuidv4(), 
            ...cardData,
            category: 'FIRST', 
        };
        this.cards.push(newCard);
        this.saveCardsToFile(); 
        return newCard;
    }

    getCards() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.dataFilePath, (err, data) => {
                if (err) {
                    reject(err); 
                } else {
                    try {
                        const cards = JSON.parse(data); 
                        resolve(cards); 
                    } catch (parseError) {
                        reject(parseError); 
                    }
                }
            });
        });
    }

    updateCard(cardId, updates) {
        const index = this.cards.findIndex(card => card.id === cardId);
        if (index === -1) {
            throw new Error('Card not found');
        }    
        this.cards[index] = { ...this.cards[index], ...updates };
        this.saveCardsToFile();    
        return this.cards[index];
    }

}

module.exports = CardRepository;
