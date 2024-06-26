export const CustomFilterText = ({
    text,
    handleClick = () => {},
}: {
    text?: string;
    handleClick?: () => void;
}) => {
    return (
        <div
            onClick={handleClick}
            className='gap-4 px-4 text-xs capitalize transition-all border-r border-black cursor-pointer last:border-r-0 hover:text-error hover:line-through'
        >
            {text}
        </div>
    );
};
