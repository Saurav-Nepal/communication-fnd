export type ColorRowItem = {
    title: string;
    colors: ColorBoxItem[];
};

type ColorBoxItem = {
    label: string;
    value: string;
    sublabel: string;
};

export const SlabColors: ColorRowItem[] = [
    {
        title: 'Primary',
        colors: [
            { label: 'Background', value: 'bg-primary', sublabel: 'primary' },
            {
                label: 'Foreground',
                value: 'bg-primary-foreground',
                sublabel: 'primary-foreground',
            },
        ],
    },
    {
        title: 'Secondary',
        colors: [
            {
                label: 'Background',
                value: 'bg-secondary',
                sublabel: 'secondary',
            },
            {
                label: 'Foreground',
                value: 'bg-secondary-foreground',
                sublabel: 'secondary-foreground',
            },
        ],
    },
    {
        title: 'Accent',
        colors: [
            { label: 'Background', value: 'bg-accent', sublabel: 'accent' },
            {
                label: 'Foreground',
                value: 'bg-accent-foreground',
                sublabel: 'accent-foreground',
            },
        ],
    },
    {
        title: 'Error',
        colors: [
            {
                label: 'Background',
                value: 'bg-error',
                sublabel: 'error',
            },
            {
                label: 'Foreground',
                value: 'bg-error-foreground',
                sublabel: 'error-foreground',
            },
        ],
    },
    {
        title: 'Info',
        colors: [
            { label: 'Background', value: 'bg-info', sublabel: 'info' },
            {
                label: 'Foreground',
                value: 'bg-info-foreground',
                sublabel: 'info-foreground',
            },
        ],
    },
    {
        title: 'Success',
        colors: [
            {
                label: 'Background',
                value: 'bg-success',
                sublabel: 'success',
            },
            {
                label: 'Foreground',
                value: 'bg-success-foreground',
                sublabel: 'success-foreground',
            },
        ],
    },
    {
        title: 'Warning',
        colors: [
            {
                label: 'Background',
                value: 'bg-warning',
                sublabel: 'warning',
            },
            {
                label: 'Foreground',
                value: 'bg-warning-foreground',
                sublabel: 'warning-foreground',
            },
        ],
    },
    {
        title: 'Card',
        colors: [
            { label: 'Background', value: 'bg-card', sublabel: 'card' },
            {
                label: 'Foreground',
                value: 'bg-card-foreground',
                sublabel: 'card-foreground',
            },
        ],
    },
    {
        title: 'Popover',
        colors: [
            { label: 'Background', value: 'bg-popover', sublabel: 'popover' },
            {
                label: 'Foreground',
                value: 'bg-popover-foreground',
                sublabel: 'popover-foreground',
            },
        ],
    },
    {
        title: 'Muted',
        colors: [
            { label: 'Background', value: 'bg-muted', sublabel: 'muted' },
            {
                label: 'Foreground',
                value: 'bg-muted-foreground',
                sublabel: 'muted-foreground',
            },
        ],
    },
    {
        title: 'Ring',
        colors: [
            { label: 'Ring', value: 'bg-ringColor', sublabel: 'ringColor' },
        ],
    },
    {
        title: 'Border',
        colors: [
            {
                label: 'Border',
                value: 'bg-borderColor',
                sublabel: 'borderColor',
            },
        ],
    },
    {
        title: 'Input',
        colors: [
            { label: 'Input', value: 'bg-inputColor', sublabel: 'inputColor' },
        ],
    },
];
