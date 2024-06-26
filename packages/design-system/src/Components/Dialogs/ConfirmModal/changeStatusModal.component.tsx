import { TickMarkSvgIcon } from 'assets';
import { ConfirmUtil, Modal } from '../../../Utils';

export const ChangeStatusModal = ({
    onConfirmPress,
    onCanclePress = () => {},
    item,
}: {
    onConfirmPress: any;
    onCanclePress?: () => void;
    item: any;
}) => {
    return ConfirmUtil({
        title: `Do you want to ${item?.active ? 'Inactive' : 'Activate'}?`,
        message: (
            <p>
                You are about to change the status from{' '}
                {item?.active ? (
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
            Modal.close();
            onCanclePress();
        },
        onConfirmPress: onConfirmPress,
        icon: !item?.active ? TickMarkSvgIcon : 'close',
        isReverseAction: !item?.active,
        confirmAppearance: !item?.active ? 'success' : 'error',
        iconAppearance: !item?.active ? 'success' : 'error',
    });
};
