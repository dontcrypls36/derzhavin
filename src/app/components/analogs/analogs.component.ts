import {Component, Input, OnInit} from '@angular/core';
import {GoodService} from "../../services/good.service";
import {Good} from "../../models/good";
import {GoodDetailsComponent} from "../good-details/good-details.component";
import {PreOrderItem} from "../../models/pre-order-item";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-analogs',
  templateUrl: './analogs.component.html',
  styleUrls: ['./analogs.component.css']
})
export class AnalogsComponent implements OnInit {

  // @Input()
  // subGroupId: string;
  //
  // @Input()
  // categoryId: string;
  //
  // @Input()
  // currentGood: Good;

  @Input()
  analogs: Good[] = [];

  constructor(private goodService: GoodService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<GoodDetailsComponent>) { }

  ngOnInit() {
    // this.goodService.getRestOfGoods(undefined ,this.categoryId).subscribe( res => {
    //   this.analogs = res.filter(g => g.subGroupUuid === this.subGroupId);
    //   let ind = -1;
    //   for (let good of this.analogs) {
    //     if (good.uuid === this.currentGood.uuid) {
    //       ind = this.analogs.indexOf(good);
    //     }
    //   }
    //   this.analogs.splice(ind, 1);
    // });
  }

  onItemClick(good: Good){
    let item = new PreOrderItem();
    item.good = good;
    this.dialogRef.close();
    this.dialog.open(GoodDetailsComponent,
      {
        width: '1190px',
        data: item
      }
    );
  }

  getRestExpression(good: Good) {
    if (good) {
      return ' ' + (good.restQuant > good.greaterOrEqualRest ? '> ' + good.greaterOrEqualRest : good.restQuant) + good.unit;
    } else {
      return ' нет';
    }
  }

}
