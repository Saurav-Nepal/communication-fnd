import { removeEmptyObjectKeys } from '@slabs/ds-utils';

import { useSlabTheme } from '../slab-theme-provider/slab-theme.context';

export function useProps<
    TProps extends Record<string, any>,
    TDefaultProps extends Partial<TProps> = {},
>(
    component: string,
    defaultProps: TDefaultProps,
    props: TProps
): TProps & {
    [Key in Extract<keyof TProps, keyof TDefaultProps>]-?:
        | TDefaultProps[Key]
        | NonNullable<TProps[Key]>;
} {
    const { theme } = useSlabTheme();

    const contextPropsPayload =
        theme.components?.[component]?.defaultProps ?? {};
    const contextProps =
        typeof contextPropsPayload === 'function'
            ? contextPropsPayload(theme)
            : contextPropsPayload;

    return {
        ...defaultProps,
        ...contextProps,
        ...removeEmptyObjectKeys(props),
    };
}
