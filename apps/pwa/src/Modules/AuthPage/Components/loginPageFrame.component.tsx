import { Icon, PageTitle, Typography, cn } from '@finnoto/design-system';
import { DarkLogoSvgIcon } from 'assets';
import Image from 'next/image';
import { ReactNode } from 'react';

const LoginPageFrame = ({ children, className }: any) => {
    return (
        <div
            className={cn(
                'min-h-full flex-1 bg-base-100 col-flex rounded w-full',
                className
            )}
        >
            {children}
        </div>
    );
};

export const AuthenticationUIWrapper = ({
    children,
    pageTitle,
    title,
    subTitle,
    containerClassName,
}: {
    children: ReactNode;
    pageTitle?: string;
    title?: string;
    subTitle?: string | ReactNode;
    containerClassName?: string;
}) => {
    const pageTitleText = pageTitle || title;

    return (
        <div className='flex-1 h-full px-4 py-6 col-flex'>
            <PageTitle title={pageTitleText} />
            <div className='mb-2 centralize'>
                {process.env['SMALL_LOGO'] ? (
                    <Image
                        src={process.env['SMALL_LOGO']}
                        alt='Brand Logo'
                        height={32}
                        width={32}
                        style={{
                            maxHeight: 32,
                            maxWidth: 32,
                            objectFit: 'contain',
                            objectPosition: 'center',
                        }}
                        unoptimized
                        priority
                    />
                ) : (
                    <Icon source={DarkLogoSvgIcon} isSvg size={32} />
                )}
            </div>
            <div className='gap-2 text-center col-flex'>
                <Typography size='2xl' weight='bold'>
                    {title}
                </Typography>
                <Typography size='normal'>{subTitle}</Typography>
            </div>
            <div
                className={cn(
                    'flex-1 h-full mt-6  col-flex',
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
        <div className='text-center'>
            <Typography variant='span'>{text}</Typography>{' '}
            <Typography variant='span' link={route} linkDecoration='primary'>
                {link}
            </Typography>
        </div>
    );
};

export default LoginPageFrame;
