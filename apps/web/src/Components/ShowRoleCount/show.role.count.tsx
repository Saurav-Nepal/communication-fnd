import { useCallback, useState } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { FetchData, ObjectDto } from '@finnoto/core';
import { BusinessUserController } from '@finnoto/core/src/backend/common/controllers/business.user.controller';
import { Badge } from '@finnoto/design-system';

const ShowRoleCount = ({ item, roles }: any) => {
    const [showRole, setShowRole] = useState<any>([]);

    const insertShowRole = useCallback(
        (id: number) => {
            if (showRole.includes(id)) return;
            setShowRole((prev) => [...prev, id]);
        },
        [showRole]
    );

    const ShowRoles = useCallback(
        ({ item }: any) => {
            if (showRole.includes(item.id))
                return <BadgeRole {...{ item, roles }} />;
            const attributes = item?.attributes;

            const role_ids =
                attributes?.roles_count || attributes?.role_ids?.length || 0;

            const suffix = role_ids > 1 ? `Roles` : 'Role';
            if (!role_ids)
                return (
                    <div>
                        {' '}
                        {role_ids} {suffix}
                    </div>
                );
            return (
                <div
                    className='table-link'
                    onClick={() => insertShowRole(item?.id)}
                >
                    {role_ids} {suffix}
                </div>
            );
        },
        [insertShowRole, roles, showRole]
    );
    return <ShowRoles {...{ item }} />;
};
export default ShowRoleCount;

const BadgeRole = ({
    item,
    roles: rolesProps,
}: {
    item: ObjectDto;
    roles?: ObjectDto[];
}) => {
    const [roles, setRoles] = useState<any>(rolesProps || []);
    useEffectOnce(() => {
        if (rolesProps?.length) return;
        fetchRoles();
    });

    useUpdateEffect(() => {
        if (rolesProps?.length) return;
        fetchRoles();
    }, [item?.attributes?.roles_count]);

    const fetchRoles = async () => {
        const { success, response } = await FetchData({
            className: BusinessUserController,
            method: 'show',
            methodParams: item?.id,
        });
        if (success) setRoles(response);
        else setRoles([]);
    };

    return (
        <div className='flex-wrap items-center gap-2 row-flex '>
            {roles?.map((role) => {
                if (!role?.role_group?.name && !role?.name) return null;
                return (
                    <Badge
                        appearance='secondary'
                        key={role?.id}
                        label={role?.role_group?.name || role?.name}
                        size='sm'
                    />
                );
            })}
        </div>
    );
};
