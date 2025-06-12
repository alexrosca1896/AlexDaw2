import { Component } from '@angular/core';
import { HeaderComponent } from './features/components/header/header.component';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from "./features/components/sidebar/category/category.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'song-cheng';
}
