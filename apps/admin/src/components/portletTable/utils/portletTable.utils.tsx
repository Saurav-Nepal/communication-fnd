import { isUndefinedOrNull } from '@slabs/ds-utils';

import { ParseComponent } from '@/components/genericColumnFilters/parseComponent.component';
import { COLUMN_TYPE } from '@/constants/columnType.constants';
import { Navigation } from '@/utils/navigation.utils';
import { GetTime } from '@/utils/time.utils';

/**
 * Will return value for all kind of columns
 * @param  {object} {selectedColumn - dictionary object
 * @param  {object} listingRow - data value
 * @param  {string} path='path'}
 */
export function ReportTemplate({ selectedColumn, listingRow, path = 'path' }) {
    // NOSONAR
    if (selectedColumn.type_id == COLUMN_TYPE.BOOLEAN) {
        return listingRow[selectedColumn.path] ? (
            <div className='text-success'>Yes</div>
        ) : (
            <div className='text-error'>No</div>
        );
    }
    if (selectedColumn.referenced_model_id) {
        const idPath = selectedColumn.referenced_column;
        path = `${selectedColumn.reference_model.menu_url}/${listingRow[idPath]}`;

        return (
            <a
                className='text-blue-500 cursor-pointer hover:underline printable'
                onClick={(e: any) => Navigation.navigate({ url: path }, e)}
            >
                {defaultRowValue({ listingRow, selectedColumn, path })}
            </a>
        );
    }
    return defaultRowValue({ listingRow, selectedColumn, path });
}

/**
 *
 * Template for reporting table
 *
 * @param  {object} {selectedColumn - dictionary object
 * @param  {object} listingRow - data value
 * @param  {string} path='path'}
 */
export function RowTemplate({
    // NOSONAR
    selectedColumn,
    listingRow,
    modelHash,
    name,
    identifier,
    rowKey,
    url,
    callback,
    placement,
}: any) {
    if (selectedColumn.type_id == COLUMN_TYPE.BOOLEAN) {
        /*  To support null values for boolean fields , we should do a check if the param
         has a value , only if it has the value we will check if it is true or false
        else we should show null */
        if (!isUndefinedOrNull(listingRow[selectedColumn.path]))
            return listingRow[selectedColumn.path] ? (
                <div className='text-success'>Yes</div>
            ) : (
                <div className='text-error'>No</div>
            );
        else return <div> Null</div>;
    }
    if (selectedColumn.type_id == COLUMN_TYPE.DATETIME) {
        return (
            <span className='printable'>
                {(listingRow[selectedColumn.path] &&
                    GetTime({ dateTime: listingRow[selectedColumn.path] })) ||
                    null}
            </span>
        );
    }

    if (selectedColumn.route && selectedColumn.menu_url) {
        const idPath = selectedColumn.parent + '.id';
        const path = `${selectedColumn.menu_url.indexOf('/') !== 0 ? '/' : ''}${
            selectedColumn.menu_url
        }/${listingRow[idPath]}`;
        return (
            <a
                className='text-blue-500 cursor-pointer hover:underline printable'
                onClick={(e: any) => Navigation.navigate({ url: path }, e)}
            >
                {defaultRowValue({
                    listingRow,
                    selectedColumn,
                    name,
                    identifier,
                    modelHash,
                    rowKey,
                    placement,
                })}
            </a>
        );
    }

    return defaultRowValue({
        listingRow,
        selectedColumn,
        modelHash,
        name,
        identifier,
        rowKey,
        url,
        callback,
        placement,
    });
}

function defaultRowValue({
    // NOSONAR
    listingRow,
    selectedColumn,
    modelHash,
    name,
    identifier,
    rowKey,
    url,
    callback,
    placement,
}: any) {
    try {
        return (
            <ParseComponent
                modelHash={modelHash}
                listingRow={listingRow}
                menuUrl={selectedColumn.menu_url}
                name={name}
                identifier={identifier}
                data={listingRow[selectedColumn.path]}
                filter={selectedColumn.filter}
                selectedColumn={selectedColumn}
                rowKey={rowKey}
                url={url}
                callback={callback}
                placement={placement}
            />
        );
    } catch (e) {
        console.error('row: defaultRowValue() - ', e);
        return '';
    }
}
