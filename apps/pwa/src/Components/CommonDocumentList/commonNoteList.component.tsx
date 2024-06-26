import { IsEmptyArray } from '@finnoto/core';
import { NoDataFound } from '@finnoto/design-system';
import { NoNotesFoundSvgIcon } from 'assets';
import ContactDocListing from './contactDocList.component';

const CommonNoteList = ({
    data = [],
    rowActions = [],
    addNote = () => {},
}: any) => {
    return (
        <div className='h-full col-flex'>
            {!IsEmptyArray(data) ? (
                <ContactDocListing
                    componentKey='notes'
                    rowActions={rowActions}
                    data={data}
                />
            ) : (
                <NoDataFound
                    icon={NoNotesFoundSvgIcon}
                    title='No Notes!'
                    description='To add new notes click on button below'
                    // button={{
                    //     name: 'Add Notes',
                    //     onClick: addNote,
                    // }}
                />
            )}
        </div>
    );
};

export default CommonNoteList;
