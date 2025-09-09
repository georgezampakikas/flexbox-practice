import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { icons } from './icons-provider';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import el from '@angular/common/locales/el';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(el);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'el' },
    importProvidersFrom(HttpClientModule),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNzIcons(icons),
    importProvidersFrom(FormsModule), 
    provideHttpClient(), 
  ]
};

