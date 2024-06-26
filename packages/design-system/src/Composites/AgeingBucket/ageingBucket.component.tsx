import { useEffect, useMemo } from 'react';
import { useList } from 'react-use';

import {
    BucketItem,
    IsEmptyArray,
    IsUndefinedOrNull,
    RED_SHADES,
    SortArrayObjectBy,
    useAgeingBucket,
    uuidV4,
} from '@finnoto/core';

import { Button, ModalBody, ModalContainer } from '../../Components';
import { Modal, Toast } from '../../Utils';
import { FormModalFooter } from '../../Utils/ModalFormUtil';
import { BucketInput } from './components/bucketInput.component';

interface AgeingBucketProps {
    /**
     * The key of the AgeingBucket preference.
     */
    bucketKey: string;
    /**
     * The title of the AgeingBucket.
     *
     * @default 'Ageing Bucket'
     */
    title?: string;
    /**
     * The description of the AgeingBucket.
     */
    description?: string;
    /**
     * The default key for the starting bucket.
     *
     * @example '<=1'
     */
    startBucketDefaultKey?: string;
    /**
     * The default key for the ending bucket.
     *
     * @example '>100'
     */
    endBucketDefaultKey?: string;
    /**
     * The suffix of the AgeingBucket.
     *
     * @default 'Days'
     */
    bucketSuffix?: string;
    /**
     * The default bucket list.
     */
    defaultBucket?: BucketItem[];
}

/**
 * Renders an AgeingBucket component which allows the user to manage ageing buckets.
 */
export const AgeingBucket = ({
    bucketKey,
    title = 'Ageing Bucket',
    description,
    bucketSuffix = 'Days',
    defaultBucket,
    startBucketDefaultKey,
    endBucketDefaultKey,
}: AgeingBucketProps) => {
    /**
     * Creates a list of BucketItem objects, each having an id.
     * The id is a unique identifier for each BucketItem.
     */
    const [
        // The list of BucketItems, each having an id.
        bucketList,
        { set: setBucketList, insertAt, updateAt, removeAt },
    ] = useList<BucketItem & { id: string }>([]);

    // Custom hook for fetching and updating the ageing bucket.
    const { isLoading, isSavingPreference, bucket, setBucket } =
        useAgeingBucket(bucketKey, defaultBucket);

    /**
     * Determines if the first bucket in the list is the starting bucket.
     * This is done by checking if the first bucket has a start value of `undefined`.
     */
    const hasStartingBucket = useMemo(() => {
        // Check if the first bucket in the list has a start value of `undefined`
        return bucketList?.at(0)?.start === undefined;
    }, [bucketList]);

    const handleSubmit = async () => {
        const bucketData = sanitizeBucketSave(bucketList);

        if (!validateBucketValues(bucketData)) return;
        const success = await setBucket(bucketData);

        if (!success) {
            Toast.error({
                description: 'Something went wrong! Please try again.',
            });
            return;
        }
        Toast.success({ description: 'Ageing Bucket updated successfully!' });
        Modal.close();
    };

    /**
     * Sanitizes the bucket list by converting any undefined or null values in the start and end properties of each bucket item to their respective default values.
     * If the start property is undefined, the key property is set to '< {end}', otherwise if the end property is undefined, the key property is set to '> {start - 1}'.
     * If neither the start nor the end property is undefined, the key property is set to '{start} - {end}'.
     *
     * @param {BucketItem[]} bucketList - The list of bucket items to be sanitized.
     * @return The sanitized bucket list.
     */
    const sanitizeBucketSave = (bucketList: BucketItem[]) => {
        return [...bucketList].map((item) => {
            // Check if the start property is undefined or not a number
            if (IsUndefinedOrNull(item.start) || typeof item.start !== 'number')
                item.start = undefined;

            // Check if the end property is undefined or not a number
            if (IsUndefinedOrNull(item.end) || typeof item.end !== 'number')
                item.end = undefined;

            // If the start property is undefined, set the key property to '< {end}'
            if (IsUndefinedOrNull(item.start)) {
                item.key = '< ' + item.end;

                // If startBucketDefaultKey is provided, override the key property
                if (startBucketDefaultKey) item.key = startBucketDefaultKey;

                return item;
            }

            // If the end property is undefined, set the key property to '> {start - 1}'
            if (IsUndefinedOrNull(item.end)) {
                item.key = '> ' + (item.start - 1);

                // If endBucketDefaultKey is provided, override the key property
                if (endBucketDefaultKey) item.key = endBucketDefaultKey;

                return item;
            }

            // If neither the start nor the end property is undefined, set the key property to '{start} - {end}'
            item.key = `${item.start} - ${item.end}`;

            return item;
        });
    };

    /**
     * Validates the values of the bucket list.
     *
     * @param {BucketItem[]} bucketList - The list of bucket items to be validated.
     * @return Returns true if the values of the bucket list are valid, otherwise returns false.
     */
    const validateBucketValues = (bucketList: BucketItem[]) => {
        // Check if the bucket list has at least two items
        if (bucketList.length < 2) {
            Toast.error({ description: 'Please add atleast 2 buckets!' });
            return false;
        }

        // Check if all the items in the bucket list have both start and end values
        const valid = bucketList.every((item, index) => {
            // Skip the first and last items
            if (index === 0 || index === bucketList.length - 1) {
                return true;
            }

            // Check if the start and end values are not undefined
            return (
                !IsUndefinedOrNull(item.start) && !IsUndefinedOrNull(item.end)
            );
        });

        // If the bucket list is not valid, show an error toast
        if (!valid) {
            Toast.error({ description: 'Please fill all the buckets!' });
            return false;
        }

        return true;
    };

    /**
     * Gets the last bucket from the bucket list.
     *
     * @returns The last bucket item in the bucket list.
     */
    const lastBucket = useMemo(() => {
        // Get the last bucket item from the bucket list.
        // The -1 is used to get the last item from the array.
        return bucketList?.at(-1);
    }, [bucketList]);

    /**
     * Get the end bucket.
     *
     * @returns The end bucket item or null.
     */
    const endBucket = useMemo(() => {
        // Check if the last bucket has an end value.
        if (lastBucket?.end) return null;

        // Return the last bucket.
        return lastBucket;
    }, [lastBucket]);

    /**
     * When the component mounts, it sets the bucketList from the
     * `bucket` data. This data is fetched from the server and it's
     * sorted based on the `start` property.
     *
     * The `uuidV4` function is used to generate a unique id for
     * each item.
     *
     * The effect is only ran when the `bucket` data changes or
     * when the `isLoading` changes.
     */
    useEffect(() => {
        // If the data is still loading, do not update the state
        if (isLoading) return;

        // If the `bucket` is empty, do not update the state
        if (IsEmptyArray(bucket)) return;

        // Sort the `bucket` data based on the `start` property
        const sortedBucket = SortArrayObjectBy(bucket, 'start');

        // Generate a unique id for each item and set the state
        setBucketList(
            sortedBucket.map((item) => {
                return {
                    ...item,
                    id: uuidV4(),
                };
            })
        );
    }, [bucket, isLoading, setBucketList]);

    return (
        <ModalContainer title={title}>
            <ModalBody className='gap-4 p-3'>
                <p>{description}</p>
                <div className='gap-1 col-flex'>
                    {bucketList?.map((bucketItem, index, bucketArray) => {
                        // This is a check to see if this is the last item in the array.
                        const isLastIndex = index === bucketArray.length - 1;

                        /**
                         * If this is the last index and the endBucket is not null
                         * then we don't want to render this item.
                         *
                         * This way we can avoid rendering the endBucket twice which is rendered outside the loop below.
                         */
                        if (isLastIndex && endBucket) return null;

                        /**
                         * Check if this is the first item in the list and if it is missing a start value.
                         *
                         * If so, render a startBucketInput component.
                         */
                        if (
                            index === 0 &&
                            IsUndefinedOrNull(bucketItem.start)
                        ) {
                            return (
                                <BucketInput
                                    key={bucketItem.id}
                                    value={{
                                        ...bucketItem,
                                        key: 'Start Bucket',
                                    }}
                                    suffix={bucketSuffix}
                                    isStartBucket
                                    disabled
                                    color={RED_SHADES[0]}
                                />
                            );
                        }

                        // The next bucket in the list.
                        const nextBucket = !isLastIndex
                            ? bucketArray[index + 1]
                            : null;

                        // The display name of the current bucket.
                        const bucketDisplayName =
                            'Bucket ' + (hasStartingBucket ? index : index + 1);

                        return (
                            <BucketInput
                                key={bucketItem.id}
                                value={{
                                    ...bucketItem,
                                    key: bucketDisplayName,
                                }}
                                suffix={bucketSuffix}
                                maxValue={
                                    !IsUndefinedOrNull(nextBucket?.end)
                                        ? nextBucket?.end - 1
                                        : undefined
                                }
                                onChange={(value) => {
                                    // Update the bucket at the specified index with the new value.
                                    updateAt(index, {
                                        ...bucketItem,
                                        ...value,
                                    });

                                    // If there is no next bucket, we don't need to update anything.
                                    if (!nextBucket) return;

                                    // If the new value does not have an "end" value, there is no need to update the next bucket.
                                    if (!value.end) return;

                                    // Update the start value of the next bucket to be one greater than the new end value.
                                    updateAt(index + 1, {
                                        ...nextBucket,
                                        start: value.end + 1,
                                    });
                                }}
                                onDelete={() => {
                                    /**
                                     * Update the start value of the next bucket to be the start value of the current bucket.
                                     * This is necessary when deleting a bucket to prevent gaps in the ageing buckets.
                                     */
                                    if (nextBucket) {
                                        updateAt(index + 1, {
                                            ...nextBucket,
                                            start: bucketItem.start,
                                        });
                                    }

                                    // Delete the current bucket.
                                    removeAt(index);
                                }}
                                color={
                                    index >= RED_SHADES.length
                                        ? RED_SHADES[RED_SHADES.length - 1]
                                        : RED_SHADES[index]
                                }
                            />
                        );
                    })}
                    <Button
                        appearance='ghost'
                        onClick={() => {
                            // If only start and end buckets are present
                            if (
                                IsUndefinedOrNull(bucketList.at(1)?.start) &&
                                bucketList.length <= 2
                            ) {
                                // Update the start value of the last bucket.
                                updateAt(bucketList.length - 1, {
                                    ...lastBucket, // Keep the end value of the bucket
                                    start: 2, // Set the start value of the bucket to 2
                                });

                                // Insert a new bucket between start and end
                                insertAt(bucketList.length - 1, {
                                    id: uuidV4(),
                                    key: '',
                                    start: 0,
                                    end: Math.max(lastBucket.start - 1, 1),
                                });

                                return;
                            }

                            // Increase the start of the last bucket
                            updateAt(bucketList.length - 1, {
                                ...lastBucket,
                                start: lastBucket.start + 2,
                            });

                            // Insert a new bucket between the last two
                            insertAt(bucketList.length - 1, {
                                id: uuidV4(),
                                key: '',
                                start: bucketList.at(-2)?.end + 1,
                                end: lastBucket.start + 1,
                            });
                        }}
                        className='!min-h-[50px] !h-[50px] hover:border-solid rounded-lg font-normal text-polaris-text-link hover:text-polaris-text-inverse hover:bg-polaris-bg-fill-info-active !border border-dashed border-polaris-border-info hover:border-polaris-border-info '
                        outline
                    >
                        + Add Bucket
                    </Button>
                    {endBucket && (
                        <BucketInput
                            value={{
                                ...endBucket,
                                key: 'Last Bucket',
                            }}
                            suffix={bucketSuffix}
                            isEndBucket
                            color={RED_SHADES[RED_SHADES.length - 1]}
                            disabled
                        />
                    )}
                </div>
            </ModalBody>
            <FormModalFooter
                isSubmitting={isSavingPreference}
                handleSubmit={handleSubmit}
            />
        </ModalContainer>
    );
};

/**
 * Opens the AgeingBucket modal with the provided props.
 */
export const openAgeingBucket = (props: AgeingBucketProps) => {
    Modal.open({
        component: AgeingBucket,
        modalSize: 'sm',
        props,
    });
};
