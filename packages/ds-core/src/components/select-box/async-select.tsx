import React from 'react';

import { polymorphicFactory } from '../polymorphic-component/polymorphic-component';
import { AsyncSelectType, useAsyncSelect } from './async-hook';
import { SelectBox } from './select-box';
import { useStateManager } from './state-management';

const AsyncSelect = polymorphicFactory<any, AsyncSelectType>(
    ({ ...selectProps }, ref) => {
        const stateProps = useAsyncSelect(selectProps);
        const selectBoxProps = useStateManager(stateProps);
        return <SelectBox ref={ref} {...selectBoxProps} />;
    }
);

export { AsyncSelect };
