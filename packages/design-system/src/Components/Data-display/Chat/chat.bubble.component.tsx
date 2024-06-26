import { differenceInDays, format } from 'date-fns';
import { useCallback, useMemo } from 'react';

import {
    ChatDataPayload,
    FormatDisplayDate,
    GetDateValue,
    GetFileDetails,
    IsEmptyArray,
    useUserHook,
} from '@finnoto/core';

import { cn } from '../../../Utils/common.ui.utils';
import { Avatar } from '../Avatar/avatar.component';
import { Icon } from '../Icon/icon.component';

import { ChatFileSvgIcon, ChatViewSvgIcon } from 'assets';

const ChatBubble = (props: ChatDataPayload) => {
    return (
        <div className='gap-1 col-flex'>
            <div
                className={cn('chatbox-message-container', {
                    'chatbox-message-sender': props.isSentByMe,
                    'same-side': props.sameSide,
                })}
            >
                <div className='flex chatbox-message'>
                    <Avatar
                        source={props.image_url}
                        imageWrapperClassName='rounded-full w-8 h-8 border-[2px] '
                        alt={props.title}
                        size='xs'
                    />
                    <div className='relative chatbox-message-bubble'>
                        {!!props.title && !props.isSentByMe && (
                            <div className='pr-12 text-sm font-semibold text-base-primary'>
                                {props.title}

                                <span className='ml-2 text-xs font-normal text-base-secondary'>
                                    {props.email}
                                </span>
                            </div>
                        )}
                        {!!props.message && (
                            <p className='pr-12 text-xs whitespace-pre-line'>
                                {props.message}
                            </p>
                        )}
                        {!!props.date && (
                            <div
                                className={`text-xs font-light text-base-secondary text-right ${
                                    props.isSentByMe
                                        ? ' text-base-primary'
                                        : 'text-base-secondary '
                                } `}
                            >
                                {formatChatDate(props.date)}
                            </div>
                        )}
                        {!IsEmptyArray(props.attachments) &&
                            props.attachments?.map((attachments, index) => (
                                <a
                                    target={'_blank'}
                                    href={attachments.serverUrl}
                                    rel='noreferrer'
                                    key={index}
                                    className='flex items-center gap-2 p-3 my-1 text-sm border rounded-lg border-primary/20'
                                >
                                    <Icon
                                        iconColor='text-current'
                                        source={ChatFileSvgIcon}
                                        isSvg
                                        size={30}
                                    />{' '}
                                    <span className='flex-1 text-base-primary table-link'>
                                        {attachments.name ||
                                            GetFileDetails(
                                                attachments.serverUrl || ''
                                            ).name}
                                    </span>
                                    <Icon
                                        className='cursor-pointer text-base-secondary hover:text-info'
                                        source={ChatViewSvgIcon}
                                        size={30}
                                        isSvg
                                    />
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const formatChatDate = (date: Date | string) => {
    const diff = differenceInDays(new Date(), GetDateValue(date));

    if (!diff) return format(new Date(date), 'p');
    return format(new Date(date), 'dd MMM');
};

export default ChatBubble;
