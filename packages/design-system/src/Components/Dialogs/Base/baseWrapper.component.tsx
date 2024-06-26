'use client';

import { Component } from 'react';

import { DialogOpenParams } from './dialog.types';

/**
 * A base class for rendering a modal container with various functionality.
 *
 * @template T The type of the modal container.
 * @author Rumesh Udash
 */
export class BaseWrapper<T> extends Component<
    any,
    { dialogs: (T & DialogOpenParams)[] }
> {
    state = {
        dialogs: [] as (T & DialogOpenParams)[], // Array maintained for opening multiple modals at the same time
    };

    totalIndex: number = 0;

    open = ({ ...args }: T & DialogOpenParams & { isVisible?: boolean }) => {
        const sheet = { ...args };

        let { dialogs } = this.state;

        this.totalIndex++;

        sheet.isVisible = true;
        sheet.id = this.totalIndex;

        dialogs.push({ ...sheet });
        this.setState({ dialogs });
    };

    close = (index: number = this.state.dialogs.length - 1) => {
        let { dialogs } = this.state;
        dialogs.splice(index, 1);
        this.setState({ dialogs });
    };

    closeAll = () => {
        this.setState({ dialogs: [] });
    };

    updateProps = (
        { ...props }: { [key: string]: any },
        index: number = this.state.dialogs.length - 1
    ) => {
        const { dialogs } = this.state;

        const dialogRef = dialogs[index]?.ref;
        if (dialogRef) {
            dialogRef.current?.updateProps(props);
        }
    };

    getOpenCount = () => {
        return this.state.dialogs.length;
    };

    renderDialogs() {
        return null;
    }

    render() {
        return <div>{this.renderDialogs()}</div>;
    }
}
