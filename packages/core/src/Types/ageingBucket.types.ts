import { SetOptional } from 'type-fest';

export interface BucketItemRanges {
    start: number;
    end: number;
}

interface CommonBucketItem {
    key: string;
}
interface BucketItemRangeStart
    extends SetOptional<BucketItemRanges, 'end'>,
        CommonBucketItem {}
interface BucketItemRangeEnd
    extends SetOptional<BucketItemRanges, 'start'>,
        CommonBucketItem {}

export type BucketItem = BucketItemRangeStart | BucketItemRangeEnd;
