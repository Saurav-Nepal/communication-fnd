import { InitializeEnvConstant } from './Constants/env.constant';
import { RegisterNetInfoListener } from './Utils/http.utils';
import { InitializeStorageUtility } from './Utils/localStorage.utils';
import { BroadcastAllRecentSearches } from './Utils/recentSearches.utils';
import { InitializeSessionStorageUtility } from './Utils/sessionStorage.utils';
import { InitializeStateManager } from './Utils/stateManager.utils';
import { SetPlatformId, SetVersion } from './Utils/version.utils';

interface INIT_LIBRARY_PROPS {
    env: Record<string | number, any>;
    apiHost: string;
    StateManager: any;
    Fetch?: any;
    StorageUtility?: object;
    SessionStorageUtility?: object;
    intl?: object;
    ContactUtility?: object;
    version_id: string;
    platform_id?: number;
}

/**
 * Initialize package with env variables
 */
export function InitLibrary({
    env,
    StateManager,
    StorageUtility = {},
    SessionStorageUtility = {},
    version_id,
    platform_id,
}: INIT_LIBRARY_PROPS) {
    InitializeEnvConstant(env);
    InitializeStateManager(StateManager);
    InitializeStorageUtility(StorageUtility);
    InitializeSessionStorageUtility(SessionStorageUtility);

    // since nextjs has ssr, window is not defined while compiling and to prevent from crashing this check is required
    if (typeof window !== 'undefined') {
        SetPlatformId(platform_id);
        SetVersion(version_id);
    }

    RegisterNetInfoListener();
}

export function ProcessAfterAppLoaded() {
    BroadcastAllRecentSearches();
}

export * from './Constants';

export * from './Decorators/index.decorator';
export * from './backend/Dtos';
export * from './Models';
export * from './Types';
export * from './Hooks';
export * from './Providers';
export * from './Utils/index.utils';
