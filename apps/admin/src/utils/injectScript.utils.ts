// import './injectScript.utils.css';
// import $ from 'jquery';

import { isUndefined } from '@slabs/ds-utils';

import { SCRIPT_TYPE } from '@/constants/scriptType.constants';

import GetterSetter from './getterSetter.utils';

/**
 * Executes script in the context of data
 * @param  {object} {data
 * @param  {array} script},
 * @param  {object} e - event object for detecting keys pressed along with click
 */

export function ExecuteScript(
    {
        formContent,
        scripts,
        context,
        contextName = 'form',
        executionType,
        callback = () => {}, // NOSONAR
    }: any,
    e = null
) {
    if (!Array.isArray(scripts) || !scripts.length) {
        return formContent;
    }

    let script = '';

    for (const i in scripts) {
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
            callback,
        },
        e
    );

    // if script returns boolean type value, return that value
    if (
        updatedFormContent &&
        typeof updatedFormContent == 'object' &&
        !isUndefined(updatedFormContent.returnValue)
    ) {
        // since preOnLoad script returns boolean value
        return updatedFormContent.returnValue;
    }
    return updatedFormContent || formContent;
}

// @TODO change formContent name later as it was built for form execution but later being used in many place
function methods(
    {
        formContent,
        context,
        contextName,
        script,
        scripts,
        executionType,
        callback,
    },
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

        RemoveError(scripts);

        formContent = (window[contextName] as any).getForm(true);
        if (!isUndefined(returnValue)) {
            formContent.returnValue = returnValue;
        }
        return formContent;
    } catch (err) {
        InjectError(scripts, err);
        console.log('%c🍺 Not valid Script', 'color: #49ba8e; font-size:20px;');
        console.log('%cError =======> ', "color: '#49ba8e'; font-size:14px;");
        console.error(err);
        console.log('%cScript ======> ', 'color: blue; font-size:14px;');
        console.log(scripts);
    }
}

/**
 * appends error message if found any error while executing scripts
 * @param  {object} script
 * @param  {string} message - text message to be displayed
 */
export function InjectError(script, message) {
    const pageContent = document.getElementById('parent-admin-element'); // main page element
    const errorElemenet = document.createElement('div'); // new error element to be injected at top
    errorElemenet.classList.add('alert');
    errorElemenet.classList.add('alert-danger');
    errorElemenet.setAttribute('id', 'script-' + script.id);
    errorElemenet.innerHTML =
        '<strong> ' + script.name + ' - ' + message + ' </strong>';

    const crossSymbol = document.createElement('a');
    crossSymbol.classList.add('close');
    crossSymbol.innerHTML = '&times;';
    errorElemenet.appendChild(crossSymbol);

    pageContent?.insertBefore(errorElemenet, pageContent.firstChild);
}

/**
 * appends error message if found any error while executing scripts
 * @param  {object} script
 * @param  {string} message - text message to be displayed
 */
export function InjectMessage(message, type, time = 4000) {
    const pageContent = document.getElementById('parent-admin-element'); // main page element
    const errorElemenet = document.createElement('div'); // new error element to be injected at top
    errorElemenet.classList.add('alert');
    if (type === 'success') {
        errorElemenet.classList.add('alert-success');
    }
    if (type === 'error') {
        errorElemenet.classList.add('alert-danger');
    }
    if (type === 'info') {
        errorElemenet.classList.add('alert-info');
    }
    if (type === 'warning') {
        errorElemenet.classList.add('alert-warning');
    }
    errorElemenet.innerHTML = '<strong>' + message + ' </strong>';

    // window.setTimeout(function () {
    //     $('.alert')
    //         .fadeTo(500, 0)
    //         .slideUp(500, function () {
    //             $(this).remove();
    //         });
    // }, time);

    pageContent?.insertBefore(errorElemenet, pageContent.firstChild);
}

/**
 * removes error message element
 * @param  {} script
 */
export function RemoveError(script) {
    const pageContent = document.getElementById('parent-admin-element');
    const errorElemenet = document.getElementById('script-' + script.id);
    if (errorElemenet) {
        pageContent?.removeChild(errorElemenet);
    }
}

// Prepare script for execution according to script type
export function PrefixScript(definition, executionType) {
    if (!definition) return '';

    if (definition.activity_type_id == SCRIPT_TYPE.ON_CHANGE) {
        return `form.onChange({ column: '${definition.column}', callback: (value, column, event, valueObj)=> { ${definition.script?.script}} })`;
    }

    if (
        isUndefined(executionType) ||
        executionType == definition.activity_type_id
    ) {
        return definition.script?.script || definition.script;
    }

    return '';
}
