import { Button } from '@finnoto/design-system';
import { ButtonProps } from '@finnoto/design-system/src/Components/Inputs/Button/button.types';

interface ClearFilterButtonProps extends ButtonProps {
    clearAllFilter: () => void;
}
export const ClearFilterButton = ({
    clearAllFilter,
    ...props
}: ClearFilterButtonProps) => {
    return (
        <Button
            onClick={clearAllFilter}
            size='sm'
            appearance='error'
            outline
            {...props}
        >
            Clear
        </Button>
    );
};

