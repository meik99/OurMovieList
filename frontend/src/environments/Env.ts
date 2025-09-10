import { LocalGroupService } from "../app/groups/service/local-group-service";
import { LocalLoginService } from "../app/login/service/local-login-service";

export class Env {
  loginService = LocalLoginService;
  groupService = LocalGroupService;

  constructor(args?: Partial<Env>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
