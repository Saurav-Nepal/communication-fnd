'use client';

import dynamic from 'next/dynamic';

import { Button, Icon } from '../../Components';
import ActionButton from './Components/addRuleActionButton.component';
import CombinatorSelector from './Components/combinatorSelector.component';
import FieldSelector from './Components/fieldSelector.component';
import ValueEditor from './Components/valueEditor.component';

import { GroudAddSvgIcon } from 'assets';

const ReactQueryBuilder: any = dynamic(() => import('react-querybuilder'), {
    ssr: false,
});

/**
 * Renders a QueryBuilder component that takes in props to configure it.
 *
 * @param {object} columns - The columns that can be queried.
 * @param {function} onChange - The function that gets called when the query changes.
 * @param {...any} rest - Additional props to configure the QueryBuilder component.
 * @return {JSX.Element} - The QueryBuilder component.
 *
 * @author Rumesh Udash
 */
export const QueryBuilder = ({
    columns,
    onChange = () => {},
    className,
    hideGroupRules,
    ...rest
}: any) => {
    return (
        <ReactQueryBuilder
            fields={columns}
            onQueryChange={onChange}
            controlElements={{
                fieldSelector: FieldSelector,
                combinatorSelector: () => null,
                operatorSelector: CombinatorSelector,
                valueEditor: rest?.filterAdd ? FilterValueEditor : ValueEditor,
                addRuleAction: rest?.filterAdd ? AddPlusBtn : ActionButton,
                removeRuleAction: ActionButton,
                removeGroupAction: ActionButton,
                addGroupAction: hideGroupRules ? () => null : AddGroupButton,
            }}
            {...rest}
        />
    );
};

export const FilterValueEditor = (props?: any) => {
    return <ValueEditor {...props} className='max-w-full' />;
};

const AddPlusBtn = ({ handleOnClick, disabled }: any) => {
    if (disabled) return <></>;
    return (
        <Button
            onClick={(_, e) => handleOnClick(e)}
            size='sm'
            appearance='primary'
        >
            <Icon
                size={16}
                iconClass='material-icons'
                source={'add_circle_outline'}
                isSvg
            />
            Add Rule
        </Button>
    );
};

const AddGroupButton = ({ handleOnClick, disabled }: any) => {
    if (disabled) return <></>;
    return (
        <Button
            onClick={(_, e) => handleOnClick(e)}
            size='sm'
            appearance='primary'
            outline
        >
            <Icon size={16} source={GroudAddSvgIcon} isSvg />
            Group Rules
        </Button>
    );
};
