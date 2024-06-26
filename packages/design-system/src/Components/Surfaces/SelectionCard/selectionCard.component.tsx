import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    ArrowRightSvgIcon,
    CircleCancelSvgIcon,
    CircleConfirmSvgIcon,
    RefreshSvgIcon,
    UserAddSvgIcon,
} from 'assets';
import { SelectionCardType } from './selectionCard.types';

const icons = {
    success: CircleConfirmSvgIcon,
    error: CircleCancelSvgIcon,
    neutral: UserAddSvgIcon,
    refresh: RefreshSvgIcon,
};

const appearanceColors = {
    success: 'hover:border-success text-success',
    error: 'hover:border-error text-error',
    neutral: 'hover:border-[--text-base-primary] text-base-primary',
};

/**
 * @description - Renders a selection card component
 *
 * @param  {function} onClick - onClick handler
 * @param  {string} title - title of the card
 * @param  {string} subText - subText of the card
 * @param  {string} appearance - appearance of the card
 * @param  {string} icon - icon of the card
 * @returns JSX.Element
 */

export const SelectionCard = ({
    onClick,
    title,
    subText = '',
    appearance,
    icon,
}: SelectionCardType) => {
    return (
        <div
            className={cn(
                'group transition-all w-full py-3 px-4 border border-base-300 rounded-[4px] flex justify-between cursor-pointer',
                appearanceColors[appearance]
            )}
            onClick={onClick}
        >
            <div className='gap-3 row-flex'>
                <Icon
                    source={icons[icon] || icons[appearance]}
                    isSvg
                    size={16}
                    className='items-start'
                />
                <div className='col-flex text-start'>
                    <span className='mb-1 text-sm transition-all font-normal'>
                        {title}
                    </span>
                    <span className='text-base-secondary text-xs '>
                        {subText}
                    </span>
                </div>
            </div>
            <Icon
                source={ArrowRightSvgIcon}
                isSvg
                size={16}
                className='items-start hidden group-hover:flex'
            />
        </div>
    );
};
