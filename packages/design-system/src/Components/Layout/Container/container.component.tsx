import { cn, IsValidString } from '../../../Utils/common.ui.utils';
import { PageTitle } from '../../Navigation/Page-Title/pageTitle.component';
import { ContainerWrapperProps } from './container.types';

/**
 *
 * @description this the wrapper for the page. Use this when creating new page.
 *
 * @returns Containerized Div.
 */
export const Container = ({
    children,
    className,
    offContainer = false,
    pageTitle,
}: ContainerWrapperProps) => {
    return (
        <div
            className={cn(
                offContainer ? 'px-4' : 'container mx-auto',
                className
            )}
        >
            {/* {IsValidString(pageTitle) && (
                <PageTitle title={pageTitle}></PageTitle>
            )} */}
            {children}
        </div>
    );
};
