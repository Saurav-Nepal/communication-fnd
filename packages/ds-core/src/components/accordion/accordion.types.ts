export interface SingleAccordionProps {
    type: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
}

export interface MultipleAccordionProps {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}

export interface AccordionProps
    extends Omit<
        React.HTMLAttributes<HTMLDivElement>,
        'defaultValue' | 'dir' | 'value'
    > {
    showArrowIcon?: boolean;
    items: AccordionItemProps[];
    variant?: 'separated' | 'connected';
    isRounded?: boolean;
    triggerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
    isUnstyled?: boolean;
    arrowSize?: number;
    arrowClassName?: string;
}

export interface AccordionItemProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    key: string;
}
