import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UiService} from '../services/ui.service';


@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  constructor(private matDialog: MatDialog, private uiService: UiService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        const statusCode = error.error.statusCode;
        if (statusCode !== 500) {
          let errorMessage1 = 'An unknown error occurred!';
          if (error.error.message) {
            errorMessage1 = error.error.message;
          }
          // this.uiService.wrong(errorMessage1);
          // this.matDialog.open(MessageDialogComponent, {data: {message: errorMessage1}});
          return throwError(error);
        } else {
          let errorMessage2 = 'An unknown error occurred!';
          if (error.error.message) {
            errorMessage2 = error.error.message;
          }
          // this.uiService.wrong(errorMessage2);
          return throwError(error);
        }
      })
    );
  }
}
