import { SCRIPT_TYPE } from './../Constants/scriptType.constants';
import { IsUndefined } from './common.utils';
import { FormUtilSelfObj } from './form.utils';
import GetterSetter from './getterSetter.utils';
/**
 * Executes script in the context of data
 * @param  {object} {data
 * @param  {array} script},
 * @param  {object} e - event object for detecting keys pressed along with click
 */

interface ScriptObj {
    active?: boolean;
    script: { script: string };
    activity_type_id: SCRIPT_TYPE;
    columns?: string;
}

export function ExecuteScript(
    {
        formContent,
        scripts,
        context,
        contextName = 'form',
        executionType,
    }: {
        formContent: FormUtilSelfObj['form'];
        scripts: ScriptObj[];
        context: any;
        contextName?: string;
        executionType?: SCRIPT_TYPE;
    },
    e = null
) {
    if (!Array.isArray(scripts) || !scripts.length) {
        return formContent;
    }

    let script = '';

    for (const i in scripts) {
        if (scripts[i].active === false) continue;
        script = `${script}
        ${PrefixScript(scripts[i], executionType)}`;
    }

    const updatedFormContent = methods.bind({ a: 'test' })(
        {
            formContent,
            context,
            contextName,
            script,
            scripts,
            executionType,
        },
        e
    );

    // if script returns boolean type value, return that value
    if (
        updatedFormContent &&
        typeof updatedFormContent == 'object' &&
        !IsUndefined(updatedFormContent.returnValue)
    ) {
        // since preOnLoad script returns boolean value
        return updatedFormContent.returnValue;
    }
    return updatedFormContent || formContent;
}

// @TODO change formContent name later as it was built for form execution but later being used in many place
function methods(
    { formContent, context, contextName, script, scripts, executionType },
    e
) {
    try {
        window[contextName] = context; // as value of 'this' is getting undefined, using window

        if (SCRIPT_TYPE.ON_SUBMIT != executionType) {
            (window[contextName] as any).setForm(formContent);
        } else if (
            (window[contextName] as any).setBody &&
            formContent.body &&
            Object.keys(formContent.body).length
        ) {
            (window[contextName] as any).setBody(formContent.body); // in case of on_submit type script, needs to update form body
        }

        GetterSetter.setter('event', e); // event object is consumed by redirect method for detecting other keys pressed along with click

        // since eval script can not contain return statement, hence in order to provide return like functionality
        // script overrides value of 'returnValue' and after execution value of same is evaluated again undefined
        // if returnValue has boolean value, same is attached in the form object with 'returnValue' key property.
        let returnValue;
        eval(script); // NOSONAR
        GetterSetter.setter('event', {}); // event object is set null once execution is finished

        formContent = (window[contextName] as any).getForm();
        if (!IsUndefined(returnValue)) {
            formContent.returnValue = returnValue;
        }
        return formContent;
    } catch (err) {
        console.log('%c🍺 Not valid Script', 'color: #49ba8e; font-size:20px;');
        console.log('%cError =======> ', "color: '#49ba8e'; font-size:14px;");
        console.error(err);
        console.log('%cScript ======> ', 'color: blue; font-size:14px;');
        console.log(scripts);
    }
}

// Prepare script for execution according to script type
export function PrefixScript(
    definition: ScriptObj,
    executionType: SCRIPT_TYPE
) {
    if (!definition) return '';

    if (definition.activity_type_id == SCRIPT_TYPE.ON_CHANGE) {
        const columns = definition.columns.split(','); // Handling Comma separated columns

        let script = '';
        columns.forEach((column) => {
            script += `form.onChange({ column: '${column.trim()}', callback: (value, column, event, valueObj)=> { ${
                definition.script?.script
            }} })`;
        });

        return script;
    }

    if (
        IsUndefined(executionType) ||
        executionType == definition.activity_type_id
    ) {
        return definition.script?.script || definition.script;
    }

    return '';
}
