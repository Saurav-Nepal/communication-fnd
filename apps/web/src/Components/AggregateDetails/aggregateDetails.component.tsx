import {
    Capitalize,
    FormatCurrency,
    FormatDisplayDate,
    ObjectDto,
} from '@finnoto/core';
import {
    Button,
    Modal,
    ModalBody,
    ModalContainer,
    ModalFooter,
    TableColumnType,
} from '@finnoto/design-system';

const AggregateDetails = ({
    func,
    column,
    data,
}: {
    func: string;
    column: ObjectDto;
    data: ObjectDto;
}) => {
    const getFormatedData = (value: any, type: TableColumnType) => {
        if (!value) return 'N/A';
        switch (type) {
            case 'currency':
            // case 'currency_color':
            case 'currency_acc':
                return FormatCurrency({ amount: value });
            case 'date':
            case 'date_lateral':
                return FormatDisplayDate(value);
            case 'date_time':
                return FormatDisplayDate(value, true);
            default:
                return value;
        }
    };

    return (
        <ModalContainer title={`${Capitalize(func)} of ${column.name}`}>
            <ModalBody>
                <div className='justify-around gap-6 row-flex'>
                    <div className='font-medium'>{column.name}:</div>
                    <div>{getFormatedData(data.aggregate, column.type)}</div>
                </div>
            </ModalBody>
            <ModalFooter className='!justify-end py-2'>
                <Button appearance='success' onClick={() => Modal.close()}>
                    Done
                </Button>
            </ModalFooter>
        </ModalContainer>
    );
};

export default AggregateDetails;
