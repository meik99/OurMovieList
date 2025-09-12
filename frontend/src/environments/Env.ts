import { GroupService } from "../app/groups/service/group-service";
import { LocalGroupService } from "../app/groups/service/local-group-service";
import { LocalLoginService } from "../app/login/service/local-login-service";
import { LoginService } from "../app/login/service/login-service";

export class Env {
  apiUrl: string = "http://localhost:3000/api";
  loginService: any = LocalLoginService;
  groupService: any = LocalGroupService;

  constructor(args?: Partial<Env>) {
    if (args) {
      Object.assign(this, args);
    }
  }
}
