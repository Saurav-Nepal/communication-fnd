import { useMemo, useState } from 'react';

import { FormatDisplayDate, IsEmptyArray, useUserHook } from '@finnoto/core';
import { CheckBox, cn, NoDataFound } from '@finnoto/design-system';

import InvoiceCommentCard from './invoiceComment.component';

import { NoNotesFoundSvgIcon } from 'assets';

const InvoiceNoteList = ({
    data,
    onClickToDelete,
    onClickToEdit,
    hideheader = false,
    addNotes = () => {},
    showConfirm,
    isCheckSystemGenerated = false,
}: any) => {
    const [filter, setFilter] = useState<any>(
        isCheckSystemGenerated ? 'all' : 'user'
    );
    const { user } = useUserHook();

    const filteredData = useMemo(() => {
        if (filter === 'all') {
            return data;
        }
        if (filter === 'internal') {
            return data.filter((val) => val?.is_system_generated);
        }
        return data.filter((val) => !val?.is_system_generated);
    }, [data, filter]);

    if (IsEmptyArray(data))
        return (
            <div className='h-full centralize'>
                <NoDataFound
                    icon={NoNotesFoundSvgIcon}
                    title='There is no notes here !'
                    description='To add new notes click on button below'
                    button={{
                        name: 'Add Notes',
                        onClick: addNotes,
                    }}
                />
            </div>
        );
    // const handleDelete = (id: number) => {
    //     ConfirmUtil({
    //         message: 'Are you want to sure to delete this note?',
    //         icon: DeleteSvgIcon,
    //         onConfirmPress: () => {
    //             onClickToDelete(id);
    //             Modal.close();
    //         },
    //         confirmAppearance: 'error',
    //         title: 'Delete',
    //         iconAppearance: 'error',
    //     });
    // };
    return (
        <div className='h-full gap-2 px-4 col-flex'>
            {!hideheader && (
                <div className='flex items-center justify-between'>
                    <p className='text-base font-medium'>Notes</p>
                    <div>
                        <CheckBox
                            rightLabel='System Generated'
                            onChange={(state) => {
                                setFilter(state ? 'all' : 'user');
                            }}
                            size='xs'
                            defaultChecked={isCheckSystemGenerated}
                        />
                    </div>
                </div>
            )}

            <div
                className={cn(
                    'h-full gap-3 overflow-y-auto col-flex',
                    hideheader && 'pt-2'
                )}
            >
                {IsEmptyArray(filteredData) ? (
                    <div className='flex items-center justify-center h-full'>
                        <NoDataFound title='No Notes Available' />
                    </div>
                ) : (
                    filteredData.map((val, index) => {
                        return (
                            <InvoiceCommentCard
                                showConfirm={showConfirm}
                                data={val}
                                key={index}
                                user={user}
                                onClickToDelete={onClickToDelete}
                                onClickToEdit={onClickToEdit}
                                created_by={val?.creator?.name}
                                appearance={
                                    val?.is_system_generated
                                        ? 'systemGen'
                                        : 'secondary'
                                }
                                isLatest={index === 0}
                                time={FormatDisplayDate(val?.created_at)}
                                desc={val?.comments}
                                name={
                                    val?.is_system_generated
                                        ? 'System Generated'
                                        : val?.creator?.name
                                }
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default InvoiceNoteList;
