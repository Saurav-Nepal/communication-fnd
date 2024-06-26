import { GetFileDetails, IsEmptyArray, useChatBox } from '@finnoto/core';
import {
    Button,
    ChatBasicFilterButton,
    CommonFileUploader,
    Icon,
    IconButton,
    InputField,
} from '@finnoto/design-system';

import ChatBubble from './chat.bubble.component';
import { ChatBasicFilterItem, ChatComponentProps } from './chat.types';

import {
    ChatDocumentSvgIcon,
    ChatFileSvgIcon,
    ChatMessageSvgIcon,
    ChatUplaodSvgIcon,
    DeleteSvgIcon,
    MessageSvgIcon,
} from 'assets';

export const ChatComponent = ({
    data = [],
    onSend,
    readOnly,
    noBorder,
    source = 'business',
    enableFilter = false,
    uploadEndpoint,
}: ChatComponentProps) => {
    const {
        filterState,
        setFilterState,
        filteredData,
        removeAt,
        isValidInputs,
        loading,
        files,
        handleSubmit,
        message,
        setMessage,
        setFiles,
        chatbox,
    } = useChatBox({
        onSend: onSend,
        data: data,
    });

    const filters: ChatBasicFilterItem[] = [
        { label: 'Chat', key: 'fullchat', icon: MessageSvgIcon },
        { label: 'Document', key: 'document', icon: ChatDocumentSvgIcon },
        { label: 'Message', key: 'message', icon: ChatMessageSvgIcon },
    ];

    return (
        <div className={`chatbox-container ${!noBorder ? 'border' : ''} `}>
            {enableFilter && (
                <div className='flex justify-start p-3 pb-0 bg-base-300/50'>
                    <ChatBasicFilterButton
                        size='sm'
                        disableNav
                        active={filterState}
                        onFilterChange={(value) =>
                            setFilterState(value as string)
                        }
                        filters={filters}
                    />
                </div>
            )}

            <div className={`chatbox`} ref={chatbox}>
                <div className='chatbox-list'>
                    {IsEmptyArray(filteredData) ? (
                        <div className='text-sm text-center text-base-tertiary'>
                            No message available
                        </div>
                    ) : (
                        filteredData.map((value, index) => {
                            return <ChatBubble key={index} {...value} />;
                        })
                    )}
                </div>
            </div>
            {!readOnly && (
                <div className='chatbox-actions'>
                    {!IsEmptyArray(files) && (
                        <div className='chatbox-action-selected-files'>
                            {files?.map((value: any, index: number) => {
                                return (
                                    <DisplayFile
                                        onDelete={() => removeAt(index)}
                                        value={value}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='gap-4 row-flex '>
                        <div className='flex-1'>
                            <InputField
                                type='textarea'
                                value={message}
                                onChange={(value) => setMessage(value)}
                                placeholder={'Type your message here'}
                                trimSpecialChar={false}
                            />
                        </div>
                        <div className='items-center gap-2 row-flex'>
                            <CommonFileUploader
                                disabled={filterState === 'message'}
                                onFileUpload={(value) =>
                                    setFiles((prev) => [...prev, ...value])
                                }
                                source={source}
                                endpoint={uploadEndpoint}
                            >
                                {({ uploading }) => (
                                    <IconButton
                                        icon={ChatUplaodSvgIcon}
                                        appearance='primary'
                                        type='button'
                                        disabled={
                                            filterState === 'message' ||
                                            uploading
                                        }
                                        shape='square'
                                    />
                                )}
                            </CommonFileUploader>
                            <Button
                                disabled={!isValidInputs}
                                appearance='primary'
                                type='submit'
                            >
                                Send <Icon source={'send'} />
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export const DisplayFile = ({ value, onDelete }: any) => {
    return (
        <div className='flex items-center w-3/4 gap-2 p-3 text-sm rounded-lg bg-base-100'>
            <Icon
                iconColor='text-current'
                source={ChatFileSvgIcon}
                isSvg
                size={25}
            />{' '}
            <span className='text-base-primary'>
                {value.name || GetFileDetails(value.serverUrl).name}
            </span>
            <IconButton
                className='hover:text-error'
                size='xs'
                icon={DeleteSvgIcon}
                onClick={onDelete}
            />
        </div>
    );
};
