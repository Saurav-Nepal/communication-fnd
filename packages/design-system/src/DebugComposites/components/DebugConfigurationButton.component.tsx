import {
    DEVELOPER_MODE_KEY,
    GetItem,
    IsArray,
    IsEmptyArray,
} from '@finnoto/core';
import {
    cn,
    editQueryConfiguration,
    IconButton,
    Tooltip,
} from '@finnoto/design-system';

import { ConfigurationSvgIcon } from 'assets';

const positionClass = {
    topleft: 'top-1 left-1',
    topright: 'top-1 right-1',
    bottomLeft: 'bottom-1 left-1',
    bottomRight: 'bottom-1 right-1',
};
export const DebugConfigurationButton = ({
    slug,
    position = 'topright',
    options,
}: {
    slug: string | string[];
    position?: keyof typeof positionClass;
    options?: { callback?: () => void };
}) => {
    const isDebugModeEnable = GetItem(DEVELOPER_MODE_KEY, false);
    if (!isDebugModeEnable || !slug) return null;
    if (IsArray(slug) && IsEmptyArray(slug)) return null;

    const slugs = IsArray(slug) ? slug : [slug];

    return (
        <div
            className={cn(
                'flex items-center gap-2 absolute z-10 ',
                positionClass[position]
            )}
        >
            {slugs.map((slug) => (
                <Tooltip key={slug} message={slug}>
                    <IconButton
                        icon={ConfigurationSvgIcon}
                        onClick={() => editQueryConfiguration(slug, options)}
                        size='sm'
                        appearance='hold'
                    />
                </Tooltip>
            ))}
        </div>
    );
};
