import React, { useEffect, useState } from 'react';
import BackButton from "../components/BackButton";


const CreateCardPage = () => {
    const [cards, setCards] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState({});
    useEffect(() => {
        fetch('/api/cards')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                const extractedTags = new Set();
                data.forEach(card => extractedTags.add(card.tag));
                setTags(Array.from(extractedTags));
            })
            .catch(error => console.error('Erreur lors de la récupération des cartes:', error));
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

        if (selectedTagsList.length > 0) {
            fetch(`/api/cards?tags=${selectedTagsList.join(',')}`)
                .then(response => response.json())
                .then(data => setCards(data))
                .catch(error => console.error('Erreur lors du filtrage des cartes:', error));
        } else {
            fetch('/api/cards')
                .then(response => response.json())
                .then(data => setCards(data))
                .catch(error => console.error('Erreur lors de la récupération des cartes:', error));
        }
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
