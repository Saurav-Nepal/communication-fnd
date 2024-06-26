import { useMemo } from 'react';

/**
 *
 * @description This Component is used to display stacked progress bars with different colors and values
 *
 * @example
 * <StackedProgressBar progresses={[50, 30, 20, 10]} colors={['#387b57', '#B3851A', '#E51C00', '#FFADAF']} />
 *
 * @param {number[]} progresses : Array of value in percentages for each progress bar
 * @param {string[]} colors : Array of colors for each progress bar
 * @returns JSX.Element
 */

const StackedProgressBar = ({
    progresses,
    colors,
}: {
    progresses: number[];
    colors: string[];
}) => {
    const totalProgress = useMemo(
        () => progresses.reduce((a, b) => a + b, 0),
        [progresses]
    );

    const progressData = useMemo(() => {
        return progresses.map((progress, index) => {
            const color = colors[index];
            const value = Math.round((progress / totalProgress) * 100);
            return {
                color,
                value,
            };
        });
    }, [progresses, colors, totalProgress]);

    return (
        <div className='flex-1 h-4 rounded cursor-pointer row-flex bg-base-300'>
            {progressData.map((progress) => {
                if (!progress.value || progress.value <= 0) return;
                return (
                    <div
                        key={progress.color}
                        style={{
                            width: `${progress.value}%`,
                            background: progress.color,
                        }}
                        className='first-of-type:rounded-l last-of-type:rounded-r'
                    ></div>
                );
            })}
        </div>
    );
};

export { StackedProgressBar };
