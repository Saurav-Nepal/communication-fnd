import { cn } from '../../../Utils/common.ui.utils';
import { Icon } from '../../Data-display/Icon/icon.component';
import {
    RichEditorTextInfoProps,
    richEditorTextInfoTypes,
} from './richTextEditor.types';

const RichTextInfo = ({ text, type }: RichEditorTextInfoProps) => {
    return (
        <div
            className={cn(
                'flex items-center gap-2 px-3 py-1 text-xs',
                richEditorTextInfoTypes[type].style
            )}
        >
            <Icon source={richEditorTextInfoTypes[type].icon} isSvg size={20} />
            <span>{text}</span>
        </div>
    );
};

export default RichTextInfo;
