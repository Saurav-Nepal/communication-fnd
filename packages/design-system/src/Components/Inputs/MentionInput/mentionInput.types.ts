import React from 'react';

export interface MentionValueType {
    text?: string;
    context?: MentionValueContext[];
}

export interface MentionValueContext {
    id: number;
    display: string;
    source_type?: string;
}

export interface MentionInputProps
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'children' | 'onChange' | 'defaultValue'
    > {
    value?: MentionValueType;
    defaultValue?: MentionValueType;
    onChange?: (value: MentionValueType) => void;
    disabled?: boolean;
}
