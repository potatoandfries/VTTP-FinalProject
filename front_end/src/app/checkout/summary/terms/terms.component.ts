import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsComponent>) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close('Close click');
  }
}
