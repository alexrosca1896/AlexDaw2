import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { BasketComponent } from "./basket/basket.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CategoryComponent, BasketComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {}
