import { inject, Injectable } from '@angular/core';
import { Timestamp, collection } from '@firebase/firestore';
import { finalize, from, Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {
  FileUpload,
  ResultInterface,
  ResultsInterface,
} from '../../types/result.interface';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuidv4 } from 'uuid';

import { FormGroup } from '@angular/forms';
import { getText } from '../helpers/helpers';

@Injectable({ providedIn: 'root' })
export class ResultsFirebaseService {
  firestore = inject(Firestore);
  storage = inject(AngularFireStorage);
  db = inject(AngularFireDatabase);
  resultsCollection = collection(this.firestore, 'results');
  private basePath = '/uploads';
  //constructor(private db: AngularFireStorage, private storage: AngularFireStorage) { }

  getResults(): Observable<ResultsInterface[]> {
    return collectionData(this.resultsCollection, {
      idField: 'id',
    }) as Observable<ResultsInterface[]>;
  }

  addResult(
    form: FormGroup,
    score1: number,
    score2: number,
  ): Observable<string> {
    const todoToCreate = {
      id: uuidv4(),
      question1: {
        verifier:
          form.value.Question1Details.verifierValue +
          form.value.Question1Details.verifierValueText,
        verificationStandard: getText(form.value.Question1Details),
        assuranceLevel: form.value.Question1Details.assuranceValue,
        scopeVerified: [
          form.value.Question1Details.scopeValue1,
          form.value.Question1Details.scopeValue3,
        ],
        disclosure: form.value.Question1Details.disclosureValue,
      },
      question2: {
        verifier:
          form.value.Question2Details.verifierValue +
          form.value.Question2Details.verifierValueText,
        verificationStandard: getText(form.value.Question2Details),
        assuranceLevel: form.value.Question2Details.assuranceValue,
        scopeVerified: [
          form.value.Question2Details.scopeValue1,
          form.value.Question1Details.scopeValue3,
        ],
        disclosure: form.value.Question2Details.disclosureValue,
      },
      score: {
        question1: score1,
        question2: score2,
        total: score1 * 0.6 + score2 * 0.4,
      },
      date: Timestamp.fromDate(new Date()),
    };
    const promise = addDoc(this.resultsCollection, todoToCreate).then(
      (response) => response.id,
    );
    return from(promise);
  }

  getFiles(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        }),
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
}
