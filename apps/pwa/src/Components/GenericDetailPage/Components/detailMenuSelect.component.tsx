import { Navigation, ObjectDto, useFetchParams } from '@finnoto/core';
import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalContainer,
    cn,
} from '@finnoto/design-system';
import { ArrowRightSvgIcon } from 'assets';
import { Layers } from 'lucide-react';
import { Fragment, useCallback } from 'react';

type menuItemType = {
    title: string;
    key: string;
    action?: () => void;
    isCancel?: boolean;
};
interface DetailMenuSelectInterface {
    menus: menuItemType[];
    filterKey?: string;
}

const DetailMenus = ({
    menus = [],
    filterKey = 'tab',
}: DetailMenuSelectInterface) => {
    const { [filterKey]: filter = menus[0]?.key } = useFetchParams();
    const renderDetailMenuItem = useCallback(
        (menu: ObjectDto) => {
            return (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        Navigation.search({
                            [filterKey]: menu?.key,
                        });
                        Modal.close();
                        // menu?.action();
                    }}
                    className={cn(
                        'justify-between gap-4 px-4 py-3  hover:bg-base-300/50  row-flex bg-base-100'
                    )}
                >
                    <div className=''>{menu?.title}</div>
                    <Icon source={ArrowRightSvgIcon} isSvg />
                </div>
            );
        },
        [filterKey]
    );
    return (
        <ModalContainer title='Menus'>
            <ModalBody className='gap-2 p-0 pt-2 modal-background col-flex'>
                {menus.map((menu) => {
                    return (
                        <Fragment key={menu?.key}>
                            {renderDetailMenuItem(menu)}
                        </Fragment>
                    );
                })}
            </ModalBody>
        </ModalContainer>
    );
};

const openSelectDetailMenu = (menus: any, filterKey) => {
    return Modal.open({
        component: DetailMenus,
        props: {
            menus,
            filterKey,
        },
    });
};
export const DetailMenuSelect = ({ menus, icon, filterKey }: any) => {
    return (
        <div onClick={() => openSelectDetailMenu(menus, filterKey)}>
            {icon || (
                <Button appearance='plain' shape='square'>
                    <Layers className='text-base-primary' size={24} />
                </Button>
            )}
        </div>
    );
};

export default DetailMenuSelect;
