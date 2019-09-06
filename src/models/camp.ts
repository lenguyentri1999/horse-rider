import { Url } from 'url';

export class Camp {
    name: string;
    address: string;
    description: string;
    url: Url;
    pictures: Array<string>;

    constructor(name: string, address: string, description: string, url: Url, pictures: Array<string>, ) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.url = url;
        this.pictures = pictures;
    }

}
