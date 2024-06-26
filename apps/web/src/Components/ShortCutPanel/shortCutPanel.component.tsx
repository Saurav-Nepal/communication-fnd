import { useOperatingSystem } from '@finnoto/core';
import { ModalBody, ModalContainer } from '@finnoto/design-system';

const ShortCutPanel = () => {
    const { type: osType } = useOperatingSystem();
    const renderLabel = ({
        shortcutKey,
        description,
        isShiftAlso = false,
    }: {
        shortcutKey: string;
        description: string;
        isShiftAlso?: boolean;
    }) => {
        const withShift = (
            <>
                {'Or'} <KeyboardKey label={osType === 'mac' ? '⌘' : 'Ctrl'} /> +{' '}
                <KeyboardKey label={'Shift'} /> +{' '}
                <KeyboardKey label={shortcutKey} />
            </>
        );

        return (
            <div className='items-center justify-between gap-2 row-flex'>
                <div className='capitalize text-base-secondary'>
                    {description}
                </div>
                <div className='items-center gap-2 text-sm font-medium text-base-primary row-flex '>
                    <KeyboardKey label={osType === 'mac' ? '⌘' : 'Ctrl'} /> +{' '}
                    <KeyboardKey label={shortcutKey} />{' '}
                    {isShiftAlso && withShift}
                </div>
            </div>
        );
    };
    return (
        <ModalContainer title='Shortcut Keys'>
            <ModalBody className='gap-4 bg-base-100 col-flex'>
                {/* {renderLabel({
                    shortcutKey: 'U',
                    description: 'Open Shortcut Panel',
                })} */}
                {renderLabel({
                    shortcutKey: 'K',
                    description: 'Global Search',
                })}
                {renderLabel({
                    shortcutKey: '/',
                    description: 'Listing Search',
                })}
            </ModalBody>
        </ModalContainer>
    );
};

const KeyboardKey = ({ label }: { label: string }) => {
    return <kbd className='p-1 px-2 text-xs rounded bg-base-200'>{label}</kbd>;
};

export default ShortCutPanel;
