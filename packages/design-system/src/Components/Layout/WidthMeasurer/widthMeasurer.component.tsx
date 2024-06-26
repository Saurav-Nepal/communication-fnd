import { useCallback, useEffect, useRef } from 'react';
import { useEvent } from 'react-use';

import { cn } from '../../../Utils/common.ui.utils';
import { WidthMeasurements } from './widthMeasurer.types';

interface WidthMeasurerProps {
    discloserButton?: React.ReactNode;
    handleMeasurement?: (measurements: WidthMeasurements) => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const WidthMeasurer = ({
    handleMeasurement: handleMeasurementProp,
    children,
    className,
    discloserButton,
    disabled,
}: WidthMeasurerProps) => {
    const containerNode = useRef<HTMLDivElement>(null);
    const animationFrame = useRef<number | null>(null);

    const handleMeasurement = useCallback(() => {
        if (disabled) return;
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }

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

            handleMeasurementProp?.({
                containerWidth,
                disclosureWidth,
                hiddenElementWidths,
            });
        });
    }, [disabled, handleMeasurementProp]);

    useEffect(() => {
        handleMeasurement();
    }, [handleMeasurement]);

    useEvent('resize', handleMeasurement);

    if (disabled) return null;
    return (
        <div
            className={cn(
                'tab-measurer flex items-center gap-1',
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
