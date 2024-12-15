import React, { useState } from 'react';

const SignupForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const validateInput = (value) => {
        if (value.trim() === '') {
            setIsValid(false);
            setErrorMessage('Input cannot be empty');
        } else {
            setIsValid(true);
            setErrorMessage('');
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        validateInput(value);
    };

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                style={{ borderColor: isValid ? 'black' : 'red' }}
            />
            {!isValid && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default SignupForm;