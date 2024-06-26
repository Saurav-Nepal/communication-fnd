import { type } from 'os';
import { addMonths, endOfDay, endOfYear, startOfYear } from 'date-fns';
import { useMemo } from 'react';
import { useUpdateEffect } from 'react-use';

import {
    API_DATE_TIME_FORMAT,
    APIDateFormat,
    GenericListingType,
    getDateQueryRule,
    getFinancialDate,
    IsEmptyArray,
    IsEmptyObject,
    IsEmptyString,
    ObjectDto,
    PRODUCT_IDENTIFIER,
    RemoveEmptyObjectKeys,
    RESTRICTED_FILTERS,
    useApp,
    useFetchParams,
} from '@finnoto/core';
import {
    DateRangeFilterUtils,
    Modal,
    ModalBody,
    ModalContainer,
    useFilter,
} from '@finnoto/design-system';

import GenericDefinitionListing from '@Components/GenericDocumentListing/genericDefinitionListing.component';
import { GenericDefinitionListingProps } from '@Components/GenericDocumentListing/genericDefinitionListing.types';

export interface DashboardReportModalProps {
    slug?: string;
    defKey: string;
    localSearchKey?: string[];
    reportTitle: string;
    reportFilterTitle?: string;
    queryParams?: { [key: string]: any };
    searchMethod?: string;
    type?: GenericListingType;
    macros?: any;
    hideDisplayFilterKeys?: ObjectDto;
    customRestictedFilters?: string;
    customFilterQueryRules?: any;
    filterAliasKey?: string;
    disableDateNavigation?: boolean;
    removeReportDate?: boolean;
}

const GenericDashboardReportModal = ({
    slug,
    defKey,
    localSearchKey,
    reportTitle,
    reportFilterTitle,
    queryParams,
    type,
    macros,
    searchMethod = 'fetchList',
    customRestictedFilters = '',
    customFilterQueryRules = [],
    filterAliasKey = 'filter',
    disableDateNavigation,
    removeReportDate,
}: DashboardReportModalProps) => {
    const { product_id } = useApp();
    const { start_date: sDate, end_date: eDate, date } = useFetchParams();

    const pathname = window?.location?.pathname;
    const modalType = 'fetch_report';

    const finalSearchKeys: any = useMemo(() => {
        if (IsEmptyArray(localSearchKey)) return { name: 1, identifier: 2 };

        let newSearchObject = new Object();
        localSearchKey.forEach((value, index) => {
            newSearchObject[value] = Number(localSearchKey.length - index);
        });

        return newSearchObject;
    }, [localSearchKey]);

    const {
        filterData: { date: dateValue },
    } = useFilter({
        defaultValues: {
            date: {
                range: {
                    min: addMonths(
                        startOfYear(getFinancialDate(new Date())),
                        3
                    ),
                    max: addMonths(endOfYear(getFinancialDate(new Date())), 3),
                },
            },
        },
        filterAliasKey,
    });
    const dateFilter = useMemo(() => {
        const absoluteDate = DateRangeFilterUtils.absoluteValue(dateValue);

        if (!IsEmptyObject(absoluteDate))
            return {
                startDate: APIDateFormat({
                    date: absoluteDate?.startDate,
                    format: API_DATE_TIME_FORMAT,
                }),
                endDate: APIDateFormat({
                    date: endOfDay(absoluteDate?.endDate),
                    format: API_DATE_TIME_FORMAT,
                }),
            };
        if (sDate && eDate)
            return {
                startDate: sDate,
                eDate: eDate,
            };
    }, [dateValue, eDate, sDate]);

    const filterQueries = useMemo(() => {
        const dateRule = getDateQueryRule(dateFilter);

        const rule: any = {
            rules: disableDateNavigation
                ? customFilterQueryRules
                : [dateRule, ...(customFilterQueryRules || [])],
            combinator: 'and',
            not: false,
        };

        const sanitizedRestictedFilter = IsEmptyString(customRestictedFilters)
            ? disableDateNavigation
                ? undefined
                : 'created_at'
            : `created_at,${customRestictedFilters}`;

        return {
            filter_query: !IsEmptyArray(rule.rules) ? rule : undefined,
            [RESTRICTED_FILTERS]: sanitizedRestictedFilter,
        };
    }, [
        customFilterQueryRules,
        customRestictedFilters,
        dateFilter,
        disableDateNavigation,
    ]);

    const showAllText = useMemo(() => {
        const removeEmptyObj = RemoveEmptyObjectKeys(filterQueries);
        return IsEmptyObject(removeEmptyObj);
    }, [filterQueries]);

    const props: GenericDefinitionListingProps = {
        name: reportTitle,
        dateFilter: false,
        hideFilter: true,
        disableAggregation: false,
        asInnerTable: true,
        definitionKey: defKey,
        type: type || modalType,
        onlyDisplayQueryFilter: true,
        searchMethod,
        configurationClass: 'z-[499]',
        searchFilter: {
            placeholder: 'Search ( min: 3 characters )',
            local: true,
            localSearchAttrs: finalSearchKeys,
        },
        disableNav: true,
        hideSaveFilter: true,
        defaultFilterParams: queryParams,
        defaultFilterQueries: filterQueries?.filter_query,
        defaultRestrictedQueries: filterQueries?.[RESTRICTED_FILTERS],
        defaultClassParams: {
            slug,
        },
        removeReportDate: removeReportDate,

        preferences: {
            bordered: true,
            fullHeight: true,
            size: 'xs',
            appreance: 'neutral',
            stickyHeader: true,
        },
        tableWrapperClassName: 'overflow-hidden',
        customNoData: {
            description: 'No Data Found',
        },
        filterTitle: showAllText
            ? 'Query > All'
            : reportFilterTitle ?? undefined,
        macros: {
            ...(macros || {}),
        },
    };

    /**
     * @description To Close the modal once the expense is changes
     */
    useUpdateEffect(() => {
        Modal.closeAll();
    }, [pathname]);

    return (
        <ModalContainer title={reportTitle}>
            <ModalBody className='h-[85vh] py-0'>
                <GenericDefinitionListing {...props} />
            </ModalBody>
        </ModalContainer>
    );
};

export default GenericDashboardReportModal;
