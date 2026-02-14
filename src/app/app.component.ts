import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserSectionComponent} from "./components/user-section/user-section.component";
import {ItemSectionComponent} from "./components/item-section/item-section.component";
import {UserListComponent} from "./components/user-list/user-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserSectionComponent, ItemSectionComponent, UserListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MarketplaceSample';
}
