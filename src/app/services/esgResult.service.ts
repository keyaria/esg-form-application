import { Injectable, signal } from '@angular/core';
import { ResultsInterface } from '../../types/result.interface';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { getText } from '../helpers/helpers';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  resultSig = signal<ResultsInterface[]>([]);
  disclosureFile = signal({});

  addResult(
    form: FormGroup,
    score2: number,
    score1: number,
    addedResultid: string,
  ): void {
    const newResult: ResultsInterface = {
      id: addedResultid,
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
        verificationStandard: getText(form.value.Question1Details),
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
    this.resultSig.update((results) => [...results, newResult]);
  }
}
