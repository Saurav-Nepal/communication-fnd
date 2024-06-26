/**
 * Represents the props for the PageTitle component.
 * @interface PageTitleProps
 */
export interface PageTitleProps {
    /**
     * Indicates whether the page title is in a loading state.
     * @type {boolean}
     * @default undefined
     */
    loading?: boolean;

    /**
     * The title to be added to the page title.
     * @type {string}
     */
    title: string;

    /**
     * The prefix to be added to the page title.
     * @type {string}
     * @default undefined
     */
    prefix?: string;
}
