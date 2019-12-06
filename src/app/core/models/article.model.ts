import { Profile } from './profile.model';

export interface Article {
  slug: string;  // oc sen
  title: string;
  description: string;
  body: string;
  tagList: string[];  // List of Tag
  createdAt: string;
  updatedAt: string;
  lovers: string[];
  favoritesCount: number;
  author: Profile;
}
