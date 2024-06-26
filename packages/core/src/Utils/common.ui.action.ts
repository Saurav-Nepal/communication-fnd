import { PRODUCT_IDENTIFIER } from "../Constants"
import { user } from "../Models"

export class CommonUiAction{
    static documentUpload(){
    
        switch(user.getProductId()){
            case PRODUCT_IDENTIFIER.EMPLOYEE:
                return 'ee_generic_document_add'
            case PRODUCT_IDENTIFIER.VENDOR:
                return 'ev_generic_document_add'
            default:
                return 'generic_document_add'
        }
    }
}