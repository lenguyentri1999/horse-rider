export abstract class AbstractEvent {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    address: string;
    pictures: Array<string>;
}

export class CampEvent extends AbstractEvent {
    campID: string;
}

export class TrailEvent extends AbstractEvent {
    trailID: string;
}
