import {
    BoldIcon,
    ItalicIcon,
    Redo2,
    UnderlineIcon,
    Undo2,
} from 'lucide-react';

import { IsFunction, useApp } from '@finnoto/core';

import { Modal } from '../../../Utils';
import { cn } from '../../../Utils/common.ui.utils';
import { Button } from '../Button/button.component';
import { RichTextEditorToolbarProps } from './richTextEditor.types';
import { serializeRichText } from './richTextEditorRenderElement.utils';
import RichTextPreviewModal from './richTextPreview.modal';

export const RichTextEditorToolbar = ({
    state,
    dispatch,
    editor,
    features,
    onVariableClick,
    enablePreview = false,
}: RichTextEditorToolbarProps) => {
    const { isArc } = useApp();

    const openPrevModal = () => {
        Modal.open({
            component: RichTextPreviewModal,
            props: { html: serializeRichText(editor, 'default') },
        });
    };
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-4 p-2 border-b'
            )}
        >
            <div className='flex items-center gap-2'>
                {features?.map((val) => (
                    <RichTextButton
                        key={val}
                        type={val}
                        active={state[val]}
                        onClick={() =>
                            dispatch({ type: val.toLocaleUpperCase() })
                        }
                    />
                ))}
            </div>
            <div className='flex items-center gap-2'>
                <Button
                    onClick={() => {
                        editor.undo();
                    }}
                    className='!px-0.5 hover:bg-polaris-bg-surface-secondary-active'
                    appearance='ghost'
                    size='xs'
                    shape='square'
                >
                    <Undo2 size={16} />
                </Button>
                <Button
                    onClick={() => {
                        editor.redo();
                    }}
                    className='!px-0.5 hover:bg-polaris-bg-surface-secondary-active'
                    appearance='ghost'
                    size='xs'
                    shape='square'
                >
                    <Redo2 size={16} />
                </Button>
                {/* {IsFunction(onVariableClick) && (
                    <Button
                        onClick={onVariableClick}
                        size='sm'
                        appearance='plain'
                        className='text-[#303030] border border-base-300'
                    >
                        Variables
                    </Button>
                )} */}
                {enablePreview && (
                    <Button
                        onClick={openPrevModal}
                        appearance='plain'
                        className='text-[#303030] border border-base-300'
                        size='sm'
                    >
                        Preview
                    </Button>
                )}
            </div>
        </div>
    );
};

const IconsType = {
    bold: <BoldIcon size={16} />,
    italic: <ItalicIcon size={16} />,
    underline: <UnderlineIcon size={16} />,
};
const RichTextButton = ({
    type,
    onClick,
    active,
}: {
    onClick: () => void;
    active: boolean;
    type: keyof typeof IconsType;
}) => {
    return (
        <Button
            className={cn('!px-0 ', {
                'bg-polaris-bg-surface-secondary-active hover:bg-polaris-bg-surface-secondary-active':
                    active,
                'hover:bg-polaris-bg-surface-secondary-hover': !active,
            })}
            appearance='ghost'
            shape='square'
            size='xs'
            onClick={onClick}
        >
            {IconsType[type]}
        </Button>
    );
};
