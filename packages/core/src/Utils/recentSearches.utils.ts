import {
    AerialDistance,
    IsArray,
    IsEmptyArray,
    IsEmptyObject,
    IsValidLocation,
} from './common.utils';
import { GetItemAsync, SetItem } from './localStorage.utils';
import { StoreEvent } from './stateManager.utils';

export const RECENT_SEARCHES_LOCATION = 'RECENT_SEARCHES_LOCATION';
export const RECENT_SEARCHES_INVENTORY = 'RECENT_SEARCHES_INVENTORY';
export const RECENT_USED_MEASUREUNIT = 'RECENT_USED_MEASUREUNIT';

type SearchData = any;

type NamespaceDto =
    | typeof RECENT_SEARCHES_LOCATION
    | typeof RECENT_SEARCHES_INVENTORY
    | typeof RECENT_USED_MEASUREUNIT;

interface DataDto {
    [key: string]: {
        MAX_COUNT: number;
        namespace: NamespaceDto;
        recentSearches: SearchData[];
    };
}
let data: DataDto = {
    [RECENT_SEARCHES_LOCATION]: {
        MAX_COUNT: 3,
        namespace: RECENT_SEARCHES_LOCATION,
        recentSearches: [],
    },
    [RECENT_SEARCHES_INVENTORY]: {
        MAX_COUNT: 3,
        namespace: RECENT_SEARCHES_INVENTORY,
        recentSearches: [],
    },
    [RECENT_USED_MEASUREUNIT]: {
        MAX_COUNT: 3,
        namespace: RECENT_USED_MEASUREUNIT,
        recentSearches: [],
    },
};

export function SetRecentSearches({
    data: _data,
    reset,
    namespace,
}: {
    data?: SearchData;
    reset?: boolean;
    namespace: NamespaceDto;
}) {
    if (reset) {
        storeRecentSearchesAndBroadcast([_data], namespace);
    }
    const newRecentSearches = pushToRecentSearches(_data, namespace);
    storeRecentSearchesAndBroadcast(newRecentSearches, namespace);
    return newRecentSearches;
}

export async function GetRecentSearches(namespace): Promise<SearchData[]> {
    data[namespace].recentSearches = !IsEmptyArray(
        data[namespace].recentSearches
    )
        ? data[namespace].recentSearches
        : await GetItemAsync(namespace);

    if (!IsArray(data[namespace].recentSearches)) {
        data[namespace].recentSearches = [];
    }
    return data[namespace].recentSearches;
}

function pushToRecentSearches(_data, namespace): SearchData[] {
    const searches = [...data[namespace].recentSearches];

    const { MAX_COUNT } = data[namespace];
    const index = FindDuplicateLocationIndex(_data, namespace);

    if (!isNaN(index as number) && index !== false) {
        searches[index as number] = _data;
    } else {
        searches.unshift(_data);
        searches.splice(MAX_COUNT, searches.length);
    }
    return searches;
}

function FindDuplicateLocationIndex(_data, namespace): number | boolean {
    const searches = [...data[namespace].recentSearches];

    switch (namespace) {
        case RECENT_SEARCHES_LOCATION:
            return findDuplicateLocationIndex(_data, searches);

        case RECENT_SEARCHES_INVENTORY:
            return findDuplicateInventoryIndex(_data, searches);

        case RECENT_USED_MEASUREUNIT:
            return findDuplicateUnitIndex(_data, searches);
        default:
            return false;
    }
}

const findDuplicateInventoryIndex = (_data, searches) => {
    for (let i = 0; i < searches.length; i++) {
        const business = searches[i];
        if (!IsEmptyObject(_data) && _data.identifier == business.identifier) {
            return i;
        }
    }
    return false;
};

const findDuplicateUnitIndex = (_data, searches) => {
    for (let i = 0; i < searches.length; i++) {
        const business = searches[i];
        if (!IsEmptyObject(_data) && _data.id == business.id) {
            return i;
        }
    }
    return false;
};

const findDuplicateLocationIndex = (_data, searches) => {
    for (let i = 0; i < searches.length; i++) {
        const location = searches[i];
        if (
            IsValidLocation(location) &&
            IsValidLocation(_data) &&
            AerialDistance(
                location.latitude,
                location.longitude,
                _data.latitude,
                _data.longitude
            ) *
                1000 <
                10
        ) {
            return i;
        }
    }
    return false;
};

export function ClearRecentSearches(namespace) {
    storeRecentSearchesAndBroadcast([], namespace);
}

function storeRecentSearchesAndBroadcast(_data: SearchData[], namespace) {
    if (IsValidDataArray(_data)) {
        data[namespace].recentSearches = _data;
        SetItem(namespace, _data);
        broadcastRecentSearch(namespace);
    }
}

function IsValidDataArray(recentSearches) {
    return IsArray(recentSearches);
}

export function BroadcastAllRecentSearches() {
    setTimeout(() => broadcastRecentSearch(RECENT_SEARCHES_LOCATION), 100);
    setTimeout(() => broadcastRecentSearch(RECENT_SEARCHES_INVENTORY), 100);
    setTimeout(() => broadcastRecentSearch(RECENT_USED_MEASUREUNIT), 100);
}

async function broadcastRecentSearch(namespace) {
    const _data = await GetRecentSearches(namespace);
    data[namespace].recentSearches = _data;

    StoreEvent({ eventName: namespace, data: _data });
    return _data;
}
