import Link from 'next/link';
import { useRouter } from 'next/router';

import { useApp, useCurrentBusiness, useUserHook } from '@finnoto/core';
import {
    Avatar,
    cn,
    Icon,
    Modal,
    ModalBody,
    ModalContainer,
} from '@finnoto/design-system';

import { UserSvgIcon } from 'assets';

const HomeWrapper = ({
    children,
    className,
}: {
    children: any;
    className?: any;
}) => {
    const { pathname } = useRouter();
    const { user } = useUserHook();
    const { basePath } = useApp();
    const { currentBusiness } = useCurrentBusiness();

    return (
        <div className={cn('relative overflow-x-hidden h-full', className)}>
            <Wave />
            <div className='relative justify-between gap-6 p-4 px-2 text-base-1000 row-flex min-h-[120px]'>
                <div className='flex gap-3'>
                    <Link href={`${basePath}/settings/my-profile`}>
                        <Avatar
                            size='sm'
                            shape='circle'
                            source={user?.image_url}
                            alt={user.name}
                        />
                    </Link>
                    <div className='col-flex'>
                        <p className='text-base font-medium text-base-100'>
                            Hi, {user?.name}
                        </p>
                        <p className='w-48 overflow-hidden text-sm whitespace-pre text-base-100 overflow-ellipsis'>
                            {currentBusiness?.name}
                        </p>
                    </div>
                </div>
                {!pathname?.includes('settings') && (
                    <Link
                        data-title='user-settings'
                        href={basePath + '/settings'}
                    >
                        <Icon
                            source={UserSvgIcon}
                            isSvg
                            size={24}
                            className='text-base-100'
                        />
                    </Link>
                )}
            </div>
            {children}
        </div>
    );
};

const Wave = () => {
    return (
        <svg
            viewBox='0 0 390 112'
            fill='none'
            className='absolute text-[#2A2931] left-0 right-0 dark:bg-white'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M390 37.6171C309.985 84.9244 217.086 112 118 112C77.4793 112 37.9933 107.472 0 98.884V0H390V37.6171Z'
                fill='currentColor'
            />
        </svg>
    );
};

export const ActionModal = ({ actions }: any) => {
    return (
        <ModalContainer title='Actions'>
            <ModalBody className='p-3 modal-background'>
                <div className='gap-2 col-flex'>
                    {actions?.map((val) => {
                        if (val?.visible === false) return;
                        return (
                            <div
                                onClick={() => {
                                    if (!val?.keepModalOpen) Modal.close();
                                    val?.action();
                                }}
                                key={val?.key}
                                className={cn(
                                    'flex items-center bg-base-100 gap-3 px-4 py-3 text-base ',
                                    { 'text-error': val?.isCancel },
                                    val?.className
                                )}
                            >
                                {val?.icon && (
                                    <Icon source={val.icon} isSvg size={24} />
                                )}
                                {val?.name}
                            </div>
                        );
                    })}
                </div>
            </ModalBody>
        </ModalContainer>
    );
};
export default HomeWrapper;
