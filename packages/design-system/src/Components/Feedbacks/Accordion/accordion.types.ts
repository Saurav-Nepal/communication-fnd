import { ReactNode } from 'react';

export interface AccordionItemInterface {
    title: string | ReactNode;
    content: string | ReactNode;
    className?: string;
    triggerClassName?: string;
}
export interface AccordionInterface {
    type?: 'single' | 'multiple'; //The type of accordion. Possible values: "single", "multiple". Default: "single".
    collapsible?: boolean; //Determines whether the accordion items can be collapsed. Default: `true`.
    disabled?: boolean; //Disables the accordion .
    onChange?: (data: string) => void; //A callback function called when the accordion value changes.
    defaultValue?: string; //The default accordion open.
    initFirstOpen?: boolean; //The default value of the accordion when it is first rendered.
    accordions: AccordionItemInterface[]; //An array of accordion items to be rendered.
}
