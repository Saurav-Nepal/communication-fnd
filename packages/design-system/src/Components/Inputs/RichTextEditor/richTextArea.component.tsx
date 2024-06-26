import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { Editor, Range, Transforms } from 'slate';
import { Editable, ReactEditor, Slate } from 'slate-react';

import {
    calculateIndexFromGroupAndItemIndex,
    findGroupAndItemIndex,
    IsEmptyArray,
    SortArrayObjectBy,
    TransformObjectToLabelValueObjectArray,
    useOperatingSystem,
} from '@finnoto/core';

import { Portal } from '@radix-ui/react-portal';

import { cn, Debounce } from '../../../Utils/common.ui.utils';
import { slateWordRange } from '../MentionInput/mention.utils';
import {
    RichTextAreaProps,
    richTextMentionPrefixRegex,
} from './richTextEditor.types';
import {
    insertMention,
    renderRichTextEditorElement,
    richTextEditorRenderLeaf,
    serializeRichText,
} from './richTextEditorRenderElement.utils';
import { useRichText } from './useRichText.hook';

const defaultInitialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

const RichTextArea = forwardRef(
    (
        {
            state,
            dispatch,
            editor,
            mentions,
            mentionPrefix = '@',
            getHtml,
            placeholder,
            initialValue,
            readOnly = false,
            containerClassName,
            editorClassName,
            height = 300,
            withoutDefaultHeight = false,
        }: RichTextAreaProps,
        ref: any
    ) => {
        const isMentionEnable = !IsEmptyArray(mentions);

        const { type: windowsType } = useOperatingSystem();

        const popoverRef = useRef<HTMLDivElement | null>();
        const editorRef = useRef<any>({ beforeRange: null, afterRange: null });
        const [target, setTarget] = useState<Range | undefined>();
        const [index, setIndex] = useState(0);
        const [search, setSearch] = useState('');

        const { handleEditorChange } = useRichText({
            state,
            editor,
        });

        const mentionItems = useMemo(() => {
            if (!isMentionEnable) return [];

            return mentions.filter((c) =>
                c.name.toLowerCase().startsWith(search.toLowerCase())
            );
        }, [isMentionEnable, mentions, search]);

        const groupedMentions = useMemo(() => {
            const groupedItems = { others: [] };

            mentionItems.forEach((item) => {
                const itemSegment = item.key.split('.');

                if (itemSegment.length > 1) {
                    const groupKey = itemSegment.shift();

                    if (!groupedItems[groupKey]) groupedItems[groupKey] = [];

                    groupedItems[groupKey].push(item);
                    return;
                }

                groupedItems.others.push(item);
            });

            return SortArrayObjectBy(
                TransformObjectToLabelValueObjectArray(
                    groupedItems,
                    'name',
                    'options'
                ),
                'name'
            );
        }, [mentionItems]);

        const onKeyDown = useCallback(
            (event) => {
                if (target && mentionItems.length > 0) {
                    switch (event.key) {
                        case 'ArrowDown':
                            event.preventDefault();
                            const prevIndex =
                                index >= mentionItems.length - 1
                                    ? 0
                                    : index + 1;
                            setIndex(prevIndex);
                            popoverRef.current
                                ?.querySelector(`[tabindex="${prevIndex}"]`)
                                ?.scrollIntoView({ block: 'nearest' });
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            const nextIndex =
                                index <= 0
                                    ? mentionItems.length - 1
                                    : index - 1;
                            setIndex(nextIndex);
                            popoverRef.current
                                ?.querySelector(`[tabindex="${nextIndex}"]`)
                                ?.scrollIntoView({ block: 'nearest' });
                            break;
                        case 'Tab':
                        case 'Enter':
                            event.preventDefault();

                            const { groupIndex, itemIndex } =
                                findGroupAndItemIndex(groupedMentions, index);
                            const selectedChar =
                                groupedMentions[groupIndex].options[itemIndex];

                            Transforms.select(editor, target);
                            insertMention(editor, {
                                ...selectedChar,
                                group: groupedMentions[groupIndex].name,
                            });
                            setTarget(null);
                            break;
                        case 'Escape':
                            event.preventDefault();
                            setTarget(null);
                            break;
                    }
                }
            },
            [mentionItems.length, editor, groupedMentions, index, target]
        );

        const showSuggestion = useMemo(() => {
            return target && isMentionEnable;
        }, [isMentionEnable, target]);

        useEffect(() => {
            if (!isMentionEnable) return;

            if (target && mentionItems.length > 0) {
                const el = popoverRef.current;
                const domRange = ReactEditor.toDOMRange(editor, target);
                const rect = domRange.getBoundingClientRect();
                el.style.top = `${rect.top + window.pageYOffset + 24}px`;
                el.style.left = `${rect.left + window.pageXOffset}px`;
            }
        }, [
            mentionItems.length,
            editor,
            index,
            isMentionEnable,
            search,
            target,
        ]);

        useImperativeHandle(ref, () => editorRef.current, []);

        return (
            <div
                className={cn(
                    'p-2',
                    {
                        'bg-polaris-bg-surface-secondary-hover': readOnly,
                    },
                    containerClassName
                )}
            >
                <Slate
                    editor={editor}
                    initialValue={initialValue || defaultInitialValue}
                    onChange={(value) => {
                        if (readOnly) return;
                        handleEditorChange(value);
                        Debounce(getHtml?.(serializeRichText(editor)), 1);

                        const { selection } = editor;

                        const [start] = Range.edges(selection);
                        const wordBefore = Editor.before(editor, start, {
                            unit: 'word',
                            voids: true,
                        });

                        const range =
                            wordBefore &&
                            slateWordRange(
                                editor,
                                Editor.range(editor, wordBefore, start),
                                {
                                    terminator: [' ', '#'],
                                    directions: 'left',
                                    include: true,
                                }
                            );

                        const after = Editor.after(editor, start);
                        const afterRange = Editor.range(editor, start, after);

                        editorRef.current.beforeRange = range;
                        editorRef.current.afterRange = afterRange;

                        if (!isMentionEnable) return;

                        const text = range && Editor.string(editor, range);
                        const prefixMatch =
                            richTextMentionPrefixRegex[mentionPrefix];
                        const match = text && text.match(prefixMatch);

                        if (match) {
                            range.anchor.offset = !match[1]
                                ? Math.min(
                                      range.anchor.offset + match.index,
                                      range.focus.offset
                                  )
                                : range.anchor.offset;

                            range.anchor.path = !match[1]
                                ? range.focus.path
                                : range.anchor.path;
                            setTarget(range);
                            setSearch(match[1] || '');
                            setIndex(0);
                            return;
                        }
                        setTarget(null);
                    }}
                >
                    <Editable
                        readOnly={readOnly}
                        className={cn(
                            'focus-visible:outline-none overflow-y-auto text-polaris-size-325',
                            {
                                'editor-disabled': readOnly,
                            },
                            editorClassName
                        )}
                        placeholder={placeholder}
                        renderLeaf={(props) => {
                            return richTextEditorRenderLeaf(props);
                        }}
                        renderElement={(props) =>
                            renderRichTextEditorElement(props, mentionPrefix)
                        }
                        onKeyDown={(event) => {
                            const { ctrlKey, key, metaKey } = event;

                            const isClickedOnCtr =
                                windowsType === 'mac' ? metaKey : ctrlKey;

                            if (isClickedOnCtr && key === 'b')
                                return dispatch({ type: 'BOLD' });
                            if (isClickedOnCtr && key === 'i')
                                return dispatch({ type: 'ITALIC' });
                            if (isClickedOnCtr && key === 'u')
                                return dispatch({ type: 'UNDERLINE' });

                            if (!isMentionEnable) return;
                            return onKeyDown(event);
                        }}
                        style={{
                            height: withoutDefaultHeight ? undefined : height,
                        }}
                    />

                    {showSuggestion && (
                        <Portal style={{ pointerEvents: 'auto' }} asChild>
                            <div
                                ref={popoverRef}
                                data-cy='mentions-portal'
                                style={{
                                    top: '-9999px',
                                    left: '-9999px',
                                    zIndex: 100,
                                    position: 'absolute',
                                }}
                                className='p-1.5 overflow-x-hidden overflow-y-auto text-sm border rounded-lg shadow-polaris-shadow-300 scrollbar-xs bg-polaris-bg-surface border-polaris-border max-h-96'
                            >
                                {groupedMentions.map((group, groupIndex) => {
                                    if (IsEmptyArray(group.options))
                                        return null;

                                    return (
                                        <>
                                            <div
                                                key={groupIndex}
                                                className='p-1.5 text-xs text-base-tertiary capitalize'
                                            >
                                                {group.name}
                                            </div>

                                            {group.options.map(
                                                (item, itemIndex) => {
                                                    const currentItemIndex =
                                                        calculateIndexFromGroupAndItemIndex(
                                                            groupedMentions,
                                                            groupIndex,
                                                            itemIndex
                                                        );

                                                    return (
                                                        <div
                                                            key={item.key}
                                                            tabIndex={
                                                                currentItemIndex
                                                            }
                                                            onClick={() => {
                                                                Transforms.select(
                                                                    editor,
                                                                    target
                                                                );
                                                                insertMention(
                                                                    editor,
                                                                    {
                                                                        ...item,
                                                                        group: group.name,
                                                                    }
                                                                );

                                                                setTarget(null);
                                                            }}
                                                            onMouseOver={() => {
                                                                setIndex(
                                                                    currentItemIndex
                                                                );
                                                            }}
                                                            className={cn(
                                                                'px-2 py-1 cursor-pointer flex gap-4 items-center min-w-[160px] rounded-md relative border-l-2 border-transparent focus:bg-polaris-bg-surface-secondary-hover focus:border-primary outline-none',
                                                                {
                                                                    'bg-polaris-bg-surface-hover':
                                                                        currentItemIndex ===
                                                                        index,
                                                                }
                                                            )}
                                                        >
                                                            {mentionPrefix}
                                                            {item.name}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        </Portal>
                    )}
                </Slate>
            </div>
        );
    }
);

export default RichTextArea;
