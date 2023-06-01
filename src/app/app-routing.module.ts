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


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'Dashboard',component:HomeComponent},
  {path:'storein',component:StoreInComponent},
  {path:'login',component:LoginComponent},
  {path:'manualStoreIn',component:ManualStoreInComponent},
  {path:'materialMaster',component:MaterialMasterComponent},
  {path:'vendorMaster',component:VendorMasterComponent},
  {path:'tableConfiguration',component:DynamicHtmlTableConfigurationComponent},
  {path:'storeInOrderview',component:StoreInOrderViewComponent},
  {path:'palletizationProcess',component:PalletizationProcessComponent},
  {path:'materialcodedescription',component:MaterialCodeDescriptionComponent},
  {path:'vendormatcodedescription',component:VendorMatCodeDescriptionComponent},
  {path:'storeOutProcess',component:StoreOutProcessComponent},
  {path:'stockCountProcess',component:StockCountProcessComponent},
  {path:'emptyPalletIn',component:EmptyPalletInProcessComponent},
  {path:'emptyPalletStoreOut',component:EmptyPalletStoreOutProcessComponent},
  {path:'storeInRequestCancellation', component:StoreInRequestCancellationComponent},
  {path:'storeOutRequestCancellation', component:StoreOutRequestCancellationComponent},
  {path:'partdropdown', component:PartNoDropdownComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule,
    FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
