import { forwardRef, useEffect, useRef } from 'react';

interface ShadowDOMContainerProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
    body: string;
    onLoad?: (element: HTMLDivElement) => void;
}

export const ShadowDOMContainer = forwardRef(
    ({ body, onLoad, ...props }: ShadowDOMContainerProps, ref) => {
        const shadowRootRef = useRef<ShadowRoot>(null);
        const shadowDomContainerRef = useRef<HTMLDivElement>(null);

        const handleRender = (ref: HTMLDivElement) => {
            if (!ref) return;

            if (!shadowRootRef.current) {
                shadowRootRef.current = ref.attachShadow({ mode: 'open' });
            }
            const renderElement = document.createElement('div');
            renderElement.innerHTML = body;
            shadowRootRef.current.appendChild(renderElement);
            onLoad?.(renderElement);
        };

        useEffect(() => {
            if (body) handleRender(shadowDomContainerRef.current);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [body]);

        return <div ref={shadowDomContainerRef} {...props}></div>;
    }
);
