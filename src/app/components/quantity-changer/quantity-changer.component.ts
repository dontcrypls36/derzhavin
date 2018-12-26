import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-changer',
  templateUrl: './quantity-changer.component.html',
  styleUrls: ['./quantity-changer.component.css']
})
export class QuantityChangerComponent implements OnInit {

  @Input() value: number;
  @Output() decreaseValue = new EventEmitter();
  @Output() increaseValue = new EventEmitter();
  @Output() changeInputValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMinusClick() {
    this.decreaseValue.emit();
  }

  onPlusClick() {
    this.increaseValue.emit();
  }

  onInputChange(event: any) {
    this.changeInputValue.emit({newValue: event.target.value});
  }

}
