import {
    cn,
    WizardHeaderInterface,
    WizardHeaderStepInterface,
} from '@finnoto/design-system';

const WizardMobileFooterStepNav = ({
    wizardSteps,
    noOfCompleteSteps,
    activeStep,
    handleJumpStep,
}: Pick<
    WizardHeaderInterface,
    'activeStep' | 'wizardSteps' | 'noOfCompleteSteps' | 'handleJumpStep'
>) => {
    return (
        <div className='items-start row-flex '>
            {wizardSteps.map((wizard, index: number) => (
                <WizardHeaderStep
                    key={wizard?.title}
                    {...{
                        activeStep,
                        step: index + 1,
                        handleJumpStep: (step) => handleJumpStep(step),
                        noOfCompleteSteps: noOfCompleteSteps,
                    }}
                />
            ))}
        </div>
    );
};

const WizardHeaderStep = ({
    activeStep,
    step,
    handleJumpStep,
    noOfCompleteSteps,
}: Pick<
    WizardHeaderStepInterface,
    'activeStep' | 'step' | 'handleJumpStep' | 'noOfCompleteSteps'
>) => {
    return (
        <div
            onClick={() => handleJumpStep(step)}
            className={cn('flex-1 h-2 border-r bg-base-300 border-base-100', {
                'bg-success': noOfCompleteSteps - 1 >= step,
                'bg-primary': step === activeStep,
            })}
        ></div>
    );
};
export default WizardMobileFooterStepNav;
