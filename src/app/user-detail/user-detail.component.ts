import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  firestore: Firestore = inject(Firestore);
  currentUserId:string;
  user: User = new User();

  constructor(private route:ActivatedRoute){}

  async ngOnInit(){
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    
    let docRef = this.getSingleDocReference('user', this.currentUserId);
    let userDetails = (await getDoc(docRef)).data();
      
    this.user = new User(userDetails);
  }

  getSingleDocReference(collId: string, docId: string) {5
    return doc(collection(this.firestore, collId), docId);
  }

  openDialogAdress(){}

  openDialogContact(){}

  editAdress(){}

  editContact(){}
}
