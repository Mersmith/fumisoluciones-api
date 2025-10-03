import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleHttpError(error: HttpErrorResponse) {
  if (error.status === 422) {
    return throwError(() => ({
      type: 'validation',
      errors: error.error.errors
    }));
  }

  if (error.status === 500) {
    return throwError(() => ({
      type: 'server',
      message: 'Error en el servidor, intenta más tarde.'
    }));
  }

  return throwError(() => ({
    type: 'unknown',
    message: 'Error desconocido, revisa tu conexión.'
  }));
}
