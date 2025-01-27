'use client';

import { BreadCrumb, Button } from '@slabs/ds-core';

import { PageLoader } from '../../../components/loader';
import { useFetchParams } from '../../../hooks/useFetchParams.hook';
import YourTemplateEditor from './components/YourTemplateEditor.component';
import { useHandleTemplate } from './hook/useHandleTemplate.hook';

export default function CreateTemplatePage() {
    const { id } = useFetchParams();
    const { ref, onSubmit, isLoading, defaultData, isFetched } =
        useHandleTemplate(id);

    if (isLoading) return <PageLoader />;

    return (
        <div className='container flex relative flex-col gap-5 p-6 mx-auto h-content-screen'>
            <div className='flex justify-between items-center'>
                <BreadCrumb title='New Template'>
                    {[<p>Home</p>, <p>New Template</p>]}
                </BreadCrumb>
                <div className='flex gap-4 justify-end items-center'>
                    <Button variant={'outline'}>Save Draft</Button>
                    <Button
                        disabled={ref?.current?.disableSubmit}
                        variant={'default'}
                        color={'primary'}
                        onClick={ref?.current?.handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>

            {isFetched ? ( // For Edit
                <YourTemplateEditor
                    defaultValues={defaultData}
                    onSubmit={onSubmit}
                    ref={ref}
                />
            ) : (
                <YourTemplateEditor onSubmit={onSubmit} ref={ref} />
            )}
        </div>
    );
}
