import React, { lazy, Suspense } from 'react';

import { Label } from '@slabs/ds-core';

const Editor = lazy(() => import('@/components/aceEditor/aceEditor.component'));

const JSONInput = ({
    value,
    label,
    className,
    name,
    required,
    error,
    message,
    messageComponent,
    onChange = () => {},
}: any) => {
    // const ajv = new Ajv({ allErrors: true });

    // const validateJson = (editor: Ace.Editor) => {
    //     try {
    //         const data = JSON.parse(editor.getSession().getValue());
    //         const schema = {
    //             type: 'object',
    //         };
    //         const validate = ajv.compile(schema);
    //         const valid = ajv.validate(schema, data);
    //         console.log('valid', editor.getValue(), valid);
    //     } catch (e) {
    //         console.log('e', e.position);
    //     }
    // };

    return (
        <div className={`form-control ${className ?? ''}`}>
            {label && <Label label={label} name={name} required={required} />}
            <Suspense fallback={<div>Loading...</div>}>
                <Editor
                    onChange={onChange}
                    value={JSON.stringify(value, null, 2)}
                    toolBar={false}
                    onSubmit={() => {}}
                    modeType={1}
                    modes={[{ id: 1, name: 'JSON', value: 'json' }]}
                    height='200px'
                    // onInput={validateJson}
                />
            </Suspense>
            {error && (
                <span className='label label-text-alt text-error'>{error}</span>
            )}
            {message && !error && (
                <span className='label label-text-alt text-color-secondary'>
                    {message}
                </span>
            )}
            {messageComponent ? <div>{messageComponent}</div> : null}
        </div>
    );
};

export default JSONInput;
