import { useState } from 'react';
import {createCard} from "../services/cards";

function CardCreationForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [tag, setTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const cardData = {
            question,
            answer,
            tag,
        };
        const success = await createCard(cardData);
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

      <label htmlFor="tag">Tag :</label>
      <input
        type="text"
        id="tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        required
      />

      <button type="submit" disabled={isSubmitting}>
        Create Card
      </button>
    </form>
  );
}

export default CardCreationForm;
