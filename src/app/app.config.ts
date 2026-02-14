import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import { routes } from './app.routes';
import {BaseApiService} from "./services/base-api/base-api.service";
import {UserApiService} from "./services/user-api/user-api.service";
import {ItemApiService} from "./services/item-api/item-api.service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) , provideHttpClient() , BaseApiService,
    UserApiService,
    ItemApiService]
};
