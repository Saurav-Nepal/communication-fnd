/**
 *
 * @param {string} event_name
 * @param {object} event_data
 * @param {string} source
 */

import { ANALYTICS_EVENT } from '../Constants';
import { PAGE_VISITED_SK } from '../Constants/analyticsEvent.constant';
import { API_CONSTANTS } from '../Constants/env.constant';
import { ObjectDto } from '../backend/Dtos';
import { IsValidLocation } from './common.utils';
import { SKAnalytics } from './skAnalytics.utils';
import { StoreEvent, SubscribeToEvent } from './stateManager.utils';
import { GetCurrentTimestamp, GetTimezoneOffset } from './time.utils';
import { GetPlatformId, GetVersion } from './version.utils';

const PAGE_VISIT_DEBOUNCE_TIME = 3000;

export type AnalyticsSource = 'sk' | 'firebase';

export async function AnalyticsEvent(
    event_name,
    event_data,
    source?: AnalyticsSource
) {
    // check if prod env
    if (!API_CONSTANTS.IsProductionDb()) {
        return;
    }

    const [location, platform, version] = await Promise.all([
        getCurrentLocation(),
        GetPlatformId(),
        GetVersion(),
        // Authentication.fetchDeviceToken(),
    ]);

    // attached session user id
    // const idObject = UserBusiness.getIdObject();
    // if (!IsEmptyObject(idObject)) {
    //     event_data = {
    //         ...event_data,
    //         ...idObject,
    //     };
    // }

    const eventData = {
        source, // to be deleted by the receiving event before broadcast
        geo: location,
        device: { platform, version },
        event: event_name,
        data: event_data,
        timestamp: { date: GetCurrentTimestamp(), offset: GetTimezoneOffset() },
    };
    if (!source || source === 'sk') {
        SKAnalytics.registerEvent(event_name, eventData);
    }

    StoreEvent({ eventName: ANALYTICS_EVENT, data: eventData });
}

let currentLocation;

function getCurrentLocation() {
    if (IsValidLocation(currentLocation)) {
        return currentLocation;
    }

    return new Promise((resolve, reject) => {
        const currentData = (location) => {
            currentLocation = {
                latitude: location.latitude,
                longitude: location.longitude,
            };
            return resolve(currentLocation);
        };

        SubscribeToEvent({
            eventName: 'CURRENT_LOCATION',
            callback: currentData,
        });
        setTimeout(() => {
            // a fallback if location could not be resolved within 1 second
            if (!currentLocation) {
                return resolve({});
            }
        }, 1000);
    });
}

const pageVisitQueues = {};

/**
 * Page visit event hit SK analytics server for each page visit
 * implement a debounce function to hit each pagevisit event after decide time in order to avoid duplicate page events
 * @param  {} pageName
 */
export function PageVisit(pageName: string, data?: ObjectDto) {
    const index = pageName + (data ? JSON.stringify(data) : '');
    if (pageVisitQueues[index]?.timeoutId) {
        clearTimeout(pageVisitQueues[index].timeoutId);
    }

    const payload: ObjectDto = { page: pageName };
    if (data) {
        payload.data = data;
    }

    const timeoutId = setTimeout(() => {
        delete pageVisitQueues[index];
        AnalyticsEvent(PAGE_VISITED_SK, payload);
    }, PAGE_VISIT_DEBOUNCE_TIME);

    pageVisitQueues[index] = { ...payload, timeoutId };
}
