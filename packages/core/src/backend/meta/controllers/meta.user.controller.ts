import { BaseModel } from '../../../Models/base.models';
import { ChangePasswordDto } from '../../../Models/dto/change.password.dto';
import { LoggedUser2faResetDto } from '../../../Models/dto/logged.user.2fa.reset.dto';
import { LoggedUserEmailVerificationDto } from '../../../Models/dto/logged.user.email.verification.dto';
import { MobileOtpPayloadDto } from '../../../Models/dto/mobile.otp.payload.dto';
import { UpdateUserNameDto } from '../../../Models/dto/update.meta.user.dto';
import { ValidateMobileOtpPayloadDto } from '../../../Models/dto/validate.mobile.otp.payload.dto';
import { FileUploadDto } from '../../common/dtos/file.upload.dto';

export class MetaUserController extends BaseModel {
    protected isMeta = true;

    async getLoggedUserDetails() {
        this.api = `api/user`;
        return this.get();
    }

    async changePassword() {
        this.api = `api/user/reset-password`;
        this.bodyDto = ChangePasswordDto;

        return this.post();
    }

    async setProfileImage() {
        this.api = `api/user/profile-image`;
        this.bodyDto = FileUploadDto;

        return this.post();
    }

    async removeProfileImage() {
        this.api = `api/user/remove-profile-image`;

        return this.post();
    }

    async verifyEmail() {
        this.api = `api/user/verify-email`;
        this.bodyDto = LoggedUserEmailVerificationDto;

        return this.post();
    }

    async getResetTotpSeed() {
        this.api = `api/user/get-2fa-totp`;
        return this.get();
    }

    async resetTotp() {
        this.api = `api/user/verify-2fa`;
        this.bodyDto = LoggedUser2faResetDto;

        return this.post();
    }

    async verifyMobile() {
        this.api = `api/user/mobile-otp`;
        this.bodyDto = MobileOtpPayloadDto;

        return this.post();
    }

    async validateMobileOtp() {
        this.api = `api/user/validate-mobile-otp`;
        this.bodyDto = ValidateMobileOtpPayloadDto;

        return this.post();
    }

    async UpdateUserName() {
        this.api = `api/user/update-name`;
        this.bodyDto = UpdateUserNameDto;

        return this.post();
    }
}
