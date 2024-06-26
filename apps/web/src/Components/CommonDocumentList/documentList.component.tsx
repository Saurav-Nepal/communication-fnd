import { EmptyFunction, ObjectDto } from '@finnoto/core';
import { ResourceCarouselViewer } from '@finnoto/design-system';

const DocumentViewComponent = ({
    files = [],
    onDeleteDocument = EmptyFunction,
    onAddDocument = EmptyFunction,
    isEditable = false,
    isFullView = true,
    disableZoom,
    hideUpload,
    title,
}: {
    files: any;
    onDeleteDocument?: (data: any) => void;
    onAddDocument?: (data: ObjectDto) => void;
    isFullView?: boolean;
    isEditable?: boolean;
    disableZoom?: boolean;
    hideUpload?: boolean;
    title?: string;
}) => {
    return (
        <div className='h-full'>
            <ResourceCarouselViewer
                files={files}
                onHandleUpload={(files) => {
                    onAddDocument({ files });
                }}
                onHandleDelete={(files, _, activeFile) => {
                    onDeleteDocument(activeFile?.id || _);
                }}
                isEdit={isEditable}
                disableZoom={disableZoom}
                hideUpload={hideUpload}
                isFullView={isFullView}
                title={title}
                isDelete
                isCrop
            />
        </div>
    );
};
export default DocumentViewComponent;
