/*********************************************************
 * Applies the component received under filter object
 * Filter object is supposed to have path which is
 * resolved at run time.
 *
 *********************************************************/

import { ReactNode } from 'react';

// import { Filters } from './../../Constants/filters';
// import { AsyncComponent as LoadAsyncComponent } from './../../Async/async';

interface PROPS {
    filter: {
        name: string;
        column_type: number;
        path: string;
    };
    data: any;
    listingRow: object;
    modelHash: string;
    menuUrl: string;
    name: string;
    identifier: number;
    selectedColumn: object;
    rowKey: number;
    url: string;
    callback: Function;
    placement: any;
}

export const ParseComponent = (props: PROPS) => {
    const {
        filter: filterObj,
        data,
        listingRow,
        modelHash,
        menuUrl,
        name,
        identifier,
        selectedColumn,
        rowKey,
        url,
        callback,
        placement,
    } = props;

    const renderData = (data: ReactNode) => {
        if (typeof data === 'object' && data !== null) {
            data = JSON.stringify(data);
        } else if (data === null) {
            data = '';
        }
        if (props.placement === 'title') return data;
        return <span className='printable'>{data}</span>;
    };

    // let Comp;

    // if (filterObj && filterObj.path && placement !== 'title') {
    //     const filter = Filters[filterObj.name];
    //     if (filter) {
    //         // try {
    //         //     Comp = LoadAsyncComponent(
    //         //         () => import(`./../${filter.path}`)
    //         //     );
    //         //     return (
    //         //         <Comp
    //         //             modelHash={modelHash}
    //         //             data={data}
    //         //             listingRow={listingRow}
    //         //             menuUrl={menuUrl}
    //         //             name={name}
    //         //             identifier={identifier}
    //         //             selectedColumn={selectedColumn}
    //         //             rowKey={rowKey}
    //         //             url={url}
    //         //             callback={callback}
    //         //         />
    //         //     );
    //         // } catch (e) {
    //         renderData(data);
    //         // }
    //     }
    // }
    return renderData(data);
};
