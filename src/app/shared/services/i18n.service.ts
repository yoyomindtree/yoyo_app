/**
 * Importing the required packages and files
 **/
import { multilingualOptions, defaultLanguage } from '../utils/app.i18n';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DEFAULTLANGUAGE } from './../constant/app.constant';

/**
 * I18nService service
 **/
@Injectable()
export class I18nService {

  public defaultAppLanguage: string;
  public local: BehaviorSubject<string>;

  /**
   * constructor
   **/
  constructor() {
    this.defaultAppLanguage = sessionStorage.getItem(DEFAULTLANGUAGE);
    (this.defaultAppLanguage) ?  this.local = new BehaviorSubject(this.defaultAppLanguage) :
      this.local = new BehaviorSubject(defaultLanguage);
  }

  /**
   * @param lang
   * Function to change the language into the selected one
   */
  public changeLanguage(lang: string): void {
    this.local.next(lang);
  }
}
