import { TickMarkSvgIcon } from 'assets';
import { ConfirmUtil } from '../../../../Utils';
import { AccessNestedObject } from '@finnoto/core';

export const ChangeStatusModal = ({
    onConfirmPress,
    onCancelPress = () => {},
    item,
    column = {},
}: {
    onConfirmPress: any;
    onCancelPress?: () => void;
    item: any;
    column?: any;
}) => {
    const isActive: boolean = AccessNestedObject(item, column?.key || 'active');
    return ConfirmUtil({
        title: `Do you want to ${isActive ? 'Inactive' : 'Activate'}?`,
        message: (
            <p>
                You are about to change the status from{' '}
                {isActive ? (
                    <span>
                        <span className='font-medium text-base-primary'>
                            Active
                        </span>{' '}
                        to{' '}
                        <span className='font-medium text-base-primary'>
                            Inactive.{' '}
                        </span>
                    </span>
                ) : (
                    <span>
                        <span className='font-medium text-base-primary'>
                            Inactive
                        </span>{' '}
                        to{' '}
                        <span className='font-medium text-base-primary'>
                            Active.{' '}
                        </span>
                    </span>
                )}
            </p>
        ),
        onCancelPress: () => {
            onCancelPress();
        },
        onConfirmPress: onConfirmPress,
        icon: !isActive ? TickMarkSvgIcon : 'close',
        isReverseAction: !isActive,
        confirmAppearance: !isActive ? 'success' : 'error',
        iconAppearance: !isActive ? 'success' : 'error',
    });
};
