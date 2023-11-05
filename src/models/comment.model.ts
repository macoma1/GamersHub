export interface Comment {
  _id?: string;
  email: string;
  userName: string;
  gameId: number;
  content: string;
  date?: Date;
}
