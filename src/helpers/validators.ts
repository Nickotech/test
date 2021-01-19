export const getNameError = (name: string): string => {
    if(!name) {
        return 'Name is required';
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
        return 'Only letters and spaces are allowed';
    } 
    return '';
}

export const getEmailError = (email: string): string => {
    if(!email) {
        return 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return 'Invalid email address';
    }
    return '';
}

export const getPasswordError = (password: string): string => {
    if(!password) {
        return 'Password is required';
    } 
    return '';
}