/**
 * Class representing a sliding pane component.
 */
import { DialogBaseUtil } from '../Components/Dialogs/Base/base.utils';
import { SlidingPaneProps } from '../Components/Dialogs/SlidingPane/slidingPane.types';

export class SlidingPane extends DialogBaseUtil {
    static open(args: SlidingPaneProps) {
        super.open(args);
    }
}
