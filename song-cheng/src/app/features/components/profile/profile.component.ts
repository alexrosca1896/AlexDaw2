import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { AuthService } from '../login/service/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  client: Client | null = null;

  constructor(private authService: AuthService) {
    this.client = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.authService.loadUserProfile().subscribe((client) => {
      this.client = client;
    });
  }
}
