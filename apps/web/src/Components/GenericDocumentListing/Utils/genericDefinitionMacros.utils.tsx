import { ObjectDto } from '@finnoto/core';
import { ExpenseStatus } from '@finnoto/design-system';

/**
 * Renders the expense status component based on the provided item object.
 *
 * @path - /e/f/expenses
 *
 * @param {ObjectDto} item - The item object containing the necessary information for rendering the expense status component.
 * @return {JSX.Element} The rendered expense status component.
 */
export const ef_expense_status_macro = (item: ObjectDto) => {
    return (
        <div className='justify-center row-flex'>
            <ExpenseStatus
                finops_status={item.finops_status_id}
                verification_status={item.verification_status_id}
                payment_status={item.payment_status_id}
                approval_progress={item.approval_status}
                party_status={item.party_status_id}
                verification_approved_at={item?.verification_activity_at}
                finops_approved_at={item?.finops_activity_at}
                payment_approved_at={item?.payment_activity_at}
                size='normal'
                balance_amount={
                    item.balance_amount +
                    (item.balance_amount > 0 ? item.tds?.amount || 0 : 0)
                }
                amount={item.amount}
                pending_confirmation_amount={
                    item?.net_balance_amount - item?.balance_amount
                }
                paid_amount={item?.paid_amount}
                withCollapsible
                isInTable
            />
        </div>
    );
};
