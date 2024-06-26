import {
    BasicFilterItem,
    ChatDataPayload,
    ChatSendFunctionType,
    FileUploadSource,
} from '@finnoto/core';

export interface ChatBasicFilterItem extends BasicFilterItem {
    icon: React.ReactNode;
}

export interface ChatBasicFilterButtonProps {
    active?: string | number;
    filters: ChatBasicFilterItem[];
    size?: 'md' | 'sm';
    onFilterChange?: (_: string | number) => void;
    disableNav?: boolean;
    queryKey?: string;
}

export interface ChatComponentProps {
    data: ChatDataPayload[];
    onSend?: ChatSendFunctionType;
    readOnly?: boolean;
    source?: FileUploadSource;
    noBorder?: boolean;
    enableFilter?: boolean;
    uploadEndpoint?: string;
}
