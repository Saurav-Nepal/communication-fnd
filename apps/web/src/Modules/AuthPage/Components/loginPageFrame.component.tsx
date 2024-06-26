import Image from 'next/image';
import { ReactNode } from 'react';

import { useTheme } from '@finnoto/core';
import { cn, Icon, PageTitle, Typography } from '@finnoto/design-system';

import { DarkLogoSvgIcon, SmallLogoSvgIcon } from 'assets';

const LoginPageFrame = ({
    children,
    className,
    frameClassName,
}: {
    children: ReactNode;
    className?: string;
    frameClassName?: string;
}) => {
    return (
        <div
            className={cn(
                'h-full min-h-screen py-10 2xl:h-screen centralize bg-base-200',
                frameClassName
            )}
        >
            <div
                className={cn(
                    'min-h-[680px] shadow-lg bg-base-100 col-flex overflow-hidden rounded min-w-[470px] dark:shadow-none dark:border',
                    className
                )}
            >
                {children}
            </div>
        </div>
    );
};

export const AuthenticationUIWrapper = ({
    children,
    pageTitle,
    title,
    subTitle,
    containerClassName,
    headerClassName,
}: {
    children: ReactNode;
    pageTitle?: string;
    title?: string;
    subTitle?: string | ReactNode;
    containerClassName?: string;
    headerClassName?: string;
}) => {
    const pageTitleText = pageTitle || title;
    const { isDarkMode } = useTheme();

    return (
        <div className='flex-1 h-full px-8 py-6 col-flex'>
            <PageTitle title={pageTitleText} />
            <div className='mb-6 centralize'>
                {process.env['SMALL_LOGO'] ? (
                    <Image
                        src={process.env['SMALL_LOGO']}
                        alt='Brand Logo'
                        height={48}
                        width={48}
                        style={{
                            maxHeight: 48,
                            maxWidth: 48,
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                        unoptimized
                        priority
                    />
                ) : (
                    <Icon
                        source={isDarkMode ? SmallLogoSvgIcon : DarkLogoSvgIcon}
                        isSvg
                        size={48}
                    />
                )}
            </div>
            <div
                className={cn(
                    'gap-2 text-center col-flex max-w-[500px]',
                    headerClassName
                )}
            >
                <Typography variant='h1' size='2xl' weight='bold'>
                    {title}
                </Typography>
                <Typography size='large'>{subTitle}</Typography>
            </div>
            <div
                className={cn(
                    'flex-1 h-full mt-6 overflow-hidden col-flex',
                    containerClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};

export const AuthenticationUIFooter = ({
    route,
    text,
    link,
}: {
    route?: string;
    text?: string;
    link?: string;
}) => {
    return (
        <div className='items-center justify-center gap-2 text-center row-flex'>
            <Typography variant='span'>{text}</Typography>{' '}
            <Typography link={route}>{link}</Typography>
        </div>
    );
};

export default LoginPageFrame;
