import {Component, OnDestroy, OnInit} from '@angular/core';
import {SmsService} from '../../services/sms.service';
import {Observable, Subscription, timer} from 'rxjs';
import {RegInfoRequest} from "../../models/reg-info-request";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  readonly SECOND_FOR_REPEAT_SMS = 180;

  public phoneNumber: string;

  response: string;
  smsSent = false;
  smsStatus: string;
  password: string;
  passwordConfirm: string;
  smsCode: string;

  timer: number;
  errorText = '';

  // phoneNumberControl: new FormControl('', Validators.minLength(5));

  private timerSource: Observable<number>;
  private timerSubscription: Subscription;


  private phoneTemplate = '+79';

  constructor(private smsService: SmsService) { }

  ngOnInit() {
    this.phoneNumber = this.phoneTemplate;
  }

  public sendSms() {
    this.timerSource = timer(1000, 1000);
    this.smsService.sendSms(this.phoneNumber).subscribe(res => {
      this.response = res;
      this.smsStatus = res.Message;
      if (this.smsStatus === "call_manager") {
        this.errorText = 'Ваш телефонный номер заблокирован. Обратитесь к менеджеру.';
      }
      this.smsSent = true;
      this.timer = this.SECOND_FOR_REPEAT_SMS;
      this.timerSubscription = this.timerSource.subscribe(tick => {
        this.timer--;
        if (this.timer <= 0) {
          this.timerSubscription.unsubscribe();
        }
      });
    });
  }

  onPhoneNumberChange() {
    if (this.phoneNumber.length < this.phoneTemplate.length) {
      this.phoneNumber = this.phoneTemplate;
    }
  }

  sendCode() {
    this.smsService.register(new RegInfoRequest(this.phoneNumber, this.password, this.smsCode)).subscribe( res => {
      if (res) {
        if (res.Message === 'ok') {
          sessionStorage.setItem('user', JSON.stringify(res));
        }
        else if (res.Message === 'wrong_smscode'){
          this.errorText = 'Неверный СМС код';
        }
        else if (res.Message === 'wrong_blocked'){
          this.errorText = 'Ваш телефонный номер заблокирован. Обратитесь к менеджеру.';
        }
        else if (res.Message === 'old_versionapp'){
          this.errorText = 'Ошибка приложения';
        }
        else if (res.Message === 'call_manager'){
          this.errorText = 'Вы уже зарегистрированы. Войдите или обратитесь к менеджеру';
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription){
      this.timerSubscription.unsubscribe();
    }
}



}
