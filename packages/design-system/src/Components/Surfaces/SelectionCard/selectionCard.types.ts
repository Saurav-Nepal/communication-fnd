export interface SelectionCardType {
    onClick?: (e: any) => void;
    title?: string;
    subText?: string;
    appearance?: 'success' | 'error' | 'neutral';
    icon?: 'success' | 'error' | 'neutral' | 'refresh';
}
