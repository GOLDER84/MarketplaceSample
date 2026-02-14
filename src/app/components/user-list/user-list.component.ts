import {Component, DestroyRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {User} from "../../models/user.model";
import {ActiveUserService} from "../../services/active-user/active-user.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {

  @Input()
  public users: User[] = [];

  @Output()
  public userSelected: EventEmitter<string> = new EventEmitter<string>();

  protected activeUserId: string | null = null;

  public constructor(
    private readonly _activeUserService: ActiveUserService,
    private readonly _destroyRef: DestroyRef
  ) {
  }

  public ngOnInit(): void {
    this._activeUserService.activeUserId$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((userId) => {
        this.activeUserId = userId;
      });
  }

  public onUserClick(userId: string): void {
    this.userSelected.emit(userId);
  }

  protected trackByUserId(index: number, user: User): string {
    return user.username;
  }
}
