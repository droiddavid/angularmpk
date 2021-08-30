import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profiles: Observable<any[]>;
  title = 'angularmpk';
  constructor(firestore: AngularFirestore) {
    this.profiles = firestore.collection('profiles').valueChanges();
  }
}
