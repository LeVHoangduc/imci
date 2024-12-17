export const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{6,10}$/;
    return usernameRegex.test(username) ? '' : 'Chỉ cho phép chữ cái, số và dấu gạch dưới, từ 6 đến 10 ký tự.';
};

export const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone) ? '' : 'Chỉ cho phép 10 chữ số.';
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password) ? '' : 'Mật khẩu phải từ 8 ký tự trở lên.';
};

export const validateCitizenId = (citizenId: string) => {
    const citizenIdRegex = /^[0-9]{12}$/;
    return citizenIdRegex.test(citizenId) ? '' : 'Chỉ cho phép 12 chữ số.';
};
