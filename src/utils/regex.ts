export const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{6,10}$/;
    return usernameRegex.test(username) ? '' : 'Chỉ cho phép chữ cái, số và dấu gạch dưới, từ 6 đến 10 ký tự.';
};

export const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone) ? '' : 'Chỉ cho phép 10 chữ số.';
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password) ? '' : 'Phải chứa ít nhất 8 ký tự, bao gồm chữ cái và số.';
};

export const validateCitizenId = (citizenId: string) => {
    const citizenIdRegex = /^[0-9]{12}$/;
    return citizenIdRegex.test(citizenId) ? '' : 'Chỉ cho phép 12 chữ số.';
};
