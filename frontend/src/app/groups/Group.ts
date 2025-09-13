import { GroupMovie } from "./GroupMovie";

export class Group {
  id?: string;
  name: string = "";
  friends: string[] = [];
  movies: GroupMovie[] = []
  admin: string = "";

  constructor(args?: Partial<Group>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
