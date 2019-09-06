import { Url } from 'url';

export class Camp {
    id: string;
    name: string;
    address: string;
    description: string;
    url: Url;
    pictures: Array<string>;

    constructor(id: string, name: string, address: string, description: string, url: Url, pictures: Array<string>, ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.url = url;
        this.pictures = pictures;
    }

}
