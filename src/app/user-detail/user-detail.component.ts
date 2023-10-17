import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  firestore: Firestore = inject(Firestore);
  currentUserId:string;
  user: User = new User();

  constructor(private route:ActivatedRoute, public dialog: MatDialog){}

  async ngOnInit(){
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    
    let docRef = this.getSingleDocReference('user', this.currentUserId);
    let userDetails = (await getDoc(docRef)).data();
      
    this.user = new User(userDetails);
  }

  getSingleDocReference(collId: string, docId: string) {5
    return doc(collection(this.firestore, collId), docId);
  }

  editAdress(){
    const dialog = this.dialog.open(DialogEditAdressComponent); // define dialog
    dialog.componentInstance.user = new User(this.user.toJSON()); // copy from user address
  }

  editContact(){
    const dialog = this.dialog.open(DialogEditContactComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
  }
}
