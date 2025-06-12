import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from '../components/nav-menu/nav-menu.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ProfileComponent } from "../components/profile/profile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    SidebarComponent,
    ProductListComponent,
    NavMenuComponent,
    ProfileComponent
],
})
export class HomeComponent {}
