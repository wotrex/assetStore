import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@app/services/payment.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private payS: PaymentService) { }

  ngOnInit(): void {
    this.payS.successPayment().subscribe(() => {
      console.log("yes4")
    })
  }

}
