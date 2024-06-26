import { createStateContext } from 'react-use';

import { MentionValueContext } from './mentionInput.types';

const [useMentionUsers, MentionUserProvider] = createStateContext<
    MentionValueContext[]
>([]);

/**
 * withMentionUserProvider is a higher order component that wraps a component with the MentionUserProvider.
 * It provides the MentionUserProvider context to the wrapped component, enabling the usage of the MentionUserProvider's state and actions.
 */
const withMentionUserProvider = <TProps extends object>(
    WrappedComponent: React.ComponentType<TProps>
) => {
    /**
     * The wrapped component with the MentionUserProvider context.
     *
     * @param {object} props - The props passed to the wrapped component.
     * @returns {JSX.Element} - The wrapped component with the MentionUserProvider context.
     */
    return (props: TProps) => (
        // Wraps the WrappedComponent with the MentionUserProvider, providing the MentionUserProvider context.
        <MentionUserProvider>
            {/* The wrapped component with the provided props. */}
            <WrappedComponent {...props} />
        </MentionUserProvider>
    );
};

export { MentionUserProvider, useMentionUsers, withMentionUserProvider };
