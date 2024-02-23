import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CardsPage from './quizz'; 
//import '@testing-library/jest-dom/extend-expect';

// Mock global de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      cards: [
        { id: '1', question: 'Question 1', answer: 'Answer 1', category: 'FIRST' },
        { id: '2', question: 'Question 2', answer: 'Answer 2', category: 'SECOND' }
      ]
    })
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('affiche le message de chargement puis les cartes après le chargement des données', async () => {
  render(<CardsPage />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
  expect(screen.getByText('Question 1')).toBeInTheDocument();
  expect(screen.getByText('Question 2')).toBeInTheDocument();
});

test('affiche un message si le quiz a déjà été fait aujourd’hui', async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ status: 403, statusText: "Forbidden" })
  );

  render(<CardsPage />);

  // Vérifiez que le message indiquant que le quiz a déjà été fait est affiché
  await waitFor(() => expect(screen.getByText(/Le quiz a déjà été fait aujourd'hui./i)).toBeInTheDocument());
});

// Ajoutez plus de tests ici pour couvrir d'autres fonctionnalités comme la soumission des réponses, le forçage de la validation, etc.
