import { GroupMovie } from "./GroupMovie";

export class Group {
  id?: string;
  name: string = "";
  friends: string[] = [];
  movies: GroupMovie[] = []

  constructor(args?: Partial<Group>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
