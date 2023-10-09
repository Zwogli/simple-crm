import { Component, inject } from '@angular/core';
import { Firestore, collection, doc} from '@angular/fire/firestore';
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

  constructor(){
  }

  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current User is', this.user)

/**
 *todo     this.firestore.collection("data").document("one").setData(this.user)
 *todo       .then((result:any) => {
 *todo       console.log('adding user to firestore', result)
 *todo     });
 */
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
}
