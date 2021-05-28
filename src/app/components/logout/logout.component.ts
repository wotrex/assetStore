import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  back(){
    this.router.navigate(['/'])
  }
  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

}
