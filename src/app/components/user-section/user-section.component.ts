import {Component, DestroyRef} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {User} from "../../models/user.model";
import {UserApiService} from "../../services/user-api/user-api.service";
import {UserListComponent} from "../user-list/user-list.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ActiveUserService} from "../../services/active-user/active-user.service";


@Component({
  selector: 'app-user-section',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserListComponent
  ],
  templateUrl: './user-section.component.html',
  styleUrl: './user-section.component.css'
})
export class UserSectionComponent {
  protected users: User[] = [];
  protected selectedUser: User | null = null;
  protected statusMessage: string = '';
  protected statusType: 'success' | 'error' | '' = '';
  protected activeUsername: string | null = null;

  protected loginForm = { username: '', password: '' };
  protected registerForm = { name: '', username: '', password: '', age: 0, credit: 0, email: '' };
  protected editForm = { Name: '', Username: '', Password: '', Age: 0, Email: '' };
  protected addCreditForm = { Username: '', Amount: 0 };

  public constructor(
    private readonly _userApiService: UserApiService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activeUserService: ActiveUserService
  ) {}

  public ngOnInit(): void {
    this.refreshUsers();
  }

  protected setStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
  }

  protected refreshUsers(): void {
    this._userApiService.getAllUsers()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (users) => this.users = users,
        error: (err) => this.setStatus(`خطا در دریافت کاربران: ${err.message ?? err}`, 'error')
      });
  }

  protected onUserClick(username: string): void {
    this.activeUsername = username;
    this._activeUserService.setActiveUserId(username);

    const localUser = this.users.find(u => u.username === username);
    if (localUser) {
      this.selectedUser = localUser;
      this.editForm = {
        Name: localUser.name,
        Username: localUser.username,
        Password: '',
        Age: localUser.age,
        Email: localUser.email
      };
      this.addCreditForm.Username = localUser.username;
    }

    this.loadSummary(username);
  }

  protected loadSummary(username: string): void {
    this._userApiService.getUserSummary(username)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (user) => {
          this.selectedUser = user;
          this.editForm = {
            Name: user.name,
            Username: user.username,
            Password: '',
            Age: user.age,
            Email: user.email
          };
          this.addCreditForm.Username = user.username;
        },
        error: (err) => this.setStatus(`خطا در دریافت خلاصه کاربر: ${err.message ?? err}`, 'error')
      });
  }

  protected onLogin(): void {
    this._userApiService.login(this.loginForm)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`ورود موفق: ${res}`, 'success');

          if (this.loginForm.username) {
            this.activeUsername = this.loginForm.username;
            this._activeUserService.setActiveUserId(this.loginForm.username);
            this.loadSummary(this.loginForm.username);
          }

          this.loginForm = { username: '', password: '' };
        },
        error: (err) => this.setStatus(`خطا در ورود: ${err.message ?? err}`, 'error')
      });
  }

  protected onRegister(): void {
    this._userApiService.register(this.registerForm)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`ثبت‌نام موفق: ${res}`, 'success');
          this.registerForm = { name: '', username: '', password: '', age: 0, credit: 0, email: '' };
          this.refreshUsers();
        },
        error: (err) => this.setStatus(`خطا در ثبت‌نام: ${err.message ?? err}`, 'error')
      });
  }

  protected onEdit(): void {
    this._userApiService.edit(this.editForm)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`ویرایش موفق: ${res}`, 'success');
          this.editForm.Password = '';
          this.refreshUsers();
          if (this.editForm.Username) {
            this.loadSummary(this.editForm.Username);
          }
        },
        error: (err) => this.setStatus(`خطا در ویرایش: ${err.message ?? err}`, 'error')
      });
  }

  protected onAddCredit(): void {
    this._userApiService.addCredit(this.addCreditForm)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`افزایش اعتبار موفق: ${res}`, 'success');
          this.addCreditForm.Amount = 0;
          if (this.addCreditForm.Username) {
            this.loadSummary(this.addCreditForm.Username);
          }
        },
        error: (err) => this.setStatus(`خطا در افزایش اعتبار: ${err.message ?? err}`, 'error')
      });
  }

  protected onLogout(): void {
    this._userApiService.logout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => this.setStatus(`خروج موفق: ${res}`, 'success'),
        error: (err) => this.setStatus(`خطا در خروج: ${err.message ?? err}`, 'error')
      });
  }
}
