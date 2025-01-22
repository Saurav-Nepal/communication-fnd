export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
    trigger: React.ReactNode;
    triggerClassName?: string;
    offsetY?: number;
    offsetX?: number;
    openDelay?: number;
    closeDelay?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}
