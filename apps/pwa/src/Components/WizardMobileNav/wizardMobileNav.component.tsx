import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import { cn, Icon, WizardHeaderInterface } from '@finnoto/design-system';

import { VerifiedTickSvgIcon } from 'assets';

const WizardMobileNav = ({
    wizardSteps,
    noOfCompleteSteps,
    activeStep,
    offset,
    handleJumpStep,
}: WizardHeaderInterface) => {
    const currentStep = useMemo(() => {
        return wizardSteps[activeStep - 1];
    }, [activeStep, wizardSteps]);

    const isPreviousHide = useMemo(() => {
        return activeStep <= offset;
    }, [activeStep, offset]);

    const isNextHide = useCallback(
        (targetStep) => {
            if (targetStep > noOfCompleteSteps || offset - 1 === targetStep)
                return false;
            return true;
        },
        [noOfCompleteSteps, offset]
    );

    const isCurrentStepCompleted = useMemo(
        () => noOfCompleteSteps - 1 >= activeStep,
        [noOfCompleteSteps, activeStep]
    );
    return (
        <div
            className={cn(
                'sticky top-0 left-0 right-0 bg-base-100 z-10 shadow col-flex'
            )}
        >
            <div className='items-center justify-between w-full gap-1 p-4 row-flex'>
                {!isPreviousHide ? (
                    <ChevronLeft
                        size={24}
                        onClick={() => {
                            handleJumpStep(activeStep - 1);
                        }}
                    />
                ) : (
                    <div></div>
                )}
                <div className='text-center col-flex'>
                    <div
                        className={cn(
                            'text-base font-medium text-base-primary flex gap-1',
                            {
                                'text-success': isCurrentStepCompleted,
                            }
                        )}
                    >
                        {isCurrentStepCompleted && (
                            <Icon
                                source={VerifiedTickSvgIcon}
                                iconColor='text-success'
                                isSvg
                            />
                        )}{' '}
                        {currentStep?.title}
                    </div>
                </div>
                {isNextHide(activeStep + 1) ? (
                    <ChevronRight
                        size={24}
                        onClick={() => {
                            handleJumpStep(activeStep + 1);
                        }}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default WizardMobileNav;
