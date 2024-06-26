import { IsEmptyArray, IsFunction } from '@finnoto/core';
import { Button, NoDataFound } from '@finnoto/design-system';

import ContactDocListing from './contactDocList.component';

import { NoNotesFoundSvgIcon } from 'assets';

const CommonNoteList = ({ data = [], rowActions = [], addNote }: any) => {
    return (
        <div className='h-full px-1 overflow-hidden'>
            {/* {IsFunction(addNote) && (
                <div className='flex justify-end flex-1 pr-2'>
                    <Button size='sm' onClick={addNote} outline>
                        + Add Notes
                    </Button>
                </div>
            )} */}
            {!IsEmptyArray(data) ? (
                <div className='h-full overflow-hidden'>
                    <ContactDocListing
                        componentKey='notes'
                        rowActions={rowActions}
                        data={data}
                    />
                </div>
            ) : (
                <NoDataFound
                    icon={NoNotesFoundSvgIcon}
                    title='No records found for notes'
                    enableAddNew
                    button={{
                        onClick: addNote,
                        name: 'Notes',
                    }}
                />
            )}
        </div>
    );
};

export default CommonNoteList;
