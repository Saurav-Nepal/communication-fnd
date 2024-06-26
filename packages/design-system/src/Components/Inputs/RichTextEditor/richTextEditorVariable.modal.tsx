import { useCallback, useMemo } from 'react';
import { useList } from 'react-use';

import { IsEmptyArray } from '@finnoto/core';

import { Modal } from '../../../Utils';
import {
    ModalBody,
    ModalContainer,
    ModalFooter,
} from '../../Dialogs/Base/modal.container.component';
import { Button } from '../Button/button.component';
import { IconButton } from '../Icon-Button/iconButton.component';
import {
    MentionsType,
    richTextMentionPrefixRegex,
} from './richTextEditor.types';

import { AddSvgIcon, DeleteSvgIcon } from 'assets';

const RichTextEditorVariable = ({
    mentions,
    mentionPrefix,
    onApplyAll,
}: {
    mentions: MentionsType[];
    mentionPrefix: keyof typeof richTextMentionPrefixRegex;
    onApplyAll?: (__: any) => void;
}) => {
    const [variablesList, { push, removeAt }] = useList([]);

    const hasAdded = useCallback(
        (key: string) => {
            return {
                data: variablesList.find((val) => val.key === key),
                index: variablesList.findIndex((val) => val.key === key),
            };
        },
        [variablesList]
    );

    const sanitizedMentions = useMemo(() => {
        return mentions.flatMap((val) => {
            if (hasAdded(val.key).data) return [];
            return val;
        });
    }, [hasAdded, mentions]);

    return (
        <ModalContainer title='Variables'>
            <ModalBody>
                <div className='gap-1 p-3 col-flex bg-base-100'>
                    {sanitizedMentions?.map((val) => {
                        if (hasAdded(val.key).data) return;

                        return (
                            <div
                                key={val.key}
                                className='flex items-center justify-between p-3 rounded bg-base-200'
                            >
                                <div className='col-flex'>
                                    <span className='text-sm'>{val.name}</span>
                                    <span className='text-xs text-base-tertiary'>
                                        {val.description}
                                    </span>
                                </div>
                                <IconButton
                                    icon={AddSvgIcon}
                                    size='sm'
                                    onClick={() => {
                                        push(val);
                                    }}
                                    appearance='accent'
                                />
                            </div>
                        );
                    })}
                </div>
                {!IsEmptyArray(variablesList) && (
                    <div className='flex flex-wrap gap-2 p-3 border-t bg-base-100'>
                        {variablesList.map((val) => {
                            return (
                                <div
                                    key={val.key}
                                    className='flex items-center gap-2 px-3 py-2 text-sm bg-base-200 '
                                >
                                    <span>
                                        {mentionPrefix || '@'}
                                        {val.name}
                                    </span>

                                    <IconButton
                                        icon={DeleteSvgIcon}
                                        size='xs'
                                        onClick={() => {
                                            removeAt(hasAdded(val.key).index);
                                        }}
                                        appearance='errorHover'
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={() => {
                        Modal.close();
                    }}
                    size='md'
                    appearance='error'
                >
                    Close
                </Button>
                <Button
                    className='min-w-[200px]'
                    onClick={() => {
                        onApplyAll?.(variablesList);
                        Modal.close();
                    }}
                    size='md'
                    appearance='primary'
                >
                    Apply
                </Button>
            </ModalFooter>
        </ModalContainer>
    );
};

export default RichTextEditorVariable;
