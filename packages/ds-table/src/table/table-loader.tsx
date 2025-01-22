import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

const TableLoader = (props: { rows?: number; [x: string]: any }) => {
    const { rows = 4 } = props;
    const rowHeight = 50;
    return (
        <ContentLoader
            viewBox={`0 0 1500 ${rowHeight * rows}`}
            foregroundColor='hsla(var(--b2))'
            backgroundColor='hsla(var(--b3))'
            {...props}
        >
            {new Array(rows).fill(' ').map((el, index) => {
                const contentVerticalPosition = (contentHeight: number) =>
                    rows > 1
                        ? contentHeight + rowHeight * index
                        : contentHeight;
                return (
                    <Fragment key={index}>
                        <rect
                            x='20'
                            y={`${contentVerticalPosition(15)}`}
                            rx='5'
                            ry='5'
                            width='40'
                            height='15'
                        />
                        <rect
                            x='100'
                            y={`${contentVerticalPosition(15)}`}
                            rx='5'
                            ry='5'
                            width='600'
                            height='15'
                        />
                        <rect
                            x='750'
                            y={`${contentVerticalPosition(15)}`}
                            rx='5'
                            ry='5'
                            width='600'
                            height='15'
                        />
                        <rect
                            x='1450'
                            y={`${contentVerticalPosition(15)}`}
                            rx='5'
                            ry='5'
                            width='20'
                            height='15'
                        />
                        <rect
                            x='10'
                            y={`${contentVerticalPosition(48)}`}
                            ry='10'
                            width='1500'
                            height='1'
                        />
                    </Fragment>
                );
            })}
        </ContentLoader>
    );
};

export { TableLoader };
