import React from 'react';

import { cn } from '@slabs/ds-utils';

import themes, { apDarkTheme } from '../../../.storybook/themes';
import { SlabProvider } from '../../../packages/ds-core';
import { ColorRowItem, SlabColors } from './color-values';

const ColorDisplay = () => {
    return (
        <SlabProvider
            defaultTheme='finops'
            themes={themes}
            darkThemesOverride={{ finops: apDarkTheme }}
        >
            <div className='flex flex-col gap-8 pt-8'>
                {SlabColors.map((colorRow) => (
                    <ColorDisplayRow colorRow={colorRow} key={colorRow.title} />
                ))}
            </div>
        </SlabProvider>
    );
};

export default ColorDisplay;

export const ColorDisplayRow = ({ colorRow }: { colorRow: ColorRowItem }) => {
    return (
        <div className='flex items-center'>
            <div className='flex flex-col w-full gap-4'>
                <div className='flex items-center'>
                    <p className='font-medium basis-[125px]'>
                        {colorRow.title}
                    </p>
                    <div className='flex w-full overflow-hidden border rounded shadow-sm h-14'>
                        {colorRow.colors.map((color) => (
                            <div
                                className={cn('flex-1', color.value)}
                                key={color.value}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='basis-[125px]'></div>
                    {colorRow.colors.map((color) => (
                        <div
                            className='flex flex-col flex-1 text-center'
                            key={color.value}
                        >
                            <p className='text-sm'>{color.label}</p>
                            <p className='text-xs text-muted-foreground'>
                                ({color.sublabel})
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
