import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { LoginService } from "./login/service/login-service";
import { environment } from "../environments/environment";
import { GroupService } from "./groups/service/group-service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: LoginService,
      useClass: environment.loginService,
    },
    {
      provide: GroupService,
      useClass: environment.groupService,
    },
  ],
};
