import { useMemo } from 'react';

import { ObjectDto } from '@finnoto/core';
import { cn, Collapse, Icon } from '@finnoto/design-system';

import { WarningOutlineSvgIcon } from 'assets';

const DocumentWarningIssues = ({ issues = [] }: { issues?: ObjectDto[] }) => {
    if (!issues?.length) return <></>;
    return (
        <Collapse
            title={
                <div className='items-center gap-1 row-flex'>
                    <Icon source={WarningOutlineSvgIcon} isSvg />
                    <span className='font-medium'>
                        Warnings ({issues?.length})
                    </span>
                </div>
            }
            defaultExpand
            className='w-full px-4 py-2 border rounded border-warning text-warning'
            titleClassName='text-warning'
        >
            <WarningItemList {...{ issues, className: 'mt-2' }} />
        </Collapse>
    );
};
export const WarningItemList = ({
    issues,
    className,
}: {
    issues: ObjectDto[];
    className?: string;
}) => {
    const sanitizeIssues = useMemo(() => {
        return issues
            .map((issue) => {
                if (issue?.is_identifier_missing)
                    return {
                        ...issue,
                        message: `${issue?.document_type?.name} document is required`,
                    };
                if (issue?.is_document_missing)
                    return {
                        ...issue,
                        message: `${issue?.document_type?.name} document files is required`,
                    };
                return issue;
            })
            .filter((issue) => issue?.message);
    }, [issues]);
    return (
        <ul className={cn('gap-2 px-4 text-sm col-flex', className)}>
            {sanitizeIssues.map((issue) => {
                return (
                    <li key={issue?.id} className='items-center gap-1 row-flex'>
                        <div className='w-[6px]  h-[6px] rounded-full bg-warning'></div>
                        <div className=''>{issue?.message}</div>
                    </li>
                );
            })}
        </ul>
    );
};

export default DocumentWarningIssues;
