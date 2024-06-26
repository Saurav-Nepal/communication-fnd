'use client';

import { useEffect, useState } from 'react';

import {
    FetchData,
    FormBuilderSubmitType,
    GetObjectFromArray,
    IsEmptyArray,
    LOGIN_ROUTE,
    Navigation,
    ObjectDto,
    VENDOR_REGISTER_ROUTE,
} from '@finnoto/core';
import { MetaBusinessController } from '@finnoto/core/src/backend/meta/controllers/meta.business.controller';
import {
    Button,
    Icon,
    InputField,
    Modal,
    PageLoader,
    Toast,
} from '@finnoto/design-system';

import { OnBoardingImgSvg } from 'assets';

const BusinessOnboarding = ({
    callback = () => {},
    data = {},
}: {
    callback: (business: ObjectDto) => void;
    data?: ObjectDto;
}) => {
    const [loading, setLoading] = useState(false);

    const [orgName, setOrgName] = useState('');
    let syncTimeout: any;

    useEffect(() => {
        return () => {
            clearTimeout(syncTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncTimeout]);

    const handleSubmit: FormBuilderSubmitType = async () => {
        const { success, response } = await FetchData({
            className: MetaBusinessController,
            method: 'onboarding',
            classParams: {
                name: orgName,
            },
        });

        if (!success) {
            Toast.error({
                description: response.message || 'Something Went Wrong!!',
            });
        }

        if (success) {
            setLoading(true);
            startSync(response.id);
        }
    };

    const startSync = async (business_id: number) => {
        let count = 0;
        const delta = 2000;

        const start = async () => {
            count++;
            const { success, response } = await FetchData({
                className: MetaBusinessController,
                method: 'list',
            });

            if (success && !IsEmptyArray(response)) {
                const business = GetObjectFromArray(
                    response,
                    'id',
                    business_id
                );

                if (business) {
                    setLoading(false);
                    return callback(business);
                }
            }

            if (count < 5) {
                syncTimeout = setTimeout(() => {
                    start();
                }, delta);
            }
        };

        syncTimeout = setTimeout(start, delta);
    };

    return (
        <div className=' px-8 py-6 gap-4 col-flex w-[544px] max-h-[480px] modal-bg dark:bg-base-100'>
            {loading ? (
                <PageLoader />
            ) : (
                <>
                    <div className='flex items-center justify-center w-full'>
                        <div className='flex items-center  justify-center h-36 w-36 rounded-full bg-[#4CC3C733] '>
                            <Icon
                                iconClass='flex items-center justify-center'
                                source={OnBoardingImgSvg}
                                isSvg
                                size={88}
                            />
                        </div>
                    </div>
                    <form className='gap-8 col-flex'>
                        <div className='gap-2 text-center col-flex v'>
                            <p className='text-xl font-medium'>
                                Let’s start your business journey
                            </p>
                            <p className='text-sm font-medium'>
                                Create your organization profile
                            </p>
                        </div>
                        <div className='bg-base-100'>
                            <InputField
                                value={orgName}
                                onChange={setOrgName}
                                maxLength={60}
                                placeholder={'Enter your organization name'}
                                name='organization_name'
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4 '>
                            <Button
                                className='mt-auto normal-case'
                                block
                                appearance='base'
                                onClick={() => Modal.close()}
                            >
                                Close
                            </Button>
                            <Button
                                className='mt-auto normal-case'
                                block
                                appearance='primary'
                                onClick={handleSubmit}
                                disabled={orgName.length < 3}
                            >
                                Continue
                            </Button>
                        </div>
                        <div className='items-center justify-between w-full mt-2 text-center row-flex'>
                            <a
                                onClick={() => {
                                    Modal.close();
                                    Navigation.navigate({ url: LOGIN_ROUTE });
                                }}
                                className='text-sm cursor-pointer link link-hover'
                            >
                                Login with different user
                            </a>
                            <a
                                onClick={() => {
                                    Modal.close();
                                    Navigation.navigate({
                                        url: VENDOR_REGISTER_ROUTE,
                                    });
                                }}
                                className='text-sm cursor-pointer link link-hover'
                            >
                                Login as vendor
                            </a>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default BusinessOnboarding;
