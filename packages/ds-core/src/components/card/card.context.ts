import { VariantProps } from 'class-variance-authority';
import { PartialDeep } from 'type-fest';

import { createSafeContext } from '../../utils/create-safe-context/create-safe-context';
import { cardVariants } from './card.variants';

interface CardContextValue
    extends PartialDeep<VariantProps<typeof cardVariants>> {
    hasHeader: boolean;
    hasFooter: boolean;
}

export const [CardProvider, useCardContext] =
    createSafeContext<CardContextValue>('Card component was not found in tree');
