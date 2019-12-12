import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {
  authType: string;
  title: string;
  loading = false;
  submitted = false;
  authForm: FormGroup;

  messageError = {
    username: {success: true, msg: ''},
    email: {success: true, msg: ''},
    login: {success: true, msg: ''}
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
     /*
        email: ['': => the begin content of input field,
          Validators.required
          ]
     */

    this.route.url.subscribe(data => {
      // b/c path= "login/"
      this.authType = data[data.length - 1].path;

      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.authForm.controls;
  }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }
    // if valid => loading
    this.loading = true;

    //  get value of  from FormGroup : ReactiveForm
    // include Login/Register Form
    const credentials = this.authForm.value;

    // remove space from username
    if (this.authType === 'register') {
      credentials.username = credentials.username.split(' ').join('');
    }

    this.userService.attemptAuth(this.authType, credentials)
          .subscribe(
            data => {
              this.loading = false;
              this.router.navigateByUrl('/');
            },
            err => {
              this.loading = false;
              // if register is fail
              if (this.authType === 'register') {
                this.messageError = err;
              } else {
                // if login is fail
                if (err === 'Unauthorized') {
                  this.messageError.login = {
                    success: false,
                    msg: 'Email or Password is invalid'
                  };
                }
              }
            }
          );
  }
}


/*
          STEP 1: Login and Register  (Step 2 / Step2-2 / 2)
              at <STEP-3> in summary

  import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {

  // All the STEP 2 / step 2-1 / 2
  authType: string;
  title: string;
  isSubmiting: boolean;
  authForm: FormGroup;


  constructor(
    // step 1: Login and register page
    private route: ActivatedRoute,
    private fb: FormBuilder ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get URL
    this.route.url.subscribe(data => {

      // console.log(data); // => [UrlSegment]:  get URL segment
      // get the last piece of URL (it's either login or register)
      this.authType = data[data.length - 1].path;
      // console.log(this.authType); // if localhost:4200/login
                                  // we have 'login'

      // set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      // add form control for Username , if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  submitForm() {
    this.isSubmiting = true;
    // thong tin dang nhap: credentials
    const credentials = this.authForm.value;
    // and check out what you get!
    console.log(credentials);

  }
}

*/


/*
      STEP 2: <How-to Service for Interacting and Authenticating with a Server>
          at  <STEP-3> in summary
    ngOnInit() {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

     //   email: ['': => the begin content of input field,
     //     Validators.required
     //     ]


    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;

      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.authForm.controls;
  }

  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.authForm.invalid) {
      console.log(this.authForm.invalid);
      return;
    }
    // if valid => loading
    this.loading = true;

    //  get value of  from FormGroup : ReactiveForm
    // include Login/Register Form
    const credentials = this.authForm.value;
    console.log(credentials);

    this.userService.attemptAuth(this.authType, credentials)
          .subscribe(

            //  if there doesn't have Errors
            //  => after (submit) Login/ register and go to '/'

            data => {
              // data response from Server: data = { user }
              // console.log(data);

              // return Promise
              // console.log(this.router.navigateByUrl('/'));

              return this.router.navigateByUrl('/');
            },
            err => {
              console.log(err);
              // @@@@@@@@ Review
              this.loading = false;
            }
          );
  }
*/
