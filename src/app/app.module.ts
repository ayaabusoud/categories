import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ItemsComponent } from './pages/items/items.component';
import { NavComponent } from './components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteButtonComponent } from './components/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './components/buttons/add-button/add-button.component';
import { SaveButtonComponent } from './components/buttons/save-button/save-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ItemsComponent,
    NavComponent,
    DeleteButtonComponent,
    AddButtonComponent,
    SaveButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: CategoriesComponent },
      {path: 'manage-categories', component: CategoriesComponent},
      {path: 'manage-items', component: ItemsComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
