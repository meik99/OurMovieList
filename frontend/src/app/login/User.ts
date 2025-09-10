export class User {
  email: string = "";

  constructor(args?: Partial<User>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
