export interface CSSProperties extends React.CSSProperties {
    [key: string]: any;
}

export type CSSVariable = `--${string}`;
export type CSSVariables<TVariable extends string = CSSVariable> = Partial<
    Record<TVariable, string>
>;
