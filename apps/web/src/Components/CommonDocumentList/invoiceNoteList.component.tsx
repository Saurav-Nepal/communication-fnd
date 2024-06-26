import { useMemo, useState } from 'react';

import {
    FormatDisplayDate,
    IsEmptyArray,
    IsFunction,
    useUserHook,
} from '@finnoto/core';
import {
    Button,
    CheckBox,
    cn,
    ConfirmUtil,
    Modal,
    NoDataFound,
} from '@finnoto/design-system';

import InvoiceCommentCard from './invoiceComment.component';

import { DeleteSvgIcon, NoNotesFoundSvgIcon } from 'assets';

const InvoiceNoteList = ({
    data,
    onClickToDelete,
    onClickToEdit,
    hideheader = false,
    addNotes,
    containerClass,
    noDataFound = {},
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
            return data?.filter((val) => val?.is_system_generated);
        }
        return data?.filter((val) => !val?.is_system_generated);
    }, [data, filter]);

    if (IsEmptyArray(data))
        return (
            <div className='flex items-center justify-center h-full'>
                <NoDataFound
                    icon={NoNotesFoundSvgIcon}
                    title={noDataFound?.title || 'There is no notes here !'}
                    description={
                        noDataFound?.description ||
                        'To add new notes click on button below'
                    }
                    button={
                        IsFunction(addNotes)
                            ? {
                                  name: 'Add Notes',
                                  onClick: addNotes,
                              }
                            : null
                    }
                />
            </div>
        );
    const handleDelete = (id: number, modal = true) => {
        ConfirmUtil({
            message: 'Are you want to sure to delete this note?',
            icon: DeleteSvgIcon,
            onConfirmPress: () => {
                onClickToDelete?.(id);
            },
            confirmAppearance: 'error',
            title: 'Delete',
            iconAppearance: 'error',
        });
    };
    return (
        <div className='flex-1 h-full max-h-full gap-4 overflow-hidden col-flex'>
            {!hideheader && (
                <div className='flex items-center justify-between'>
                    <p className='font-medium text-base-'>Notes</p>
                    <div className='items-center gap-2 row-flex'>
                        <CheckBox
                            rightLabel='Show System Generated'
                            onChange={(state) => {
                                setFilter(state ? 'all' : 'user');
                            }}
                            size='xs'
                            defaultChecked={isCheckSystemGenerated}
                        />
                        {!IsEmptyArray(filteredData) &&
                            IsFunction(addNotes) && (
                                <Button size='sm' onClick={addNotes} outline>
                                    + Add Notes
                                </Button>
                            )}
                    </div>
                </div>
            )}

            <div
                className={cn(
                    'gap-2 max-h-full flex-1 h-full overflow-y-auto col-flex scrollbar-none',
                    hideheader && 'pt-2',
                    containerClass
                )}
            >
                {IsEmptyArray(filteredData) ? (
                    <div className='flex items-center justify-center h-full'>
                        <NoDataFound
                            title='No Notes Available'
                            button={
                                IsFunction(addNotes)
                                    ? {
                                          name: 'Add Notes',
                                          onClick: addNotes,
                                      }
                                    : null
                            }
                        />
                    </div>
                ) : (
                    filteredData.map((val, index) => {
                        return (
                            <InvoiceCommentCard
                                data={val}
                                key={index}
                                user={user}
                                onClickToDelete={handleDelete}
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
