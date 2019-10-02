export interface Article {
  slug: string;  // oc sen
  title: string;
  description: string;
  body: string;
  tagList: string[];  // List of Pagination
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  // author: Profile;
}
