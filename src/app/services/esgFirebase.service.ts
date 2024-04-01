import { inject, Injectable } from '@angular/core';
import { Timestamp, collection } from '@firebase/firestore';
import { from, Observable } from 'rxjs';
import {
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import {
  ResultInterface,
  ResultsInterface,
} from '../../types/result.interface';
import { v4 as uuidv4 } from 'uuid';

import { FormGroup } from '@angular/forms';
import { getText } from '../helpers/helpers';

@Injectable({ providedIn: 'root' })
export class ResultsFirebaseService {
  firestore = inject(Firestore);
  resultsCollection = collection(this.firestore, 'results');

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
}
