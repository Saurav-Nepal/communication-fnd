import React, { forwardRef, PropsWithoutRef, Ref, RefAttributes } from 'react';

import { Slot } from '@radix-ui/react-slot';

export interface PolymorphicProps {
    asChild?: boolean;
    as?: React.ElementType;
    className?: string;
    children?: React.ReactNode;
}

const _PolymorphicComponent = <
    TRef = HTMLElement,
    TProps extends PolymorphicProps = PolymorphicProps,
>(
    { asChild, as = 'div', children, ...props }: PropsWithoutRef<TProps>,
    ref: Ref<TRef>
) => {
    const Comp = asChild ? Slot : as;
    return (
        <Comp {...props} ref={ref}>
            {children}
        </Comp>
    );
};

export const PolymorphicComponent = React.forwardRef(
    _PolymorphicComponent
) as unknown as <
    TRef extends HTMLElement,
    TProps extends PolymorphicProps = PolymorphicProps,
>(
    props: PropsWithoutRef<TProps> & RefAttributes<TRef>
) => React.ReactNode;

export function polymorphicFactory<
    TRef extends HTMLElement,
    TProps extends PolymorphicProps = PolymorphicProps,
>(ui: React.ForwardRefRenderFunction<TRef, PolymorphicProps & TProps>) {
    type Props = PolymorphicProps & TProps;
    // type ComponentProperties = Omit<React.FunctionComponent<Props>, never>;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    // type _PolymorphicComponent = (
    //     props: PropsWithoutRef<Props> & RefAttributes<TRef>
    // ) => React.ReactElement;

    // type PolymorphicComponent = _PolymorphicComponent & ComponentProperties;

    const Component = forwardRef(
        ui
    ) as unknown as React.ForwardRefExoticComponent<
        PropsWithoutRef<Props> & RefAttributes<TRef>
    >;

    return Component;
}
