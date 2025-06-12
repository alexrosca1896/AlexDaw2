import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../login/service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  openProfile() {
    const client = this.authService.getCurrentUser();
    if (client) {
      this.dialog.open(ProfileDialogComponent, {
        width: '600px',
        maxHeight: '90vh',
        panelClass: 'profile-dialog-panel',
      });
    }
  }
  goHome(): void {
    this.router.navigate(['/']);
  }
}
