import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css',
})
export class NavMenuComponent {
  constructor(private router: Router) {}
  goToOrders(): void {
    this.router.navigate(['/orders']);
  }
}
