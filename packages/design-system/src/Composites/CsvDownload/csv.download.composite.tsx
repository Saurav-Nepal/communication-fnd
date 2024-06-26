import { useMemo } from 'react';
import { CSVLink } from 'react-csv';

import { IsEmptyArray } from '@finnoto/core';

import { IconButton, TableColumn } from '../../Components';

import { FileDownloadSvgIcon } from 'assets';

export const CsvDownload = ({
    columns,
    data,
    fileName,
}: {
    columns: TableColumn[];
    data: any[];
    fileName: string;
}) => {
    const headers = useMemo(() => {
        if (IsEmptyArray(columns)) return [];
        return columns.map((col) => ({ label: col?.name, key: col?.key }));
    }, [columns]);

    if (IsEmptyArray(data)) return;

    return (
        <CSVLink data={data} headers={headers} filename={fileName}>
            <IconButton size='xs' icon={FileDownloadSvgIcon} outline />
        </CSVLink>
    );
};
