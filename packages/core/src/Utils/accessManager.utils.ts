import { ObjectDto } from '../backend/Dtos';
import { PRODUCT_IDENTIFIER, VerificationStatusTypeEnum } from '../Constants';
import { UserBusiness } from '../Models';
import { user as userObject } from '../Models/User';

export class AccessManager {
    /**
     * validate if the user has given role or not
     * global bypass for public role and super admin user
     * @param {string} role
     * @returns
     * @memberof Auth
     */
    static hasRoleIdentifier(role: string) {
        if (role === 'public') return true;

        const user = userObject.getUserData();

        if (!user) return false;

        // check for the super admin user
        if ((user?.roles || []).indexOf(1) !== -1) return true;
        if ((user?.role_identifiers || []).indexOf(role) !== -1) return true;

        return false;
    }

    /**
     * Checks if the provided user ID matches the ID of the user who created the content.
     *
     * @param {number} user_id - The ID of the user who created the content.
     * @return {boolean} Returns true if the provided user ID matches the ID of the user who created the content, false otherwise.
     */
    static isAuthUser(user_id: number): boolean {
        if (!user_id) return false;

        const user = userObject.getUserData();
        if (!user) return false;

        if (user_id === user.id) return true;

        return false;
    }

    /**
     * Checks if the provided user ID matches the Owner ID of the current business
     *
     * @param {number} user_id - The ID of the user who created the content.
     * @return {boolean}
     */
    static isBusinessOwner(user_id: number): boolean {
        if (!user_id) return false;

        const business = UserBusiness.getCurrentBusiness();
        if (!business?.owner_id) return false;

        if (user_id === business?.owner_id) return true;

        return false;
    }

    static canEditExpense({
        product_id,
        canApproveDocument,
        data = {},
    }: {
        product_id?: number;
        canApproveDocument?: boolean;
        data?: ObjectDto;
    }) {
        if (data?.attributes?.no_edit) return false;
        if (AccessManager.isPartyClosed(data)) return false;
        if (AccessManager.hasRoleIdentifier('ua_expense_manager')) return true;

        if (canApproveDocument) return true;

        if (AccessManager.isPartyStatusOpen(data, !!data?.employee_id)) {
            if (
                product_id === PRODUCT_IDENTIFIER.VENDOR ||
                AccessManager.isAuthUser(data?.created_by) ||
                AccessManager.isAuthUser(data?.employee?.user_id)
            )
                return true;
        }

        return false;
    }

    static isPartyStatusOpen(
        data?: {
            party_status?: ObjectDto;
            status?: ObjectDto;
        },
        isReimbursement?: boolean
    ) {
        if (isReimbursement) {
            return [
                null,
                undefined,
                VerificationStatusTypeEnum.PENDING_APPROVAL,
                VerificationStatusTypeEnum.SUBMITTED,
                VerificationStatusTypeEnum.OPEN,
            ].includes(data?.party_status?.id || data?.status?.party_status_id);
        }
        return [
            null,
            undefined,
            VerificationStatusTypeEnum.SUBMITTED,
            VerificationStatusTypeEnum.OPEN,
        ].includes(data?.party_status?.id || data?.status?.party_status_id);
    }
    static isPartyClosed(data?: {
        party_status?: ObjectDto;
        status?: ObjectDto;
    }) {
        return [
            VerificationStatusTypeEnum.APPROVED,
            VerificationStatusTypeEnum.REJECTED,
        ].includes(data?.party_status?.id || data?.status?.party_status_id);
    }
}
