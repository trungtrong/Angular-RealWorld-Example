<pre>
      <STEP-1-  Home page>
                --------------------------
  1 - List of tags
    <Home-folder>
    <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your <i>Angular</i> knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">

          <ul class="nav nav-pills outline-active">

            <li class="nav-item">
              <a class="nav-link">
                 Your Feed
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link">

                Global Feed
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link active">
                <i class="ion-pound"></i>
              </a>
            </li>
          </ul>
        </div>


        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a class="tag-default tag-pill">
                1
              </a>
            </div>

            <div>
              Loading tags
            </div>

            <div>
              No tags are here... yet
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

</div>

  Tasks of Home Component = {
      + List of tags
      + List of articles pulled from either Feed, Global, or by Tag
      + Pagination for list of articles
    }

             --------------------------
  2 - Layout- <Footer-and Header>
    in <shared-folder>
    2-1- <First-> :  Show this for logged out users
     Home | Sign in | Sign up

    <li class="nav-item">
        <a class="nav-link">
          Sign in
        </a>
      </li>
             --------------------------
  3- Add to app.module.ts
    @NgModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
      ]
            --------------------------
  4- Add <main.css-in index.html>

  5- <Task-2> List of articles pulled from either Feed, Global, or by Tag
  <app-article-list> = {
    <app-article-preview> = {

        <app-article-meta> = {
          <app-favorite-button>
        },
        itself

    },
    and part of itself
  }
      5-1- Create <article.-model.ts> in @core/models
        + export interface Article {
          slug: string;
          title: string;
          description: string;
          body: string;
          tagList: string[];
          createdAt: string;
          updatedAt: string;
          favorited: boolean;
          favoritesCount: number;
          author: Profile;
        }

      5-2- Create <article-preview.html>

      <a [routerLink]="['/article', article.slug]" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline"
          *ngFor="let tag of article.tagList"  >
            {{ tag }}
          </li>
        </ul>
      </a>
    </div>

    5-3- Create <article-preview.ts>
    export class ArticlePreviewComponent {

      NOTE: <article-preview> is the child of <article-list>
      @Input() article: Article;

      constructor() { }

      }

    5-4- create index.ts to export all <article-list / preview / ..>
          export * from './article-preview/article-preview.component';

      + and add to <SharedModule-module.ts>
          import { CommonModule } from '@angular/common';

    5-5- <Task-3> : Pagination for list of articles
      + In <article-list.comp.html>
        nav = ul.pagination

    5-6-
      + Import <Shared-Module> into <Home-Module>
      + Import <Home-Module> into <app-Module>

      + <home-comp> is the parent of <article-list>
          <app-article-list [limit]="10" [config]="listConfig">
        </app-article-list>

    5-7- Create <Home-Routing.module.ts>
        const routes: Routes = [
          {
            path: '',
            component: HomeComponent,
          }
        ];
      + and add <Home-Routing.module.ts> to <Home-Module>

    5-8- Create <app-Routing.module>
        const routes: Routes = [
          // add HomeRouting
          {
            path: '',
            loadChildren: () => import('../app/home/home.module')
              .then(m => m.HomeModule)
          }
        ];

      + and add <app-Routing-module> to <app-module>
      + and add <router-outlet></router-outlet> to <app-.comp.html>

-------------------------------------------------------------------------

    <STEP-2> <Login-and-Register-Pages>
      - Sign in/Sign up pages (URL: /#/login, /#/register )
        +  Uses JWT (store the token in localStorage)
        +  Authentication can be easily switched to session/cookie based

        +  Authenticate users via JWT (login/signup pages + logout button on settings page)
        +  CRU* users (sign up & settings page - no deleting required)
                      ------------------
    <step-2-1>: Login and register page

      1 -  Create <auth-component.html>
        => Creating Login / Register Form using ReactiveForm

      2 - Create <auth-comp.ts>

      3- Create <auth-routing.module.ts>
        const routes: Routes = [
          {
            path: 'login',
            component: AuthComponent
          },
          {
            path: 'register',
            component: AuthComponent,
          },
        ];

      4- Create <auth-module.ts>
        + import <Shared-Module>
          @NgModule({
            imports: [
              SharedModule,
              AuthRoutingModule
            ],
            declarations: [
              AuthComponent
            ],
            providers: [
              // NoAuthGuard
            ]
          })
  ********    b/c it will occur ERROR:
          NullInjectorError: No provider for FormBuilder!
      Solution:

        +  import and export : FormsModule, ReactiveFormsModule
                in <Shared-Module>

      5 - Import <Auth-module> into <app-module>

      6- Add links to <header-comp.html>
      <li class="nav-item">
        <a class="nav-link"
          routerLink="/login"
          routerLinkActive="active">
          Sign in
        </a>
      </li>

-------------------------------------------------------------------------

    <STEP-3> <How-to Service for Interacting and Authenticating with a Server>

  <s3-1> Lets wire up or <Auth-Component FORM> to the actual login register endpoints on out server

    - <First->: We'll <need-to create a SERVICE> that handles
          <making-requests to the server>
        + Both <Login-and- Register endpoints> require a <POST-request>

      <F-1>: Create the <ApiService->
        - To <POST-data of credentials> to Server

          + Using <API-URL>: in   <environment-folder>

          + in environment.ts and prod.ts
              export const environment = {
                production: false,
                api_url: 'http://localhost:3000/employees'
              };
        =>  See on STEP-1 <api.-service.ts>


      <F-2>: create services/index.ts
            export * from './api.service';

    - <Second->: Create <User-Service>:
      in services/user.service.ts
      + create <attemptAuth-function> try to implement either Login or Register

      1 - Create <user-.model.ts Interface>
            in @core/models/user.model.ts
      2- See STEP 1 on <user-service>

      3 - export in  { services/ index-.ts }
        export * from './user.service';


    - <Third->: Create <core.-module.ts>
        to import
          providers: [
            ApiService,
            UserService
          ]
      + and <import- CoreModule into AppModule>

      5 -


      6 - ERRORs occur on the browser:
          StaticInjectorError(Platform: core)[UserService -> HttpClient]:
          NullInjectorError: No provider for HttpClient!

      => Solution: import and export HttpClientModule,  RouterModule into <shared-module>


      NOTE : after POST request @return An `Observable` of the response,
        with the response body as a JSON object.


      7 - Create the <List-Errors.component>
        contains all the ERRORs of input field
        7-1: Create { core/models/errors.model.ts }
          export class Errors {
            errors: {[key: string]: string} = {};
          }
        + and add into <index.-ts>

        7-2: edit in api.service.ts
            private formatErrors(error: any) {
              return throwError(error.error);

-------------------------------------------------------------------------

    <STEP-4> <Using-directives to SHOW / HIDE Elements for Authenticated Users>

      1 - create ShowAuthedDirective in <shared- / directives />

      2-  declarations and export ShowAuthedDirective in <Shared-module>

      3- import <Shared-module> into <Home-module>

      4-  In <home-comp.html>
          <div class="banner" *appShowAuthed="false">

      PURPOSE:  Using ShowAuthedDirective to confirm whether my apps
                is on <Logged-in status> or Register status

-------------------------------------------------------------------------
    <STEP-5>: Retrieving, Storing and Utilizing a <JWT> for User Authentication

     5 - 1 - When a user logs into a service, the server checks the user’s credentials.
        + If successful, the server encodes the key user data, such as a user ID or the user’s email address into a JSON string. The string is then signed using a secret key. This data is the JSON Web Token. It can be sent back to the client and used by the client to authenticate itself.

        + If a server can validate the token with the appropriate key, it can be sure that it was generated by the authentication server. But it can’t be forged because only the authentication server knows the private key. The authentication can be provided by a service that is separate from the service wanting to restrict access.

    5 - 2 -The codebase for this tutorial works on the following components:

      1. JSON Web Token
      2.Client + localStorage
      3.Back-end + Secure API Endpoints + DB
      4.Authentication Service
      5.User Service
      6.JWT Interceptor
      7.Auth Guard
      8.Error Interceptor

    <S-1> Auth guard:
        create <auth-guard.service.ts> in core/services/

    <S-2> <jwt.-service.ts>
      - To get / save / destroy Token in LocalStorage

      - In index.ts
          export * from './auth-guard.service';
          export * from './jwt.service';

    <s-3>: create <http-.token.interceptor.ts>

      - import to core/interceptors/index.ts

      - add to Injector : by add to Providers in <core-module.ts>

          providers: [
            AuthGuard,
            JwtService,
            httpInterceptorProviders,

      - Purpose for using <http-token.interceptor.ts>:
        + If in localStorage has token => before sending the request
          to Server, we add [ authorization: token ] with token
          to Request
          => purpose: authenticate User and keep Log in

        + If no, make a new Request for authentication

      - and add <core-module > to <app-module>


    <s-4>: make <removeAuth-function> in <user.-service.ts>
        to remove all User's info on the Client (token, data on Observable)

        // 1 - remove JWT from localStorage
            this._jwtService.destroyToken();
    <s-5>
      + First: create <get-function > in <api.-service.ts>
      + Second: Make <getUser-function> in <user.-service.ts>

    <s-6>: + First: create <put-function > in <api.-service.ts>
      + Second: Make <updateUser-function> in <user.-service.ts>

    <s-7>: + First: create <delete-function > in <api.-service.ts>

    <s-8>:
      + import <Shared-Module> into <App-Module>
      so that <header-component.html> can user <*appShowAuth> Directive
     Edit <header.-component.html>
      Create Home | Settings | Log out in the case User logged out

-------------------------------------------------------------------------
    <STEP-6>: Make a <Logout- section> and <Keep- User login whenever Reloading / Refreshing>

  <s-1>: Make a <Log-out> functionality in nav-bar
      1 - In <Header-component.ts> make a log-out function


  <s-2> Keep User login whenever Reloading / Refreshing
    + In <App-Component.ts>: Try to get User's Token and User Login Status

    export class AppComponent implements OnInit {
      constructor(private _userService: UserService) {}

      ngOnInit() {
        this._userService.getUser();
      }
    }

</pre>