export interface ArticleListConfig {
  type: string;
  /*
  - property of filters is used to query list of article
    following { /api/articles?favorited=trungrui09&limit=10&offset=0 }
  */
  filters: {
    author?: string,
    tag?: string,
    favoritedBy?: string,
    limit?: number,
    offset?: number
  };
}
