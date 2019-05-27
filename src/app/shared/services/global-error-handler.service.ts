import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  /**
   * @param
   * Function to handle global Errors
   **/
  public handleError(error: any): any {
    console.log('error', error);
  }
}
