import React from 'react';

import { Button } from '@slabs/ds-core';

import type { Meta } from '@storybook/react';

import { Stepper } from '.';
import { Step } from './step';
import { useStepper } from './stepper';
import { StepItem } from './types';

import '@storybook/react';

const meta: Meta<typeof Stepper> = {
    title: 'Component/Stepper',
    component: Stepper,
};

export default meta;

const steps = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
] satisfies StepItem[];

export function StepperClickableSteps() {
    return (
        <div className='flex flex-col w-full gap-4'>
            <Stepper
                initialStep={0}
                steps={steps}
                onClickStep={(step, setStep) => {
                    alert(`Step ${step + 1} clicked`);
                    setStep(step);
                }}
            >
                {steps.map((stepProps, index) => {
                    return (
                        <Step key={stepProps.label} {...stepProps}>
                            <div className='flex items-center justify-center h-40 my-2 border rounded-md bg-secondary text-primary'>
                                <h1 className='text-xl'>Step {index + 1}</h1>
                            </div>
                        </Step>
                    );
                })}
                <Footer />
            </Stepper>
        </div>
    );
}

const Footer = () => {
    const {
        nextStep,
        prevStep,
        resetSteps,
        isDisabledStep,
        hasCompletedAllSteps,
        isLastStep,
        isOptionalStep,
    } = useStepper();
    return (
        <>
            {hasCompletedAllSteps && (
                <div className='flex items-center justify-center h-40 my-2 border rounded-md bg-secondary text-primary'>
                    <h1 className='text-xl'>Woohoo! All steps completed! 🎉</h1>
                </div>
            )}
            <div className='flex justify-end w-full gap-2'>
                {hasCompletedAllSteps ? (
                    <Button size='sm' onClick={resetSteps}>
                        Reset
                    </Button>
                ) : (
                    <>
                        <Button
                            disabled={isDisabledStep}
                            onClick={prevStep}
                            size='sm'
                            variant='outline'
                        >
                            Prev
                        </Button>
                        <Button size='sm' onClick={nextStep}>
                            {isLastStep
                                ? 'Finish'
                                : isOptionalStep
                                  ? 'Skip'
                                  : 'Next'}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};
