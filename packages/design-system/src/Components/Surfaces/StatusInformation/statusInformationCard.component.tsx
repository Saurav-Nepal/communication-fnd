import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    statusAppearance,
    statusIcons,
    StatusInformationCardProps,
} from './statusInformationCard.types';

const StatusInformationCard = ({
    title,
    body,
    type,
    className,
}: StatusInformationCardProps) => {
    return (
        <div className={cn('px-3 my-3', className)}>
            <div
                className={cn(
                    'px-3 py-2 border rounded col-flex',
                    statusAppearance[type].text,
                    statusAppearance[type].background,
                    statusAppearance[type].border
                )}
            >
                <div className='flex items-center gap-x-3'>
                    <Icon
                        source={statusIcons[type]}
                        isSvg
                        size={20}
                        className='self-start'
                    />
                    <div className='col-flex '>
                        <p className='text-sm font-medium'>{title}</p>
                        {body}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusInformationCard;
