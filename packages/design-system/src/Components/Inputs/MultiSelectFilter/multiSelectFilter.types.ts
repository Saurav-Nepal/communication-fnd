import { GenericListingType, ObjectDto, SelectBoxOption } from '@finnoto/core';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

export interface MultiSelectInterface
    extends Pick<DropdownMenuContentProps, 'align' | 'side'> {
    label?: React.ReactNode | string;
    options?: SelectBoxOption[];
    className?: string;
    isSearchable?: boolean;
    value?: (string | number)[];
    isLabelShow?: boolean;

    onChangeFilter?: (
        selected: (string | number)[],
        options?: ObjectDto[]
    ) => void;
    labelClassName?: string;
    containerClassName?: string;
    footerClassName?: string;
    defaultValue?: (string | number)[];
    isAsync?: boolean;
    onAsyncSearch?: (value: string) => void;
    isLoading?: boolean;
    onChangeSelectedOptions?: (options: SelectBoxOption[]) => void;
    placeholder?: string;
    selectedSuffix?: string;
    selectedClassName?: string;
    isCollision?: boolean;
    searchClassName?: string;
    isCurrentUserShow?: boolean;
    disabled?: boolean;
    displayLimit?: number;
}

export interface ReferenceMultiSelectInterface extends MultiSelectInterface {
    controller_type: GenericListingType;
    method?: string;
    valueKey?: string;
    labelKey?: string;
    filterClassParams?: ObjectDto;
    subLabelKey?: string | ((item: ObjectDto) => string);
    subLabelPrefix?: string;
    ignoreValues?: any[];
    initMethodSearchParam?: any;
    minLength?: number;
    initMethod?: string;
    methodParams?: any;
    searchKey?: string;
    ignoreKey?: string;
    queryIds?: string;
}
