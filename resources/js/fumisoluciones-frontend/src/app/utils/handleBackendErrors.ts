import { FormGroup } from '@angular/forms';

export function handleBackendErrors(err: any, form: FormGroup) {
  if (err.type === 'validation') {
    Object.keys(err.errors).forEach(field => {
      const control = form.get(field);
      if (control) {
        control.setErrors({ backend: err.errors[field][0] });
      }
    });
  } else {
    alert(err.message || 'Error inesperado. Intenta de nuevo.');
  }
}