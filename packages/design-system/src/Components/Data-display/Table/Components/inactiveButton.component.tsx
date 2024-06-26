import { Button } from '../../../Inputs/Button/button.component';

const InactiveButton = ({
    onClick,
}: {
    onClick: (next: () => void) => void;
}) => {
    return (
        <Button
            className='w-[83px] transition-all active-error'
            onClick={onClick}
            appearance='error'
            size='sm'
            progress
        >
            Inactive
        </Button>
    );
};

export default InactiveButton;
