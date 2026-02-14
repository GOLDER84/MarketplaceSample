import { Component, DestroyRef } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Item} from "../../models/item.model";
import {ItemApiService} from "../../services/item-api/item-api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActiveUserService} from "../../services/active-user/active-user.service";

@Component({
  selector: 'app-item-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-section.component.html',
  styleUrl: './item-section.component.css'
})
export class ItemSectionComponent {
  protected items: Item[] = [];
  protected statusMessage: string = '';
  protected statusType: 'success' | 'error' | '' = '';
  protected activeUsername: string | null = null;

  protected addItemForm = { Name: '', Price: 0, Description: '' };
  protected buyItemId: number | null = null;

  public constructor(
    private readonly _itemApiService: ItemApiService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activeUserService: ActiveUserService
  ) {}

  public ngOnInit(): void {
    this.refreshItems();
    this._activeUserService.activeUserId$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((username) => this.activeUsername = username);
  }

  protected setStatus(message: string, type: 'success' | 'error'): void {
    this.statusMessage = message;
    this.statusType = type;
  }

  protected refreshItems(): void {
    this._itemApiService.getItems()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (items) => this.items = items,
        error: (err) => this.setStatus(`خطا در دریافت آیتم‌ها: ${err.message ?? err}`, 'error')
      });
  }

  protected onAddItem(): void {
    this._itemApiService.addItem(this.addItemForm)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`آیتم اضافه شد: ${res}`, 'success');
          this.addItemForm = { Name: '', Price: 0, Description: '' };
          this.refreshItems();
        },
        error: (err) => this.setStatus(`خطا در افزودن آیتم: ${err.message ?? err}`, 'error')
      });
  }

  protected onBuyItem(): void {
    if (!this.activeUsername || this.buyItemId === null) {
      this.setStatus('لطفاً یک کاربر فعال و یک آیتم انتخاب کنید.', 'error');
      return;
    }

    this._itemApiService.buyItem({
      Username: this.activeUsername,
      ItemId: this.buyItemId
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`خرید موفق: ${res}`, 'success');
          this.buyItemId = null;
          this.refreshItems();
        },
        error: (err) => this.setStatus(`خطا در خرید: ${err.message ?? err}`, 'error')
      });
  }

  protected onDeleteItem(itemId: number): void {
    this._itemApiService.deleteItem(itemId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.setStatus(`حذف شد: ${res}`, 'success');
          this.refreshItems();
        },
        error: (err) => this.setStatus(`خطا در حذف آیتم: ${err.message ?? err}`, 'error')
      });
  }
}
