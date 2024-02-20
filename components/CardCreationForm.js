import { useState } from 'react';

function CardCreationForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const cardData = {
      question,
      answer,
    };

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
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Failed to submit card', error);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="question">Question:</label>
      <input
        type="text"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      <label htmlFor="answer">Answer:</label>
      <input
        type="text"
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        Create Card
      </button>
    </form>
  );
}

export default CardCreationForm;
