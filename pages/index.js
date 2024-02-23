import React from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
    const router = useRouter();

    const handleStartQuiz = () => {
        router.push('/quizz');
    };
    const handleCreateQuiz = () => {
      router.push('/create-card');
  };

    return (
        <div>
            <h1>Welcome to the Quiz</h1>
            <button onClick={handleStartQuiz}>Start Quiz</button>
            <button onClick={handleCreateQuiz}>Create Cards</button>
        </div>
    );
}
