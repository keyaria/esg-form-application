import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBK0uJIhJfUvfZrc0k2G5cFlEu8Z-e653c',
  authDomain: 'esg-application-d0e55.firebaseapp.com',
  projectId: 'esg-application-d0e55',
  storageBucket: 'esg-application-d0e55.appspot.com',
  messagingSenderId: '336273205293',
  appId: '1:336273205293:web:a9209a5ed507b4734830a4',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      TuiRootModule,
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'esg-application-d0e55',
          appId: '1:336273205293:web:a9209a5ed507b4734830a4',
          storageBucket: 'esg-application-d0e55.appspot.com',
          apiKey: 'AIzaSyBK0uJIhJfUvfZrc0k2G5cFlEu8Z-e653c',
          authDomain: 'esg-application-d0e55.firebaseapp.com',
          messagingSenderId: '336273205293',
        }),
      ),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
