
const getCards = async () => {
    try {
        const response = await fetch('/api/cards');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des cartes:', error);
        throw error; // rethrow to let the caller handle the error
    }
};

const getCardsByTags = async (tags) => {
    try {
        const response = await fetch(`/api/cards?tags=${tags.join(',')}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du filtrage des cartes:', error);
        throw error; // rethrow to let the caller handle the error
    }
};
const createCard = async (cardData) => {
    try {
        const response = await fetch('/api/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData),
        });

        if (response.ok) {
            console.log('Card created:', await response.json());
            return true;
        } else {
            console.error('Failed to create card');
            return false;
        }
    } catch (error) {
        console.error('Failed to submit card', error);
        return false;
    }
};
export { getCards, getCardsByTags, createCard };
