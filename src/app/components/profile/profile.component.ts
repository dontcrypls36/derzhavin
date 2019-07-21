import {Component, OnInit} from '@angular/core';
import {SmsService} from "../../services/sms.service";
import {RegInfoRequest} from "../../models/reg-info-request";
import {SpinnerServiceService} from "../../services/spinner-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  clientDescription = '';
  managerDescription = '';
  managerMobileTel = '';
  managerOfficeTel = '';

  constructor(private smsService: SmsService,
              private spinner: SpinnerServiceService) { }

  ngOnInit() {
    this.spinner.show();
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.smsService.register(new RegInfoRequest(user.tel, user.password, "")).subscribe( res => {
      this.clientDescription = res.ClientDescription;
      this.managerDescription = res.ManagerDescription;
      this.managerMobileTel = res.ManagerMobileTel;
      this.managerOfficeTel = res.ManagerOfficeTel;
      this.spinner.hide();
    });
  }
}
