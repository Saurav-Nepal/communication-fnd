/**
 * Interface representing props for the SlidingPane component.
 *
 */
export interface SlidingPaneProps {
    /**
     * The component to render in the sliding pane.
     * @type {React.FC<any>}
     */
    component?: React.FC<any>;

    /**
     * The size of the sliding pane.
     * @type {'sm' | 'lg' | 'xl' | 'full' | 'content' | 'default'}
     */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'content' | 'default';

    /**
     * Additional props to be passed to the component.
     * @type {object}
     */
    props?: { [key: string]: unknown };

    /**
     * Whether the sliding pane is closable or not.
     * @type {boolean}
     */
    closeable?: boolean;

    /**
     * Whether the sliding pane is visible or not.
     * @type {boolean}
     */
    isVisible?: boolean;

    /**
     * Whether to show the close icon on the sliding pane or not.
     * @type {boolean}
     */
    closeIcon?: boolean;

    /**
     * Whether to show a warning when the user tries to leave the form with unsaved changes or not.
     * @type {boolean}
     */
    shouldWarnFormUpdate?: boolean;

    /**
     * The function to be called when the sliding pane is closed.
     * @type {Function}
     */
    onClose?: Function;

    /**
     * The position of the sliding pane.
     * @type {'right' | 'left' | 'bottom' | 'top'}
     */
    position?: 'right' | 'left' | 'bottom' | 'top';

    /**
     * The position of the sliding pane.
     * @type {'right' | 'left' | 'bottom' | 'top'}
     */
    overlay?: boolean;

    /**
     * Enables autofocus on the sliding pane.
     * @type {boolean}
     */
    autoFocus?: boolean;
}
