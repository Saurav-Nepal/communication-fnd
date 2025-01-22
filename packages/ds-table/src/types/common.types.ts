import { LISTING_CONTROLLER_ROUTER } from '../constants/controller.router.constants';

export type GenericListingType = keyof typeof LISTING_CONTROLLER_ROUTER;

export type MethodDto = (_?: any) => void | any;
