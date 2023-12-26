import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { concat } from 'rxjs';
import { Artwork } from './types/artwork.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public unboxedArtworks: Artwork[] = [];
  public allArtworksReceived: boolean = this.unboxedArtworks.length == 5;

  constructor(public dataService: DataService) {}

  openPack(): void {
    this.dataService
      .openPack()
      .subscribe((artworks) => (this.unboxedArtworks = artworks));
  }

  getArtworkImgUrl(artwork: Artwork): string {
    return `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
  }
}
