import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private phoneNum: string;
  private pass: string;

  private mockUser: any = {
    tel: '+79529516710',
    VersionApp: '1.2.1',
    DeviceDescr: 'GenymotionSamsung Galaxy S7 - 8.0 - API 26 - 1440x2560 SDK 26',
    pass: 'eaded9424b3f5b63',
    DeviceId: 'android'
  };

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    //this.userService.login(this.phoneNum, this.pass).subscribe( res => {
      sessionStorage.setItem('user', JSON.stringify(this.mockUser));
      this.router.navigate(['/orders']);
    //});
  }

}
