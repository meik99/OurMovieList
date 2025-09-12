export class User {
  id: string = "";
  email: string = "";
  token?: string;
  exp?: number;

  constructor(args?: Partial<User>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
