export class Group {
  id?: string;
  name: string = "";
  friends: string[] = [];

  constructor(args?: Partial<Group>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
