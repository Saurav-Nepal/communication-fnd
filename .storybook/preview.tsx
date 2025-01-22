import '@slabs/ds-core/src/styles.scss';
import '@slabs/ds-table/src/styles.scss';

import React, { useEffect } from 'react';

import './tailwind.scss';

import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import {
    Modal,
    ModalWrapper,
    SlidingPane,
    SlidingPaneWrapper,
} from '@slabs/ds-dialog';
import { keys } from '@slabs/ds-utils';

import { addons } from '@storybook/preview-api';
import type { Preview } from '@storybook/react';

import { SlabProvider, useSlabColorScheme } from '../packages/ds-core';
import themes, { apDarkTheme } from './themes';

const channel = addons.getChannel();

let globalModalRef: any;
let globalSlidingPaneRef: any;

export const StorybookThemeDecorator = ({
    context,
    children,
}: {
    context: any;
    children: any;
}) => {
    const { setColorScheme } = useSlabColorScheme();
    const handleColorScheme = (value: boolean) => {
        if (value) return setColorScheme('dark');
        setColorScheme('light');
    };

    useEffect(() => {
        Modal.register(globalModalRef);
        SlidingPane.register(globalSlidingPaneRef);
    }, []);

    useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
        return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
    }, [channel]);

    useEffect(() => {
        setColorScheme(context?.globals?.theme);
    }, [context?.globals?.theme]);

    return (
        <div className='h-full p-6 bg-background'>
            {children}
            <ModalWrapper
                ref={(ref) => {
                    globalModalRef = ref;
                }}
            />
            <SlidingPaneWrapper
                ref={(ref) => {
                    globalSlidingPaneRef = ref;
                }}
            />
        </div>
    );
};

const decorators = [
    (renderStory: any, context: any) => (
        <StorybookThemeDecorator context={context}>
            {renderStory()}
        </StorybookThemeDecorator>
    ),
    (renderStory: any) => (
        <SlabProvider
            defaultTheme='base'
            themes={themes}
            darkThemesOverride={{ finops: apDarkTheme }}
            // cssVariablesSelector='#storybook-root'
        >
            {renderStory()}
        </SlabProvider>
    ),
];

const preview: Preview = {
    parameters: {
        layout: 'fullscreen',
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: ['Getting Started', 'Component', 'Packages'],
            },
        },
    },
    args: {},
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'Set the global theme for displaying components',
            defaultValue: 'base',
            toolbar: {
                icon: 'paintbrush',
                title: 'Theme',
                items: ['base', ...keys(themes)],
            },
        },
    },
    decorators,
};

export default preview;
