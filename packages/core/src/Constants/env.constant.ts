import { ObjectDto } from '../backend/Dtos';

let API_CONSTANTS: ObjectDto;

function InitializeEnvConstant({ ...props }) {
    API_CONSTANTS = props;
}

export { InitializeEnvConstant, API_CONSTANTS };
