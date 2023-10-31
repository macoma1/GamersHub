export interface GameResponse {
    count: number;
    next: string;
    previous: string;
    results: Game[];
}

export interface Game {
    id: number;
    name: string;
    released: Date;
    background_image: string;
    metacritic: number;
    rating: number;
    added_by_status : AddedStatus;
    platforms: GamePlatform[];
    genres: GameGenre[];
}

interface AddedStatus {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
}
interface PlatformDetail {
    id: number;
    name: string;
}

export interface GamePlatform {
    platform: PlatformDetail;
}


interface GameGenre {
    id: number;
    name: string;
}
