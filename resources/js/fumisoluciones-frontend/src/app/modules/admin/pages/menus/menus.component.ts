import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../../services/menu.service';
import { Menu } from '../../../../models/menu.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  form: FormGroup;
  menus: Menu[] = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
  ) {
    this.form = this.fb.group({
      id: [null],
      label: ['', Validators.required],
      route: [''],
      icon: [''],
      parent_id: [null],
      orden: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getAll().subscribe({
      next: (data) => this.menus = data,
      error: (err) => alert(err.message)
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.form.get('id')?.value;

    const request$ = id
      ? this.menuService.update(id, this.form.value)
      : this.menuService.create(this.form.value);

    request$.subscribe({
      next: () => {
        this.loadMenus();
        this.resetForm();
      },
      error: (err) => this.handleBackendErrors(err)
    });
  }

  editMenu(menu: Menu) {
    this.form.patchValue(menu);
    this.editingId = menu.id!;
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteMenu(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.menuService.delete(id).subscribe(() => this.loadMenus());
    }
  }

  private resetForm() {
    this.form.reset({ id: null, label: '', route: '', icon: '', parent_id: null, orden: 0 });
    this.editingId = null;
  }

  private handleBackendErrors(err: any) {
    if (err.type === 'validation') {
      Object.keys(err.errors).forEach(field => {
        const control = this.form.get(field);
        if (control) {
          control.setErrors({ backend: err.errors[field][0] });
        }
      });
    } else {
      alert(err.message || 'Error inesperado. Intenta de nuevo.');
    }
  }
}
