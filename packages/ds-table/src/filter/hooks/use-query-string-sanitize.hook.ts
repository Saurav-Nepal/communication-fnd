import { useMemo } from 'react';

import { capitalize, isArray, ObjectDto } from '@slabs/ds-utils';

import { useCustomQueryList } from './use-custom-query-list.hook';

export const useQueryStringSanitize = ({
    title,
    operator,
    method = 'find',
    value,
    controller_type,
    disableNetwork,
}: {
    title: string;
    operator: string;
    method?: string;
    value?: number | number[];
    controller_type: string;

    disableNetwork?: boolean;
}) => {
    const newData = useMemo(() => (isArray(value) ? value : [value]), [value]);
    const { data = [] } = useCustomQueryList({
        disableNetwork: disableNetwork ?? !controller_type,
        classParams: {
            ids: newData,
        },
        method: method,
        type: controller_type as any,
    });
    const actualString = useMemo(() => {
        const actualData = data
            ?.filter((el: ObjectDto) => newData.includes(el?.id))
            .map((el: ObjectDto) => el?.name);

        return `${title} ${capitalize(operator ?? '')} ${actualData.join(
            ', '
        )}`;
    }, [data, newData, title, operator]);
    return [actualString];
};
