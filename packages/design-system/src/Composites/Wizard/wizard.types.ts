import { ReactNode } from 'react';

import { ObjectDto } from '@finnoto/core';

import { ButtonProps } from '../../Components/Inputs/Button/button.types';

/**
 * Represents a step in a wizard.
 */
export interface WizardStepInterface {
    /**
     * The title of the wizard step.
     */
    title: string;

    /**
     * The key associated with the wizard step.
     */
    key: string;

    /**
     * The React component to render for the wizard step.
     */
    component?: React.FC<any>;

    /**
     * Additional props to pass to the wizard step component.
     */
    props?: ObjectDto;

    /**
     * Determines whether the wizard step is visible.
     */
    visible?: boolean;

    /**
     * Indicates whether the wizard step has a "skip" option.
     */
    hasSkip?: boolean;

    // default label name is next
    nextLabel?: string;

    // next Action Appearance
    nextAppearance?: 'success' | 'warning' | 'error' | 'primary';
}
/**
 * Represents a wizard interface.
 */
export interface WizardInterface {
    /**
     * An array of wizard steps.
     */
    steps: WizardStepInterface[];

    /**
     * A callback function triggered when the wizard is submitted.
     * @param response The optional response object.
     */
    onSubmit?: (response?: ObjectDto, key?: string) => void;

    /**
     * A callback function triggered when the wizard is completed.
     */
    onComplete?: () => void;

    /**
     * The offset value for the wizard step.
     */
    offset?: number;

    /**
     * Determines whether to hide the navigation controls in the wizard.
     */
    hideNavigation?: boolean;

    renderCustomHeader?: (data: WizardHeaderInterface) => ReactNode;
    renderCustomFooter?: (data: WizardHeaderInterface) => ReactNode;

    className?: string;
    footerClassName?: string;
    footerActionClassName?: string;
    stepWizardClassName?: string;
    headerClassName?: string;
}

/**
 * Represents the footer interface for a wizard.
 */
export interface WizardFooterInterface {
    /**
     * Callback function triggered when the "Next" button is clicked.
     */
    onNext: () => void;

    /**
     * Determines whether the "Next" button is disabled.
     */
    nextDisable?: boolean;

    /**
     * Determines whether to show a loading state for the "Next" button.
     */
    nextLoading?: boolean;

    /**
     * Callback function triggered when the "Previous" button is clicked.
     */
    onPrevious: () => void;

    /**
     * Determines whether the footer has a "Skip" option.
     */
    hasSkip?: boolean;

    /**
     * Callback function triggered when the "Skip" option is clicked.
     */
    onSkip?: () => void;

    /**
     * Additional CSS class name(s) for the footer.
     */
    className?: string;

    /**
     * Determines whether the "Previous" button is hidden.
     */
    isPreviousHide?: boolean;

    /**
     * The key of the active wizard step.
     */
    activeWizardKey?: string;

    activeWizardStep?: any;
    actionClassName?: string;
    footerLeftComponent?: ReactNode;
    footerTopComponent?: ReactNode;
}
/**
 * Represents an action within the footer of a wizard.
 */
export interface WizardFooterActionInterface {
    /**
     * The label or text for the action.
     */
    label: string;

    /**
     * The callback function triggered when the action is clicked.
     * @param next The next object.
     * @param e The event object.
     */
    action: (next: any, e: Event) => void;

    /**
     * The appearance style of the action button.
     */
    appearance: ButtonProps['appearance'];

    /**
     * Determines whether the action is disabled.
     */
    disabled?: boolean;

    /**
     * Determines whether a loading state is shown for the action.
     */
    loading?: boolean;

    /**
     * Determines whether the action button is outlined.
     */
    outline?: boolean;
    className?: string;
}

/**
 * Represents the header interface for a wizard.
 */
export interface WizardHeaderInterface {
    /**
     * The active step number in the wizard.
     */
    activeStep: number;

    /**
     * Callback function triggered when jumping to a specific step.
     * @param step The step number to jump to.
     */
    handleJumpStep: (step: number) => void;

    /**
     * An array of wizard steps.
     */
    wizardSteps?: WizardStepInterface[];

    /**
     * The offset value for the wizard header.
     */
    offset?: number;

    /**
     * The number of complete steps in the wizard.
     */
    noOfCompleteSteps?: number;

    /**
     * custom class
     */
    className?: string;
}
/**
 * Represents a step within the header interface for a wizard.
 */
export interface WizardHeaderStepInterface
    extends Omit<WizardHeaderInterface, 'wizardSteps'> {
    /**
     * The step number.
     */
    step: number;

    /**
     * The title of the step.
     */
    title: string;

    /**
     * The total number of steps.
     */
    totalSteps: number;
}
