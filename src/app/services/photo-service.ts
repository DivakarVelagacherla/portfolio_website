import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Photo } from '../models/photo';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private baseUrl: string = environment.photosBaseUrl;
  private imageResizeBaseUrl: string = environment.photoResizeBase;

  private photos: any = null;

  constructor(private httpClient: HttpClient) {}

  fetchPhotos() {
    if (this.photos) {
      return of(this.photos);
    } else {
      return this.httpClient
        .get(`${this.baseUrl}/photos.json`)
        .pipe(tap((data) => (this.photos = data as Photo[])));
    }
  }

  getImageUrl(key: string, width?: number) {
    if (width) {
      return `${this.imageResizeBaseUrl}/width=${width},quality=90,format=webp/${this.baseUrl}/${key}`;
    }

    return `${this.baseUrl}/${key}`;
  }
}
