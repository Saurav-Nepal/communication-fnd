import { Table, TableColumn } from '@finnoto/design-system';

const UserRolesList = ({ roleData }: any) => {
    const columns: TableColumn[] = [
        { name: 'Role Name', key: 'role_group.name' },
        { name: 'Description', key: 'role_group.description' },
        { name: 'Assigned On', key: 'created_at', type: 'date_time' },
    ];

    return <Table data={roleData} column={columns} />;
};

export default UserRolesList;
