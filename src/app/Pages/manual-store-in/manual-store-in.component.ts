import { Component, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';
import { MaterialCodeDescriptionComponent } from '../material-code-description/material-code-description.component';
import { VendorMatCodeDescriptionComponent } from '../vendor-mat-code-description/vendor-mat-code-description.component';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-manual-store-in',
  templateUrl: './manual-store-in.component.html',
  styleUrls: ['./manual-store-in.component.css']
})

export class ManualStoreInComponent {

  public pageName: string = "Manual StoreIN";

  public storeInForm = new UntypedFormGroup({
  });

  radioItems: any = [];
  chkBox: any = [];
  m_StatusItems: any = [];

  materialCategory: string = "";
  materialBarcode: string = "";
  materialCode: string = "";
  materialDesc: string = "";
  materialType: string = "";
  dom: string = "";
  doe: string | null | undefined;

  //doe: string = "";
  vendorCode: any;
  vendordesc: any;
  dipRollNo: string = "";
  weight: string = "";
  length: string = "";
  noOfSpool: string = "";
  materialStatus: string = "";
  partial: string = "";
  transactionID: string = "";
  projectID: string = "";
  dor: Date = new Date();
  grnNo: string = "";
  uom: string = "";
  uomKG: string = "Kg";
  uomMeter: string = "Meter";
  uomNos: string = "Nos";
  materialTypeList: any = [];
  isFieldreadonly = true;
  fieldreadonly = true;
  
  lengthreadonly = true;
  weightReadonly = true;
  noOfSoolReadonly = true;


  selectedRowDataMaterialCOD: any;
  selectedRowDataMaterialDESC: any;
  selectedRowDataVendorCOD: any;
  selectedRowDataVendorDESC: any;
  materialData_list: any;

  @ViewChild(MaterialCodeDescriptionComponent) materialComponent!: MaterialCodeDescriptionComponent;
  @ViewChild(VendorMatCodeDescriptionComponent) vendorComponent!: VendorMatCodeDescriptionComponent;
  @ViewChild('material') material!: MaterialCodeDescriptionComponent;
  @ViewChild('vendor') vendor!: MaterialCodeDescriptionComponent;
  dataSource!: MatTableDataSource<any>;
  shelfLife: any;
  datePipe: any;
  manualStoreInList: any = [];

  constructor(public fb: UntypedFormBuilder, private router: Router, private service: MyService) {

    this.chkBox = ['Yes', 'No'];
  }

  form: FormGroup<{}> | undefined;

  ngOnInit(): void {

    this.storeInForm = this.fb.group({
      materialCategory: ['', [Validators.required]],
      materialBarcode: ['', [Validators.required]],
      materialCode: ['', [Validators.required]],
      materialDesc: ['', [Validators.required]],
      materialType: ['', [Validators.required]],
      dom: ['', [Validators.required]],
      doe: ['', [Validators.required]],
      vendorCode: ['', [Validators.required]],
      vendordesc: ['', [Validators.required]],
      dipRollNo: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      length: ['', [Validators.required]],
      noOfSpool: ['', [Validators.required]],
      materialStatus: ['', [Validators.required]],
      partial: ['', [Validators.required]],
      transactionID: ['', [Validators.required]],
      projectID: ['', [Validators.required]],
      dor: ['', [Validators.required]],
      grnNo: ['', [Validators.required]],
      uomKG: ['', [Validators.required]],
      uomMeter: ['', [Validators.required]],
      uomNos: ['', [Validators.required]],

    });

    this.service.GetMaterialCategory().subscribe(res => {
      this.radioItems = res;
    });

    this.service.getMaterialType().subscribe(res => {
      debugger
      this.materialTypeList = res;
    });

    this.service.getMaterialStatus().subscribe(res => {
      debugger
      this.m_StatusItems = res;
    });

  }

  get formControl() {
    return this.storeInForm.controls;
  }

  
  key:string='id';
  reverse: boolean= false;
  sort(key: any){
    this.key=key;
    this.reverse =! this.reverse
  }

  Add() {

    debugger
    // if (this.storeInForm.valid) {
    var val = {
      materialCategory: this.materialCategory,
      materialBarcode: this.materialBarcode,
      materialCode: this.selectedRowDataMaterialCOD,
      materialDesc: this.selectedRowDataMaterialDESC,
      materialType: this.materialType,
      dom: this.dom,
      doe: this.doe,
      vendorCode: this.selectedRowDataVendorCOD,
      vendordesc: this.selectedRowDataVendorDESC,
      dipRollNo: this.dipRollNo,
      weight: this.weight,
      length: this.length,
      noOfSpool: this.noOfSpool,
      materialStatus: this.materialStatus,
      partial: this.partial,
      transactionID: this.transactionID,
      projectID: this.projectID,
      dor: this.dor,
      grnNo: this.grnNo,
      uomKG: this.uomKG,
      uomMeter: this.uomMeter,
      uomNos: this.uomNos,
    };
    this.manualStoreInList.push(val)
    console.log(this.manualStoreInList)
    // this.service.insertHostToWms(val).subscribe(res => {
    //   alert(res.toString());
    // })
    // }
    // else {
    //   this.storeInForm.markAllAsTouched();
    // }
  }


  notFoundMessage: any;
  applyfilterformaterial(event: Event) {
    debugger
    const filtervalue = (event.target as HTMLInputElement).value
    this.material.dataSource.filter = filtervalue.trim().toLowerCase();
    if (this.material.dataSource.paginator) {
      this.material.dataSource.paginator.firstPage();
    }
    if (this.material.dataSource.filteredData.length == 0) {
      this.notFoundMessage = 'No matching data found';
    }
    else {
      this.notFoundMessage = '';
    }
  }

  applyfilterforvendor(event: Event) {
    debugger
    const filtervalue = (event.target as HTMLInputElement).value
    this.vendor.dataSource.filter = filtervalue.trim().toLowerCase();
    if (this.vendor.dataSource.paginator) {
      this.vendor.dataSource.paginator.firstPage();
    }
    if (this.vendor.dataSource.filteredData.length == 0) {
      this.notFoundMessage = 'No matching data found';
    }
    else {
      this.notFoundMessage = '';
    }
  }

  onCategoryClick(val: any) {
    debugger;
    this.shelfLife = val.PRD_LENG;
    this.materialCategory = val.GRP_COD;
    this.service.GetMaterialData().subscribe(resp => {
      this.materialData_list = resp;
      this.materialData_list = this.materialData_list.filter((x: any) => x.PRD_GRP_COD === val.GRP_COD)
      this.isFieldreadonly = false
      //console.log(this.materialData_list);
      // this.material.dataSource=this.materialData_list
      // this.materialComponent.callmateial();
    })
    if (val.GRP_COD == 'SW') {
      this.lengthreadonly = false;
      this.noOfSoolReadonly = false;
      this.weightReadonly = true;

    }
    if (val.GRP_COD == 'DF') {
      this.weightReadonly = false;
      this.lengthreadonly = false;
      this.noOfSoolReadonly = true;
    }
  }

  onDropdownClick(val: any) {
    debugger
    if (val == 'REGULAR') {
      this.materialStatus = 'HOLD';
    }
    else {
      this.materialStatus = '';
    }
  }

  onContainerClick() {
    this.material.closeTable();
    this.vendor.closeTable();
  }

  OnclickMaterial() {
    debugger
    const data = this.materialComponent.onclick();
    console.log(data);
  }

  OnclickVendor() {
    debugger
    const data = this.vendorComponent.onclick();
    console.log(data);
  }


  onSelectedRowofMaterial(selectedRowData: any) {
    debugger
    console.log(selectedRowData);
    this.selectedRowDataMaterialCOD = selectedRowData.PRD_COD;
    this.selectedRowDataMaterialDESC = selectedRowData.PRD_DESC;
    // do something with the selected row data
  }

  onSelectedRowofVendor(selectedRowVendor: any) {
    debugger
    console.log(selectedRowVendor);
    this.selectedRowDataVendorCOD = selectedRowVendor.VED_COD;
    this.selectedRowDataVendorDESC = selectedRowVendor.VED_DESC;
    // do something with the selected row data
  }

  Reset() {
    this.storeInForm.reset();
  }

  onDateChage(val: any) {
    debugger
    this.materialData_list = this.materialData_list.filter((x: any) => x.PRD_COD === this.selectedRowDataMaterialCOD)
    this.shelfLife = this.materialData_list[0].PRD_LENG;


    const date = new Date(val); // DOM date
    const date1 = new Date(); // DOE date

    date1.setDate(date.getDate() + this.shelfLife);

    const datePipe = new DatePipe('en-US');
    this.doe = datePipe.transform(date1, 'yyyy-MM-dd');
  }
confirm(val : any){
  debugger
}

}

