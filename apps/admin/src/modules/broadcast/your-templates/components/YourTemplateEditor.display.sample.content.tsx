import { useMemo } from 'react';

import { Input } from '@slabs/ds-core';
import { isEmptyArray, ObjectDto } from '@slabs/ds-utils';

import { getVariableParamsFromString } from '../../../../utils/common.utils';

const YourTemplateEditorDisplaySampleContent = ({
    title,
    body,
    onBodyChange,
    defaultVal,
}: {
    title: any;
    body: any;
    onBodyChange?: any;
    defaultVal?: ObjectDto;
}) => {
    const variables = useMemo(() => {
        const titleVar = getVariableParamsFromString(title?.value);
        const bodyVar = getVariableParamsFromString(body);

        return [...titleVar, ...bodyVar];
    }, [title, body]);

    if (isEmptyArray(variables)) return <></>;

    return (
        <div className='flex flex-col'>
            <hr className='my-4 border-t border-gray-300' />
            <h3 className='font-semibold'>Sample Content</h3>
            <p className='text-xs'>
                Just enter sample content here (it doesn’t need to be exact!)
            </p>
            <div className='flex flex-col gap-2 my-4'>
                {variables.map((variable, index) => {
                    const data = defaultVal?.[variable];
                    return (
                        <Input
                            defaultValue={data}
                            key={variable}
                            placeholder={`Enter the sample value for ${variable}`}
                            onChange={(e) => {
                                onBodyChange?.(variable, e.target.value);
                            }}
                        />
                    );
                })}
            </div>
            <p className='text-xs'>
                Make sure not to include any actual user or customer
                information, and provide only sample content in your examples.
                Learn more
            </p>
        </div>
    );
};

export default YourTemplateEditorDisplaySampleContent;
