export const formatJoiErrorMessages = (error: any) => {
    if (!error) return {};
    if (!error.details?.length) return {};

    const errors: any = {};
    error.details.map((err: any) => {
        errors[err.path.join('_')] = err.message;
    });

    return errors;
};

export const getJoiValidationOptions = () => {
    return {
        abortEarly: false,
        allowUnknown: true,
        errors: {
            wrap: {
                label: '',
            },
        },
    };
};
