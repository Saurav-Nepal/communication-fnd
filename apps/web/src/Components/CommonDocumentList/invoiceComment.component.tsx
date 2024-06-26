import { useMemo } from 'react';

import {
    DropdownMenu,
    Icon,
    IconButton,
} from '@finnoto/design-system/src/Components';

import { MoreIcon, NotesSvgIcon, RobotSvgIcon } from 'assets';

interface InvoiceCommentCardProps {
    name: string;
    time: any;
    onClickToDelete?: (__: any) => void;
    onClickToEdit?: (__: any) => void;
    isLatest?: boolean;
    desc: string;
    appearance?: string;
    created_by?: string;
    data?: any;
    user?: any;
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
}: InvoiceCommentCardProps) => {
    // const appearanceBG = {
    //     systemGen: 'bg-base-200',
    //     secondary: 'bg-base-200',
    // };

    const isSystemGen = appearance === 'systemGen';

    const rowActions = [
        {
            name: 'Edit',

            action: () => onClickToEdit(data),
            // icon: EditSvgIcon,
        },
        {
            name: 'Delete',
            isCancel: true,
            action: () => onClickToDelete(data?.id),
            // icon: DeleteSvgIcon,
        },
    ];

    const isRowActionShow = useMemo(() => {
        if (data?.is_system_generated || data?.attributes?.no_edit)
            return false;
        return [user?.id].includes(data?.created_by);
    }, [
        data?.attributes?.no_edit,
        data?.created_by,
        data?.is_system_generated,
        user,
    ]);

    return (
        <div className='flex gap-4 px-4 py-3 transition-all rounded bg-base-200 hover:shadow onHover-show group/comment border border-base-300'>
            <div>
                <div className='flex items-center justify-center p-1 rounded bg-primary/20 text-primary'>
                    <Icon
                        source={isSystemGen ? RobotSvgIcon : NotesSvgIcon}
                        isSvg
                        size={16}
                    />
                </div>
            </div>
            <div className='flex-1 gap-1 col-flex'>
                <div className='flex items-center gap-2 text-sm '>{desc}</div>
                <div className='flex items-center gap-3 text-xs text-base-secondary'>
                    {created_by && (
                        <>
                            <p>{created_by}</p>{' '}
                            <span className='block w-1 h-1 rounded-full bg-base-300'></span>
                        </>
                    )}

                    <p>Added At : {time} </p>
                </div>
            </div>
            {isRowActionShow && (
                <div className='invisible group-hover/comment:visible'>
                    <div className='flex items-center gap-1'>
                        <DropdownMenu
                            hideOnNoAction
                            actions={rowActions as any}
                        >
                            <IconButton
                                icon={MoreIcon}
                                noHover
                                size='xs'
                                iconClass='rotate-90'
                                appearance='primary_light'
                            />
                        </DropdownMenu>
                        {/* {rowActions?.map((val, index) => {
                            return (
                                <IconButton
                                    icon={val?.icon}
                                    key={index}
                                    size='xs'
                                    appearance='ghost'
                                    className={val?.className}
                                    shape='square'
                                    onClick={val?.action}
                                    name={val?.name}
                                />
                            );
                        })} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceCommentCard;
