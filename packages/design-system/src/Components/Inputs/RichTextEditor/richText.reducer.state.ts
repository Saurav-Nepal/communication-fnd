export const richTextReducer = (state, action) => {
    const handleChangeValue = (key: string, status: any) => {
        return { ...state, [key]: status };
    };
    switch (action.type) {
        case 'BOLD':
            return handleChangeValue('bold', !state.bold);
        case 'ITALIC':
            return handleChangeValue('italic', !state.italic);
        case 'UNDERLINE':
            return handleChangeValue('underline', !state.underline);
        default:
            return state;
    }
};

export const richTextInitialState = {
    bold: false,
    italic: false,
    underline: false,
};
