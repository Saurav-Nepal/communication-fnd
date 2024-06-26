import { useUncontrolled } from '@finnoto/core';

import { RichTextEditor } from '../RichTextEditor/richTextEditor.component';
import { MentionsType } from '../RichTextEditor/richTextEditor.types';

export const RichTextInput = ({
    name,
    label,
    value: propsValue,
    defaultValue,
    onChange,
    mentions,
    readOnly,
    enablePreview,
    containerClassName,
    editorClassName,
    error,
    warning,
}: {
    name?: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    mentions?: MentionsType[];
    readOnly?: boolean;
    enablePreview?: boolean;
    editorClassName?: string;
    containerClassName?: string;
    error?: string;
    warning?: string;
}) => {
    const [value, handleValueChange] = useUncontrolled({
        value: propsValue,
        defaultValue,
        finalValue: '',
        onChange,
    });

    return (
        <RichTextEditor
            labelProps={{
                label,
                className: 'text-sm',
                required: true,
            }}
            features={['bold', 'italic', 'underline']}
            getHtml={(html) => handleValueChange(html)}
            placeholder='Write email body here'
            mentions={mentions}
            html={defaultValue}
            readOnly={readOnly}
            enablePreview={enablePreview}
            mentionPrefix='#'
            infoProps={{
                type: 'info',
                text: 'To include a variable in the text, simply use "#" followed by the variable name and press enter to add it.',
            }}
            error={error}
            warning={warning}
        />
    );
};
