import GenericCardListing, {
    GenericCardListingProps,
} from '@Components/GenericCardListing/genericCardListing';
import { ActionModal } from '@Components/HomeWrapper/homeWrapper.component';
import { GetObjectFromArray, ObjectDto } from '@finnoto/core';
import { ConfirmUtil, Icon, Modal } from '@finnoto/design-system';
import { DeleteSvgIcon, EditSvgIcon, MoreIcon } from 'assets';
import { useCallback, useMemo } from 'react';

const ContactPersonCardList = ({
    data = [],
    loading,

    onRemove,
    onAddContactPerson,
}: any) => {
    const rowActions = useMemo(
        () => [
            {
                name: 'Edit',

                action: (item: ObjectDto) => onAddContactPerson(item),
                key: 'edit',
                color: 'text-info',
                icon: EditSvgIcon,
            },
            {
                name: 'Delete',
                key: 'delete',
                action: (item: ObjectDto) => {
                    ConfirmUtil({
                        title: 'Do you want to delete?',
                        message:
                            'The action you are about to perform is irreversible.',
                        icon: DeleteSvgIcon,

                        onConfirmPress: () => {
                            onRemove(item?.id);
                        },
                        iconAppearance: 'error',
                        confirmAppearance: 'error',
                    });
                },
                color: 'text-error',
                isCancel: true,
                icon: DeleteSvgIcon,
            },
        ],
        [onAddContactPerson, onRemove]
    );
    const openActions = useCallback(
        (item: ObjectDto) => {
            Modal.open({
                component: ActionModal,
                props: {
                    actions: rowActions.map((action) => {
                        const currentAction = GetObjectFromArray(
                            rowActions,
                            'key',
                            action?.key
                        );
                        return {
                            ...currentAction,
                            action: () => {
                                currentAction.action(item);
                            },
                        };
                    }),
                },
            });
        },
        [rowActions]
    );
    const card_props: GenericCardListingProps = {
        data,
        loading,
        noDataProps: {
            description: 'There are no any contact person available',
            button: {
                name: 'Add Contact Person',
                onClick: onAddContactPerson,
            },
        },
        list: {
            titleKey: 'name',
            bottomListItems: [
                {
                    name: 'Mobile',
                    key: 'mobile',
                },
                {
                    name: 'Email',
                    key: 'email',
                    fullWidth: true,
                },
            ],

            rightComponent: (item: ObjectDto) => {
                if (item?.attributes?.no_edit) return <></>;
                return (
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            openActions(item);
                        }}
                        className='border rounded border-primary'
                    >
                        <Icon isSvg source={MoreIcon} />
                    </div>
                );
            },
        },
    };
    return <GenericCardListing {...card_props} />;
};

export default ContactPersonCardList;
