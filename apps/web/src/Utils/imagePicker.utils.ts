import {
    FileData,
    FileUploadSource,
    IsEmptyArray,
    ObjectDto,
    UploadImagesToServer,
} from '@finnoto/core';

export async function ProcessData({
    images,
    resolve,
    uploadFile,
    source = 'business',
    headers,
    endpoint,
}: {
    images: File | File[];
    resolve: any;
    uploadFile: any;
    source?: FileUploadSource;
    headers?: ObjectDto;
    endpoint?: string;
}): Promise<FileData[]> {
    let imagesArray: FileData[];

    if (!resolve) {
        return new Promise((newResolve) => {
            resolve = newResolve;
        });
    }

    if (!Array.isArray(images)) {
        imagesArray = [images];
    } else {
        imagesArray = images;
    }

    // uri is standard property of image object
    // imagesArray
    //     .filter((image) => !IsEmptyObject(image))
    //     .map((image) => (image.uri = image.path || image.uri));

    if (IsEmptyArray(imagesArray)) {
        resolve([]);
    }

    if (!uploadFile) {
        resolve(imagesArray);
        return imagesArray;
    }

    const result = await UploadImagesToServer({
        files: imagesArray as File[],
        source,
        headers,
        endpoint,
    });
    // since server is expected to return an array always,
    // hence if not valid array
    if (!Array.isArray(result)) {
        // resolve empty array response
        return resolve([]);
    }

    // attach serverUrl property to each image object
    result.forEach((imageUrl, index) => {
        imagesArray[index].serverUrl = imageUrl.serverUrl;
    });

    if (typeof resolve == 'function') resolve(imagesArray);

    return imagesArray;
}
