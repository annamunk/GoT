export class Character {
  private _name: string;
  private _gender: string;
  private _culture: string;
  private _born: string;
  private _died: string;
  private _titles: string;
  private _playedBy: string;

  get name(): string {
    return this._name;
  }

  get gender(): string {
    return this._gender;
  }

  get culture(): string {
    return this._culture;
  }

  get born(): string {
    return this._born;
  }

  get died(): string {
    return this._died;
  }

  get titles(): string {
    return this._titles;
  }

  get playedBy(): string {
    return this._playedBy;
  }

}
