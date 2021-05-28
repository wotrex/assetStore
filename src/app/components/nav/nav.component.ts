import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  reglog : boolean
  constructor(private auth: AuthService) {
    
   }

/*   reglog(): boolean{ 
    return this.auth.isAuthenticated()
  } */
  ngDoCheck(){
    this.reglog = this.auth.isAuthenticated();
  }
  ngOnInit(): void {
  }

}
