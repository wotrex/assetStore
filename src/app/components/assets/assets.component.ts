import { Component, OnInit } from '@angular/core';
import { messages, Position, Types, User } from '@app/interfaces';
import { PaymentService } from '@app/services/payment.service';
import { PositionService } from '@app/services/position.service';
import { UserService } from '@app/services/user.service';
import { Stripe } from 'stripe-angular';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  user:  User
  positions: Position[]
  constructor(private pos: PositionService, private payserv: PaymentService, private userServ: UserService) { }

  ngOnInit(): void {
    this.pos.fetch().subscribe(positions => {
      this.positions = positions
    })
    this.userServ.getUser().subscribe( response => {
      this.user = response;
    })
    /* for(let i of this.positions){
      i.getFile = function(files: string): void{
        this.pos.download(files).subscribe(file => {
          const blob = new Blob([file]); // you can change the type

          const url= window.URL.createObjectURL(blob);
          window.open(url);
        })
      }
    }

    } */
  }
  download(fileId: string, fileName: string, fileType: Types): void{
    this.pos.download(fileId).subscribe((response: any) => {
      const blob = new Blob([response], { type: fileType.content }); // you can change the type
      const anchor = document.createElement('a');
      anchor.download = fileName + '.' + fileType.name;
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = [fileType.content, anchor.download, anchor.href].join(':');
      anchor.click();
    })
  
  }

  pay(assetId: string): void{
    this.payserv.getSessionId(assetId).subscribe( response => {
      this.payserv.pay(response.message)
    })
  }

}
