import { cn } from '../../../Utils/common.ui.utils';
import {
    LoadingProps,
    loadingColor,
    loadingSizes,
    loadingType,
} from './loading.types';

/**
 * Loading component that renders a loading spinner or indicator.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {keyof typeof loadingSizes} [props.size='xs'] - The size of the loading component.
 * @param {keyof typeof loadingColor} [props.color='white'] - The color of the loading component.
 * @param {string} [props.type='spinner'] - The type of loading indicator to display.
 * @param {boolean} [props.stop=false] - Indicates whether the loading should be stopped and not rendered.
 * @returns {ReactElement | null} The rendered loading component or null if `stop` prop is true.
 */
export const Loading = ({
    size = 'xs',
    color = 'white',
    type = 'spinner',
    stop = false,
}: LoadingProps) => {
    if (stop) return null;
    return (
        <span
            className={cn(
                'loading bg-current',
                loadingSizes[size],
                loadingColor[color],
                loadingType[type]
            )}
        ></span>
    );
};
