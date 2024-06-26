import { useApp } from '@finnoto/core';
import { IconButton, Tooltip } from '@finnoto/design-system';

import { GridViewSvgIcon, ListSvgIcon } from 'assets';

export interface ArcViewToggleProps {
    view?: 'grid' | 'list';
    onToggle?: (_: 'grid' | 'list') => void;
}

const ArcToggleListingButtonGroup = ({
    view,
    onToggle,
}: ArcViewToggleProps) => {
    const { isArc } = useApp();

    const appearance = isArc ? 'polaris-white-active' : 'primary';

    if (view === 'grid') {
        return (
            <Tooltip message='List View'>
                <IconButton
                    appearance={appearance}
                    icon={ListSvgIcon}
                    size='sm'
                    onClick={() => onToggle('list')}
                    outline={!isArc}
                />
            </Tooltip>
        );
    }

    return (
        <Tooltip message='Split View'>
            <IconButton
                appearance={appearance}
                icon={GridViewSvgIcon}
                size='sm'
                onClick={() => onToggle('grid')}
                outline={!isArc}
            />
        </Tooltip>
    );
};

export default ArcToggleListingButtonGroup;
