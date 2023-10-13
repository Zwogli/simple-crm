import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user = new User(); //user(variable) = new User (instance)
  allUsers = [];
  unsubUser;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.readSubscribeUser();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  readSubscribeUser(){
    this.unsubUser = onSnapshot(
      this.getUserReference(), (allUsersDoc) => {   // onSnapshot( [which database] , [function what todo] )
      this.allUsers = [];                           // reset array
      allUsersDoc.forEach(singleUserDoc =>{         // firebase document loop => read single entry
        this.allUsers.push(singleUserDoc.data());   // push single entry into array
        console.log('User Liste: ', singleUserDoc.data())
      });
      console.log(this.allUsers);
    });
  }

  /**return firestore collection
   *
   * @returns
   */
  getUserReference() {
    return collection(this.firestore, 'user');
  }

  /**return a single field
   *
   * @param collId - firestor dokument id
   * @param docId - firestore field id
   * @returns
   */
  getSingleDocReference(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  }

  /**unsubscribe database*/
  destroySubscribe(){
    this.unsubUser();
  }
}
