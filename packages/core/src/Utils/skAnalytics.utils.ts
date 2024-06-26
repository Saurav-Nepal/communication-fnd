import { SAVE_USER_EVENT } from '../Constants/analyticsEvent.constant';
import { IsValidLocation } from './common.utils';
import { EmitEvent } from './socket.utils';
import { SubscribeToEvent } from './stateManager.utils';
import { worker } from './worker.utils';

let currentLocation;

let workerInstance;

export class SKAnalytics {
    static getCurrentLocation() {
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

    static connectSocket() {
        //connect socket
    }

    /**
     * @param  {object} {...args}
     * for opening bottom sheet component
     * component will be pass just like {component:()=><Test>} format
     */
    static async registerEvent(event, data) {
        if (!workerInstance) {
            workerInstance = new worker();
        }

        workerInstance.addJob({ job: () => this.fireEvent(data) });
    }

    static async fireEvent(eventData) {
        EmitEvent(SAVE_USER_EVENT, eventData);
        return true;
    }

    // method to get identifier
    // static getIdentifier() {
    //     let cookie = GetCookie("ua_tracking_cookie");
    //     if (cookie) {
    //         return cookie;
    //     } else {
    //         let value = SKAnalytics.getCookieValue();
    //         //set cookie used for user analytics tracking
    //         SetCookie("ua_tracking_cookie", value, .25);
    //         return value;
    //     }
    // }

    // static getCookieValue() {
    //     return SKAnalytics.s4() + SKAnalytics.s4() + SKAnalytics.s4() + SKAnalytics.s4();
    // }

    static s4() {
        return Math.floor((1 + Math.random()) * 0x1000000)
            .toString(16)
            .substring(1);
    }
}
