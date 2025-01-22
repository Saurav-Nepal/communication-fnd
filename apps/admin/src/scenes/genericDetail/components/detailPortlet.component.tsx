import { useCopyToClipboard } from 'react-use';

import { cn } from '@slabs/ds-utils';

import { RowTemplate } from '@/components/portletTable/utils/portletTable.utils';
import useUser from '@/hooks/useUser.hook';
import { GENERIC_DATA } from '@/types';
import { Toast } from '@/utils/toast.utils';

interface DetailPortletProps {
    finalColumns: any[];
    listingRow: object;
    starter: any;
    genericData: GENERIC_DATA;
    callback: any;
}

const DetailPortlet = ({
    finalColumns,
    listingRow,
    starter,
    genericData,
    callback,
}: DetailPortletProps) => {
    const [_, CopyToClipboard] = useCopyToClipboard();
    const { user: userData } = useUser();

    const rowOptions = [
        {
            id: 0,
            name: 'Copy Column Name',
            icon: 'fa-copy',
            subMenu: false,
            onClick: (data) => {
                const prop = data.selectedColumn.name;
                CopyToClipboard(prop);
                Toast.success({
                    description:
                        'Column name ' +
                        data.selectedColumn.name +
                        ' has been copied',
                    title: 'Column Name',
                });
            },
        },
        {
            id: 0,
            name: 'Copy Property',
            icon: 'fa-copy',
            subMenu: false,
            onClick: (data) => {
                const prop = data.listingRow[data.selectedColumn.path];
                CopyToClipboard(prop);
                Toast.success({
                    description:
                        'Property of ' +
                        data.selectedColumn.path +
                        ' has been copied',
                    title: 'Copy ' + data.selectedColumn.path,
                });
            },
        },
        {
            id: 1,
            name: 'Copy Row Id',
            icon: 'fa-copy',
            subMenu: false,
            onClick: (data) => {
                const id = data.listingRow[data.starter + '.id'];
                CopyToClipboard(id);
                Toast.success({
                    description: 'Id - ' + id + ' has been copied',
                    title: 'Copy Id',
                });
            },
        },
    ];

    let isSplitStart = false;

    return (
        <div className='detail-portlet'>
            <div className='flex flex-wrap'>
                {finalColumns.map((selectedColumn, key) => {
                    if (selectedColumn.isSplit) {
                        isSplitStart = !isSplitStart;
                        return null;
                    }
                    if (selectedColumn.separator) {
                        return (
                            <div
                                key={key}
                                className='w-full [&:nth-child(4n+1)]:bg-muted/70 [&:nth-child(4n)]:bg-muted'
                            >
                                <div className='detail-entry'>
                                    <div className='seperator'>
                                        <strong>
                                            {selectedColumn.columnTitle ||
                                                selectedColumn.label}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return (
                        // <RightClick
                        //     className={cn('gray-border-bottom', {
                        //         'w-1/2': isSplitStart,
                        //         'w-full': !isSplitStart,
                        //     })}
                        //     key={key}
                        //     rowOptions={rowOptions}
                        //     listingRow={listingRow}
                        //     selectedColumn={selectedColumn}
                        //     starter={starter}
                        //     disabled={
                        //         !GetUserDetail(userData).hasRole(
                        //             'developer'
                        //         )
                        //     }
                        // >
                        <div
                            className={cn(
                                '[&:nth-child(4n+1)]:bg-background/70 [&:nth-child(4n)]:bg-background/70 hover:!bg-background/70 transition-all',
                                {
                                    'w-1/2': isSplitStart,
                                    'w-full': !isSplitStart,
                                }
                            )}
                            key={key}
                        >
                            <div className='flex justify-between px-4 py-2 text-sm detail-entry'>
                                <strong className='text-muted-foreground'>
                                    {selectedColumn.display_name}
                                </strong>
                                <div>
                                    {RowTemplate({
                                        selectedColumn,
                                        listingRow,
                                        url: genericData.url,
                                        identifier: starter,
                                        callback: callback,
                                    })}
                                </div>
                            </div>
                        </div>
                        // </RightClick>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailPortlet;
