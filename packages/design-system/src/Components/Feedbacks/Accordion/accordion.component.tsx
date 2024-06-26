/**
 * @author Sirjan Tamang
 */
import { useMemo } from 'react';

import { EmptyFunction, ObjectDto } from '@finnoto/core';

import {
    AccordionContent,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger,
} from './accordion.core';
import { AccordionInterface } from './accordion.types';

export const Accordion = ({
    accordions = [],
    type = 'single',
    collapsible = true,
    disabled,
    onChange = EmptyFunction,
    defaultValue,
    initFirstOpen,
}: AccordionInterface) => {
    const singleType: ObjectDto = useMemo(() => {
        if (type === 'single') {
            let params: ObjectDto = {};
            if (defaultValue) {
                params.defaultValue = defaultValue;
            }
            if (!defaultValue && initFirstOpen) {
                params.defaultValue = 'value-1';
            }
            return params;
        }
        return {};
    }, [defaultValue, initFirstOpen, type]);
    if (!accordions?.length) return <></>;
    return (
        <AccordionRoot
            {...{
                type,
                collapsible,
                disabled,
                onValueChange: (value) => onChange(value),
                ...singleType,
            }}
        >
            {accordions.map((el, index) => {
                return (
                    <AccordionItem
                        key={`accordion-${el?.title}`}
                        value={`value-${index + 1}`}
                        className={el?.className}
                    >
                        <AccordionTrigger className={el?.triggerClassName}>
                            {el?.title}
                        </AccordionTrigger>
                        <AccordionContent>{el?.content}</AccordionContent>
                    </AccordionItem>
                );
            })}
        </AccordionRoot>
    );
};
