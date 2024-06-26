import { useRef } from 'react';
import { useKey } from 'react-use';

import { IsFunction, useApp } from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { TwinPanelProps } from './twinPanel.types';
import useTwinPanel from './useTwinPanel.hook';

/**
 * TwinPanel Component
 *
 * This is the component that will render the dual screen
 *
 * @param {object} props - Component props
 * @returns {JSX.Element} - Slider component with children and settings
 *
 *
 * @author Saurav Nepal
 */
const TwinPanel = ({
    leftContainerClassName,
    rightContainerClassName,
    apiConfigurations,
    children,
    containerClassName,
    cacheTime,
    isListMoveToTop,
    isListScrollable,
    onDetailData,
    onListingData,
    onListActiveChange,
}: TwinPanelProps) => {
    const listingContainerRef = useRef();
    const {
        detailData,
        isDetailLoading,
        isListingLoading,
        listingData,
        stats,
        activeId,
        handleListActiveChange,
    } = useTwinPanel({
        ...apiConfigurations,
        cacheTime,
        onDetailData,
        onListingData,
        isListMoveToTop,
        isListScrollable,
        onListActiveChange,
    });

    const listChildren = children?.[0];
    const detailChildren = children?.[1];
    const { isArc } = useApp();

    useKey(
        'ArrowUp',
        () => handleListActiveChange('previous'),
        { target: listingContainerRef.current },
        [handleListActiveChange]
    );
    useKey(
        'ArrowDown',
        () => handleListActiveChange('next'),
        {
            target: listingContainerRef.current,
        },
        [handleListActiveChange]
    );

    return (
        <div
            className={cn(
                'flex items-center h-full gap-2 bg-transparent',
                containerClassName
            )}
        >
            <div
                className={cn(
                    'w-1/4 h-full overflow-hidden col-flex relative bg-polaris-bg-surface border rounded-lg border-polaris-border',
                    {
                        rounded: !isArc,
                    },
                    leftContainerClassName
                )}
                tabIndex={-1}
                ref={listingContainerRef}
            >
                {IsFunction(listChildren) &&
                    listChildren({
                        data: listingData,
                        isLoading: isListingLoading,
                        stats,
                        activeId: activeId,
                    })}
            </div>
            <div className={cn('w-3/4 h-full', rightContainerClassName)}>
                {IsFunction(detailChildren) &&
                    detailChildren({
                        isLoading: isDetailLoading,
                        data: detailData,
                    })}
            </div>
        </div>
    );
};

export default TwinPanel;
