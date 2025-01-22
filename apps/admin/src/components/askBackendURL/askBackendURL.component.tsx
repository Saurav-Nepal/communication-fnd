import { Button } from '@slabs/ds-core';
import {
    Modal,
    ModalBody,
    ModalContainer,
    ModalFooter,
    ModalTitle,
} from '@slabs/ds-dialog';
import { getUniqueObjectsFromArrayByKey, ObjectDto } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import {
    BACKEND_URL,
    BUSINESS_API_HISTORY,
    ORGANIZATION_NAME,
} from '@/constants/storage.constants';
import { FormBuilderFormSchema, FormBuilderSubmitType } from '@/types';
import { GetItem, SetItem } from '@/utils/localStorage.utils';

import { FormBuilder } from '../formBuilder/formBuilder.component';

const AskBackendURL = () => {
    const formSchema: FormBuilderFormSchema = {
        url: {
            type: 'url',
            label: 'Backend URL',
            placeholder: 'Eg. https://example.com/',
            required: true,
        },
        org_name: {
            type: 'text',
            label: 'Organization Name',
            placeholder: 'Enter Organization Name',
        },
    };

    const handleSubmit: FormBuilderSubmitType = (values) => {
        let url = values.url as String;
        if (!url.endsWith('/')) {
            url += '/';
        }

        const businessApiUrls = new Set(
            (GetItem(BUSINESS_API_HISTORY, true) as ObjectDto[]) || []
        );

        if (!businessApiUrls.size) {
            const backend_url = GLOBAL.ROUTE_URL;

            if (backend_url) {
                const org_name = GLOBAL.ORGANIZATION.name || 'Admin';

                businessApiUrls.add({ label: org_name, value: backend_url });
            }
        }

        businessApiUrls.add({ label: values.org_name, value: url });
        SetItem(
            BUSINESS_API_HISTORY,
            getUniqueObjectsFromArrayByKey(
                Array.from(businessApiUrls),
                'value'
            ),
            {
                isNonVolatile: true,
            }
        );
        SetItem(BACKEND_URL, url, { isNonVolatile: true });
        SetItem(ORGANIZATION_NAME, values.org_name, { isNonVolatile: true });

        window.location.reload();
    };

    return (
        <ModalContainer>
            <ModalTitle title='Enter Backend URL' />
            <FormBuilder
                formSchema={formSchema}
                onSubmit={handleSubmit}
                withModalBody
            >
                {({ isSubmitting, isValidating }) => (
                    <ModalFooter className='justify-end gap-4 border-t'>
                        <Button
                            type='reset'
                            variant='ghost'
                            color='error'
                            onClick={() => Modal.closeAll()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            color='primary'
                            disabled={isSubmitting || isValidating}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                )}
            </FormBuilder>
        </ModalContainer>
    );
};

export default AskBackendURL;
