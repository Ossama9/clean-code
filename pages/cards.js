import React, { useEffect, useState } from 'react';
import BackButton from "../components/BackButton";
import {getCards, getCardsByTags} from "../services/cards";


const CreateCardPage = () => {
    const [cards, setCards] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState({});
    useEffect(() => {
        getCards().then(data => {
            setCards(data);
            const extractedTags = new Set();
            data.forEach(card => extractedTags.add(card.tag));
            setTags(Array.from(extractedTags));
        }).catch(error => console.error(error));
    }, []);

    const handleTagChange = (tag) => {
        setSelectedTags(prevTags => ({
            ...prevTags,
            [tag]: !prevTags[tag]
        }));
    };

    useEffect(() => {
        const selectedTagsList = Object.entries(selectedTags)
            .filter(([tag, isSelected]) => isSelected)
            .map(([tag]) => tag);

        const fetchCards = async () => {
            try {
                const data = selectedTagsList.length > 0
                    ? await getCardsByTags(selectedTagsList)
                    : await getCards();
                setCards(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCards();
    }, [selectedTags]);

    return (
        <div>
            <h1>Mes cards</h1>
            <div>
                {tags.map(tag => (
                    <label key={tag}>
                        <input
                            type="checkbox"
                            checked={selectedTags[tag] || false}
                            onChange={() => handleTagChange(tag)}
                        />
                        {tag}
                    </label>
                ))}
            </div>
            <div>
                {cards.map(card => (
                    <div key={card.id}>
                        <p>Question: {card.question} - Tag: {card.tag}</p>
                    </div>
                ))}
            </div>
            <BackButton label="revenir en arriere" url={"/"}/>
        </div>
    );
};

export default CreateCardPage;
