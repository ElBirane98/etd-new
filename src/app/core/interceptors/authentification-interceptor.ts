import { HttpInterceptorFn } from '@angular/common/http';

export const authentificationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
