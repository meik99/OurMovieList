import { GroupMovie } from "./GroupMovie";

export class Group {
  id?: string;
  name: string = "";
  friends: {
    email: string;
  }[] = [];
  movies: GroupMovie[] = []
  admin: {
    id: number;
    email: string;
  } = { id: 0, email: "" };

  constructor(args?: Partial<Group>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
