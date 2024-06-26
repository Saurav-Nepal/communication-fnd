import { ResourceCarouselViewer } from '@finnoto/design-system';

const DocumentViewComponent = ({ files = [] }: { files: any }) => {
    return (
        <div className='min-h-[50vh] bg-base-100 col-flex p-4'>
            <ResourceCarouselViewer
                className='flex-1'
                files={files}
                hideUpload
            />
        </div>
    );
};
export default DocumentViewComponent;
