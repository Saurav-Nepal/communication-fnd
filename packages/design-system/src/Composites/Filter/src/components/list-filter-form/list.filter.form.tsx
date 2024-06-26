import { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';

import { IsArray, ObjectDto, useApp } from '@finnoto/core';

import {
    Button,
    Card,
    CardBody,
    CheckBox,
    Icon,
    InlineModal,
    ModalBody,
    ModalContainer,
} from '../../../../../Components';
import { useFilterContext } from '../../provider';
import { ClearFilterButton, FilterListDisplay } from '../filterListDisplay';
import { AdvanceAddableFilterList } from './advance.addable.filter.list';
import { AdvanceFilter } from './components/advance.filter.component';
import {
    useListFormFilterContext,
    withListFormFilterProviderExport,
} from './provider/list.form.filter.provider';
import { SaveFilterButton } from './SaveFilterButton/saveFilterButton.component';

import { CircleConfirmSvgIcon, FilterIcon } from 'assets';

export const generateSlug = (digits: number = 16): number => {
    const min = Math.ceil(Math.pow(10, digits - 1));
    const max = Math.ceil(Math.pow(10, digits) - 1);

    return Math.floor(Math.random() * (max - min)) + min;
};
export const ListFilterForm = ({
    definitionKey,
    children,
    removeFilterKey,
    hideAdvanceFilter,
}: {
    definitionKey?: string;
    children?: React.ReactElement;
    removeFilterKey?: ObjectDto;
    hideAdvanceFilter?: boolean;
}) => {
    const { hasAnyFilter, definitionFilterColumns } = useFilterContext();

    const defaultAdvanceFilter = useMemo(() => {
        if (!definitionFilterColumns?.length) return {};
        return definitionFilterColumns[0];
    }, [definitionFilterColumns]);

    const renderChildren = useCallback(() => {
        if (children) return children;
        return (
            <Button appearance='primary' outline shape='square' size='sm'>
                <div className='relative'>
                    <Icon source={FilterIcon} size={18} isSvg />
                    {hasAnyFilter() && (
                        <span className='filter-applied' /> // this is the small dot when there is filter
                    )}
                </div>
            </Button>
        );
    }, [children, hasAnyFilter]);

    return (
        <InlineModal
            toggleKey='filter'
            component={FilterForm}
            props={{
                definitionKey,
                definitionFilterColumns,
                defaultAdvanceFilter,
                hideAdvanceFilter,
                removeFilterKey,
            }}
            size='lg'
        >
            {renderChildren()}
        </InlineModal>
    );
};

// filter button issue fixed
export const FilterForm = withListFormFilterProviderExport(
    ({
        definitionKey,
        definitionFilterColumns,
        defaultAdvanceFilter,
        hideAdvanceFilter,
        removeFilterKey,
    }) => {
        const {
            onApply,
            onCloseForm,
            isAnyFilterApplied,
            getValues,
            onClear,
            listFilters,
            clearAllFilter,
            setFilterQuery,
            filterQuery,
            innerListFilters,
            handleFilterData,
            sanitizedFilterQuery,
        } = useListFormFilterContext();

        const { isArc } = useApp();

        const removeFilterData = useCallback(
            (key: string | string[]) => {
                if (IsArray(key)) {
                    return handleFilterData(
                        key.reduce((acc, k) => {
                            return {
                                ...acc,
                                [k]: undefined,
                            };
                        }, {})
                    );
                }
                handleFilterData({ [key]: undefined });
            },
            [handleFilterData]
        );

        const [advancedFilter, toggleAdvancedFilter] = useToggle(
            !!hideAdvanceFilter
        );

        return (
            <ModalContainer title='Filters'>
                <ModalBody className='p-0 pb-4 space-y-4 col-flex'>
                    {!!definitionKey && (
                        <AdvanceFilter
                            definitionKey={definitionKey}
                            definitionFilterColumns={definitionFilterColumns}
                            hideGroupRules={!advancedFilter}
                            defaultAdvanceFilter={defaultAdvanceFilter}
                        />
                    )}
                    {advancedFilter && innerListFilters?.length > 0 && (
                        <AdvanceAddableFilterList />
                    )}

                    {isAnyFilterApplied && (
                        <Card
                            className='bg-base-100'
                            titleClassName='border-b-0'
                            title='Filter Query'
                            noBorder
                        >
                            <CardBody>
                                <FilterListDisplay
                                    {...{
                                        listFilters,
                                        clearAllFilter,
                                        setFilterQuery,
                                        filterQuery: sanitizedFilterQuery,
                                        removeFilterData,
                                        removeFilterKey,
                                        data: getValues(),
                                        removeQueryFilter: () =>
                                            setFilterQuery(null),
                                    }}
                                    className='py-3 pr-3 border rounded-sm bg-base-200 border-base-300 '
                                >
                                    {() => (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className='items-center min-w-[150px] flex-1 gap-2  px-4 row-flex'
                                        >
                                            <ClearFilterButton
                                                {...{ clearAllFilter }}
                                                size='xs'
                                            />
                                            <SaveFilterButton
                                                definitionKey={definitionKey}
                                                getFilterValues={getValues}
                                                buttonProps={{
                                                    dashed: true,
                                                    size: 'xs',
                                                }}
                                            />
                                        </div>
                                    )}
                                </FilterListDisplay>
                            </CardBody>
                        </Card>
                    )}
                </ModalBody>

                <div className='items-center justify-between gap-4 p-4 border-t bg-base-100 row-flex'>
                    <div>
                        {!hideAdvanceFilter && (
                            <CheckBox
                                checked={advancedFilter}
                                onChange={toggleAdvancedFilter}
                                rightLabel='Advanced Filter'
                            />
                        )}
                    </div>

                    <div className='items-center gap-4 row-flex'>
                        <Button
                            onClick={onCloseForm}
                            appearance={isArc ? 'polaris-white' : 'errorHover'}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={onApply}
                            className='ml-0'
                            appearance={isArc ? 'polaris-black' : 'success'}
                        >
                            {!isArc && (
                                <Icon
                                    source={CircleConfirmSvgIcon}
                                    size={18}
                                    isSvg
                                />
                            )}
                            Apply
                        </Button>
                    </div>
                </div>
            </ModalContainer>
        );
    }
);
