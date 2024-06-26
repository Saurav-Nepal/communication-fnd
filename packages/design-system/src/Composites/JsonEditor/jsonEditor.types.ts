/**
 * Props for the JSON Editor component.
 */
export interface JSONEditorProps {
    /**
     * The initial value of the JSON data.
     */
    value?: object | string;

    /**
     * The default value of the JSON data.
     */
    defaultValue?: object | string;

    /**
     * Callback function invoked when the JSON data changes.
     *
     * @param json The updated JSON object.
     */
    onChange?: (json: object) => void;

    /**
     * The mode of the JSON Editor.
     * Supported modes: 'code', 'tree', 'preview', 'view', 'form', 'text'.
     */
    mode?: 'code' | 'tree' | 'preview' | 'view' | 'form' | 'text';

    /**
     * Specifies whether to show the status bar in the JSON Editor.
     */
    statusBar?: boolean;

    /**
     * Specifies whether to show the main menu bar in the JSON Editor.
     */
    mainMenuBar?: boolean;

    /**
     * Specifies whether to enable debug mode for the JSON Editor.
     */
    debug?: boolean;
}
