import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { IsFunction, Navigation, useFetchParams } from '@finnoto/core';
import { Icon, Modal, PageTitle } from '@finnoto/design-system';

import { ActionModal } from '@Components/HomeWrapper/homeWrapper.component';

import { MoreIcon } from 'assets';

const AppHeader = ({
    title = '',
    withBack,
    rightActions = [],
    rightComponent,
    onBack,
}: {
    title?: string;
    withBack?: boolean;
    rightActions?: any[];
    rightComponent?: ReactNode;
    onBack?: () => void;
}) => {
    const openActionModal = () => {
        Modal.open({
            component: ActionModal,
            closable: true,
            props: {
                actions: rightActions,
            },
        });
    };

    const router = useRouter();

    const handleOnClick = () => {
        if (typeof onBack === 'function') {
            return onBack();
        }

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        if (params.has('tab')) {
            params.delete('tab');
            const newUrl = `${url.pathname}?${params.toString()}`;
            router.replace(newUrl, undefined, { shallow: true });
            return;
        }

        router.back();
    };

    return (
        <div className='sticky top-0 z-40 justify-between items-center gap-4 px-4 border-b shadow-xs bg-base-100 row-flex h-[var(--header-height)] app-header'>
            <PageTitle title={title} />
            <div className='items-center gap-4 row-flex'>
                {withBack && (
                    <div
                        className=''
                        onClick={() => {
                            handleOnClick();
                        }}
                    >
                        <ArrowLeft className='w-5 h-5' />
                    </div>
                )}
                <div className='text-base font-medium'>{title}</div>
            </div>

            {rightActions?.length > 0 && (
                <div
                    onClick={openActionModal}
                    className='border rounded cursor-pointer border-primary'
                >
                    <Icon source={MoreIcon} isSvg />
                </div>
            )}
            {rightComponent ?? null}
        </div>
    );
};

export default AppHeader;
