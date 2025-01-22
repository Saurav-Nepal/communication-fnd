import React from 'react';

import { cn } from '@slabs/ds-utils';

export const Hamburger = ({
    isCollapsed,
    setIsCollapsed,
}: {
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
    return (
        <button
            className='relative opacity-50 group disabled:cursor-not-allowed'
            onClick={() => setIsCollapsed(!isCollapsed)}
        >
            <div>
                <div
                    className={cn(
                        'flex flex-col justify-between w-[18px] h-[14px] transform transition-all duration-300 origin-center overflow-hidden',
                        {
                            '-translate-x-1 rotate-180': isCollapsed,
                        }
                    )}
                >
                    <div
                        className={cn(
                            'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
                            {
                                'rotate-[42deg] w-[10px]': isCollapsed,
                                'w-[18px]': !isCollapsed,
                            }
                        )}
                    ></div>
                    <div
                        className={cn(
                            'bg-card-foreground h-[2px] w-[18px] rounded transform transition-all duration-300',
                            {
                                'translate-x-9': isCollapsed,
                            }
                        )}
                    ></div>
                    <div
                        className={cn(
                            'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
                            {
                                '-rotate-[43deg] w-[10px]': isCollapsed,
                                'w-[18px]': !isCollapsed,
                            }
                        )}
                    ></div>
                </div>
            </div>
        </button>
    );
};
