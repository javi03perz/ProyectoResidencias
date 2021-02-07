import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: 'login' , component: LoginComponent},
  { path: 'register' , component: RegisterComponent},
  { path: '' , component: HomeComponent,
                   children : [
                    { path: '' , component:  GraficasComponent},
                    
                    { path: 'crearTarea' , component: DetalleComponent},
                    { path: 'administracion' , component: AdministracionComponent},
                   ],
                   canActivate: [AuthGuard]
                   },
  { path: '**' , redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
