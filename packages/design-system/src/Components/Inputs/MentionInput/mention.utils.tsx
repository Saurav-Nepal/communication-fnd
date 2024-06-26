import { findAll } from 'highlight-words-core';
import { Editor, Point, Range } from 'slate';

import { GetObjectFromArray } from '@finnoto/core';

import { MentionValueContext } from './mentionInput.types';

/**
 * Highlights mentions in a message using a provided context.
 *
 * @param {string} message - The message to highlight mentions in.
 * @param {MentionValueContext[]} context - The context to use for highlighting mentions.
 * @param {any} [MentionComponent] - The component to use for rendering mentions.
 * @returns {JSX.Element[]} - The highlighted message as an array of JSX elements.
 */
export function highlightMentionMessage(
    message: string,
    context: MentionValueContext[],
    MentionComponent?: any
): (JSX.Element | string)[] {
    // Use the 'highlight-words-core' library to find all occurrences of mentions in the message
    const chunks = findAll({
        searchWords: context.map((ctx) => ctx.display), // Extract the display values from the context
        textToHighlight: message, // The message to highlight mentions in
    });

    // Map over the chunks and highlight the mentions
    const highlightedChunks = chunks.map((chunk) => {
        const { end, highlight, start } = chunk; // Destructure the chunk properties
        const text = message.substring(start, end); // Extract the substring representing the mention

        if (highlight) {
            // If the mention is highlighted
            if (MentionComponent) {
                // If a MentionComponent is provided, use it to render the mention
                const chuckContext = GetObjectFromArray(
                    context,
                    'display',
                    text // Find the context for the mention
                );

                return <MentionComponent text={text} context={chuckContext} />;
            }
            // If no MentionComponent is provided, render the mention with the default styling
            return <span className='text-info'>{text}</span>;
        }

        // If the mention is not highlighted, just return the text
        return text;
    });

    // Return the highlighted message as an array of JSX elements
    return highlightedChunks;
}

export function slateWordRange(
    editor: Editor,
    location: Range,
    options: {
        terminator?: string[];
        include?: boolean;
        directions?: 'both' | 'left' | 'right';
    } = {}
): Range | undefined {
    const {
        terminator = [' '],
        include = false,
        directions = 'both',
    } = options;

    const { selection } = editor;
    if (!selection) return;

    // Get start and end, modify it as we move along.
    let [start, end] = Range.edges(location);

    let point: Point = start;

    function move(direction: 'right' | 'left'): boolean {
        const next =
            direction === 'right'
                ? Editor.after(editor, point, {
                      unit: 'character',
                  })
                : Editor.before(editor, point, { unit: 'character' });

        const wordNext =
            next &&
            Editor.string(
                editor,
                direction === 'right'
                    ? { anchor: point, focus: next }
                    : { anchor: next, focus: point }
            );

        const last =
            wordNext &&
            wordNext[direction === 'right' ? 0 : wordNext.length - 1];
        if (next && last && !terminator.includes(last)) {
            point = next;

            if (point.offset === 0) {
                // Means we've wrapped to beginning of another block
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    // Move point and update start & end ranges

    // Move forwards
    if (directions !== 'left') {
        point = end;
        while (move('right'));
        end = point;
    }

    // Move backwards
    if (directions !== 'right') {
        point = start;
        while (move('left'));
        start = point;
    }

    if (include) {
        return {
            anchor: Editor.before(editor, start, { unit: 'offset' }) ?? start,
            focus: Editor.after(editor, end, { unit: 'offset' }) ?? end,
        };
    }

    return { anchor: start, focus: end };
}
