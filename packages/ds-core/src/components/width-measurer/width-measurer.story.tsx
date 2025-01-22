import React from 'react';

import { useWidthMeasurer } from '@slabs/ds-hooks';

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { WidthMeasurer } from './width-measurer';

// Define interfaces
interface TabProps {
    id: string;
    label: string;
    active?: boolean;
    onClick?: (id: string) => void;
}

interface MoreTabsButtonProps {
    tabs: TabProps[];
}

interface ResponsiveTabListProps {
    tabs: TabProps[];
    active: string;
    onChangeTab: (id: string) => void;
}

// Mock Tab component
const Tab: React.FC<TabProps> = ({ id, label, active, onClick }) => (
    <button
        style={{
            padding: '8px 16px',
            margin: '0 4px',
            background: active ? 'lightblue' : 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
        }}
        onClick={() => onClick?.(id)}
    >
        {label}
    </button>
);

// Mock MoreTabsButton component
const MoreTabsButton: React.FC<MoreTabsButtonProps> = ({ tabs }) => (
    <button
        style={{
            padding: '8px 16px',
            margin: '0 4px',
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
        }}
    >
        More ({tabs.length})
    </button>
);

// ResponsiveTabList component
const ResponsiveTabList: React.FC<ResponsiveTabListProps> = ({
    tabs,
    active,
    onChangeTab,
}) => {
    const { visibleItems, hiddenItems, handleMeasurement } = useWidthMeasurer({
        items: tabs,
        activeItemIndex: tabs.findIndex((tab) => tab.id === active),
    });

    const isDisclosureActivatorVisible = hiddenItems.length > 0;

    return (
        <div style={{ width: '100%', overflow: 'hidden' }}>
            <WidthMeasurer handleMeasurement={handleMeasurement}>
                {tabs.map((tab) => (
                    <Tab key={tab.id} {...tab} onClick={() => {}} />
                ))}
                <MoreTabsButton tabs={[]} />
            </WidthMeasurer>
            <div
                role='tablist'
                style={{ display: 'flex', alignItems: 'center' }}
            >
                {visibleItems.map((tab) => (
                    <Tab
                        key={tab.id}
                        {...tab}
                        onClick={onChangeTab}
                        active={tab.id === active}
                    />
                ))}
                {isDisclosureActivatorVisible && (
                    <MoreTabsButton tabs={hiddenItems} />
                )}
            </div>
        </div>
    );
};

// Storybook configuration
export default {
    title: 'Component/WidthMeasurer',
    component: ResponsiveTabList,
    argTypes: {
        active: {
            control: 'select',
            options: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'],
        },
    },
} as Meta<typeof ResponsiveTabList>;

// Create a template for your stories
const Template: StoryFn<ResponsiveTabListProps> = (args) => (
    <ResponsiveTabList {...args} />
);

// Default story
export const Default = Template.bind({});
Default.args = {
    tabs: [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' },
        { id: 'tab4', label: 'Tab 4' },
        { id: 'tab5', label: 'Tab 5' },
        { id: 'tab6', label: 'Long Tab Name 6' },
    ],
    active: 'tab1',
    onChangeTab: action('Tab changed'),
};

// Story with many tabs
export const ManyTabs = Template.bind({});
ManyTabs.args = {
    ...Default.args,
    tabs: [
        ...(Default.args.tabs ?? []),
        { id: 'tab7', label: 'Tab 7' },
        { id: 'tab8', label: 'Tab 8' },
        { id: 'tab9', label: 'Tab 9' },
        { id: 'tab10', label: 'Tab 10' },
    ],
};

// Story with a narrow container
export const NarrowContainer = Template.bind({});
NarrowContainer.args = {
    ...Default.args,
};
NarrowContainer.decorators = [
    (Story: StoryFn) => (
        <div style={{ width: '300px' }}>
            <Story />
        </div>
    ),
];
