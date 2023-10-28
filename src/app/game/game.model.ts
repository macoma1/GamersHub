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
    ratings_count: number;
    platforms: GamePlatform[];
    genres: GameGenre[];
}

interface PlatformDetail {
    id: number;
    name: string;
}

interface GamePlatform {
    platform: PlatformDetail;
}


interface GameGenre {
    id: number;
    name: string;
}
