import { RenderActionButton } from '../../Navigation/Tabs/PolarisTab/polarisTab.component';
import { ActionsProps } from '../../Navigation/Tabs/PolarisTab/polarisTab.types';
import { Popover } from '../../Surfaces/Popover/popover.component';
import { IconButton } from '../Icon-Button/iconButton.component';

import { MoreIcon } from 'assets';

const PolarisActionButton = (props: { actions: ActionsProps[] }) => {
    return (
        <Popover
            element={<RenderActionButton actions={props.actions} />}
            align='end'
            side='bottom'
            className='p-1 border-none rounded-lg shadow'
        >
            <IconButton
                icon={MoreIcon}
                appearance='polaris-transparent'
                size='xs'
            />
        </Popover>
    );
};

export default PolarisActionButton;
