import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { useList } from 'react-use';

import { IsValidString } from '@finnoto/core';
import {
    DndComponent,
    DndComponents,
    DndLayout,
    DndLayouts,
    Icon,
    InputField,
    ModalBody,
    ModalContainer,
} from '@finnoto/design-system';

import { PlusSvgIcon, SearchSvgIcon } from 'assets';

const AddGenericDashboardReport = ({
    layouts,
    components,
    addLayouts,
}: {
    layouts: DndLayouts;
    components: DndComponents;
    addLayouts: (newLayouts: DndLayouts | DndLayout) => void;
}) => {
    const [search, setSearch] = useState('');
    const [appliedLayouts, { push: addAppliedLayout }] = useList(
        layouts?.map((layout) => layout.identifier) ?? []
    );

    const handleLayoutAdd = (identifier: string) => {
        const component = components[identifier];

        addLayouts({
            identifier,
            width: component.defaultWidth ?? component.minWidth ?? 4,
            height: component.defaultHeight ?? component.minHeight ?? 4,
            posX: 0,
            posY: 0,
            breakpoint: 'lg',
        });

        addAppliedLayout(identifier);
    };

    const availableComponents = useMemo<
        (DndComponent & { key: string })[]
    >(() => {
        const filteredComponents = [];

        for (const [key, value] of Object.entries(components)) {
            if (appliedLayouts.includes(key)) continue;

            filteredComponents.push({ ...value, key });
        }

        return filteredComponents;
    }, [appliedLayouts, components]);

    const filteredComponents = useMemo(() => {
        if (!IsValidString(search)) return availableComponents;

        const fuse = new Fuse(availableComponents, {
            keys: [
                { name: 'key', weight: 2 },
                { name: 'defaultConfigs.report_name', weight: 1.5 },
            ],
            threshold: 0.4,
        });

        const searchResult = fuse.search(search);
        return searchResult.flatMap((result) => result.item);
    }, [availableComponents, search]);

    return (
        <ModalContainer title='Add Dashboard Report'>
            <ModalBody className='gap-4'>
                <InputField
                    type='search'
                    value={search}
                    onChange={(value) => setSearch(value)}
                    placeholder='Search Reports'
                    addonStart={<Icon source={SearchSvgIcon} isSvg />}
                    autoFocus
                />
                {filteredComponents.map((component) => {
                    return (
                        <div
                            className='relative flex-1 rounded-md col-flex group'
                            key={component.key}
                        >
                            <button
                                className='absolute top-0 left-0 z-10 w-full h-full transition-all opacity-0 cursor-pointer bg-success/30 group-hover:opacity-100'
                                onClick={() => handleLayoutAdd(component.key)}
                            >
                                <Icon source={PlusSvgIcon} isSvg size={46} />
                            </button>
                            <div className='pointer-events-none select-none'>
                                {component.component(
                                    component.defaultConfigs,
                                    () => {}
                                )}
                            </div>
                        </div>
                    );
                })}
            </ModalBody>
        </ModalContainer>
    );
};

export default AddGenericDashboardReport;
