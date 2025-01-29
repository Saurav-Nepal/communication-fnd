import React, { useMemo } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { Label } from '@slabs/ds-core';
import { LabelInterface } from '@slabs/ds-core/lib/components/labels/label.types';

interface DraftTextEditorProps {
    labelProps: LabelInterface;
    onValueChange?: (html: string) => void;
    defaultValue?: string;
}

const DraftTextEditor: React.FC<DraftTextEditorProps> = ({
    labelProps,
    onValueChange,
    defaultValue,
}) => {
    const initialEditorState = useMemo(() => {
        if (defaultValue) {
            const contentBlock = htmlToDraft(defaultValue);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(
                    contentBlock.contentBlocks
                );
                return EditorState.createWithContent(contentState);
            }
        }
        return EditorState.createEmpty();
    }, [defaultValue]);

    const [editorState, setEditorState] =
        React.useState<EditorState>(initialEditorState);

    const handleEditorStateChange = (state: EditorState) => {
        setEditorState(state);
        onValueChange?.(draftToHtml(convertToRaw(state.getCurrentContent())));
    };

    return (
        <div className='flex flex-col gap-2'>
            <Label {...labelProps} />
            <Editor
                toolbar={{
                    options: ['inline', 'history'],
                    inline: {
                        options: [
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                        ],
                    },
                }}
                editorState={editorState}
                toolbarClassName='p-4 border-b'
                wrapperClassName='border'
                editorClassName=' px-4 min-h-[200px] text-sm text-black'
                onEditorStateChange={handleEditorStateChange}
            />
        </div>
    );
};

export default DraftTextEditor;
