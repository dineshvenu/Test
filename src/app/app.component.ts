import { Component, OnInit, TemplateRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import * as $ from "jquery";
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) {}
  ngOnInit(){
    $("#close").hover(
      function () {
        $("#chatdone").show();
      }, 
      function () {
        $("#chatdone").hide();
      }
    );
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      hasBackdrop: false,
      disableClose: false,
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}
