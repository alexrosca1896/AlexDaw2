import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../login/service/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    dni: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    address: this.fb.group({
      name: ['', Validators.required],
      postalCode: [null, [Validators.required, Validators.min(1000)]],
      city: ['', Validators.required],
    }),
  });

  error = '';

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    const { password, confirmPassword, address, ...rest } = this.form.value;
    if (password !== confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    const client = {
      ...rest,
      password,
      address: [address],
    };

    this.authService.register(client as any).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = 'Error al registrar: ' + err.error;
      },
    });
  }
}
