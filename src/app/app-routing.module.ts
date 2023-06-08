import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { StoreInComponent } from './Pages/store-in/store-in.component';
import { LoginComponent } from './Pages/login/login.component';
import { ManualStoreInComponent } from './Pages/manual-store-in/manual-store-in.component';
import { MaterialMasterComponent } from './Pages/material-master/material-master.component';
import { VendorMasterComponent } from './Pages/vendor-master/vendor-master.component';
import { DynamicHtmlTableConfigurationComponent } from './Pages/dynamic-html-table-configuration/dynamic-html-table-configuration.component';
import { StoreInOrderViewComponent } from './Pages/store-in-order-view/store-in-order-view.component';
import { PalletizationProcessComponent } from './Pages/palletization-process/palletization-process.component';
import { VendorMatCodeDescriptionComponent } from './Pages/vendor-mat-code-description/vendor-mat-code-description.component';
import { MaterialCodeDescriptionComponent } from './Pages/material-code-description/material-code-description.component';
import { StoreOutProcessComponent } from './Tata-Cummins/Pages/store-out-process/store-out-process.component';
import { StockCountProcessComponent } from './Tata-Cummins/Pages/stock-count-process/stock-count-process.component';
import { EmptyPalletInProcessComponent } from './Tata-Cummins/Pages/empty-pallet-in-process/empty-pallet-in-process.component';
import { EmptyPalletStoreOutProcessComponent } from './Tata-Cummins/Pages/empty-pallet-store-out-process/empty-pallet-store-out-process.component';
import { StoreInRequestCancellationComponent } from './Tata-Cummins/Pages/store-in-request-cancellation/store-in-request-cancellation.component';
import { StoreOutRequestCancellationComponent } from './Tata-Cummins/Pages/store-out-request-cancellation/store-out-request-cancellation.component';
import { PartNoDropdownComponent } from './Tata-Cummins/Pages/part-no-dropdown/part-no-dropdown.component';
import { AuthGuard } from './Pages/guards/auth.guard';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Dashboard',component:HomeComponent, canActivate:[AuthGuard]},
  {path:'storein',component:StoreInComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'manualStoreIn',component:ManualStoreInComponent, canActivate:[AuthGuard]},
  {path:'materialMaster',component:MaterialMasterComponent, canActivate:[AuthGuard]},
  {path:'vendorMaster',component:VendorMasterComponent, canActivate:[AuthGuard]},
  {path:'tableConfiguration',component:DynamicHtmlTableConfigurationComponent, canActivate:[AuthGuard]},
  {path:'storeInOrderview',component:StoreInOrderViewComponent, canActivate:[AuthGuard]},
  {path:'palletizationProcess',component:PalletizationProcessComponent, canActivate:[AuthGuard]},
  {path:'materialcodedescription',component:MaterialCodeDescriptionComponent, canActivate:[AuthGuard]},
  {path:'vendormatcodedescription',component:VendorMatCodeDescriptionComponent, canActivate:[AuthGuard]},
  {path:'storeOutProcess',component:StoreOutProcessComponent, canActivate:[AuthGuard]},
  {path:'stockCountProcess',component:StockCountProcessComponent, canActivate:[AuthGuard]},
  {path:'emptyPalletIn',component:EmptyPalletInProcessComponent, canActivate:[AuthGuard]},
  {path:'emptyPalletStoreOut',component:EmptyPalletStoreOutProcessComponent, canActivate:[AuthGuard]},
  {path:'storeInRequestCancellation', component:StoreInRequestCancellationComponent, canActivate:[AuthGuard]},
  {path:'storeOutRequestCancellation', component:StoreOutRequestCancellationComponent, canActivate:[AuthGuard]},
  {path:'partdropdown', component:PartNoDropdownComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule,
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
