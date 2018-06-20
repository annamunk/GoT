import { House } from './house';
import { Character } from './character';
import { GotService } from './got.service';

export class SelectedHouse extends House {
  private _emblemSrc = '';
  private _wikiDescription = '';
  private _currentLordCharacter: Character = null;
  private _heirCharacter: Character = null;
  private _founderCharacter: Character = null;
  private _swornMembersCharArr: Character[] = [];

  constructor(house: House, private gotService: GotService) {
    super();
    this._url = house.url;
    this._name = house.name;
    this._region = house.region;
    this._coatOfArms = house.coatOfArms;
    this._words = house.words;
    this._titles = house.titles;
    this._seats = house.seats;
    this._currentLord = house.currentLord;
    this._heir = house.heir;
    this._overlord = house.overlord;
    this._founder = house.founder;
    this._diedOut = house.diedOut;
    this._ancestralWeapons = house.ancestralWeapons;
    this._cadetBranches = house.cadetBranches;
    this._swornMembers = house.swornMembers;

    if (this.currentLord !== '') {
      this.loadCurrentLord();
    }

    if (this.heir !== '') {
      this.loadHeir();
    }

    if(this.founder !== ''){
      this.loadFounder();
    }

    this._swornMembers.forEach( (memberUrl) =>{
      this.loadSwornMember(memberUrl);
      });
  }

  set emblemSrc(src: string) {
    this._emblemSrc = src;
  }

  get emblemSrc(): string {
    return this._emblemSrc;
  }

  set wikiDescription(description: string) {
    this._wikiDescription = description;
  }

  get wikiDescription(): string {
    return this._wikiDescription;
  }

  get currentLordCharacter(): Character {
    return this._currentLordCharacter;
  }

  get heirCharacter(): Character {
    return this._heirCharacter;
  }

  get founderCharacter(): Character {
    return this._founderCharacter;
  }

  get swornMembersCharArr(): Character[] {
    return this._swornMembersCharArr;
  }

  private loadCurrentLord(): void {
    this.gotService.getCharacter(this._currentLord).subscribe( lord => {
        this._currentLordCharacter = <Character>lord.body;
    });
  }

  private loadHeir(): void {
    this.gotService.getCharacter(this._heir).subscribe( lord => {
      this._heirCharacter = <Character>lord.body;
    });
  }

  private loadFounder(): void {
    this.gotService.getCharacter(this._founder).subscribe( lord => {
      this._founderCharacter = <Character>lord.body;
    });
  }

  private loadSwornMember(url): void {
    this.gotService.getCharacter(url).subscribe( member => {
      this._swornMembersCharArr.push( <Character>member.body );
    });
  }
}
