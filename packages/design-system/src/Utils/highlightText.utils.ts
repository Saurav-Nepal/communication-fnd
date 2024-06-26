import { findAll } from 'highlight-words-core';

/**
 * This function takes a text string and an array of search words and
 * highlights the matches in the text string by wrapping them in a <mark>
 * element with a class of 'highlight'.
 *
 * @param textString - The input text string to be highlighted
 * @param searchWords - An array of search words to match in the text string
 * @returns The modified text string with the matches highlighted
 */
export function highlightEmailBodyString(
    textString: string,
    searchWords: string[],
    documentIdentifiers?: string[]
) {
    // Find all the chunks in the text string that match any of the search words
    const chunks = findAll({ searchWords, textToHighlight: textString });

    // Map over the chunks and create a new array with the highlighted text
    const highlightedChunks = chunks.map((chunk) => {
        const { end, highlight, start } = chunk;
        const text = textString.substring(start, end);

        if (highlight) {
            // Check if the given text is a document identifier by calling the isDocumentIdentifier function with the text and documentIdentifiers parameters.
            if (isDocumentIdentifier(text, documentIdentifiers))
                // This allows the text to be visually highlighted and provides additional data for further processing or styling.
                return `<mark class='fn-highlight' data-doc-identifier='${text}'>${text}</mark>`;

            // If the chunk should be highlighted, wrap the text in a <mark> element
            return `<mark class='fn-highlight'>${text}</mark>`;
        }

        return text;
    });

    const style = `<style>mark.fn-highlight[data-doc-identifier]{ cursor: pointer; } mark.fn-highlight[data-doc-identifier]:hover { text-decoration: underline; }</style>`;

    // Join the highlighted chunks into a single string and return it

    return style + highlightedChunks.join('');
}

export function emailBodyChunks(textString: string, searchWords: string[]) {
    // Find all the chunks in the text string that match any of the search words
    const chunks = findAll({ searchWords, textToHighlight: textString });

    return chunks
        .map((chunk) => {
            const { end, highlight, start } = chunk;
            const text = textString.substring(start, end);

            if (highlight) return text;
            return null;
        })
        .filter(Boolean);
}

/**
 * Checks if the given text matches any of the document identifiers.
 *
 * @param {string} text - The text to be checked.
 * @param {string[]} documentIdentifiers - An array of document identifiers.
 * @returns {boolean} - Returns true if the text matches any document identifier, otherwise returns false.
 */
function isDocumentIdentifier(
    text: string,
    documentIdentifiers: string[]
): boolean {
    return documentIdentifiers.some((identifierRegex: string) =>
        RegExp(identifierRegex).test(text)
    );
}
