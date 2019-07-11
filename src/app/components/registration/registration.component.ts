import {Component, OnInit} from '@angular/core';
import {SmsService} from '../../services/sms.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public phoneNumber: string;

  response: string;

  private phoneTemplate = '+79601087082';

  constructor(private smsService: SmsService) { }

  ngOnInit() {
    this.phoneNumber = this.phoneTemplate;
  }

  public sendSms() {
      this.smsService.sendSms(this.phoneNumber).subscribe(res => {
        this.response = res;
      });
  }

  onPhoneNumberChange() {
    if (this.phoneNumber.length < this.phoneTemplate.length) {
      this.phoneNumber = this.phoneTemplate;
    }
  }

}
