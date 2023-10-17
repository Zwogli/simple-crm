import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
user: User;
loading: boolean = false;

constructor(public dialog: MatDialogRef<DialogEditAdressComponent>){} 

closeDialogAddress(){}

saveUserDialogAddress(){}
}
