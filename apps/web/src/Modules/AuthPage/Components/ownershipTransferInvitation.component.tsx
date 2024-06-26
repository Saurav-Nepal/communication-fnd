'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useList } from 'react-use';

import {
    Authentication,
    FetchData,
    IsEmptyArray,
    IsFunction,
    LISTING_CONTROLLER_ROUTER,
    Navigation,
    ObjectDto,
    VENDOR_ACCOUNT_DETAIL_ROUTE,
} from '@finnoto/core';
import { Button, Icon, Modal, Toast } from '@finnoto/design-system';

import {
    OnBoardingImgSvg,
    OnBoardingSolidImgSvg,
    RejectSvgIcon,
    TickMarkSvgIcon,
} from 'assets';

const OwnershipTransferInvitations = ({
    callback,
    ...props
}: {
    invitations?: ObjectDto[];
    callback?: (business: ObjectDto) => Promise<void>;
    type?: 'vendor_ownership_transfer' | 'meta_vendor_ownership_transfer';
    setBussinessResponse?: Dispatch<SetStateAction<any>>;
    setIsRejected?: Dispatch<SetStateAction<boolean>>;
}) => {
    const className = useMemo(
        () =>
            LISTING_CONTROLLER_ROUTER[
                props.type || 'vendor_ownership_transfer'
            ],
        [props.type]
    );
    const [invitations = [], { updateAt }] = useList(
        props.invitations || [
            {
                name: 'New Business One',
                id: 1,
            },
        ]
    );

    const [loading, setLoading] = useState<'accept' | 'reject'>();
    const [expanded, setExpanded] = useState(0);

    const handleAccept = async (business: ObjectDto, index: number) => {
        const token: string = await Authentication.fetchAccessToken(true);
        setLoading('accept');
        const { success, response } = await FetchData({
            className,
            method: 'accept',
            methodParams: business?.id,
            classParams: {
                token,
            },
        });

        if (success) {
            updateAt(index, { ...invitations[index], accepted: true });
            Toast.success({
                description: 'Business successfully accepted!',
            });

            if (props?.type === 'meta_vendor_ownership_transfer') {
                callback(business);
                return;
            }
            if (invitations.length === 1) {
                Navigation.navigate({
                    url: `${VENDOR_ACCOUNT_DETAIL_ROUTE}/${response?.billing_id}`,
                });
                Modal.close();
                // handleDone();
            }
        } else {
            Toast.error({
                description: response.message || 'Something went wrong!',
            });
        }
        setLoading(undefined);
    };

    const handleReject = async (id: number, index: number) => {
        setLoading('reject');
        const token: string = await Authentication.fetchAccessToken(true);
        const { success, response } = await FetchData({
            className,
            method: 'reject',
            methodParams: id,
            classParams: {
                token,
            },
        });

        if (success) {
            updateAt(index, { ...invitations[index], rejected: true });
            Toast.success({
                description: 'Business successfully rejected!',
            });
            if (invitations.length === 1) {
                // handleDone();
            }
        } else {
            Toast.error({
                description: response.message || 'Something went wrong!',
            });
        }
        setLoading(undefined);
        if (props && IsFunction(props?.setIsRejected))
            props?.setIsRejected(true);
        if (props && IsFunction(props?.setBussinessResponse))
            props?.setBussinessResponse(undefined);

        Modal.closeAll();
    };

    return (
        <div className=' px-8 py-6 gap-4 col-flex min-h-[80vh]  '>
            <div className='flex flex-col flex-1 w-full justify-evenly'>
                <div className='gap-6 mt-5 text-center col-flex'>
                    <p className='text-xl font-medium text-base-primary'>
                        Ownership Transfer
                    </p>
                    <p className='text-sm text-base-secondary'>
                        Do you accept the ownership transfer? This action grants
                        you the access to vendor portal. Kindly accept the
                        ownership transfer requests listed below.
                    </p>
                </div>

                <div className='flex flex-col flex-1 justify-evenly'>
                    <div className='flex items-center justify-center w-full h-80'>
                        <div className='flex items-center  justify-center h-60 w-60 rounded-full bg-[#4CC3C733] '>
                            <Icon
                                iconClass='flex items-center justify-center'
                                source={OnBoardingImgSvg}
                                isSvg
                                size={150}
                            />
                        </div>
                    </div>

                    <div className='h-full overflow-y-auto hide-scrollbar-business '>
                        {!IsEmptyArray(invitations) ? (
                            <div className='gap-3 col-flex'>
                                {invitations.map((business, index) => (
                                    <div
                                        key={business.id}
                                        className='transition-all border rounded-lg shadow-sm cursor-pointer select-none border-base-300 col-flex hover:border-border-300'
                                    >
                                        <div
                                            className='items-center gap-3 px-4 py-3 row-flex'
                                            onClick={() => setExpanded(index)}
                                        >
                                            <div className='w-8 h-8 overflow-hidden rounded centralize bg-accent/20 text-accent'>
                                                <Icon
                                                    source={
                                                        OnBoardingSolidImgSvg
                                                    }
                                                    isSvg
                                                    size={24}
                                                />
                                            </div>
                                            <div className='col-flex'>
                                                <span className='text-base font-medium text-base-primary'>
                                                    {business?.billing?.name}
                                                </span>
                                                <div className='text-sm'>
                                                    {business?.business?.name}
                                                </div>
                                            </div>
                                        </div>
                                        {!business.accepted &&
                                        !business.rejected ? (
                                            <AnimateHeight
                                                height={
                                                    expanded === index
                                                        ? 'auto'
                                                        : 0
                                                }
                                            >
                                                <div className='items-center justify-end gap-4 px-4 pb-3 row-flex'>
                                                    <Button
                                                        appearance='error'
                                                        size='sm'
                                                        outline
                                                        disabled={
                                                            loading === 'accept'
                                                        }
                                                        loading={
                                                            loading === 'reject'
                                                        }
                                                        onClick={() => {
                                                            handleReject(
                                                                business.id,
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <Icon
                                                                source={
                                                                    RejectSvgIcon
                                                                }
                                                                isSvg
                                                                size={24}
                                                            />
                                                            Reject
                                                        </div>
                                                    </Button>
                                                    <Button
                                                        appearance='success'
                                                        size='sm'
                                                        disabled={
                                                            loading === 'reject'
                                                        }
                                                        loading={
                                                            loading === 'accept'
                                                        }
                                                        onClick={() =>
                                                            handleAccept(
                                                                business,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <div className='flex items-center justify-center gap-2'>
                                                            {!loading && (
                                                                <Icon
                                                                    source={
                                                                        'check_circle_outline'
                                                                    }
                                                                    size={24}
                                                                />
                                                            )}
                                                            Accept
                                                        </div>
                                                    </Button>
                                                </div>
                                            </AnimateHeight>
                                        ) : (
                                            <div className='items-center px-4 pb-3 row-flex'>
                                                {business.accepted ? (
                                                    <span className='h-6 w-6  bg-[#28D139] rounded-full flex justify-center items-center pt-1'>
                                                        <Icon
                                                            source={
                                                                TickMarkSvgIcon
                                                            }
                                                            isSvg
                                                            size={14}
                                                            className='mb-1 text-white'
                                                        />
                                                    </span>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnershipTransferInvitations;
