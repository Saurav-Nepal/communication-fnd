export const IsProduction = () => {
    return process.env.NODE_ENV !== 'development';
};
export const IsDevelopment = () => {
    return process.env.NODE_ENV === 'development';
};
