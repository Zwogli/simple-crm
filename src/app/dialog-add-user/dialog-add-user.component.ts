import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();  //user(variable) = new User (instance)
  birthDate!: Date;
  loading: boolean = false;

  constructor(public dialog: MatDialogRef<DialogAddUserComponent>){
  }

  async saveUser(){
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User is', this.user)

    let newUser = this.user.toJSON();

    this.addUser(newUser);
    this.close();
  }

  async addUser(newUser){
    await addDoc(this.getUserReference(), newUser).catch(  // What need addDoc( [where], [wich item])
    (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("Document written with ID: ", docRef)}
    )  
    this.loading = false;
  }

  /**return firestore collection
   * 
   * @returns 
   */
  getUserReference(){
    return collection(this.firestore, 'user');
  }

  /**return a single field
   * 
   * @param collId - firestor dokument id
   * @param docId - firestore field id
   * @returns 
   */
  getSingleDocReference(collId:string, docId:string){
    return doc(collection(this.firestore, collId), docId);
  }

  close(): void {
    this.dialog.close();
  }
}
