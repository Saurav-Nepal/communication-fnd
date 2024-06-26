import { ActionModal } from '@Components/HomeWrapper/homeWrapper.component';
import { ConfirmUtil, Icon, IconButton, Modal } from '@finnoto/design-system';
import {
    DeleteSvgIcon,
    EditSvgIcon,
    MoreIcon,
    NotesSvgIcon,
    RobotSvgIcon,
} from 'assets';
import { useMemo } from 'react';

interface InvoiceCommentCardProps {
    name: string;
    time: any;
    onClickToDelete: (__: any) => void;
    onClickToEdit: (__: any) => void;
    isLatest?: boolean;
    desc: string;
    appearance?: string;
    created_by?: string;
    data?: any;
    user?: any;
    showConfirm?: boolean;
}

const InvoiceCommentCard = ({
    name,
    created_by,
    time,
    isLatest = false,
    desc,
    appearance = 'secondary',
    data,
    onClickToDelete = () => {},
    onClickToEdit = () => {},
    user,
    showConfirm = true,
}: InvoiceCommentCardProps) => {
    const isSystemGen = appearance === 'systemGen';

    const rowActions = [
        {
            name: 'Edit',
            action: () => {
                onClickToEdit(data);
            },
            icon: EditSvgIcon,
        },
        {
            name: 'Delete',
            isCancel: true,
            action: () => {
                if (!showConfirm) return onClickToDelete(data?.id);
                ConfirmUtil({
                    title: 'Do you want to delete?',
                    message:
                        'The action you are about to perform is irreversible.',
                    iconAppearance: 'error',
                    icon: DeleteSvgIcon,
                    onConfirmPress: () => {
                        onClickToDelete(data?.id);
                    },
                    confirmAppearance: 'error',
                });
            },
            icon: DeleteSvgIcon,
            className: 'text-error',
        },
    ];

    const isRowActionShow = useMemo(() => {
        if (data?.is_system_generated) return false;
        if (data?.created_by === user?.id) return true;
        return !data?.attributes?.no_edit;
    }, [
        data?.attributes?.no_edit,
        data?.created_by,
        data?.is_system_generated,
        user,
    ]);

    const openActionComponent = () => {
        Modal.open({
            component: ActionModal,
            props: {
                actions: rowActions,
            },
        });
    };

    return (
        <div className='flex gap-2 p-3 transition-all rounded bg-base-100 hover:shadow onHover-show note-card'>
            <div className='flex justify-center p-1 rounded h-fit bg-primary/20 text-primary'>
                <Icon
                    source={isSystemGen ? RobotSvgIcon : NotesSvgIcon}
                    isSvg
                    size={24}
                />
            </div>

            <div className='flex-1 col-flex'>
                <div className='flex items-center gap-2 text-sm font-medium break-all'>
                    {desc}{' '}
                </div>
                <div className='flex items-center gap-2 text-xs '>
                    {created_by && (
                        <>
                            <p>{created_by}</p>{' '}
                            <span className='block w-1 h-1 bg-black rounded-full'></span>
                        </>
                    )}

                    <p>{time} </p>
                </div>
            </div>
            {!isRowActionShow ||
                (!isSystemGen && (
                    <IconButton
                        outline
                        icon={MoreIcon}
                        size='xs'
                        onClick={openActionComponent}
                    />
                ))}
        </div>
    );
};

export default InvoiceCommentCard;
