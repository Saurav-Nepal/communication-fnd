/**
 * @description Check if a given email string follows a valid email format.
 *
 * @param {string} email - The email string to validate.
 * @returns {boolean} Returns true if the email format is valid, false otherwise.
 */
export const isValidEmailFormat = (email: string): boolean => {
    const EMAIL_REGEX =
        /^(([^<>()[\]\\.,;:\s@"]+\.)*[^<>()[\]\\.,;:\s@"]+@[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*(\.[a-zA-Z]{2,})+)$/;
    return EMAIL_REGEX.test(email);
};
