import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseApiService} from '../base-api/base-api.service';
import {AddCreditRequest, EditUserRequest, LoginRequest, RegisterRequest, User} from "../../models/user.model";

@Injectable()
export class UserApiService {
  private readonly basePath = 'user-apis';

  constructor(private readonly apiService: BaseApiService) {}

  public getUserSummary(name: string): Observable<User> {
    return this.apiService.get<User>(`${this.basePath}/get-user-summary`, { name });
  }

  public getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.basePath}/get-all-users`);
  }

  public login(payload: LoginRequest): Observable<string> {
    return this.apiService.postText(`${this.basePath}/login`, payload);
  }

  public register(payload: RegisterRequest): Observable<string> {
    return this.apiService.postText(`${this.basePath}/register`, payload);
  }

  public logout(): Observable<string> {
    return this.apiService.postText(`${this.basePath}/logout`, {});
  }

  public edit(payload: EditUserRequest): Observable<string> {
    return this.apiService.putText(`${this.basePath}/edit`, payload);
  }

  public addCredit(payload: AddCreditRequest): Observable<string> {
    return this.apiService.putText(`${this.basePath}/add-credit`, payload);
  }
}
