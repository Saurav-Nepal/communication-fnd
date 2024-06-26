import { Icon } from '../../../Components/Data-display/Icon/icon.component';
import { Button } from '../../../Components/Inputs/Button/button.component';

import { DeleteSvgIcon } from 'assets';

/**
 * Renders a button with custom label and behavior based on the title prop.
 *
 * @param {string} title - The title of the button, used to determine appearance.
 * @param {string} label - The text to display on the button.
 * @param {boolean} disabled - Whether or not the button should be disabled.
 * @param {function} handleOnClick - The function to call when the button is clicked.
 * @return {JSX.Element} A React element representing the button.
 *
 * @author Rumesh Udash
 */
const ActionButton = ({ title, label, disabled, handleOnClick }: any) => {
    if (disabled) return null;

    return (
        <Button
            appearance={
                title?.toLowerCase().includes('remove') ? 'error' : 'primary'
            }
            size='sm'
            outline={title?.toLowerCase().includes('remove') ? true : false}
            disabled={disabled}
            onClick={(_, e) => handleOnClick(e)}
            shape={label === 'x' ? 'square' : undefined}
        >
            {label === 'x' ? <Icon source={DeleteSvgIcon} isSvg /> : label}
        </Button>
    );
};

export default ActionButton;
