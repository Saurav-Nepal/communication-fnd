import { ActionModal } from '@Components/HomeWrapper/homeWrapper.component';
import {
    AccessNestedObject,
    EmptyFunction,
    FormatCurrency,
    FormatDisplayDate,
    GetObjectProperty,
    IsEmptyArray,
    IsFunction,
    IsUndefined,
    Navigation,
    ObjectDto,
    getActiveStatusText,
} from '@finnoto/core';
import {
    Badge,
    DropdownMenuActionProps,
    Ellipsis,
    FormatDisplayDateStyled,
    Icon,
    Modal,
    NoDataFound,
    PageLoader,
    cn,
} from '@finnoto/design-system';
import { NoDataFoundProps } from '@finnoto/design-system/src/Components/Data-display/NoDataFound/noDataFound.types';
import { ArrowRightSvgIcon, MoreIcon } from 'assets';
import Link from 'next/link';
import React, { Fragment, useCallback } from 'react';
import GenericCard from './Components/genericCard.component';

type ListItemType = {
    key: string;
    name?: string;
    type?:
        | 'number'
        | 'currency'
        | 'currency_acc'
        | 'date'
        | 'date_time'
        | 'boolean'
        | 'activate_badge';
    renderValue?: (item: any) => React.ReactNode;
    visible?: boolean | ((item: any) => boolean);
    className?: string;
    icon?: any;
    fullWidth?: boolean;
    action?: (item: ObjectDto, index: number) => void;
};

export interface GenericCardListingListProps {
    titleKey?: any;
    titleLink?: string | ((item: any) => string);
    titlePrefix?: string | ((item: any) => any);
    subtitleKey?: string;
    subtitleClassName?: string;
    subtitleComponent?: (item: any) => any;
    noResolveLink?: boolean;
    alwaysDisplay?: number;
    detailItem?: ListItemType;
    detailPath?: string | ((item: any, index: number) => string);
    detailAction?: (item: any, index: number) => void;
    rightComponent?: (item: any, index: number) => any;
    leftComponent?: (item: any, index: number) => any;
    className?: string | ((item: any, index: number) => string);
    listItemClassName?: string;
    titleClassName?: string;
    headingClassName?: string;
    expandClassName?: string;
    listClass?: string;
    rounded?: any;
    cardIcon?: (item: any, index: number) => void;
    cardIconClassName?: (item: any, index: number) => void;
    listItems?: ListItemType[];
    bottomListItems?: ListItemType[];
    subtitleList?: any[];
    amountComponent?: any;
    enableArrowIcon?: boolean;
}

export interface GenericCardListingProps {
    data?: any[];
    list?: GenericCardListingListProps;
    loading?: boolean;
    showCardIcon?: any;
    page?: number;
    limit?: number;
    // docType?: string | number | symbol;
    defaultIcon?: any;
    empty_title?: string;
    empty_list_content?: string;
    noDataProps?: NoDataFoundProps;
    rightActions?: DropdownMenuActionProps[];
    showArrowIcon?: boolean;
}

const colors = [
    'text-green-500',
    'text-teal-500',
    'text-blue-500',
    'text-violet-500',
    'text-pink-500',
    'text-orange-500',
    'text-lime-500',
];

const GenericCardListing = ({
    data = [],
    list = {},
    // page,
    // limit,
    defaultIcon,
    loading,
    showCardIcon,
    empty_list_content = '',
    empty_title = '',
    noDataProps,
    rightActions = [],
}: GenericCardListingProps) => {
    const parseData = (item: ObjectDto, list: any) => {
        if (IsFunction(list.renderValue)) return list.renderValue(item);

        const value = GetObjectProperty(item, list.key);

        if (list.type && !IsUndefined(value)) {
            if (list.type === 'date')
                return <div>{value ? FormatDisplayDate(value) : '-'}</div>;
            if (list.type === 'date_time')
                return (
                    <div>
                        {value
                            ? FormatDisplayDateStyled({ value: value })
                            : '-'}
                    </div>
                );
            if (list.type === 'activate_badge') {
                const status = AccessNestedObject(item, list.key);
                return (
                    <Badge
                        size='sm'
                        appearance={status ? 'success' : 'error'}
                        label={status ? 'Active' : 'Deactive'}
                    />
                );
            }
            if (list.type === 'currency')
                return <div>{FormatCurrency({ amount: value })}</div>;
            if (list.type === 'currency_acc')
                return (
                    <div>
                        {value >= 0
                            ? FormatCurrency({
                                  amount: value,
                              })
                            : `(${FormatCurrency({
                                  amount: -value,
                              })})`}
                    </div>
                );
            if (list.type === 'number') return <div>{value || '-'}</div>;
            if (list.type === 'boolean')
                return <div>{value ? 'Yes' : 'No'}</div>;
        }

        return value || '-';
    };

    const getUrl = (url: string, resolveUrl: boolean = true, children: any) => {
        return (
            <Link href={resolveUrl ? url : ''}>
                <a className='link link-hover'>{children}</a>
            </Link>
        );
    };

    const getFilteredListItems = useCallback(
        (itemData) =>
            list.listItems?.filter(
                (item: any) =>
                    !(
                        item.visible === false ||
                        (IsFunction(item.visible) &&
                            item.visible(itemData) === false)
                    )
            ),
        [list.listItems]
    );
    const getFilteredBottomListItems = useCallback(
        (itemData) =>
            (list?.bottomListItems || [])?.filter(
                (item: any) =>
                    !(
                        item.visible === false ||
                        (IsFunction(item.visible) &&
                            item.visible(itemData) === false)
                    )
            ),
        [list.bottomListItems]
    );

    const getSubtitle = (item: ObjectDto) => {
        if (!IsEmptyArray(list.subtitleList)) {
            const handleType = (type, key) => {
                switch (type) {
                    case 'boolean':
                        const active = item[key];
                        const statusText = getActiveStatusText(active, item);
                        return active ? (
                            <span className='text-success'>{statusText}</span>
                        ) : (
                            <span className='text-error'>{statusText}</span>
                        );
                    default:
                        return item[key];
                }
            };
            return (
                <div className='flex items-center gap-1'>
                    {list?.subtitleList.map((val, index) => {
                        if (IsFunction(val?.renderValue)) {
                            return (
                                <Fragment key={index}>
                                    {val?.renderValue(item)}
                                </Fragment>
                            );
                        }
                        const value = handleType(val?.type, val?.key);

                        if (!value) return null;
                        return (
                            <div
                                key={index}
                                className='flex items-center gap-1'
                            >
                                {index !== 0 && (
                                    <span className='w-1 h-1 bg-black rounded-full'></span>
                                )}
                                <p
                                    className={cn(
                                        'text-base-primary',
                                        IsFunction(val?.color) &&
                                            val?.color(item)
                                    )}
                                >
                                    {value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            );
        }
        if (!(list.subtitleComponent || list.subtitleKey)) return null;

        if (list.subtitleComponent) return list.subtitleComponent(item);
        if (!list.subtitleKey) return null;
        if (item[list.subtitleKey || '']) {
            return item[list.subtitleKey || ''];
        }

        return null;
    };
    const getIcon = () => {
        if (!showCardIcon) return null;
        return defaultIcon;
    };
    const getCustomCardIcon = (item: ObjectDto, index: number) => {
        if (list.cardIcon) {
            return list.cardIcon(item, index);
        }
        return null;
    };

    const parseTitleKeyData = (item: ObjectDto) => {
        const titleKey = list?.titleKey;
        if (titleKey) {
            let value: any = item;
            for (let key of titleKey.split('.')) {
                value = value[key];
            }
            return value;
        }
        return '';
    };
    const getCardIconClassName = (item: ObjectDto, index: number) => {
        return list?.cardIconClassName
            ? list.cardIconClassName(item, index)
            : '';
    };

    const getTitle = (item: ObjectDto) => {
        if (list?.titleLink)
            return getUrl(
                typeof list.titleLink === 'function'
                    ? list.titleLink(item)
                    : list.titleLink + '/' + item.id,
                !list.noResolveLink,
                parseTitleKeyData(item)
            );
        if (list?.rightComponent) return parseTitleKeyData(item);
        return parseTitleKeyData(item);
    };

    const openActionModal = useCallback(
        (item: ObjectDto, actions: any = []) => {
            Modal.open({
                component: ActionModal,
                props: {
                    actions: actions.map((el) => {
                        if (el?.action)
                            return {
                                ...el,
                                action: () => el?.action(item),
                            };
                        return {
                            ...el,
                            action: () => EmptyFunction,
                        };
                    }),
                },
            });
        },
        []
    );

    const renderRightSideCard = useCallback(
        (item: ObjectDto, index: number) => {
            const filterRowActions = rightActions.filter((el) => {
                if (IsFunction(el?.visible)) return el?.visible(item);
                return el?.visible !== false;
            });

            if (filterRowActions?.length > 0) {
                return (
                    <div className='gap-2 row-flex'>
                        {list?.rightComponent
                            ? list?.rightComponent(item, index)
                            : null}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                openActionModal(item, filterRowActions);
                            }}
                            className='border rounded cursor-pointer border-primary'
                        >
                            <Icon source={MoreIcon} isSvg />
                        </div>
                    </div>
                );
            }
            return list?.rightComponent
                ? list?.rightComponent(item, index)
                : null;
        },
        [list, openActionModal, rightActions]
    );

    return (
        <>
            {loading && <PageLoader />}
            {!loading && IsEmptyArray(data) && (
                <NoDataFound
                    title={empty_title || 'No records'}
                    description={'There are no records available.'}
                    {...noDataProps}
                />
            )}
            <div className={cn('col-flex gap-3 p-4', list?.listClass)}>
                {(!loading || !IsEmptyArray(data)) &&
                    (data || []).map((item: any, index: number) => (
                        <GenericCard
                            key={`${item?.id}-${item?.identifier}-${index}`}
                            headingClassName={list.headingClassName}
                            rounded={list.rounded}
                            hasClickAction={() => {
                                if (!list?.detailAction && !list.detailPath) {
                                    return false;
                                }
                                return true;
                            }}
                            onClick={
                                list?.detailAction || list.detailPath
                                    ? () => {
                                          if (
                                              !list?.detailAction &&
                                              !list.detailPath
                                          )
                                              return;
                                          if (list?.detailAction) {
                                              return list?.detailAction(
                                                  item,
                                                  index
                                              );
                                          }

                                          let redirect_url: any =
                                              list.detailPath;
                                          if (
                                              typeof list.detailPath ===
                                              'function'
                                          ) {
                                              redirect_url = list.detailPath(
                                                  item,
                                                  index
                                              );
                                          }

                                          return Navigation.navigate({
                                              url: redirect_url,
                                          });
                                      }
                                    : null
                            }
                            className={`${
                                typeof list.className === 'function'
                                    ? list.className(item, index)
                                    : list.className
                            } listing-card`}
                            leftComponent={
                                list.leftComponent
                                    ? list.leftComponent(item, index)
                                    : null
                            }
                            rightComponent={
                                renderRightSideCard(item, index)
                                // list.rightComponent
                                //     ? list.rightComponent(item, index)
                                //     : null
                            }
                            title={
                                list.titleKey ? (
                                    <div
                                        className={cn(
                                            'row-flex flex-1',
                                            list.titleClassName
                                        )}
                                    >
                                        {list.titlePrefix && (
                                            <div>
                                                {typeof list.titlePrefix ===
                                                'function'
                                                    ? list.titlePrefix(item)
                                                    : list.titlePrefix}
                                            </div>
                                        )}
                                        <Ellipsis>
                                            <div
                                                className={cn(
                                                    {
                                                        'text-base-secondary':
                                                            !list.titleLink &&
                                                            list.titlePrefix,
                                                    },
                                                    list.titleClassName
                                                )}
                                            >
                                                {IsFunction(list?.titleKey)
                                                    ? list?.titleKey(item)
                                                    : getTitle(item)}
                                            </div>
                                        </Ellipsis>
                                    </div>
                                ) : null
                            }
                            subtitle={getSubtitle(item)}
                            subtitleClassName={list.subtitleClassName}
                            // color={getRandowColor(index)}
                            cardIcon={getIcon()}
                            CustomCardIcon={getCustomCardIcon(item, index)}
                            cardIconClassName={
                                getCardIconClassName(item, index) as string
                            }
                            bottomComponent={
                                !IsEmptyArray(list.listItems) ? (
                                    <div
                                        className={`row-flex flex-wrap gap-4 text-sm justify-between pt-0 ${list.listItemClassName}`}
                                    >
                                        {getFilteredListItems(item)?.map(
                                            (listItem: any, index: number) => {
                                                return (
                                                    <div
                                                        key={
                                                            index + listItem.key
                                                        }
                                                        className={`text-base-secondary items-center row-flex gap-1 ${listItem?.className}`}
                                                        onClick={(e) => {
                                                            if (
                                                                listItem?.action
                                                            ) {
                                                                e.stopPropagation();
                                                                return listItem?.action(
                                                                    item,
                                                                    index
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {listItem.icon ? (
                                                            <Icon
                                                                source={
                                                                    listItem.icon
                                                                }
                                                                isSvg
                                                                size={16}
                                                            />
                                                        ) : null}{' '}
                                                        {parseData(
                                                            item,
                                                            listItem
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                ) : null
                            }
                            mainComponent={
                                <div className='text-center rounded bg-base-200'>
                                    {IsFunction(list?.amountComponent) &&
                                        list?.amountComponent(item)}
                                </div>
                            }
                            extraClassName={cn(
                                !IsFunction(list.amountComponent) &&
                                    !IsEmptyArray(list.bottomListItems) &&
                                    'border-t-2  border-base-300/50'
                            )}
                            extraComponent={
                                list.detailPath ||
                                list.detailItem ||
                                !IsEmptyArray(
                                    getFilteredBottomListItems(item)
                                ) ? (
                                    <div className='space-y-2'>
                                        <div className='grid grid-cols-2 gap-3 pt-0 text-sm font-normal bottom-list-items'>
                                            {getFilteredBottomListItems(
                                                item
                                            )?.map(
                                                (
                                                    listItem,
                                                    index: number,
                                                    listItemArray
                                                ) => {
                                                    let fullWidth =
                                                        listItem.fullWidth;

                                                    if (
                                                        !fullWidth &&
                                                        index > 0 &&
                                                        index % 2 === 1
                                                    ) {
                                                        fullWidth =
                                                            listItemArray[
                                                                index - 1
                                                            ]?.fullWidth;
                                                    }

                                                    return (
                                                        <div
                                                            key={
                                                                String(
                                                                    item?.id
                                                                ) + listItem.key
                                                            }
                                                            className={cn(
                                                                'gap-[2px] col-flex',
                                                                {
                                                                    'text-right':
                                                                        index %
                                                                            2 ===
                                                                            1 &&
                                                                        !fullWidth,
                                                                },
                                                                {
                                                                    'col-span-2':
                                                                        fullWidth,
                                                                },
                                                                listItem?.className
                                                            )}
                                                        >
                                                            <span className='text-xs text-base-secondary'>
                                                                {listItem.name ||
                                                                    ''}
                                                            </span>
                                                            <span
                                                                className={cn(
                                                                    'text-base-primary overflow-hidden whitespace-nowrap text-ellipsis'
                                                                )}
                                                            >
                                                                {parseData(
                                                                    item,
                                                                    listItem
                                                                )}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className='items-center justify-between row-flex'>
                                            {!!list.detailItem && (
                                                <div className='text-base font-semibold'>
                                                    {parseData(
                                                        item,
                                                        list.detailItem
                                                    )}
                                                </div>
                                            )}
                                            {IsFunction(list.detailAction) ||
                                                (!!list.detailPath &&
                                                    list?.enableArrowIcon && (
                                                        <Icon
                                                            source={
                                                                ArrowRightSvgIcon
                                                            }
                                                            size={24}
                                                            isSvg
                                                        />
                                                    ))}
                                        </div>
                                    </div>
                                ) : null
                            }
                        />
                    ))}
            </div>
        </>
    );
};

export default GenericCardListing;
