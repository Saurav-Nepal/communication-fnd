import { useCallback, useMemo, useState } from 'react';

import {
    FetchData,
    IsValidString,
    Navigation,
    toastBackendError,
    useCustomQueryList,
    useUserHook,
} from '@finnoto/core';
import { ListingPreferenceController } from '@finnoto/core/src/backend/ap/business/controllers/listing.preference.controller';
import {
    ConfirmUtil,
    Icon,
    InputField,
    Modal,
    ModalContainer,
    Tab,
    TAB_ITEM,
    Toast,
} from '@finnoto/design-system';

import SavedFilterItem from './savedFilterItem.component';

import { DeleteSvgIcon } from 'assets';

const filterTabs: TAB_ITEM[] = [
    {
        title: `All`,
        key: 'all',
    },
    {
        title: 'Global',
        key: 'global',
    },
    {
        title: 'Personal',
        key: 'personal',
    },
];

const SavedFilters = ({ definitionKey, refetchPreferences }: any) => {
    const [mode, setMode] = useState<'all' | 'global' | 'personal'>('all');
    const { user } = useUserHook();
    const [search, setSearch] = useState<string>('');
    const method = useMemo(() => {
        return 'getAll';
        // switch (mode) {
        //     case 'all':
        //         return 'getAll';
        //     case 'global':
        //         return 'getGlobal';
        //     case 'personal':
        //         return 'getPersonal';
        // }
    }, []);

    const { data, refetch } = useCustomQueryList({
        type: 'listing_preference',
        method,
        methodParams: definitionKey,
    });

    const makeItSome = useCallback(
        async (data: any) => {
            const { response, success } = await FetchData({
                className: ListingPreferenceController,
                method: data?.method,
                methodParams: {
                    slug: definitionKey,
                    id: data?.id,
                },
            });
            if (!success) {
                toastBackendError(response);
                return;
            }
            refetch();
            refetchPreferences();
            switch (data?.method) {
                case 'makeGlobal':
                    Toast.success({
                        description: 'Successfully made global',
                    });
                    return;
                case 'makePersonal':
                    Toast.success({
                        description: 'Successfully made personal',
                    });
                    return;
                case 'makeFavorite':
                    Toast.success({
                        description: 'Successfully made favorite',
                    });
                    return;
                case 'removeFavorite':
                    Toast.success({
                        description: 'Successfully removed from favorite',
                    });
                    return;
                default:
                    Toast.success({
                        description: 'Successfully saved',
                    });
            }
        },
        [definitionKey, refetch, refetchPreferences]
    );
    const onRemove = useCallback(
        async (id: number) => {
            const { response, success } = await FetchData({
                className: ListingPreferenceController,
                method: 'remove',
                methodParams: {
                    identifier: definitionKey,
                    id: id,
                },
            });
            if (!success) {
                toastBackendError(response);
                return;
            }
            Toast.success({
                description: 'Successfully removed',
            });
            refetch();
            refetchPreferences();
        },
        [definitionKey, refetch, refetchPreferences]
    );
    const modeFilters = useMemo(() => {
        switch (mode) {
            case 'all':
                return data;
            case 'global':
                return data?.filter((item) => !item?.user_id);
            case 'personal':
                return data?.filter((item) => !!item?.user_id);
            default:
                return data;
        }
    }, [data, mode]);
    const filterFilters = useMemo(() => {
        if (!IsValidString(search))
            return modeFilters.filter(
                (item) => item?.identifier?.toLowerCase() !== 'default'
            );
        return modeFilters?.filter((item) => {
            const identifier = item?.identifier?.toLowerCase();

            return (
                identifier?.includes(search?.toLocaleLowerCase()) &&
                identifier !== 'default'
            );
        });
    }, [modeFilters, search]);

    const onApplyFilters = useCallback((data: any) => {
        const { filter_query, ...rest } = data?.query_definition || {};

        Navigation.search({
            saved_filter: data?.id,
            filter: JSON.stringify(rest),
            filter_query,
        });
        Modal.close();
    }, []);

    return (
        <ModalContainer title={'Saved Filters'}>
            <div className='flex'>
                <div className='flex flex-1 gap-4'>
                    <div className='w-full overflow-y-auto rounded shadow bg-base-100'>
                        <div className='bg-base-100 col-flex '>
                            <div className='flex px-4 pt-4'>
                                <div className='mb-4'>
                                    <InputField
                                        placeholder='Search Filter Name'
                                        type='search'
                                        size='sm'
                                        addonStart={
                                            <Icon source={'search'} size={20} />
                                        }
                                        onChange={setSearch}
                                    />
                                </div>
                            </div>
                            <Tab
                                tabs={filterTabs}
                                querykey=''
                                active={mode}
                                contentContainerClass=' rounded-t'
                                containerClassName='rounded-t shadow flex-1 '
                                onTabChange={(value) => setMode(value)}
                            />
                        </div>
                        <div className='flex flex-col flex-1  h-[300px] p-4 overflow-y-auto bg-[#f7f8fa] '>
                            {filterFilters?.map((item: any) => (
                                <SavedFilterItem
                                    makeItSome={makeItSome}
                                    key={item.id}
                                    data={item}
                                    onApply={() => onApplyFilters(item)}
                                    onRemove={() => {
                                        ConfirmUtil({
                                            message:
                                                'Are you sure you want to delete the saved filter?',
                                            iconAppearance: 'error',
                                            icon: DeleteSvgIcon,
                                            onConfirmPress: () => {
                                                onRemove(item?.id);
                                            },
                                            confirmAppearance: 'error',
                                        });
                                    }}
                                    isDeletable={item?.created_by === user?.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer>
    );
};

export default SavedFilters;
