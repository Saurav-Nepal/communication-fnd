import { useMemo } from 'react';

import {
    AccessManager,
    authenticateBusiness,
    groupBusiness,
    Navigation,
    ObjectDto,
    ProductPayload,
    useApp,
    useAppBusinesses,
    useAppProducts,
    useCurrentBusiness,
    useMenu,
    useUserHook,
} from '@finnoto/core';
import { cn, Icon, logout } from '@finnoto/design-system';

import CommonBottomNavigationComponent from '@Components/CommonBottomNavigation/commonBottomNavigation.component';
import HomeWrapper from '@Components/HomeWrapper/homeWrapper.component';
import { SpotlightSearch } from '@Components/Spotlight/spotlightSearch.component';
import {
    openBusinessSelector,
    openChangeOrganizationName,
    openProductSelector,
} from '@Utils/functions.utils';

import {
    AppsSvgIcon,
    LogoutSvgIcon,
    RenameOrgSvgImage,
    RepeatSvgIcon,
    UserSvgIcon,
} from 'assets';

const SettingsPage = () => {
    const { basePath } = useApp();
    const { modules } = useMenu();

    const { currentBusiness } = useCurrentBusiness();
    const { businesses } = useAppBusinesses();
    const { products } = useAppProducts();
    const { user } = useUserHook();

    const isOwner = useMemo(() => {
        return AccessManager.isAuthUser(currentBusiness?.owner_id);
    }, [currentBusiness.owner_id]);

    const navigateToProfile = () => {
        Navigation.navigate({ url: `${basePath}/settings/my-profile` });
    };
    const groupedBusinesses: any = useMemo(() => {
        return groupBusiness(businesses);
    }, [businesses]);

    const actions = [
        {
            name: 'My Profile',
            icon: UserSvgIcon,
            isSvg: true,
            action: navigateToProfile,
        },
        {
            icon: RepeatSvgIcon,
            isSvg: true,
            name: 'Switch Organization',
            visible: groupedBusinesses?.length > 1,
            action: () =>
                openBusinessSelector(
                    businesses,
                    async (business: ObjectDto) => {
                        authenticateBusiness(business);
                    }
                ),
        },
        {
            icon: AppsSvgIcon,
            isSvg: true,
            name: 'Select Product',
            visible: products?.length > 1,
            action: () =>
                openProductSelector(
                    products,
                    async (product: ProductPayload) => {
                        authenticateBusiness(user.business || user.vendor, {
                            product,
                        });
                    }
                ),
        },
        {
            name: 'Rename Organisation',
            icon: RenameOrgSvgImage,
            isSvg: true,
            visible: isOwner,
            action: () =>
                openChangeOrganizationName({
                    data: {
                        name: currentBusiness?.name,
                    },
                }),
        },
        {
            name: 'Logout',
            icon: LogoutSvgIcon,
            isSvg: true,
            action: logout,
            className: 'text-error',
        },
    ];
    return (
        <>
            <HomeWrapper className='with-bottom-nav'>
                <div className='gap-5 p-4 col-flex'>
                    <h3 className='text-base font-medium'>Settings</h3>
                    <div className='gap-1 col-flex'>
                        {actions?.map((val, i) => {
                            if (val?.visible === false) return;
                            return <SettingsCard key={i} {...val} />;
                        })}
                    </div>
                </div>
            </HomeWrapper>
            <CommonBottomNavigationComponent />
            <SpotlightSearch menus={[...modules]} queries={['gstin']} />
        </>
    );
};

const SettingsCard = ({
    name,
    icon,
    className,
    action,
}: {
    name: string;
    icon: any;
    className?: string;
    action?: () => void;
}) => {
    return (
        <div
            onClick={action}
            className={cn(
                'flex items-center gap-2 px-4 py-3 rounded hover:bg-base-300/50 bg-base-100',
                className
            )}
        >
            <Icon source={icon} isSvg size={24} />
            <p className='text-sm font-medium'>{name}</p>
        </div>
    );
};

export default SettingsPage;
