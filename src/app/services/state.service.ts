import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private ownedArt: WritableSignal<number[]> = signal([]);

  public saveOwnedArt(ownedArt: number[]): void {
    this.ownedArt.set(ownedArt);
  }

  public getOwnedArt(): WritableSignal<number[]> {
    return this.ownedArt;
  }

  constructor() {}
}
