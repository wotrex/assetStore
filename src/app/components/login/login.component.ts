import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;
  error: string = null;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnDestroy(){
    if (this.aSub){
      this.error = null
      this.aSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){

      }else if(params['accessDenied']) {
        
      }else if(params['sessionFailed']) {
        
      }
    })
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/assets']),
      error => {
        console.warn(error.error.message)
        this.error = "Неправильное имя или пароль"
        this.form.enable()
        this.form.controls['password'].patchValue("")
      }
    )
  }

}
