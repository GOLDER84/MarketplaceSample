import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  private readonly _activeUserId$ = new BehaviorSubject<string | null>(null);
  public readonly activeUserId$ = this._activeUserId$.asObservable();

  public setActiveUserId(username: string): void {
    this._activeUserId$.next(username);
  }

  public clearActiveUser(): void {
    this._activeUserId$.next(null);
  }
}
