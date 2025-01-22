'use client';

import { useEffect } from 'react';

import { REFRESH_TOAST } from '@/constants/state.constants';
import { useMenuDetail } from '@/hooks/useMenuDetail.hook';
import { GetScene } from '@/utils/scene.utils';
import { StoreEvent } from '@/utils/stateManager.utils';

interface MenuTemplateProps {
    menuId: number;
    componentName: string;
}

const MenuTemplate = ({
    menuId,
    componentName,
    ...props
}: MenuTemplateProps) => {
    const { menuDetail = {} } = useMenuDetail(menuId);
    const Component = GetScene(componentName);

    useEffect(() => {
        StoreEvent({ eventName: REFRESH_TOAST });
    }, []);

    return (
        <div className='menu-template'>
            {Component ? (
                <Component
                    {...props}
                    menuId={menuId}
                    menuDetail={menuDetail}
                    mode='boxed'
                />
            ) : null}
        </div>
    );
};

export default MenuTemplate;
