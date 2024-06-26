export enum PRODUCT_IDENTIFIER {
    RECO = 1,
    VENDOR = 2,
    EMPLOYEE = 3,
    FINOPS = 4,
    ARC = 5,
    PAYMENT = 6,
}

export type ProductIdentifier = keyof typeof PRODUCT_IDENTIFIER;
