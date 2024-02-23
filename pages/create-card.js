import React from 'react';
import CardCreationForm from '../components/CardCreationForm';
import BackButton from "../components/BackButton";

const CreateCardPage = () => {
    return (
        <div>
            <h1>Create a New Card</h1>
            <CardCreationForm/>
            <BackButton label="revenir en arriere" url={"/"}/>
        </div>
    );
};

export default CreateCardPage;
