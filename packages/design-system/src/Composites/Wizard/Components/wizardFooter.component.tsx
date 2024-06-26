'use client';

import { Button } from '../../../Components/Inputs/Button/button.component';
import { cn, IsFunction } from '../../../Utils/common.ui.utils';
import { useWizardFooter } from '../Hooks/useWizardFooter.hook';
import {
    WizardFooterActionInterface,
    WizardFooterInterface,
} from '../wizard.types';

export const WizardFooter = ({
    onNext,
    onPrevious,
    hasSkip,
    className,
    isPreviousHide,
    activeWizardKey,
    activeWizardStep,
    actionClassName,
    footerLeftComponent,
    footerTopComponent,
}: WizardFooterInterface) => {
    const { isSubmitting, disableSubmit, handleNext } = useWizardFooter({
        activeWizardKey,
        onNext,
    });

    return (
        <div
            className={cn(
                'sticky bottom-0 left-0 right-0 z-10 w-full p-4 gap-2 border-t col-flex',
                { 'py-2': !!footerTopComponent },
                className
            )}
        >
            {footerTopComponent}
            <div className={cn('justify-end gap-4 row-flex items-center')}>
                {footerLeftComponent}
                {IsFunction(onPrevious) && !isPreviousHide && (
                    <WizardFooterAction
                        {...{
                            disabled: isSubmitting,
                            label: 'Previous',
                            appearance: 'primary',
                            action: onPrevious,
                            outline: true,
                            className: actionClassName,
                        }}
                    />
                )}
                {hasSkip && (
                    <WizardFooterAction
                        {...{
                            disabled: isSubmitting,
                            label: 'Skip',
                            appearance: 'info',
                            action: onNext,
                            outline: true,
                            className: actionClassName,
                        }}
                    />
                )}

                {IsFunction(onNext) && (
                    <WizardFooterAction
                        {...{
                            disabled: disableSubmit,
                            loading: isSubmitting,
                            label: activeWizardStep?.nextLabel || 'Next',
                            appearance:
                                activeWizardStep?.nextAppearance || 'primary',
                            action: handleNext,
                            className: actionClassName,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const WizardFooterAction = ({
    label,
    action,
    appearance,
    loading,
    disabled,
    outline,
    className,
}: WizardFooterActionInterface) => {
    return (
        <Button
            onClick={action}
            {...{
                appearance,
                loading,
                disabled,
                outline,
                defaultMinWidth: true,
            }}
            className={cn(className)}
        >
            {label}
        </Button>
    );
};
