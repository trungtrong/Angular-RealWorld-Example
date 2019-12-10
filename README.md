> ## Angular RealWorld App

### [Reference](https://github.com/gothinkster/angular-realworld-example-app/blob/master/README.md) from [thinkster](https://thinkster.io/)

## Functionality overview
### General functionality:

* Authenticate users via JWT (login/signup pages + logout button on settings page)
* CRU* users (sign up & settings page - no deleting required)
  - using Resolve Guard instead Route Guard
* CRUD Articles
* CR*D Comment on articles(no updating required)
* GET and display paginated list of articles
  - edit the pagination, like this:  Prev 1 2 3 4 5 Next
* Favorite articles

### Task List
* 1 - The brief Home Page
* 2 - Sign in/Sign up pages (URL: /#/login, /#/register )
  - uses JWT (store the token in localStorage) for authentication
* 3 - Settings page (URL: /#/settings )
  - for edit user's info
* 4 - Editor page to create/view/edit articles (URL: /#/editor, /#/editor/article-slug-here )
  - 4-1- Create
  - 4-2- View	
  - 4-3- Edit: updating article after editing 
*	5 - Article page (URL: /#/article/article-slug-here )
    - 5-1- Delete article button (only shown to article's author)
      + Ex: http://localhost:4200/article/hahaha-agtd2y
    - 5-2- Render markdown from server client side (unnecessary yet)
   	- 5-3- Comment section at bottom of page
	    - 5-3-1: Add new comment
	    - 5-3-2: Load all comments when going on to the article 
      - 5-3-3: Delete comment button (only shown to comment's author)
*	6 - Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
    - 6-1- View other user’s profiles
    - 6-2 – List article populated
    - 6-3- Favorited button and author’s favorited article
    - 6-4- List Favorited Articles (Favorited Posts)
    - 6-5- create Pagination Article List and add query params for each page button
      - Ex: Prev 1 2 3 4 5 Next
      - 6-5-1 Fix pagination: adding routerLink to prev and next button
    - 6-6- Edit pagination for ProfileFavorite
    - 6-7 Fix the problem that is without using [routerLinkActive] with query parameters in ProfileComponent
*	7 – Feed Page
    - 7-1- Global feed
*	8 – Tags
    - 8-1- Get all TagLists to make Popular Tags
    - 8-2- Get all articles depending on each #Tag
* 9 - Page Not Found
