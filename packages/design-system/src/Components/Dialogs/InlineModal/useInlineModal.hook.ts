import { useContext } from 'react';
import { InlineModalContext } from './inlineModal.component';

export const useInlineModal = () => {
    return useContext(InlineModalContext);
};
