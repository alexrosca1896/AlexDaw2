import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../../../models/client.model';
import { AuthService } from '../../login/service/auth.service';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Client,
    private fb: FormBuilder,
    private auth: AuthService,
    private dialogRef: MatDialogRef<ProfileDialogComponent>
  ) {}

  ngOnInit(): void {
    // Inicializa form con datos de cliente y direcciones
    const addressFGs = this.client.addresses.map((addr) =>
      this.fb.group({
        id: [addr.id],
        name: [addr.name, Validators.required],
        city: [addr.city, Validators.required],
        postalCode: [addr.postalCode, Validators.required],
      })
    );

    this.form = this.fb.group({
      dni: [{ value: this.client.dni, disabled: true }],
      name: [this.client.name, Validators.required],
      phone: [this.client.phone, Validators.required],
      password: [''],
      confirmPassword: [''],
      addresses: this.fb.array(addressFGs),
    });
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(
      this.fb.group({
        id: [null],
        name: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: [null, Validators.required],
      })
    );
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSave(): void {
    if (this.form.invalid) return;

    const { name, phone, password, confirmPassword, addresses } =
      this.form.getRawValue();

    if (password && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const updatedClient: Client = {
      ...this.client,
      name,
      phone,
      password: password || this.client.password,
      addresses: addresses.map((a: any) => ({
        id: a.id,
        name: a.name,
        city: a.city,
        postalCode: a.postalCode,
        clientId: this.client.id,
      })),
    };

    this.auth.updateClient(updatedClient).subscribe(() => {
      this.dialogRef.close(updatedClient);
    });
  }
}
