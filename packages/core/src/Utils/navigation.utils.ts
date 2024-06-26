/**************************************************
 * Implements Location service same as angular have
 *************************************************/

import { ReadonlyURLSearchParams } from 'next/navigation';

import { IsObjectHaveKeys } from './common.utils';

type ObjectDTO = Record<string, unknown>;
interface HistoryDTO {
    replace: (_: any, opt?: any) => void;
    push: (_: any, opt?: any) => void;
    pop: (_?: any, opt?: any) => void;
    back: (_?: any, opt?: any) => void;
    navigate: (_?: any, opt?: any) => void;
    go: (_?: any, opt?: any) => void;
    pathname: string;
    query: ObjectDTO;
    urlSearchParams: ReadonlyURLSearchParams;
    asPath: string;
    route: string;
}

export type NavigationType = 'push' | 'back' | 'replace' | 'navigate' | 'go';

/**
 * takes search string and converts to corresponding object
 * @param  {string} searchString=''
 * e.x. ?query=menu_id=5 returns { menu_id: "5" }
 */
export function GenerateObjectFromUrlParams(searchString: string) {
    if (searchString) {
        return searchString
            .replace(/(^\?)/, '')
            .split('&')
            .map(
                function (n: any) {
                    return (n = n.split(/=(.+)/)), (this[n[0]] = n[1]), this;
                }.bind({})
            )[0];
    } else {
        return {};
    }
}

export function SerializeObj(obj: ObjectDTO) {
    const queryString = Object.entries(obj)
        .map((i) =>
            [i[0], i[1] ? encodeURIComponent(i[1] as string) : undefined].join(
                '='
            )
        )
        .join('&');
    if (queryString) {
        return `?${queryString}`;
    }
    return '';
}

export function SerializeUrlQuery(url: string, obj: ObjectDTO) {
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const queryString = Object.entries(obj)
        .map(([key, value]) => {
            if (queryParams.has(key)) return;
            return [
                key,
                value ? encodeURIComponent(value as string) : undefined,
            ].join('=');
        })
        .filter(Boolean)
        .join('&');

    if (!queryString) return url;

    if (url?.includes('?')) {
        return `${url}&${queryString}`;
    }

    return `${url}?${queryString}`;
}

export function GetUrlParams(props: any) {
    return {
        queryString: Navigation.search(),
        params: props.match.params,
    };
}

export class Navigation {
    private static historyFetchMethod: HistoryDTO = {} as HistoryDTO;
    // private static historyFetchMethod: () => HistoryDTO = () => { };

    static getHistoryMethod(method: any) {
        this.historyFetchMethod = method;
    }

    static getUrlParams(): { queryString: ObjectDTO; params: ObjectDTO } {
        const History = this.historyFetchMethod;
        const searchParams = History.urlSearchParams;

        const queryString = {};
        for (const [key, value] of searchParams.entries()) {
            queryString[key] = value;
        }

        return {
            queryString,
            params: History.query,
        };
    }

    /**
     * used to get and set query strings
     * if obj is empty, works as getter, else as setter
     * @param  {object} obj - object params to be set as query param
     * @param  {boolean} reset=false}={} - if true, overrides existing query else extend previous query
     */
    // @AutoBind
    static search<U extends { reset?: boolean; method?: NavigationType }>(
        obj: any = undefined,
        { reset = false, method = 'replace' }: U = {} as U
    ): ObjectDTO | void {
        const History = this.historyFetchMethod;

        let urlParams = History.query;

        // if ((process as any).browser) {
        //     const location = window?.location;

        //     urlParams = GenerateObjectFromUrlParams(
        //         decodeURIComponent(location.search)
        //     ) as ObjectDTO;
        // }

        if (!obj) {
            return urlParams;
        }

        const finalObj: any = {};

        Object.keys(obj).forEach((key) => {
            if (obj[key] == null && urlParams[key]) {
                // if any attribute is null, will remove from existing query
                delete urlParams[key];
            } else {
                finalObj[key] = obj[key];
            }
        });

        urlParams = reset
            ? { ...{}, ...finalObj }
            : { ...(urlParams as object), ...finalObj };

        if (!Object.keys(urlParams).length || !Object.keys(finalObj).length) {
            History[method](History.pathname);
            return;
        }
        if (History) {
            History[method]({ pathname: History.pathname, query: urlParams });
        }
    }

    static currentRoute(): {
        pathname: string;
        query: ObjectDTO;
        path: string;
    } {
        const History = this.historyFetchMethod;
        return {
            pathname: History.pathname,
            query: this.search() as ObjectDTO,
            path: History.asPath,
        };
    }

    /**
     * used for navigating to different routes
     * @param  {string} {url}
     * @param  {string} {method} - used to select method for navigation, can be push, goBack (for pop operation), replace
     */
    static navigate(
        {
            url: route,
            method = 'push',
            queryParam,
            withDefaultQueryParam,
            target,
        }: {
            url?: string;
            method?: NavigationType;
            queryParam?: { [key: string]: any };
            target?: 'blank';
            withDefaultQueryParam?: boolean;
        } = {},
        e: any = {} as MouseEvent
    ) {
        let url = route;

        if (url && IsObjectHaveKeys(queryParam)) {
            url = SerializeUrlQuery(url, queryParam || {});
        }

        if (url && withDefaultQueryParam) {
            url = SerializeUrlQuery(url, Navigation.getUrlParams().queryString);
        }

        const History = this.historyFetchMethod;
        if (
            method === 'push' &&
            ((e && (e.metaKey || e.ctrlKey)) || target === 'blank')
        ) {
            let win: any = window.open(url, '_blank');
            win.focus();
            return;
        }
        History[method](url);
    }

    static filterNavigation(
        {
            url,
            method = 'push',
            queryParam,
        }: {
            url?: string;
            method?: NavigationType;
            queryParam: { [key: string]: any };
        } = { queryParam: {} },
        e: MouseEvent = {} as MouseEvent
    ) {
        return this.navigate(
            {
                url,
                method,
                queryParam: {
                    filter: JSON.stringify(queryParam),
                },
            },
            e
        );
    }

    // @AutoBind
    static back() {
        if (window.history.length > 2) {
            // if history is not empty, go back:
            this.navigate({ method: 'back' });
        } else {
            // go home:
            this.navigate({ method: 'push', url: '/' });
        }
    }

    // @AutoBind
    static isRouterReady() {
        const History = this.historyFetchMethod;
        return History.asPath !== History.route;
    }

    /**
     * used for navigating to specified location
     * @param  {string} {url}
     * @param  {string} {method} - used to select method for navigation, can be push, goBack to specified scene
     */
    // @AutoBind
    static backByLength(n: any) {
        n = -(n || 1);
        if (window.history.length > 2) {
            // if history is not empty, go back:
            this.navigate({ url: n, method: 'go' });
        } else {
            // go home:
            this.navigate({ method: 'push', url: '/' });
        }
    }
}
