import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { CountryInfo } from './services/countries.service';
import { getCountries } from './store/actions';
import * as selectors from 'src/app/store/selectors/countries.selector';

const IFRAME_LOADED = 'IFRAME_LOADED';
const STORE_LOADED = 'STORE_LOADED';
const STORE_REFRESH = 'STORE_REFRESH';
const IFRAME_URL = 'http://greenstack.hrpassport.com/ui-children/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef | undefined;

  @HostListener('window:message', ['$event'])
  onMessage(event: { data: { type: string; data: any } }) {
    // console.log('Message received in Parent', event);
    const { type } = event.data;
    if (type === IFRAME_LOADED) {
      console.log('PARENT | IFrame loaded, sending store', this.countries);
      this.postMessage({
        type: STORE_LOADED,
        data: this.countries,
      });
    }
    if (type === STORE_REFRESH) {
      console.log('PARENT | IFrame requested store refresh');
      this.refreshingStore = true;
      this.dispatchActions();
    }
  }

  url: SafeResourceUrl | null = null;
  countries: CountryInfo[] = [];
  refreshingStore: boolean = false;

  constructor(private sanitizer: DomSanitizer, private store: Store<any>) {
    this.dispatchActions();
    this.store.select(selectors.selectCountries).subscribe((data) => {
      if (!data.loading && data.countries) {
        console.log('PARENT | countries', data);
        this.countries = data.countries;
        (<any>window).globalStore = {
          countries: this.countries,
        };
        (<any>window).getGlobalStore = () => {
          return this.countries
        };

        console.log('window', (<any>window).globalStore);

        if (this.refreshingStore) {
          this.refreshingStore = false;
          this.postMessage({
            type: STORE_LOADED,
            data: this.countries,
          });
        }
      }
    });
  }

  dispatchActions() {
    this.store.dispatch(getCountries());
  }

  toggleIFrame() {
    if (this.url === null) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(IFRAME_URL);
    } else {
      this.url = null;
    }
  }

  postMessage(event: { type: string; data: any }) {
    this.iframe?.nativeElement.contentWindow?.postMessage(event, '*');
  }
}
