import * as React from 'react';

import { HorizontalStep } from './horizontal';
import { useStepper } from './stepper';
import { StepProps } from './types';
import { VerticalStep } from './verticle';

// Props which shouldn't be passed to to the Step component from the user
interface StepInternalConfig {
    index: number;
    isCompletedStep?: boolean;
    isCurrentStep?: boolean;
    isLastStep?: boolean;
}

interface FullStepProps extends StepProps, StepInternalConfig {}

const Step = React.forwardRef<HTMLLIElement, StepProps>(
    (props, ref: React.Ref<any>) => {
        const {
            children,
            description,
            icon,
            state,
            checkIcon,
            errorIcon,
            index,
            isCompletedStep,
            isCurrentStep,
            isLastStep,
            isKeepError,
            label,
            onClickStep,
        } = props as FullStepProps;

        const { isVertical, isError, isLoading, isClickable } = useStepper();

        const hasVisited = isCurrentStep || isCompletedStep;

        const sharedProps = {
            isLastStep,
            isCompletedStep,
            isCurrentStep,
            index,
            isError,
            isLoading,
            isClickable,
            label,
            description,
            hasVisited,
            icon,
            isKeepError,
            checkIcon,
            state,
            errorIcon,
            onClickStep,
        };

        const renderStep = () => {
            if (isVertical) {
                return (
                    <VerticalStep ref={ref} {...sharedProps}>
                        {children}
                    </VerticalStep>
                );
            }
            return <HorizontalStep ref={ref} {...sharedProps} />;
        };

        return renderStep();
    }
);

export { Step };
