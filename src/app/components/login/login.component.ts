import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {User} from "../../models/user";
import {Constants} from "../../models/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phoneNum: string;
  pass: string;
  error = false;

  private mockUser: any = {
    tel: '+79529516710',
    VersionApp: '1.2.1',
    DeviceDescr: 'GenymotionSamsung Galaxy S7 - 8.0 - API 26 - 1440x2560 SDK 26',
    pass: 'eaded9424b3f5b63',
    DeviceId: 'android'
  };

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onLogin() {
    //todo сохранить реального юзера
    sessionStorage.setItem('user', JSON.stringify(Constants.body));
    this.categoryService.getCategories().subscribe( _ => {
      this.router.navigate(['/categories']);
    }, _  => {
      sessionStorage.removeItem('user');
      this.error = true;
    });
  }

  clearForm() {
    this.phoneNum = "";
    this.pass = "";
    this.error = false;
  }

}
