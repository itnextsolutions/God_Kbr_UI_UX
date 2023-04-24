import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { StoreInComponent } from './Pages/store-in/store-in.component';
import { LoginComponent } from './Pages/login/login.component';
import { ManualStoreInComponent } from './Pages/manual-store-in/manual-store-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialMasterComponent } from './Pages/material-master/material-master.component';
import { VendorMasterComponent } from './Pages/vendor-master/vendor-master.component';
import { DynamicHtmlTableConfigurationComponent } from './Pages/dynamic-html-table-configuration/dynamic-html-table-configuration.component';
import { SidebarComponent } from './SharedPages/sidebar/sidebar.component';
import { NavbarComponent } from './SharedPages/navbar/navbar.component';
import { StoreInOrderViewComponent } from './Pages/store-in-order-view/store-in-order-view.component';
import { PalletizationProcessComponent } from './Pages/palletization-process/palletization-process.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { BreadcrumbNavComponent } from './SharedPages/breadcrumb-nav/breadcrumb-nav.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreInComponent,
    LoginComponent,
    ManualStoreInComponent,
    MaterialMasterComponent,
    VendorMasterComponent,
    DynamicHtmlTableConfigurationComponent,
    SidebarComponent,
    NavbarComponent,
    StoreInOrderViewComponent,
    PalletizationProcessComponent,
   
    BreadcrumbNavComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     BrowserAnimationsModule,
     NgSelectModule,
     MatPaginatorModule,
     MatTableModule,
     MatSortModule
  ],
  providers: [MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
