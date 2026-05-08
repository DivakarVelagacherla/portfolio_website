import { Photo } from './photo';

export interface GalleryCard {
  photo: Photo;
  progress: number;
  noTransition?: boolean;
}
