export interface PhotoModalOutput {
    url: string,
    file: any,
    isLocal: boolean,
};

export class PhotoUrlWrapper {
    public readonly url: string;
    public readonly isLocal: boolean;
    public readonly file: any;

    private constructor(url: string, isLocal: boolean, file: any = null) {
        this.url = url;
        this.isLocal = isLocal;
        this.file = file;
    }

    static getLocalImage(url: string, file: File): PhotoUrlWrapper {
        return new PhotoUrlWrapper(url, true, file);
    }

    static getImageFromModal(output: PhotoModalOutput): PhotoUrlWrapper {
        if (output.isLocal) {
            return new PhotoUrlWrapper(output.url, output.file, output.isLocal);
        } else {
            return new PhotoUrlWrapper(output.url, null, false);
        }
    }

    static getAlreadyUploadedImage(url: string): PhotoUrlWrapper {
        return new PhotoUrlWrapper(url, false, null);
    }
}