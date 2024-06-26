import { openImageViewer } from '@Utils/functions.utils';
import { Icon } from '@finnoto/design-system';
import { ImageGallerySvgIcon } from 'assets';

const CommonFileView = ({ files = [], title, onDeleteFile }: any) => {
    if (!files?.length) return <></>;
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                openImageViewer(files, {
                    title,
                    onClickToDelete: onDeleteFile,
                });
            }}
            className='items-center gap-1 p-2 py-1.5 text-xs rounded row-flex bg-primary/20 text-primary'
        >
            <Icon size={16} source={ImageGallerySvgIcon} isSvg />
            <span className='text-xs font-medium'>{files?.length}</span>
        </div>
    );
};

export default CommonFileView;
