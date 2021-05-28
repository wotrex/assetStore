import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = "Home";
  logined : boolean;
  link : string;
  constructor(private auth: AuthService)
  {

  }

  ngOnInit(): void {
  }
  ngDoCheck(){
    this.logined = this.auth.isAuthenticated();
    if (this.logined)
    {
    
      this.link = "/assets"
    }
    else
    {
      this.link = "/register"
    }

  }

}
