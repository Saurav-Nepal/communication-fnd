/**
 * Loads Stylesheets and scripts asynchronyously
 */
export class LoadAsyncScripts {
    /**
     * loads stylessheet without blocking critical renders
     * @param  {string} src - url
     * @param  {string} rel - {default value - stylesheet}
     */
    static loadStyleSheet({ src, rel, attrs = {} }: any) {
        rel = rel ? rel : 'stylesheet';

        const cb = function () {
            const l: any = document.createElement('link');
            l.rel = rel;
            l.href = src;
            if (Object.keys(attrs).length) {
                for (const i in attrs) {
                    l[i] = attrs[i];
                }
            }
            const h = document.getElementsByTagName('head')[0];
            h.appendChild(l);
        };

        const raf = window
            ? window.requestAnimationFrame ||
              (window as any).mozRequestAnimationFrame ||
              (window as any).webkitRequestAnimationFrame ||
              (window as any).msRequestAnimationFrame
            : () => {};

        if (raf) raf(cb);
        else window.addEventListener('load', cb);
    }

    // static loadStyleSheetGlobal() {
    //     const prefixUrl = './../Assets/Global-Shared/global.css';
    //     const cb = function () {
    //         import(/* webpackIgnore: true */ prefixUrl);
    //     };

    //     if (LoadAsyncScripts.raf) LoadAsyncScripts.raf(cb);
    //     else window.addEventListener('load', cb);
    // }
}
