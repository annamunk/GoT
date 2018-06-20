import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppError} from '../app-error';
import {PageNotFoundError} from '../page-not-found-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GotWikiService {
  private _urlWiki = 'http://awoiaf.westeros.org/';

  constructor(private http: HttpClient) {}

  get urlWiki(): string {
    return this._urlWiki;
  }

  getWiki(houseName: string) {
    return  this.http
      .get(this._urlWiki + 'index.php/' + houseName.split(' ').join('_'), {responseType: 'text', observe: 'response'})
      .catch((error: Response) => {
        if (error.status === 404) {
          return Observable.throw( new PageNotFoundError);
        } else {
          return Observable.throw(new AppError(error));
        }
        });

  }
}
