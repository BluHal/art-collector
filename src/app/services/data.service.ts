import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { Artwork, ArtworkResponse } from '../types/artwork.type';
import { TOTAL_PAGES } from '../constants/shared.constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public openPack(): Observable<Artwork[]> {
    const randomArtworkIds = this.getRandomArtworkIds(5);
    const requests = randomArtworkIds.map((id) => this.getArtwork(id));
    return forkJoin(requests);
  }

  private getRandomArtworkIds(count: number): number[] {
    let ids = [];
    for (var i = 0; i < count; i++) {
      ids.push(this.getRandomNumber(1, TOTAL_PAGES));
    }
    return ids;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getArtwork(id: number): Observable<Artwork> {
    const url = `https://api.artic.edu/api/v1/artworks/search?q=painting,print&page=${id}&fields=id,title,image_id,artwork_type_title,date_start,artist_display,place_of_origin,dimensions,artist_title,style_title,category_titles,classification_title,has_multimedia_resources&limit=1`;

    return this.http.get<ArtworkResponse>(url).pipe(
      map((response) => response?.data[0]),
      mergeMap((artwork) => {
        if (artwork.image_id == null)
          return this.getArtwork(this.getRandomArtworkIds(1)[0]);
        else return of(artwork);
      }),
      catchError(() => {
        return this.getArtwork(this.getRandomArtworkIds(1)[0]);
      })
    );
  }
}
