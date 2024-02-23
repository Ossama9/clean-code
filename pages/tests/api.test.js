jest.mock("../../src/controller/cardController", () => ({
    createCard: jest.fn().mockResolvedValue({ message: "Card created successfully" }),
    getCards: jest.fn().mockResolvedValue({ cards: [{ id: '1', question: 'Test Question?' }] }),
  }));
  
  import { createCard, getCards } from "../../src/controller/cardController";
  import handler from './apiHandler';


describe("API Handler Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET method - Récupère les cartes", async () => {
    const req = { method: 'GET', query: {} };
    const jsonMock = jest.fn();
    const res = { status: jest.fn().mockReturnThis(), json: jsonMock };
    getCards.mockImplementation((req, res) => res.json({ cards: [{ id: '1', question: 'Test Question?' }] }));
    await handler(req, res);
    expect(getCards).toHaveBeenCalled();
  });

  test("POST method - Crée une carte", async () => {
    const req = { method: 'POST', body: { question: 'New Question?', answer: 'New Answer' } };
    const jsonMock = jest.fn();
    const res = { status: jest.fn().mockReturnThis(), json: jsonMock };  
    createCard.mockResolvedValue({ message: "Card created successfully" });
    await handler(req, res);  
    expect(createCard).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
  });
  
});
