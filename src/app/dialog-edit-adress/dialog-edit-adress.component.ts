import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss'],
})
export class DialogEditAdressComponent {
  firestore: Firestore = inject(Firestore);
  loading: boolean = false;
  user: User;
  currentUserId: string;

  constructor(public dialog: MatDialogRef<DialogEditAdressComponent>) {}

  async saveUserDialogAddress() {
    this.loading = true;
    let docRef = this.getSingleDocReference('user', this.currentUserId);
    await updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.closeDialogAddress();
      location.reload()
    })
  }

  getSingleDocReference(collId: string, docId: string) {
    return doc(collection(this.firestore, collId), docId);
  }

  closeDialogAddress() {
    this.dialog.close();
  }
}
