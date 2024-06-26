'use client';

import StepWizard from 'react-step-wizard';

import { EmptyFunction, IsFunction } from '@finnoto/core';

import { cn } from '../../Utils/common.ui.utils';
import { WizardFooter } from './Components';
import { WizardHeader } from './Components/wizardHeader.component';
import { useWizard } from './Hooks/useWizard.hook';
import { WizardInterface } from './wizard.types';

export const Wizard = ({
    steps = [],
    onSubmit,
    onComplete = EmptyFunction,
    offset = 1,
    hideNavigation,
    className,
    footerClassName,
    footerActionClassName,
    headerClassName,
    renderCustomHeader,
    renderCustomFooter,
    stepWizardClassName,
}: WizardInterface) => {
    const {
        activeWizardKey,
        onPreviousStep,
        onSkip,
        onNextStep,
        handleStepChange,
        assignStepWizard,
        activeWizardStep,
        wizardFilterStep,
        activeStep,
        renderContent,
        handleJumpStep,
        noOfCompleteSteps,
    } = useWizard({
        steps,
        onSubmit,
        onComplete,
        offset,
    });

    const renderHeader = () => {
        if (hideNavigation) return <></>;
        if (IsFunction(renderCustomHeader))
            return renderCustomHeader({
                activeStep,
                noOfCompleteSteps,
                offset,
                wizardSteps: wizardFilterStep,
                handleJumpStep,
                className: headerClassName,
            });
        return (
            <WizardHeader
                {...{
                    activeStep,
                    noOfCompleteSteps,
                    offset,
                    wizardSteps: wizardFilterStep,
                    handleJumpStep,
                    className: headerClassName,
                }}
            />
        );
    };
    const renderFooter = () => {
        if (hideNavigation) return null;
        if (IsFunction(renderCustomFooter))
            return renderCustomFooter({
                activeStep,
                noOfCompleteSteps,
                offset,
                wizardSteps: wizardFilterStep,
                handleJumpStep,
                className: headerClassName,
            });
        return null;
    };

    return (
        <WizardContainer className={className}>
            <StepWizard
                className={cn('h-full overflow-hidden', stepWizardClassName)}
                instance={assignStepWizard}
                onStepChange={handleStepChange}
                nav={renderHeader() as any}
            >
                {wizardFilterStep.map((step) => {
                    return renderContent(step);
                })}
            </StepWizard>
            <WizardFooter
                {...{
                    onNext: onNextStep,
                    onPrevious: onPreviousStep,
                    hasSkip: activeWizardStep?.hasSkip,
                    activeWizardStep,
                    onSkip,
                    isPreviousHide: activeStep <= offset,
                    className: footerClassName,
                    activeWizardKey,
                    footerLeftComponent: activeWizardStep?.footerLeftComponent,
                    actionClassName: footerActionClassName,
                    footerTopComponent: renderFooter(),
                }}
            />
        </WizardContainer>
    );
};

const WizardContainer = ({ children, className = '' }: any) => {
    return (
        <div
            className={`relative h-full col-flex bg-base-100 overflow-hidden   ${className}`}
        >
            {children}
        </div>
    );
};
