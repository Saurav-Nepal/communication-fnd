import { BaseWrapper } from '../Base/baseWrapper.component';
import { SlidingPaneSheet } from './slidingPage.component';
import { SlidingPaneProps } from './slidingPane.types';

/**
 * Component representing a modal wrapper.
 *
 * @extends {BaseWrapper<SlidingPaneProps>}
 *
 * @author Rumesh Udash
 */
export class SlidingPaneWrapper extends BaseWrapper<SlidingPaneProps> {
    /**
     * Renders the dialogs by mapping over them and creating a SlidingPaneSheet component for each one.
     *
     * @return {JSX.Element[]} An array of SlidingPaneSheets to be rendered.
     */
    renderDialogs() {
        const { dialogs } = this.state;
        const slidingPaneSheets = dialogs.map((sheet, index: number) => {
            return <SlidingPaneSheet key={sheet.id + '' + index} {...sheet} />;
        });
        return slidingPaneSheets;
    }
}
