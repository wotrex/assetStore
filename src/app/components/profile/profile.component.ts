import { Component, OnInit } from '@angular/core';
import { Position, Types, User } from '@app/interfaces';
import { PositionService } from '@app/services/position.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:  User
  positions: Position[]
  constructor(private userServ: UserService, private posServ: PositionService) {
   }

  ngOnInit(): void {
    this.userServ.getUser().subscribe( response => {
      this.user = response;
    })
    this.userServ.getUserItems().subscribe(positions => {
      this.positions = positions
    })
  }
  
  download(fileId: string, fileName: string, fileType: Types): void{
    this.posServ.download(fileId).subscribe((response: any) => {
      const blob = new Blob([response], { type: fileType.content }); // you can change the type
      const anchor = document.createElement('a');
      anchor.download = fileName + '.' + fileType.name;
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = [fileType.content, anchor.download, anchor.href].join(':');
      anchor.click();
    })
  
  }

}