import { useEffect, useState } from 'react';
import datesData from '../data/dates.json';

export default function CardsPage() {
    const categories = ['SEVENTH', 'SIXTH', 'FIFTH', 'FOURTH', 'THIRD', 'SECOND', 'FIRST'];
    const [cards, setCards] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [answerFeedback, setAnswerFeedback] = useState({});
    const [forceValidate, setForceValidate] = useState({});
    const [currentCategory, setCurrentCategory] = useState('');
    const [quizAlreadyDone, setQuizAlreadyDone] = useState(false);

    useEffect(() => {
        let startDateFromData = datesData.length > 0 ? new Date(datesData[0]) : new Date();
        const today = new Date();
        const daysElapsed = Math.floor((today - startDateFromData) / (1000 * 60 * 60 * 24));
        let categoryToShow;
        if (daysElapsed === 0) {
            categoryToShow = 'FIRST';
        } else {
            const reviewIntervals = [64, 32, 16, 8, 4, 2, 1];
            const categoryIndex = reviewIntervals.findIndex(interval => (daysElapsed % interval) === 0);
            categoryToShow = categoryIndex !== -1 ? categories[categoryIndex] : null;
        }
        setCurrentCategory(categoryToShow); 
        if (categoryToShow) {
            setIsLoading(true);
            fetch('/api/cards')
                .then(response => response.json())
                .then(data => {
                    if (data.cards && Array.isArray(data.cards)) {
                        const filteredCards = data.cards.filter(card => card.category === categoryToShow);
                        setCards(filteredCards);
                    } else {
                        console.error("Format de la réponse inattendu:", data);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch cards:", error);
                    setIsLoading(false);
                });
        }
    }, []);

    const handleAnswerChange = (e, cardId) => {
        setUserAnswers({ ...userAnswers, [cardId]: e.target.value });
    };

    const updateCardAnswer = async (cardId, isCorrect) => {
        if (!isCorrect) {
            const updateData = { isValid: false };
            try {
                const response = await fetch(`/api/cards/${cardId}/answer`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                });
                if (!response.ok) {
                    throw new Error('Failed to update card answer');
                }
                console.log('Card updated successfully');
            } catch (error) {
                console.error('Error updating card:', error);
            }
        }
        setAnswerFeedback(prevFeedback => ({
          ...prevFeedback,
          [cardId]: isCorrect ? 'Correct !' : 'Incorrect !'
      }));
    };

    const checkAnswer = (cardId) => {
        const card = cards.find(card => card.id === cardId);
        const isCorrect = userAnswers[cardId] === card.answer || forceValidate[cardId];
        updateCardAnswer(cardId, isCorrect); 
        if (!isCorrect && !forceValidate[cardId]) {
            setCards(currentCards => currentCards.map(card => card.id === cardId ? { ...card, attempted: true, category: "FIRST" } : card));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (quizAlreadyDone) return <div>Le quiz a déjà été fait aujourd'hui.</div>;

    return (
        <div>
            <h1>Questions da la categorie {currentCategory}</h1>
            {cards.map(card => (
                <div key={card.id}>
                    <h2>{card.question}</h2>
                    <input type="text" onChange={(e) => handleAnswerChange(e, card.id)} value={userAnswers[card.id] || ''} />
                    <button onClick={() => checkAnswer(card.id)}>Check Answer</button>
                    <label>
            <input
                type="checkbox"
                checked={forceValidate[card.id] || false}
                onChange={() => setForceValidate({...forceValidate, [card.id]: !forceValidate[card.id]})}
            /> Forcer la validation
        </label>
                    <div>{answerFeedback[card.id]}</div>
                    {card.attempted && (
                        <p>La bonne réponse est: {card.answer}. Catégorie mise à jour: {card.category}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
