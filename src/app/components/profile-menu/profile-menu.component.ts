import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
  host: {
    '(document:click)': 'onClick($event)'}
})
export class ProfileMenuComponent implements OnInit {

  showMenu = false;

  constructor(private router: Router,
              private _eref: ElementRef) { }

  ngOnInit() {
  }

  changeVisibility() {
    this.showMenu = !this.showMenu;
  }

  onExit() {
    this.showMenu = false;
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  onClick(event) {
    if (event.target.id !== "profile-menu" && !this._eref.nativeElement.contains(event.target) ) {// or some similar check
      this.showMenu = false;
    }
  }

  onProfile() {
    this.showMenu = false;
    this.router.navigate(['/profile']);
  }
}
