export class House {
  protected _url: string;
  protected _name: string;
  protected _region: string;
  protected _coatOfArms: string;
  protected _words: string;
  protected _titles: string[];
  protected _seats: string[];
  protected _currentLord: string;
  protected _heir: string;
  protected _overlord: string;
  protected _founded: string;
  protected _founder: string;
  protected _diedOut: string;
  protected _ancestralWeapons: string[];
  protected _cadetBranches: string[];
  protected _swornMembers: string[];

  get url(): string {
    return this._url;
  }

  get name(): string {
    return this._name;
  }

  get region(): string {
    return this._region;
  }

  get coatOfArms(): string {
    return this._coatOfArms;
  }

  get words(): string {
    return this._words;
  }

  get titles(): string[] {
    return this._titles;
  }

  get currentLord(): string {
    return this._currentLord;
  }

  get seats(): string[] {
    return this._seats;
  }

  get heir(): string {
    return this._heir;
  }

  get overlord(): string {
    return this._overlord;
  }

  get founded(): string {
    return this._founded;
  }

  get founder(): string {
    return this._founder;
  }

  get diedOut(): string {
    return this._diedOut;
  }

  get ancestralWeapons(): string[] {
    return this._ancestralWeapons;
  }

  get cadetBranches(): string[] {
    return this._cadetBranches;
  }

  get swornMembers(): string[] {
    return this._swornMembers;
  }
}

