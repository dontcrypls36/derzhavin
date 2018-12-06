import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OkNoDialogDataModel } from '../../../models/ok-no-dialog-data-model';

@Component({
  selector: 'app-ok-no-dialog',
  templateUrl: './ok-no-dialog.component.html',
  styleUrls: ['./ok-no-dialog.component.css']
})
export class OkNoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OkNoDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: OkNoDialogDataModel
) { }

  ngOnInit() {
  }

  onOk(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
