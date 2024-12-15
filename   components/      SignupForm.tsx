import React, { useState } from 'react';

const SignupForm = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const validateInput = (value) => {
        if (value.trim() === '') {
            setError('Input cannot be empty');
            return false;
        }
        setError('');
        return true;
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
                style={{ borderColor: error ? 'red' : 'black' }}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
    );
};

export default SignupForm;