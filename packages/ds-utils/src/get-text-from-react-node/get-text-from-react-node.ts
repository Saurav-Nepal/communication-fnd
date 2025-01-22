import React from 'react';

/**
 * Extracts text content from a React node
 * @param node React node to extract text from
 * @returns extracted text content as a string
 */
export function getTextFromReactNode(node: React.ReactNode): string {
    if (typeof node === 'string') {
        return node;
    }

    if (typeof node === 'number') {
        return node.toString();
    }

    if (node instanceof Array) {
        return node.map(getTextFromReactNode).join('');
    }

    if (typeof node === 'object' && node !== null && 'props' in node) {
        const reactElement = node as React.ReactElement;
        if (reactElement.props.children) {
            return getTextFromReactNode(reactElement.props.children);
        }
    }

    return '';
}
