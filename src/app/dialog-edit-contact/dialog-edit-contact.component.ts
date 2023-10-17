import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss']
})
export class DialogEditContactComponent {
  user: User;
  loading: boolean = false;
  birthDate: Date;

  constructor(public dialog: MatDialogRef<DialogEditContactComponent>){} 

  saveUserDialogContact(){}
  
  closeDialogContact(){
    this.dialog.close();
  }
}
