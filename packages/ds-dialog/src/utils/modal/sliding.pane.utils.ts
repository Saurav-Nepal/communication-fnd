/**
 * Class representing a sliding pane component.
 */

import { DialogBaseUtil } from '../../Components/dialogs/base.utils';
import { SlidingPaneProps } from '../../Components/slidingpane/slidingpane.types';

export class SlidingPane extends DialogBaseUtil {
    static open(args: SlidingPaneProps) {
        super.open(args);
    }
}
