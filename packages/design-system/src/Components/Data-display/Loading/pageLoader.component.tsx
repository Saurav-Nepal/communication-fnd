import { cn } from '../../../Utils/common.ui.utils';
import { Loading } from './loading.component';

export const PageLoader = ({
    screenHeight = true,
    className,
}: {
    screenHeight?: boolean;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                'page-loader flex items-center justify-center',
                {
                    'h-screen max-h-full': screenHeight,
                    'h-full': !screenHeight,
                },
                className
            )}
        >
            <Loading color='primary' size='lg' />
        </div>
    );
};
