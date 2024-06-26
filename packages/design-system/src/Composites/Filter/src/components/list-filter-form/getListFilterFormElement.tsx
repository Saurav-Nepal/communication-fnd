import { AmountRangeFilterFormElement } from './components/filterListFormElement/amount.range.filter.element';
import { BooleanFilterElement } from './components/filterListFormElement/boolean.filter.element';
import { DateInputFilterFormElement } from './components/filterListFormElement/date.input.filter.form.element';
import { DateRangeFilterFormElement } from './components/filterListFormElement/date.range.filter.form.element';
import { MultiSelectFilterFormElement } from './components/filterListFormElement/multi.select.filter.form.element';
import { MultiSelectReferenceFilterFormElement } from './components/filterListFormElement/multi.select.reference.filter.form.element';
import { SingleSelectFilterFormElement } from './components/filterListFormElement/single.select.filter.form.element';
import { MonthYearSelectFilter } from './components/month.year.select.filter';
import { ListFormFilterProps } from './list.form.filter.types';

export const getListFormFormElement = (filter: ListFormFilterProps) => {
    switch (filter?.type) {
        case 'amount_range':
            return (
                <AmountRangeFilterFormElement
                    {...{ filter }}
                    key={filter.key}
                />
            );

        case 'date_range':
            return (
                <DateRangeFilterFormElement {...{ filter }} key={filter.key} />
            );
        case 'date':
            return (
                <DateInputFilterFormElement
                    {...{ filter: { ...filter, type: 'date' } }}
                    key={filter.key}
                />
            );
        case 'multi_select':
            return (
                <MultiSelectReferenceFilterFormElement
                    {...{ filter }}
                    key={filter.key}
                />
            );
        case 'multi_select_object':
            return (
                <MultiSelectFilterFormElement
                    {...{ filter }}
                    key={filter.key}
                />
            );
        case 'select':
            return (
                <SingleSelectFilterFormElement
                    {...{ filter }}
                    key={filter.key}
                />
            );
        case 'boolean':
            return <BooleanFilterElement {...{ filter }} key={filter.key} />;
        case 'month_filter':
            return <MonthYearSelectFilter {...{ filter }} key={filter?.key} />;

        default:
            return <></>;
    }
};
