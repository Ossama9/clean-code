import { useEffect, useState } from 'react';

export default function CardsPage() {
    const [cards, setCards] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [answerFeedback, setAnswerFeedback] = useState({});
    const [forceValidate, setForceValidate] = useState({});

    useEffect(() => {
        fetch('/api/cards')
            .then(response => response.json())
            .then(data => {
                if (data.cards && Array.isArray(data.cards)) {
                    setCards(data.cards.map(card => ({ ...card, attempted: false }))); 
                } else {
                    console.error("Format de la réponse inattendu:", data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch cards:", error);
                setIsLoading(false);
            });
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

    return (
        <div>
            <h1>Questions</h1>
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
