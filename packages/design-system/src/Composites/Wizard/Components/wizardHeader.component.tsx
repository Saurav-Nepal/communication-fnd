import { Icon, Typography } from '../../../Components';
import { cn } from '../../../Utils/common.ui.utils';
import {
    WizardHeaderInterface,
    WizardHeaderStepInterface,
} from '../wizard.types';

import { VerifiedTickSvgIcon } from 'assets';

export const WizardHeader = ({
    wizardSteps,
    noOfCompleteSteps,
    activeStep,
    offset,
    handleJumpStep,
    className,
}: WizardHeaderInterface) => {
    return (
        <div
            className={cn(
                'sticky top-0 left-0 right-0 z-10 items-center gap-1 px-3 pt-4 bg-base-100 row-flex',
                className
            )}
        >
            {wizardSteps.map((wizard, index: number) => (
                <WizardHeaderStep
                    key={wizard?.title}
                    {...{
                        activeStep,
                        step: index + 1,
                        totalSteps: wizardSteps.length,
                        handleJumpStep: (step) => handleJumpStep(step),
                        title: wizard?.title,
                        noOfCompleteSteps: noOfCompleteSteps,
                        offset,
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
    title,
    totalSteps,
    noOfCompleteSteps,
    offset,
}: WizardHeaderStepInterface) => {
    return (
        <div
            onClick={() => handleJumpStep(step)}
            className={cn('flex justify-center w-full pb-2 border-b-4 ', {
                'cursor-pointer': noOfCompleteSteps > step,
                'border-success text-success cursor-pointer':
                    activeStep >= step,
            })}
        >
            <div className='items-center gap-2 row-flex'>
                {noOfCompleteSteps > step ? (
                    <Icon
                        size={24}
                        isSvg
                        source={VerifiedTickSvgIcon}
                        iconColor={'text-success'}
                    />
                ) : (
                    <div
                        className={cn(
                            'border flex items-center justify-center rounded-full text-sm h-[24px] text-base-primary w-[24px]',
                            {
                                'border-success text-success':
                                    activeStep === step,
                            }
                        )}
                    >
                        {step}
                    </div>
                )}
                <Typography
                    variant='span'
                    className={cn({ 'text-success': activeStep >= step })}
                >
                    {' '}
                    {title}
                </Typography>
            </div>
        </div>
    );
};
