export class DJ {
    id: string;
    name: string;
    email: string;
    sets: DJSet[];

    constructor(id: string, name: string, email: string, sets: DJSet[] = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.sets = sets;
    }
}

export class DJSet {
    id: string;
    date: Date;
    fee: number;
    percentage: number;
    tracks: Track[];

    constructor(id: string, date: Date, fee: number, percentage: number, tracks: Track[] = []) {
        this.id = id;
        this.date = date;
        this.fee = fee;
        this.percentage = percentage;
        this.tracks = tracks;
    }
}

export class Track {
    id: string;
    title: string;
    artist: Artist;

    constructor(id: string, title: string, artist: Artist) {
        this.id = id;
        this.title = title;
        this.artist = artist;
    }
}

export class Artist {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
