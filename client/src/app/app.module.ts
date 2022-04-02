import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginService } from './services/login.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MainComponent } from './pages/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageFolderComponent } from './pages/pageFolder/pageFolder.component';
import { FolderComponent } from './components/folder/folder.component';

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LogInComponent,
    MainComponent,
    NavbarComponent,
    PageFolderComponent,
    FolderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        // para jugar con los tokens aunque hay cosas q no tengo claras
        //allowedDomains: environment.API,
        //update: esto es importante ...al parecer es el q le da el permiso para mandar el token a distintas url en
        allowedDomains: environment.API_WHITELIST, //este caso nuestra api si le puede mandar el token
        tokenGetter,
      },
    }),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
