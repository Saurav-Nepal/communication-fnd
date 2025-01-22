/**
 *
 * @description Parse JSON string
 *
 * @param {string} str
 *
 * @returns {any} parsed object
 */
export const parseJSONString = (str: string): any => {
    if (!str) return null;
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error(error);
        return null;
    }
};
