export class RegInfoRequest {
  tel: string;
  pass: string;
  smscode: string;
  DeviceId = "PC";
  VersionApp = "1.1.1";
  SubscriberNotification =
    {
      SubscriberNotificationId:"APA91bEEbQUuGe5p7WH72AiVaU4utamMygz8e4C3yJSR_go9qbXsHSYIwwSqlfZabC0t16LEaNIHtFBzrW6A_e0frukflq5yND5G",
      SubscriberNotificationProvider:"GCM"
    };

  constructor(tel: string, pass: string, smscode: string) {
    this.tel = tel;
    this.pass = pass;
    this.smscode = smscode;
  }
}
