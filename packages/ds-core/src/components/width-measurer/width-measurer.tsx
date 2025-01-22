import React, { useCallback, useEffect, useRef } from 'react';

import { useEvent, WidthMeasurements } from '@slabs/ds-hooks';
import { cn } from '@slabs/ds-utils';

interface WidthMeasurerProps {
    discloserButton?: React.ReactNode;
    handleMeasurement?: (measurements: WidthMeasurements) => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const WidthMeasurer = ({
    handleMeasurement,
    children,
    className,
    discloserButton,
    disabled,
}: WidthMeasurerProps) => {
    const containerNode = useRef<HTMLDivElement>(null);
    const animationFrame = useRef<number | null>(null);

    const startMeasurement = useCallback(() => {
        if (disabled) return;
        if (animationFrame.current) {
            // eslint-disable-next-line no-undef
            cancelAnimationFrame(animationFrame.current);
        }

        // eslint-disable-next-line no-undef
        animationFrame.current = requestAnimationFrame(() => {
            if (!containerNode.current) {
                return;
            }

            const containerWidth = containerNode.current.offsetWidth - 20 - 28;
            const hiddenItemNodes = containerNode.current.children;
            const hiddenItemNodesArray = Array.from(hiddenItemNodes);

            const hiddenElementWidths = hiddenItemNodesArray.map((node) => {
                const buttonWidth = Math.ceil(
                    node.getBoundingClientRect().width
                );
                return buttonWidth;
            });

            const disclosureWidth = hiddenElementWidths.pop() || 0;

            handleMeasurement?.({
                containerWidth,
                disclosureWidth,
                hiddenElementWidths,
            });
        });
    }, [disabled, handleMeasurement]);

    useEffect(() => {
        startMeasurement();
    }, [startMeasurement]);

    useEvent('resize', startMeasurement);

    if (disabled) return null;

    return (
        <div
            className={cn(
                'width-measurer flex items-center gap-1',
                className,
                'invisible h-0 flex-wrap p-0 m-0 overflow-hidden'
            )}
            ref={containerNode}
        >
            {children}
            {discloserButton}
        </div>
    );
};
