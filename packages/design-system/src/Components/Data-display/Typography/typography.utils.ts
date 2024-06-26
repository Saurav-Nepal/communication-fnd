import React from 'react';

/**
 * A dynamic tag component that renders a React element based on the provided `tag` prop.
 *
 * @param {string} tag - The HTML tag name to be rendered.
 * @param {ReactNode} children - The content to be rendered within the dynamic tag component.
 * @param {Object} rest - Additional props to be passed to the rendered element.
 * @returns {ReactElement} The rendered React element.
 */
export const DynamicTagComponent = ({ tag, children, ...rest }) => {
    return React.createElement(tag, rest, children);
};

/**
 * Validates if the given string is a valid URL.
 * @param url - The string to be validated.
 * @returns A boolean indicating whether the string is a valid URL.
 */
export function isValidURL(url: string): boolean {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(url);
}
