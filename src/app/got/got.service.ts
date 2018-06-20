import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpResponse  } from '@angular/common/http';
import { House } from './house';
import { Character } from './character';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class GotService {
  private urlAPI = 'https://anapioficeandfire.com/api/';

  constructor(private http: HttpClient) {
  }

  getAllHouses(page?: number, pageSize?: number): Observable<HttpResponse<Object>> {
    return this.http
      .get(this.urlAPI + 'houses?page=' + page + '&pageSize=' + pageSize, {observe: 'response'});
  }

  getCharacter(url: string): Observable<HttpResponse<Object>> {
    return this.http
      .get(url, {observe: 'response'});
  }
}
