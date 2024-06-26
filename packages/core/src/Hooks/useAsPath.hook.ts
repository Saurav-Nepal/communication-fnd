import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { IsEmptyObject } from '../Utils/common.utils';

export const useAsPath = () => {
    const pathname = usePathname();
    const params = useParams();

    const asPath = useMemo(() => {
        if (IsEmptyObject(params)) return pathname;

        let tempPath = pathname;

        Object.keys(params).forEach((paramsKey) => {
            const findIdx = tempPath.indexOf(`/${params[paramsKey]}`);
            if (findIdx > -1) {
                let path = tempPath.substring(0, findIdx + 1);
                path += `[${paramsKey}]`;
                path += tempPath.substring(
                    findIdx + 1 + params[paramsKey].length
                );
                tempPath = path;
            }
        });

        return tempPath;
    }, [params, pathname]);

    return asPath;
};
