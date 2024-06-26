import { useApp } from '@finnoto/core';

export const HamburgerButton = () => {
    const { isSidebarExpand, toggleSidebarExpand } = useApp();

    return (
        <div
            className='32px] flex items-center justify-center cursor-pointer'
            onClick={() => toggleSidebarExpand()}
        >
            <div
                className={`hamburger_button ${
                    isSidebarExpand && 'hamburger_button--active'
                }`}
            ></div>
        </div>
    );
};
