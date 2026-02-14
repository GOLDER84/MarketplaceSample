import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApiService} from '../base-api/base-api.service';
import {AddItemRequest, BuyItemRequest, Item} from "../../models/item.model";

@Injectable()
export class ItemApiService {
  private readonly basePath = 'item-apis';

  constructor(private readonly apiService: BaseApiService) {
  }

  public getItems(): Observable<Item[]> {
    return this.apiService.get<Item[]>(`${this.basePath}/get-all`);
  }

  public getItemById(itemId: number): Observable<Item> {
    return this.apiService.get<Item>(`${this.basePath}/get-by-id/${itemId}`);
  }

  public addItem(payload: AddItemRequest): Observable<string> {
    return this.apiService.postText(`${this.basePath}/add`, payload);
  }

  public buyItem(payload: BuyItemRequest): Observable<string> {
    return this.apiService.postText(`${this.basePath}/buy`, payload);
  }

  public deleteItem(itemId: number): Observable<string> {
    return this.apiService.deleteText(`${this.basePath}/remove/${itemId}`);
  }
}
