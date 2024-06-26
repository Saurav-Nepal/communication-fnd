/**************************************************
 * Used for temporarily setting and getting values
 **************************************************/

const data = {};

const GetterSetter = {
    setter(key, value) {
        if (value && !Array.isArray(value) && typeof value === 'object') {
            value = { ...value };
        }

        data[key] = value;
    },

    getter(key) {
        return data[key];
    },
};
export default GetterSetter;
