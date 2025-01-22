/**************************************************
 * Implements Location service same as angular have
 *************************************************/

import { isEmptyObject, ObjectDto } from '@slabs/ds-utils';

interface HistoryDTO {
    replace: (_: any) => void;
    push: (_: any) => void;
    pop: (_?: any) => void;
    back: (_?: any) => void;
    navigate: (_?: any) => void;
    go: (_?: any) => void;
    pathname: string;
    query: ObjectDto;
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

export function SerializeObj(obj: { [key: string]: string }) {
    const queryString = Object.entries(obj)
        .map((i) => [i[0], encodeURIComponent(i[1])].join('='))
        .join('&');
    if (queryString) {
        return `?${queryString}`;
    }
    return '';
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

    static register(method: any) {
        this.historyFetchMethod = method;
    }

    static getHistoryMethod() {
        return this.historyFetchMethod as any;
    }

    static getUrlParams(): { queryString: ObjectDto; params: ObjectDto } {
        const History = this.historyFetchMethod;
        const queryString = Navigation.search() as ObjectDto;
        return {
            queryString,
            params: { ...History.query, ...queryString },
        };
    }

    /**
     * used to get and set query strings
     * if obj is empty, works as getter, else as setter
     * @param  {object} obj - object params to be set as query param
     * @param  {boolean} reset=false}={} - if true, overrides existing query else extend previous query
     */
    // @AutoBind
    static search(obj?: any, { reset = false }: any = {}): ObjectDto | void {
        const History = this.historyFetchMethod;
        let urlParams = History.query;
        let hash;

        if ((process as any).browser) {
            const location = window?.location;
            hash = window.location.hash.replace('#', '');

            // let hash = window?.location.hash.replace("#", "");
            urlParams = GenerateObjectFromUrlParams(
                decodeURIComponent(location.search)
            ) as ObjectDto;
        }

        if (hash) {
            urlParams = urlParams[hash] ? JSON.parse(urlParams[hash]) : {};
        }
        if (!obj) {
            return urlParams;
        }

        const finalObj: ObjectDto = {};

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
            : { ...urlParams, ...finalObj };

        if (!Object.keys(urlParams).length || !Object.keys(finalObj).length) {
            History.push(location.pathname);
            return;
        }
        if (History) {
            obj = {};
            if (hash) {
                obj[hash] = JSON.stringify(urlParams);
            } else {
                obj = urlParams;
            }
            let queryUrl = SerializeObj(obj);
            if (hash) {
                queryUrl = queryUrl + '#' + hash;
            }
            History.push(location.pathname + queryUrl);
        }
    }

    static currentRoute(): {
        pathname: string;
        query: ObjectDto;
        path: string;
    } {
        const History = this.historyFetchMethod;
        return {
            pathname: History.pathname,
            query: this.search() as ObjectDto,
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
            url,
            method = 'push',
            queryParam,
        }: {
            url?: string;
            method?: NavigationType;
            queryParam?: { [key: string]: any };
        } = {},
        e: MouseEvent = {} as MouseEvent
    ) {
        // #todo additional validation required
        if (url && !isEmptyObject(queryParam)) {
            url += SerializeObj(queryParam || {});
        }
        // if (IsObjectHaveKeys(queryParam)) {
        //     url += SerializeObj(queryParam);
        // }
        // const { history: History } = this.historyFetchMethod();
        const History = this.historyFetchMethod;

        if (method === 'push' && e && (e.metaKey || e.ctrlKey)) {
            const win = window.open(url, '_blank');
            win?.focus();
            return;
        }
        History[method](url);
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
