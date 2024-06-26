import { useHoverBox } from '@finnoto/core';
import { HoverCard, cn } from '@finnoto/design-system';
import { ReactNode } from 'react';

interface hoverBoxDetailProps {
    renderFunction: (data: any) => ReactNode;
    id: number;
    controller: any;
    containerClassName?: string;
    method?: string;
    disabledNetwork?: boolean;
}

interface hoverBoxProps extends hoverBoxDetailProps {
    children: ReactNode;
    debugMode?: boolean;
}

const HoverBox = ({
    renderFunction,
    children,
    controller,
    id,
    debugMode = false,
    containerClassName,
    method,
    disabledNetwork,
}: hoverBoxProps) => {
    return (
        <HoverCard
            align='start'
            position='right'
            defaultOpen={debugMode}
            disabled={!id}
            content={
                <HoverBoxDetial
                    {...{
                        id,
                        controller,
                        containerClassName,
                        renderFunction,
                        method,
                        disabledNetwork,
                    }}
                />
            }
        >
            {children}
        </HoverCard>
    );
};

const HoverBoxDetial = ({
    id,
    controller,
    renderFunction = () => <span></span>,
    containerClassName,
    method,
    disabledNetwork,
}: hoverBoxDetailProps) => {
    const { hoverBoxDetail, isLoading } = useHoverBox({
        id: id,
        controller: controller,
        method,
        disabledNetwork,
    });

    return (
        <div
            className={cn(
                'min-w-[300px] p-3 bg-base-100 shadow-lg rounded',
                containerClassName
            )}
        >
            {isLoading ? <LoadingComponent /> : renderFunction(hoverBoxDetail)}
        </div>
    );
};

const LoadingComponent = () => {
    return (
        <div className='w-full max-w-sm mx-auto rounded-md bg-base-100'>
            <div className='flex space-x-4 animate-pulse'>
                <div className='w-10 h-10 rounded-full bg-base-200'></div>
                <div className='flex-1 py-1 space-y-6'>
                    <div className='h-2 rounded bg-base-200'></div>
                    <div className='space-y-3'>
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='h-2 col-span-2 rounded bg-base-200'></div>
                            <div className='h-2 col-span-1 rounded bg-base-200'></div>
                        </div>
                        <div className='h-2 rounded bg-base-200'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoverBox;
