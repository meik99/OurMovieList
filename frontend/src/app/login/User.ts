export class User {
  id: number = -1;
  email: string = "";
  token?: string;
  exp?: number;

  constructor(args?: Partial<User>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
