import { ObjectDto, TransformArrayObjectToKeyValueObject } from '@finnoto/core';

interface ExportCSVProps {
    data: ObjectDto[];
    headers: ObjectDto[];
    file_title?: string;
}
export const exportCSV = ({ data, headers, file_title }: ExportCSVProps) => {
    if (headers) {
        data.unshift(TransformArrayObjectToKeyValueObject(headers));
    }

    const csvString = convertToCSV(data);
    let exportedFilenmae = file_title + '.csv' || 'export.csv';

    let blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    if ((navigator as any).msSaveBlob) {
        // IE 10+
        (navigator as any).msSaveBlob(blob, exportedFilenmae);
    } else {
        let link = document.createElement('a');
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};

const convertToCSV = (objArray: ObjectDto[]) => {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    array.forEach((element: any) => {
        let line = '';
        for (let index in element) {
            if (line != '') line += ',';

            line += element[index];
        }

        str += line + '\r\n';
    });

    return str;
};
