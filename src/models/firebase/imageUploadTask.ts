import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';

export class ImageUploadTask {
    private readonly ref: AngularFireStorageReference;
    private readonly task: AngularFireUploadTask;
    private url: string;

    private constructor(
        url: string = null,
        ref: AngularFireStorageReference = null,
        task: AngularFireUploadTask = null,
    ) {
        this.url = url;
        this.ref = ref;
        this.task = task;
    }

    static getUploadedImage(url: string): ImageUploadTask {
        return new ImageUploadTask(url);
    }

    static getLocalImage(ref: AngularFireStorageReference, task: AngularFireUploadTask): ImageUploadTask {
        return new ImageUploadTask(null, ref, task);
    }

    public async getUrl(): Promise<string> {
        if (this.url) {
            return this.url;
        }

        await this.task;
        return this.ref.getDownloadURL().toPromise();
    }
}