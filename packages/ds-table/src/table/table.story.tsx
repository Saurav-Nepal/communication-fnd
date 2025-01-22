import React, { useState } from 'react';

import type { Meta, StoryFn } from '@storybook/react';

import '@storybook/react';

import { Table } from './table';
import { TableColumn, TableColumnType } from './table.types';

const meta: Meta<typeof Table> = {
    title: 'Component/Table',
    component: Table,
    argTypes: {},
};

export default meta;

export const Example: StoryFn<typeof Table> = () => {
    const data = [
        { id: 1, name: 'John Doe', age: 30, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        { id: 23, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        { id: 24, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        { id: 26, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        { id: 27, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
        // ... more data
    ];

    const columns: TableColumn[] = [
        { name: 'ID', key: 'id' },
        { name: 'Name', key: 'name' },
        { name: 'Age', key: 'age' },
        { name: 'City', key: 'city' },
    ];

    return <Table data={data} column={columns} />;
};

Example.args = {};
