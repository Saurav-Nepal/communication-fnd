import { ExecuteScript } from './injectScript.utils';
import { Pageutil } from './page.utils';

export function ProcessPage({ pageContent }, e?: any) {
    const scripts = [pageContent.execution_script];

    ExecuteScript(
        {
            formContent: pageContent,
            scripts,
            context: Pageutil,
            contextName: 'page',
            callback: pageContent.callback,
        },
        e
    );
}
