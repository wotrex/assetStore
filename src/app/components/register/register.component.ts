import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['/login'], {queryParams :{ register: true }}),
      error => {
        console.warn(error)
        this.error = error.error.message
        this.form.enable()
        this.form.controls['password'].patchValue("")
      }
    )
  }

}
