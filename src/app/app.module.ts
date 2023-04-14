import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { VideosComponent } from './videos/videos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'; //For Angular-Material-Spinner
import { MatFormFieldModule } from '@angular/material/form-field'; //For Angular-Material-Form-Field
import { MatSelectModule } from '@angular/material/select';
import { ImpressumComponent } from './impressum/impressum.component'; //For Angular-Select-Field



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    VideosComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ImpressumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule, //For Angular-Material-Spinner
    MatFormFieldModule, //For Angular-Material-Form-Field
    MatSelectModule, //For Angular-Select-Field
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, //Wir nutzen den Interceptor
      useClass: AuthInterceptorService, //Aber wir überschreiben die Grundfunktion mit unserem Eigenen Service
      multi: true,
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
