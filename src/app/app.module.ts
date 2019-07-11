import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResendRegistrationTokenComponent } from './components/resend-registration-token/resend-registration-token.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './shared/components/navigation/header/header.component';
import { DeleteUserModelComponent } from './shared/components/modals/delete-user-model/delete-user-model.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from './core/api.service';
import { InterceptorService } from './core/interceptor.service';
import { AuthGuard } from './core/guards/auth.guard';
import { MessageService } from './core/message.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    RegisterUserComponent,
    ResendRegistrationTokenComponent,
    EditUserComponent,
    ListUserComponent,
    WelcomeComponent,
    HeaderComponent,
    DeleteUserModelComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressAnimation: 'decreasing'
    }),
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService, AuthGuard, MessageService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
