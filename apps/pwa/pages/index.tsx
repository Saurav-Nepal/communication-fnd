import { useApp, useMenu } from '@finnoto/core';

import CommonBottomNavigationComponent from '@Components/CommonBottomNavigation/commonBottomNavigation.component';
import HomeMenu from '@Components/HomeWrapper/homeMenu.component';
import HomeWrapper from '@Components/HomeWrapper/homeWrapper.component';
import { SpotlightSearch } from '@Components/Spotlight/spotlightSearch.component';

const Page = () => {
    const { showBottomNav, basePath } = useApp();
    const { modules } = useMenu();
    return (
        <>
            <HomeWrapper>
                <HomeMenu menus={modules} className='mt-6' />
            </HomeWrapper>
            <CommonBottomNavigationComponent />
            <SpotlightSearch menus={[...modules]} queries={['gstin']} />
        </>
    );
};

export default Page;
