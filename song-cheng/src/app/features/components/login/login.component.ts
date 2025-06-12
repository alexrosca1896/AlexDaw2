import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class LoginComponent {
  form = this.fb.group({
    dni: ['', Validators.required],
    password: ['', Validators.required],
  });

  error = '';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    const { dni, password } = this.form.value;

    this.authService.login(dni!, password!).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.error = 'DNI o contraseña incorrectos'),
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
