export interface IGame {
  creator: string;
  guest: string;
  hasToPlay: string;
  moves: string[];
  messages?: IMessage[]
}

export interface IUser {
  email: string;
  password: string;
}

export interface IMessage {
  from: string;
  content: string;
}