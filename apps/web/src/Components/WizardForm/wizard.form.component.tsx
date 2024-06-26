import {
    IsEmptyArray,
    IsEmptyObject,
    IsFunction,
    IsUndefined,
    ObjectDto,
} from '@finnoto/core';
import { ReactNode, useCallback, useMemo, useState } from 'react';

interface WizardFormProps {
    steps: WizardStep[];
    header?: ReactNode | ((props: HeaderProps) => ReactNode);
    context?: ObjectDto;
    defaultActive?: number;
    onChange?: (_: any) => void;
    onClose?: (_: any) => void;
    onSubmit?: (_: any, data?: ObjectDto) => void;
}

export interface WizardPageProps {
    context: ObjectDto;
    hasDefaultStep?: boolean;
    onNext: (_?: any) => void;
    onSkipNext: (_?: any, __?: number) => void;
    onClose: (_?: any) => void;
    onSubmit: (_?: () => void, data?: ObjectDto) => void;
    [x: string]: any;
}

export interface WizardStep {
    title: string;
    component: (_: WizardPageProps) => JSX.Element;
    props?: {
        [x: string]: any;
    };
}

interface HeaderProps {
    activeStep: number;
}

const WizardForm = ({
    context = {},
    header,
    steps,
    defaultActive,
    onChange,
    onClose = () => {},
    onSubmit = () => {},
}: WizardFormProps) => {
    const [currentStep, setCurrentStep] = useState<number>(defaultActive || 0);

    const handleNextStep = useCallback(
        (data: ObjectDto) => {
            if (!IsEmptyObject(data) && onChange && IsFunction(onChange))
                onChange(data);
            if (currentStep < steps.length - 1)
                return setCurrentStep((prevStep) => prevStep + 1);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentStep, onChange, steps.length]
    );

    const handleSkipNextStep = useCallback(
        (data: ObjectDto, skip: number = 1) => {
            if (onChange && IsFunction(onChange)) onChange(data);
            if (currentStep < steps.length - (1 + skip))
                setCurrentStep((prevStep) => prevStep + (1 + skip));
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentStep, setCurrentStep, steps.length]
    );

    const Component = useMemo(
        () => (!IsEmptyArray(steps) ? steps[currentStep]?.component : null),
        [currentStep, steps]
    );

    const componentProps = useMemo(
        () => (!IsEmptyArray(steps) ? steps[currentStep]?.props : null),
        [currentStep, steps]
    );

    const renderHeader = useMemo(() => {
        if (typeof header !== 'function') return header;

        return header({ activeStep: currentStep });
    }, [currentStep, header]);

    if (!Component) return null;

    return (
        <>
            {renderHeader}
            <Component
                hasDefaultStep={!IsUndefined(defaultActive)}
                onNext={handleNextStep}
                onSkipNext={handleSkipNextStep}
                {...{ context, onClose, onSubmit }}
                {...componentProps}
            />
        </>
    );
};

export default WizardForm;
