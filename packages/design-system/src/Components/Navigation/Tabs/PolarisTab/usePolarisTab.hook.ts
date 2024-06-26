import { useWidthMeasurer } from '../../../Layout/WidthMeasurer/useWidthMeasurer.hook';
import { useTabs } from '../useTab.hook';
import { PolarisTabsProps } from './polarisTab.types';

export const usePolarisTab = (props: PolarisTabsProps) => {
    const { tabs, active, onChangeTab, isComponentRendered } = useTabs(props);
    const {
        visibleItems: visibleTabItems,
        hiddenItems: hiddenTabItems,
        handleMeasurement,
    } = useWidthMeasurer({
        items: tabs,
        activeItemIndex: tabs.findIndex((tab) => tab.key === active),
    });

    return {
        tabs,
        active,
        onChangeTab,
        isComponentRendered,
        handleMeasurement,
        visibleTabItems,
        hiddenTabItems,
    };
};
