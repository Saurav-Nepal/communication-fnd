import { Button, Icon } from '@finnoto/design-system';
import { FilterIcon } from 'assets';

interface FilterListBoxProps {
    onClickToButton?: () => void;
    filterListProps: {
        filters: any;
        data: any;
        removeFilterData: (removedFilter: any) => void;
        showDot?: boolean;
    };
    children?: any;
}

const FilterListBox = ({
    onClickToButton,
    filterListProps,
    children,
}: FilterListBoxProps) => {
    return (
        <div className='bg-base-100 row-flex justify-center items-center px-1 border rounded min-w-[300px] xl:min-w-[500px]  h-[40px] '>
            <Button
                className='border border-none text-primary hover:bg-primary hover:text-primary-content'
                shape='square'
                appearance='ghost'
                size='sm'
                onClick={onClickToButton}
            >
                <div className='relative'>
                    <Icon source={FilterIcon} isSvg />
                    {filterListProps.showDot && (
                        <span className='filter-applied'></span> // this is the small dot when there is filter
                    )}
                </div>
            </Button>
            <div className='justify-center flex-1 my-2 ml-1 overflow-y-auto border-l col-flex'>
                {/* <FilterListDisplay
                    className='items-center w-full px-2 row-flex'
                    {...filterListProps}
                >
                    {children}
                </FilterListDisplay> */}
            </div>
        </div>
    );
};

export default FilterListBox;
