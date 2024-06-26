import { IsFunction, Navigation, SelectBoxOption } from '@finnoto/core';
import { cn, Icon, Modal } from '@finnoto/design-system';

import { GenericDocumentListActionProps } from '../genericDocumentListing.types';

const ListActions = ({
    actions,
}: {
    actions: GenericDocumentListActionProps[];
}) => {
    return (
        <div className='gap-2 p-3 max-h-[70vh] overflow-y-auto bg-base-200 col-flex'>
            {actions?.map((action) => {
                if (action.visible === false) return;
                return (
                    <ListSelectItem
                        key={`${action.name}`}
                        icon={action.icon}
                        isSvg={action.isSvg}
                        option={{ label: action.name }}
                        onSelect={() => {
                            TriggerListingAction(action);
                            Modal.close();
                        }}
                    />
                );
            })}
        </div>
    );
};

export const ListSelectItem = ({
    option,
    value,
    icon,
    isSvg,
    onSelect = () => {},
}: {
    option: SelectBoxOption;
    value?: any;
    icon?: any;
    isSvg?: boolean;
    onSelect?: (_: SelectBoxOption) => void;
}) => {
    return (
        <div
            className={cn(
                'row-flex items-center bg-base-100 w-full gap-2 cursor-pointer py-3 px-4 rounded',
                {
                    'hover:bg-base-300/50':
                        value !== (option.value || option.label),
                    'bg-secondary text-secondary-content':
                        value == (option.value || option.label),
                }
            )}
            onClick={() => onSelect(option)}
        >
            {icon ? <Icon source={icon} isSvg={isSvg} /> : null}
            <div className='w-full col-flex'>
                <div className='flex justify-between w-full text-base '>
                    <span>{option.label}</span>
                    {/* <ChevronRight /> */}
                </div>
                {option.subLabel && (
                    <div
                        className={cn('text-xs text-base-tertiary', {
                            '!text-secondary-content':
                                value == (option.value || option.label),
                        })}
                    >
                        {option.subLabel}{' '}
                    </div>
                )}
            </div>
        </div>
    );
};

export const TriggerListingAction = (
    action: GenericDocumentListActionProps
) => {
    if (action.url) {
        Navigation.navigate({ url: action.url });
    }
    if (IsFunction(action.action)) {
        action.action();
    }
};

export default ListActions;
