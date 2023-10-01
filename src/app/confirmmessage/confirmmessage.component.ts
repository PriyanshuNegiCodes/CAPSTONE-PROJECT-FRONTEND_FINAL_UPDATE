import { Component } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmmessage',
  templateUrl: './confirmmessage.component.html',
  styleUrls: ['./confirmmessage.component.css']
})
export class ConfirmmessageComponent {
  constructor(private prj:ProjectService,  private dialog: MatDialog){} 
  confirmMsg = this.prj.confirmMsg;

  leave(){
  this.dialog.closeAll();
  }

  dlt(){
    this.prj.confirmdlt = true;
    this.dialog.closeAll();
   }
}
