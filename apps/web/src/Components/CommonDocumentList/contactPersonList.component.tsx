import {
    EmptyFunction,
    IsEmptyArray,
    IsFunction,
    ObjectDto,
} from '@finnoto/core';
import {
    ConfirmUtil,
    Modal,
    NoDataFound,
    Table,
    TableColumn,
} from '@finnoto/design-system';

import { DeleteSvgIcon, NoContactFoundSvgIcon } from 'assets';

const ContactPersonList = ({
    data,
    loading,
    pagination,
    setPagination,
    onEdit = EmptyFunction,
    onRemove,
    addContactPerson,
    isRowActionVisible = true,
}: any) => {
    const column: TableColumn[] = [
        {
            name: 'Name',
            key: 'name',
        },

        {
            name: 'Email',
            key: 'email',
        },
        {
            name: 'Mobile',
            key: 'mobile',
        },
    ];

    if (IsEmptyArray(data))
        return (
            <div className='h-full border rounded-lg border-polaris-border bg-polaris-bg-surface'>
                <NoDataFound
                    title='There is no contact person here !'
                    description='To add new contact person click on button below'
                    icon={NoContactFoundSvgIcon}
                    button={{
                        name: 'Add Contact Person',
                        onClick: addContactPerson,
                    }}
                    enableAddNew={IsFunction(addContactPerson)}
                />
            </div>
        );
    return (
        <Table
            {...{
                column,
                data,
                loading,
                //@todo-row action was not working
                // rowAction: {
                //     display: isRowActionVisible,
                //     menuActions: [
                //         {
                //             name: 'Edit',

                //             action: onEdit,

                //             color: 'text-info',
                //         },
                //         {
                //             name: 'Delete',

                //             action: (item: ObjectDto) => {
                //                 ConfirmUtil({
                //                     title: 'Confirm',
                //                     message:
                //                         'Are you sure you want to delete this contact person?',
                //                     icon: DeleteSvgIcon,
                //                     onCancelPress: () => {
                //                         Modal.close();
                //                     },
                //                     onConfirmPress: () => {
                //                         onRemove(item?.id);
                //                     },
                //                     iconAppearance: 'error',
                //                     confirmAppearance: 'error',
                //                 });
                //             },
                //             color: 'text-error',
                //             isCancel: true,
                //         },
                //     ],
                // },
            }}
            pagination={{
                pagination,
                onPaginationChange: (data) => {
                    setPagination(data);
                },
            }}
        />
    );
};

export default ContactPersonList;
