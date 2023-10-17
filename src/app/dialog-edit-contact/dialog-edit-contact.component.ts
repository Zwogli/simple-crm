import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-contact',
  templateUrl: './dialog-edit-contact.component.html',
  styleUrls: ['./dialog-edit-contact.component.scss']
})
export class DialogEditContactComponent {
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user: User;
  currentUserId: string;
  birthDate: Date;

  constructor(public dialog: MatDialogRef<DialogEditContactComponent>){
  } 

  async saveUserDialogContact(){
    this.loading = true;
    let docRef = this.getSingleDocReference('user', this.currentUserId);
    await updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.closeDialogContact();
      location.reload()
    })
  }

  getSingleDocReference(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  }
  
  closeDialogContact(){
    this.dialog.close();
  }
}
