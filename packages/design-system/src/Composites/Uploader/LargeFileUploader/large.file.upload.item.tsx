import { useCallback } from 'react';

import { Icon, Progress, Tooltip, Typography } from '../../../Components';
import { cn } from '../../../Utils/common.ui.utils';
import { GetDocumentIconByExtension } from '../uploader.utils';
import { FileStatusType } from './large.files.types';

import { Fail, VerifiedTickSvgIcon } from 'assets';

export const LargeFileUploadItem = ({
    file,
    status,
    errorMessage,
    slug,
    completedPercentage,
}: {
    file: File;
    status: FileStatusType;
    errorMessage?: string;
    slug?: string;
    completedPercentage?: number;
}) => {
    const renderFileProgress = useCallback(() => {
        if (status === 'completed')
            return (
                <Icon
                    size={20}
                    isSvg
                    source={VerifiedTickSvgIcon}
                    iconColor={'text-success'}
                />
            );
        if (status === 'error')
            return (
                <Tooltip
                    key={slug}
                    className='text-error'
                    message={errorMessage}
                >
                    <div>
                        <Icon
                            size={20}
                            isSvg
                            source={Fail}
                            iconColor={'text-error'}
                        />
                    </div>
                </Tooltip>
            );

        return <LoadingSpinner loading={status === 'pending'} />;
    }, [errorMessage, slug, status]);

    return (
        <div className='col-flex relative  min-h-[60px]  border-b px-4  bg-base-100'>
            <div className='flex items-center min-h-[58px] justify-between gap-4 py-2 overflow-hidden text-xs border-base-300 '>
                <div className='flex items-center gap-3 overflow-hidden '>
                    <Icon
                        source={GetDocumentIconByExtension(
                            file?.type?.split('/').pop()
                        )}
                        isSvg
                        size={20}
                        iconColor='text-base-tertiary -mt-1'
                    />
                    <div className='overflow-hidden font-medium text-left col-flex text-base-primary'>
                        <Typography className='w-full overflow-hidden text-xs truncate text-ellipsis'>
                            {file?.name}
                        </Typography>

                        <Typography className='text-[10px] font-normal uppercase text-base-tertiary '>
                            {Math.round(file?.size / 1024)}KB
                        </Typography>
                    </div>
                </div>
                {renderFileProgress()}
            </div>
            {status === 'pending' && (
                <div className='absolute items-center gap-2 left-4 right-3 bottom-[1px] row-flex'>
                    <Progress
                        className='h-[4px] '
                        backgroundColor='base'
                        indicatorColor='success'
                        value={completedPercentage}
                    />

                    <span className='text-xs'>{completedPercentage}%</span>
                </div>
            )}
        </div>
    );
};

const LoadingSpinner = ({ loading }: { loading?: boolean }) => {
    return (
        <div
            className={cn(
                '  border-slate-300  border-2 spin flex animate-spin items-center justify-center rounded-full text-sm h-[20px] text-base-primary w-[20px]',
                {
                    'border-success border-r-slate-300': loading,
                }
            )}
        ></div>
    );
};
