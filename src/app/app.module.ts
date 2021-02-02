import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrdenIngresoEgresoPipe } from './pipes/orden-ingreso-egreso.pipe';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from './material-components/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraficasComponent } from './components/graficas/graficas.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ChartsModule } from 'ng2-charts';
import { AdministracionComponent } from './components/administracion/administracion.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OrdenIngresoEgresoPipe,
    RegisterComponent,
    GraficasComponent,
    DetalleComponent,
    AdministracionComponent
  ],
  imports: [
  
  BrowserModule,
  AppRoutingModule,
  MaterialModule,
  BrowserAnimationsModule,
  ChartsModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule ,
  AngularFireAuthModule,
  ReactiveFormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
