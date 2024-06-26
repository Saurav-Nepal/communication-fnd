import {
    IsFunction,
    Navigation,
    ObjectDto,
    toastBackendError,
    useApp,
} from '@finnoto/core';
import { Toast } from '@finnoto/core/src/Utils/toast.utils';

import { Button, handleInlineModalToggle } from '../../../../../../Components';
import { ButtonProps } from '../../../../../../Components/Inputs/Button/button.types';
import { DropdownMenu } from '../../../../../../Components/Inputs/DropdownMenu/dropdownMenu.component';
import { Modal } from '../../../../../../Utils';
import { useSaveFilter } from '../../../hooks';
import { SaveFilterForm } from '../../SaveFilterForm/saveFilterForm.component';
import {
    useListFormFilterContext,
    withListFormFilterProviderExport,
} from '../provider/list.form.filter.provider';

//fixed query filter save issue
export const SaveFilterButton = withListFormFilterProviderExport(
    ({
        applyButtonProps,
        buttonProps,
        definitionKey,
        getFilterValues,
        buttonType = 'button',
        buttonText = 'Save',
        onSave,
        onApply,
    }: {
        definitionKey: string;
        getFilterValues?: any;
        applyButtonProps?: ButtonProps;
        buttonProps?: ButtonProps;
        buttonText?: string;
        buttonType?: 'button' | 'text';
        onSave?: () => void;
        onApply?: () => void;
    }) => {
        const {
            getValues,
            filterQuery,
            queryString,
            listFilters,
            handleNavigationSearch,
        } = useListFormFilterContext();

        const { saved_filter } = queryString || {};

        const {
            currentFilter,
            refetch,
            saveFilter,
            isAppliedFilterDifference,
            isShowSaveFilter,
        } = useSaveFilter({ saved_filter, definitionKey });
        const getValueFn = getFilterValues ?? getValues;

        const saveFilterActions = [
            {
                name: 'Update current filter',
                action: async () => {
                    if (!currentFilter) return;
                    const filterData = getValueFn();
                    const { success } = await saveFilter({
                        identifier: currentFilter?.identifier,
                        filterValues: {
                            ...filterData,
                            filter_query: filterQuery,
                        },
                        id: currentFilter?.id,
                        is_global: !currentFilter?.user_id,
                    });

                    if (!success) return;
                    await refetch();
                    onSave?.();
                    handleInlineModalToggle('filter');
                    Toast.success({
                        description: 'Successfully filter updated!!',
                    });
                },
            },
            {
                name: 'Save as copy',
                action: () => {
                    openSaveFilter({
                        filterData: getValueFn(),
                        listFilters,
                        saveFilter,
                        filter_query: filterQuery,
                        callback: async (response: ObjectDto) => {
                            await refetch();
                            onSave?.();
                        },
                    });
                },
            },
        ];

        return (
            <>
                {isShowSaveFilter && (
                    <>
                        <Button
                            onClick={() => {
                                openSaveFilter({
                                    filterData: getValueFn(),
                                    listFilters,
                                    saveFilter,
                                    filter_query: filterQuery,
                                    handleNavigationSearch,
                                    callback: async (response: ObjectDto) => {
                                        await refetch();
                                        onSave?.();
                                    },
                                });
                            }}
                            {...buttonProps}
                        >
                            {buttonText}
                        </Button>
                        {IsFunction(onApply) && (
                            <Button
                                onClick={onApply}
                                size='sm'
                                {...applyButtonProps}
                            >
                                Apply
                            </Button>
                        )}
                    </>
                )}
                {isAppliedFilterDifference?.() && !!currentFilter?.id && (
                    <DropdownMenu actions={saveFilterActions}>
                        {buttonType === 'text' ? (
                            <p className='text-sm cursor-pointer text-primary'>
                                {buttonText}
                            </p>
                        ) : (
                            <Button appearance='primary' {...buttonProps}>
                                {buttonText}
                            </Button>
                        )}
                    </DropdownMenu>
                )}
            </>
        );
    }
);

export const openSaveFilter = ({
    filterData = {},
    listFilters,
    saveFilter,
    filter_query,
    callback,
    data,
    definitionKey,
    handleNavigationSearch,
}: any) => {
    handleInlineModalToggle('filter');
    Modal.open({
        component: SaveFilterForm,
        modalSize: 'sm',
        props: {
            filterData,
            listFilters,
            data,
            filter_query,
            definitionKey,
            onSubmit: async (values, { setError }) => {
                const newData = { ...values };
                if (values?.is_global) {
                    delete newData.user_ids;
                    delete newData.group_ids;
                }
                const { success, response } = await saveFilter({
                    ...newData,
                    identifier: values?.identifier,
                    filterValues: {
                        ...filterData,
                        filter_query,
                    },
                    is_global: values?.is_global,
                });
                if (!success) {
                    if (response?.columns) setError(response?.columns);
                    else toastBackendError(response);
                    return;
                }

                if (!success) return;
                handleNavigationSearch(
                    {
                        saved_filter: response.id,
                        filter: JSON.stringify(filterData),
                        filter_query,
                    },
                    false
                );
                Modal.close();
                handleInlineModalToggle('filter');
                callback?.(response);
            },
        },
    });
};
