import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ClientConnectPayloadDto } from "../../vendors/dtos/client.connect.payload.dto";

export class BusinessManagedVendorKycDto extends ClientConnectPayloadDto {
    @IsNotEmpty()
    @Expose()
    token: string;

    @IsOptional()
    @Expose()
    identifier: number;
}