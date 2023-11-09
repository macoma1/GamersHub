// user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  favoriteGames: {
    gameId: number,
    name: string,
    imageUrl: string,
    genres: string[];
  }[];

}
