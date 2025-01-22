import React from 'react';

import { getTextFromReactNode } from './get-text-from-react-node';

describe('getTextFromReactNode', () => {
    it('should return the text from a string node', () => {
        expect(getTextFromReactNode('Hello')).toBe('Hello');
    });

    it('should return the string representation of a number node', () => {
        expect(getTextFromReactNode(42)).toBe('42');
    });

    it('should return an empty string for null or undefined', () => {
        expect(getTextFromReactNode(null)).toBe('');
        expect(getTextFromReactNode(undefined)).toBe('');
    });

    it('should concatenate text from an array of nodes', () => {
        const nodes = ['Hello', ' ', 'World', 42];
        expect(getTextFromReactNode(nodes)).toBe('Hello World42');
    });

    it('should extract text from a simple React element', () => {
        const element = <div>Hello World</div>;
        expect(getTextFromReactNode(element)).toBe('Hello World');
    });

    it('should extract text from a nested React element', () => {
        const element = (
            <div>
                Hello <span>Beautiful</span> World
            </div>
        );
        expect(getTextFromReactNode(element)).toBe('Hello Beautiful World');
    });

    it('should handle mixed content in React elements', () => {
        const element = (
            <div>
                Hello {5} <span>Beautiful</span> Worlds
            </div>
        );
        expect(getTextFromReactNode(element)).toBe('Hello 5 Beautiful Worlds');
    });

    it('should return an empty string for elements without text content', () => {
        const element = <div />;
        expect(getTextFromReactNode(element)).toBe('');
    });

    it('should ignore non-text props', () => {
        const element = <div title='Ignored'>Visible</div>;
        expect(getTextFromReactNode(element)).toBe('Visible');
    });

    it('should handle deeply nested structures', () => {
        const element = (
            <div>
                <h1>Title</h1>
                <p>
                    Paragraph with <strong>bold</strong> and <em>italic</em>{' '}
                    text.
                </p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
            </div>
        );
        expect(getTextFromReactNode(element)).toBe(
            'TitleParagraph with bold and italic text.Item 1Item 2'
        );
    });
});
