export const IsObject = (value: any) => typeof value === 'object';

export const filterDataToUrlParam = (filterData: any) => {
    let general_url_param: any = {};
    for (let key in filterData) {
        let general_key = key;
        if (IsObject(filterData[key])) {
            const child_object = filterData[key];

            for (let child_key in child_object) {
                if (IsObject(child_object[child_key])) {
                    general_key += `-${child_key}`;
                    const grand_child_object = child_object[child_key];
                    for (let grand_child_key in grand_child_object) {
                        general_url_param[`${general_key}-${grand_child_key}`] =
                            grand_child_object[grand_child_key];
                    }
                } else {
                    general_url_param[`${general_key}-${child_key}`] =
                        child_object[child_key];
                }
            }
        } else {
            general_url_param[general_key] = filterData[key];
        }
    }

    if (general_url_param['date-range-min']) {
        general_url_param[`date-range-min`] = convertCurrentDate(
            general_url_param['date-range-min']
        );
    }
    if (general_url_param['date-range-max']) {
        general_url_param['date-range-max'] = convertCurrentDate(
            general_url_param['date-range-max']
        );
    }

    return general_url_param;
};
export const UrlParamToFilterData = (queryString: any) => {
    let tempQueryParam: any = {};

    for (let key in queryString) {
        const split_key = key.split('-');

        if (split_key.length === 3) {
            if (split_key[0] in tempQueryParam) {
                tempQueryParam[split_key[0]] = {
                    [split_key[1]]: {
                        ...tempQueryParam[split_key[0]][split_key[1]],
                        [split_key[2]]: queryString[key],
                    },
                };
            } else {
                tempQueryParam = {
                    ...tempQueryParam,
                    [split_key[0]]: {
                        [split_key[1]]: {
                            [split_key[2]]: queryString[key],
                        },
                    },
                };
            }
        } else if (split_key.length === 2) {
            if (split_key[0] in tempQueryParam) {
                tempQueryParam[split_key[0]] = {
                    ...tempQueryParam[split_key[0]],
                    [split_key[1]]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            } else {
                tempQueryParam[split_key[0]] = {
                    [split_key[1]]:
                        queryString[key] === 'true' ? true : queryString[key],
                };
            }
        } else {
            tempQueryParam[key] = queryString[key];
        }
    }

    if ('page' in tempQueryParam) {
        tempQueryParam['page'] = parseInt(tempQueryParam['page']);
    }
    if ('limit' in tempQueryParam) {
        tempQueryParam['limit'] = parseInt(tempQueryParam['limit']);
    }

    return tempQueryParam;
};

export const parseCurrentDate = (value: string) => {
    if (value === 'currentDate') {
        const curr_date = new Date();
        return `${curr_date.getFullYear()}-${
            curr_date.getMonth() + 1
        }-${curr_date.getDate()}`;
    }
    return value;
};

export const convertCurrentDate = (value: any) => {
    const currDate = new Date();
    const target_date = new Date(value);

    if (currDate.toDateString() === target_date.toDateString())
        return 'currentDate';
    return value;
};
