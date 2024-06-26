import { forwardRef, ReactNode } from 'react';

interface TableTypeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

// TableWrapper component
export const TableWrapper = ({ children, className = '' }: TableTypeProps) => {
    return <div className={`table ${className}`}>{children}</div>;
};

// TableContainer component
export const TableContainer = ({
    children,
    className = '',
    ...props
}: TableTypeProps) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

// TableHeadGroup component
export const TableHeadGroup = ({
    children,
    className = '',
}: TableTypeProps) => {
    return <div className={`table-header-group ${className}`}>{children}</div>;
};

// TableRowGroup component
export const TableRowGroup = ({ children, className = '' }: TableTypeProps) => {
    return <div className={`table-row-group ${className}`}>{children}</div>;
};

export const TableFooterGroup = ({
    children,
    className = '',
}: TableTypeProps) => {
    return <div className={`table-footer-group ${className}`}>{children}</div>;
};

// TableCell component
export const TableCell = forwardRef(
    (
        { children, className = '', onClick, ...rest }: TableTypeProps,
        ref: any
    ) => {
        return (
            <div
                onClick={onClick}
                className={`table-cell ${className}`}
                {...rest}
                ref={ref}
            >
                {children}
            </div>
        );
    }
);

// TableRow component
export const TableRow = ({ children, className = '', ...props }: any) => {
    return (
        <div className={`table-row ${className}`} {...props}>
            {children}
        </div>
    );
};

// TableFooter component
export const TableFooter = ({
    children,
    className = '',
    ...props
}: TableTypeProps) => {
    return (
        <div className={`w-full ${className}`} {...props}>
            {children}
        </div>
    );
};
