import { ApiGroupService } from "../app/groups/service/api-group-service";
import { ApiLoginService } from "../app/login/service/api-login-service";
import { Env } from "./Env";

export const environment = new Env({
    loginService: ApiLoginService,
    groupService: ApiGroupService
});

