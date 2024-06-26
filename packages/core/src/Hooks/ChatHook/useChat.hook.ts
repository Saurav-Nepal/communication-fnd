import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { useQuery } from '@tanstack/react-query';

import { ObjectDto } from '../../backend/Dtos';
import {
    ChatDataPayload,
    ChatSendFunctionType,
    FileData,
    FileUploadDto,
} from '../../Types';
import {
    GetDateValue,
    IsEmptyArray,
    SortArrayObjectBy,
} from '../../Utils/common.utils';
import { Toast } from '../../Utils/toast.utils';
import { FetchData } from '../useFetchData.hook';
import { useFetchParams } from '../useFetchParams.hook';

export const useChat = ({
    className,
    id,
    delay = 0,
}: {
    className: any;
    id: number;
    delay?: number;
}) => {
    const [delayTimer, setDelaytimer] = useState<boolean>(true);
    const { split_view: issue_id, id: dispute_id } = useFetchParams();

    useEffectOnce(() => {
        if (!delay) {
            setDelaytimer(false);
            return;
        }

        setTimeout(() => setDelaytimer(false), delay);
    });
    const {
        data: comments,
        isLoading: commentLoading,
        refetch: refetchComments,
    } = useQuery({
        queryKey: ['comments', 'messages', dispute_id, issue_id],
        retry: 2,
        queryFn: () => fetchData('getComments'),
        enabled: !!id && !delayTimer,
    });
    const {
        data: documents,
        isLoading: documentLoading,
        refetch: refetchDocuments,
    } = useQuery({
        queryKey: ['documents', 'messages', dispute_id, issue_id],
        retry: 2,
        queryFn: () => fetchData('getDocuments'),
        enabled: !!id && !delayTimer,
    });

    const fetchData = async (method: string) => {
        const { success, response } = await FetchData({
            className: className,
            method: method,
            methodParams: id,
        });

        if (success) return response;

        return [];
    };

    const reFetchMessages = () => {
        refetchComments();
        refetchDocuments();
    };

    const addComment = async (comments: string) => {
        const { success, response } = await FetchData({
            className,
            method: 'setComments',
            methodParams: id,
            classParams: { comments },
        });

        if (!success) {
            Toast.error({ description: response.message });
            return false;
        }

        return true;
    };

    const addDocument = async (files: FileUploadDto[]) => {
        const { success, response } = await FetchData({
            className,
            method: 'createDocument',
            methodParams: id,
            classParams: { files },
        });

        if (!success) {
            Toast.error({ description: response.message });
            return false;
        }

        return true;
    };

    const handleMessageSend: ChatSendFunctionType = async (
        value,
        next = () => {}
    ) => {
        if (IsEmptyArray(value.attachments) && value.message) {
            const success = await addComment(value.message);
            if (!success) return next();
        } else if (value.attachments) {
            const files: FileUploadDto[] = [];

            value.attachments.forEach((attachment) => {
                const { name, size, type } = attachment;
                files.push({
                    comments: value.message || undefined,
                    document_url: attachment.serverUrl,
                    attributes: { name, size, type },
                });
            });

            const success = await addDocument(files);
            if (!success) return next();
        }
        reFetchMessages();
        next();
    };

    const messageData = useMemo(() => {
        if (!Array.isArray(comments)) return [];

        let chatData: ChatDataPayload[] = [];

        const rawData = (comments || []).concat(documents || []);
        const documentData: Record<string, ChatDataPayload[]> = {};

        rawData.forEach((data: ObjectDto) => {
            const chat: ChatDataPayload = {
                isSentByMe: !data.is_system_generated,
            };

            // If comment message.
            if (data.comments) {
                chat.message = data.comments;
                chat.date = data.created_at;
                chat.title = data.creator?.name;
                return chatData.push(chat);
            }

            const key = `${format(
                GetDateValue(data.created_at || new Date()),
                'yyyy-MM-dd-hh-mm-ss'
            )}-${data.attributes?.comments}`;

            if (!documentData[key]) documentData[key] = [];

            documentData[key].push({
                message: data.attributes?.comments,
                date: data.created_at,
                attachments: [
                    {
                        serverUrl: data.document_url,
                        ...(data.attributes || {}),
                    },
                ],
                title: data.creator?.name,
                isSentByMe: !data.is_system_generated,
            });

            return null;
        });

        Object.values(documentData).forEach((documentList) => {
            const attachments = documentList.reduce(
                (prev, curr) => [...prev, ...(curr.attachments || [])],
                [] as FileData[]
            );

            chatData.push({ ...documentList[0], attachments });
        });

        chatData = SortArrayObjectBy(chatData, 'date', 'asc', true);

        return chatData;
    }, [comments, documents]);

    return {
        commentLoading,
        documentLoading,
        messageData,
        handleMessageSend,
    };
};
