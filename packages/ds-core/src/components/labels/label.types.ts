import { ReactNode } from 'react';

export interface InputErrorMessageInterface {
    error?: string | string[];
    warning?: string;
    className?: string;
}
export interface LabelInterface
    extends Omit<InputErrorMessageInterface, 'warning'> {
    label?: string | ReactNode;
    name?: string;
    className?: string;
    required?: boolean;
    verified?: boolean;
    rightComponent?: ReactNode;
    value?: string;
    id?: string;
}

export interface InputMessageInterface
    extends Omit<InputErrorMessageInterface, 'warning'> {
    message?: React.ReactNode;
    messageComponent?: React.ReactNode;
}
