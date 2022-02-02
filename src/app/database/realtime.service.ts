import { Injectable } from '@angular/core';
import {
  AngularFireDatabaseModule,
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Observable, of, Subscription, BehaviorSubject } from 'rxjs';
import { iResultado } from '../models/iResultadoInput';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RealTimeDB {
  urlFirebase = 'multiplos';

  constructor(private db: AngularFireDatabase) {}

  insert(resultado: iResultado) {
    return this.db.list(`${this.urlFirebase}`).push({
      numeroIngresado: resultado.numeroIngresado,
      multiplos: resultado.multiplos,
      min: resultado.min,
    });
  }

  async getDataList(): Promise<any> {
    const eventref = this.db.database.ref(this.urlFirebase);
    const snapshot = await eventref.once('value');
    const productArray = snapshot.toJSON();
    return productArray;
  }

  getDataList2(): Observable<any[]> {
    return this.db
      .list(this.urlFirebase)
      .snapshotChanges()
      .pipe(
        map((res) => {
          return res.map((element) => {
            const data: any = element.payload.toJSON();
            let id = (data['$key'] = element.key);
            //let id = element.key //= element.key;
            return { id, ...data };
          });
        })
      );
  }
}
