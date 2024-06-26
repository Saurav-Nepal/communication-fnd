import { ReactNode } from 'react';

import { ObjectDto } from '../backend/Dtos';
import { CURRENT_EMPLOYEE, CURRENT_USER } from '../Constants';
import { GroupedOption } from '../Types';
import { AccessNestedObject, IsFunction } from './common.utils';

/**
 * Parses an array of objects into an array of select box options with specified value and label keys.
 *
 * @param {any[]} data - the data to be parsed into select box options
 * @param {string} value - the key to be used as the value for each select box option
 * @param {string} [label] - the key to be used as the label for each select box option. If not provided, the 'label' key or the value key will be used.
 * @param {{disabled?: string, subLabel?: string, sublabelPrefix?: string, extra?: any}} [options] - optional object containing keys for disabled, subLabel, sublabelPrefix, and extra.
 * @param {string} [options.disabled] - the key to be used as the disabled property for each select box option. If not provided, the 'isDisabled' key will be used.
 * @param {string} [options.subLabel] - the key to be used as the subLabel property for each select box option.
 * @param {string} [options.sublabelPrefix] - a string to prefix the subLabel property with.
 * @param {any} [options.extra] - a function to provide extra properties to each select box option.
 * @return {SelectBoxOption[]} an array of select box options
 */

const getCurrentUserSanitized = (
    options: ObjectDto[],
    valueKey: string = 'id'
) => {
    let current_user: any = {};

    return [
        {
            ...current_user,
            label: `Current User`,
            value: valueKey === 'user_id' ? CURRENT_USER : CURRENT_EMPLOYEE,
        },
        ...options,
    ];
};

export const ParseToSelectBoxOption = (
    data: any[],
    value: string,
    label?: string,
    options?: {
        disabled?: string;
        enabled?: string;
        subLabel?: string | ((item: ObjectDto) => string);
        sublabelPrefix?: string;
        shouldShowValue?: any;
        activeKeys?: string[] | string;
        extra?: any;
        prefixItem?: (item: ObjectDto) => ReactNode;
        isCurrentUserShow?: boolean;
        shouldVisibleAll?: boolean;
        disallowGrouping?: boolean;
    }
) => {
    if (isGroupedOptions(data) && !options?.disallowGrouping) {
        return data.map((group) => {
            return {
                label: group.label,
                options: ParseToSelectBoxOption(
                    group.options,
                    value,
                    label,
                    options
                ),
            };
        });
    }

    const { prefixItem = () => null } = options || {};
    const isActive = (item) => {
        if (options?.shouldVisibleAll) return true;
        if (Array.isArray(options?.activeKeys)) {
            return options?.activeKeys.every((key) => item.data[key] !== false);
        }

        return item.data[options?.activeKeys || 'active'] !== false;
    };

    if (data && data?.length > 0) {
        const result = data
            .map((item) => {
                const sublabelValue = IsFunction(options?.subLabel)
                    ? options?.subLabel(item)
                    : AccessNestedObject(item, options?.subLabel);

                const isDisabled = (() => {
                    if (options?.disabled) return item[options.disabled];
                    if (options?.enabled)
                        return item[options.enabled] === false;

                    return !!item['isDisabled'] || false;
                })();

                return {
                    value: value
                        ? AccessNestedObject(item, value)
                        : item[value],
                    label: label
                        ? AccessNestedObject(item, label)
                        : item['label'] || item[value],
                    isDisabled,
                    subLabel: sublabelValue
                        ? `${options?.sublabelPrefix || ''}${
                              sublabelValue || ''
                          }`
                        : undefined,
                    ...((options?.extra && options?.extra(item)) || {}),
                    data: item,
                    prefix: prefixItem(item),
                };
            })
            .filter(
                (item) =>
                    (item.value === options?.shouldShowValue ||
                        isActive(item)) &&
                    item?.label
            );

        return options?.isCurrentUserShow
            ? getCurrentUserSanitized(result, value)
            : result;
    }
    if (options?.isCurrentUserShow) return getCurrentUserSanitized([], value);
    return [];
};

export const isGroupedOptions = (
    options: unknown[]
): options is GroupedOption[] => {
    return options?.some((option: any) => option?.options?.length > 0);
};
