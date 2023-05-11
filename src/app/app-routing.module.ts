import {Injectable, NgModule } from '@angular/core';
import {RouterModule, RouterStateSnapshot, Routes, TitleStrategy} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {Title} from "@angular/platform-browser";
import {PersonInfoComponent} from "./person-info/person-info.component";
import {AddClientFormComponent} from "./add-client-form/add-client-form.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'personInfo', component: PersonInfoComponent, title: 'Person Info Page'},
  {path: 'home', component: HomeComponent, title: 'home page'},
  {path: 'products', component: ProductsComponent, title: 'products page'},
  {path: 'about', component: AboutComponent, title: 'about page'},
  {path: 'add', component: AddClientFormComponent, title: 'add client'},
  {path: '404', component: ErrorPageComponent, title: 'ERROR_404'},
  {path: '**', redirectTo: '/404'},
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy{
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if(title !== undefined){
      this.title.setTitle(`P&P | ${title}`)
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]
})
export class AppRoutingModule { }
