import React from 'react';

import { Navigation, OpenSpotlight, useApp } from '@finnoto/core';
import { BottomNavigation } from '@finnoto/design-system';

import { NavHome, NavHomeActive, NavRaiseExpense } from 'assets';

const CommonBottomNavigationComponent = () => {
    const { basePath } = useApp();
    return (
        <BottomNavigation
            actions={[
                {
                    name: 'Home',
                    url: basePath,
                    icon: NavHome,
                    activeIcon: NavHomeActive,
                },

                {
                    name: 'Raise Expense/Invoice',
                    icon: NavRaiseExpense,
                    activeIcon: NavRaiseExpense,
                    isMain: true,
                    url: basePath + '/expense/c',
                    action: () => {
                        Navigation.navigate({
                            url: `${basePath}/expense/c`,
                            queryParam: {
                                isCamera: true,
                            },
                        });
                    },
                },
                {
                    name: 'Search',
                    icon: 'search',
                    action: OpenSpotlight,
                },
            ]}
        />
    );
};

export default CommonBottomNavigationComponent;
