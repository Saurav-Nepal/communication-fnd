export type IHookStateInitialSetter<TState> = () => TState;
export type IHookStateInitAction<TState> =
    | TState
    | IHookStateInitialSetter<TState>;

export type IHookStateSetter<TState> =
    | ((prevState: TState) => TState)
    | (() => TState);
export type IHookStateSetAction<TState> = TState | IHookStateSetter<TState>;

export type IHookStateResolvable<TState> =
    | TState
    | IHookStateInitialSetter<TState>
    | IHookStateSetter<TState>;

export function resolveHookState<TState>(
    nextState: IHookStateInitAction<TState>
): TState;
// eslint-disable-next-line no-redeclare
export function resolveHookState<TState, TCState extends TState>(
    nextState: IHookStateSetAction<TState>,
    currentState?: TCState
): TState;
// eslint-disable-next-line no-redeclare
export function resolveHookState<TState, TCState extends TState>(
    nextState: IHookStateResolvable<TState>,
    currentState?: TCState
): TState;
// eslint-disable-next-line no-redeclare
export function resolveHookState<TState, TCState extends TState>(
    nextState: IHookStateResolvable<TState>,
    currentState?: TCState
): TState {
    if (typeof nextState === 'function') {
        return nextState.length
            ? (nextState as Function)(currentState)
            : (nextState as Function)();
    }

    return nextState;
}
