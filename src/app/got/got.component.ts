import { Component, OnInit } from '@angular/core';
import { GotService } from './got.service';
import { GotWikiService } from './got-wiki.service';
import { HttpClient } from '@angular/common/http';
import { House } from './house';
import { SelectedHouse } from './selected-house';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../app-error';
import { PageNotFoundError } from '../page-not-found-error';
import {isJsObject} from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-got',
  templateUrl: './got.component.html',
  styleUrls: ['./got.component.css']
})
export class GotComponent implements OnInit {
  houses: House[] = [];
  selectedHouse: SelectedHouse = null;
  firstPage = 1;
  lastPage = 0;
  nextPage = 0;
  prevPage = 0;
  pageSize = 5;
  hideDetails = true;

  // (click)="loadHouseDetails(i)"

  constructor(private gotService: GotService, private wikiService: GotWikiService) {}

  ngOnInit() {
    this.firstPage = 1;

    this.loadHouses(this.firstPage, this.pageSize);
  }

  loadHouses(page: number, pageSize?: number) {
    let relatedPagesLinks: string[];
    let pageNumber;
    let pageRelation;

    this.gotService.getAllHouses(page, pageSize)
      .subscribe(response => {
        this.houses = <House[]>response.body;

        response.headers.get('link').split(',').forEach(link => {
          relatedPagesLinks = link.split(';');

          pageNumber = relatedPagesLinks[0].split(/[=&]/)[1];
          pageRelation = relatedPagesLinks[1].split(/[""]/)[1];

          switch (pageRelation) {
            case 'prev':
              this.prevPage = Number(pageNumber);
              break;
            case 'next':
              this.nextPage = Number(pageNumber);
              break;
            case 'last':
              this.lastPage = Number(pageNumber);
              break;
          }
        });
      });
  }

  loadHouseDetails(index: number) {
    this.selectedHouse = new SelectedHouse(this.houses[index], this.gotService);

    this.getWikiInformations();
  }

  private getWikiInformations() {
    this.wikiService.getWiki(this.selectedHouse.name).subscribe(
      (response) => {
        this.processWikiResponse(response);
      },
      (error: AppError) => {

        if (error instanceof PageNotFoundError) {

          // Trying to find data by passing shorter house name in wiki url
          this.wikiService.getWiki(this.selectedHouse.name.split(' ').slice(0, 2).join('_')).subscribe(
            response => {
              this.processWikiResponse(response);
            },
            (err: AppError) => {
              console.log('House decription not found in Wiki');
            });
        }
      }
    );
  }

  private processWikiResponse(response) {
    const parser = new DOMParser();
    let document, imageTag;
    let houseDescription, firstParagraph;

    document = parser.parseFromString(response.body, 'text/html');

    houseDescription = document.querySelector('#mw-content-text');
    imageTag = houseDescription.querySelector('a.image>img');
    firstParagraph = houseDescription.getElementsByTagName('p')[0].innerText.replace(/\[\d+\]/g, '');

    if (imageTag.getAttribute('src') !== null) {
      this.selectedHouse.emblemSrc = this.wikiService.urlWiki + imageTag.getAttribute('src');
    }

    if (firstParagraph !== '') {
      this.selectedHouse.wikiDescription = firstParagraph;
    }
  }
}
