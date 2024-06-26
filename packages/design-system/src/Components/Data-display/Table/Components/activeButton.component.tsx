import { Button } from '../../../Inputs/Button/button.component';

const ActiveButton = ({ onClick }: { onClick: (next: () => void) => void }) => {
    return (
        <Button
            className='w-20 transition-all active-success '
            onClick={onClick}
            appearance='success'
            size='sm'
            progress
        >
            Active
        </Button>
    );
};

export default ActiveButton;
