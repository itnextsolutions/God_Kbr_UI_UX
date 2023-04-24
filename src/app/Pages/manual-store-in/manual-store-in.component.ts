// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-manual-store-in',
//   templateUrl: './manual-store-in.component.html',
//   styleUrls: ['./manual-store-in.component.css']
// })
// export class ManualStoreInComponent {

// }

import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';


@Component({
  selector: 'app-manual-store-in',
  templateUrl: './manual-store-in.component.html',
  styleUrls: ['./manual-store-in.component.css']
})
// @Component({
//   selector: 'app-manual-store-in',
//   templateUrl: './manual-store-in.component.html',
//   styleUrls: ['./manual-store-in.component.css']
// })
export class ManualStoreInComponent {

  public pageName: string = "Manual StoreIN";

  public storeInForm = new UntypedFormGroup({
  });

  radioItems: any = [];
  chkBox: any= [];
  m_StatusItems: any = ['OK','HOLD','NCM HOLD','OVER RAGED','SCRAP'];

  materialCategory: string = "";
  materialBarcode: string = "";
  materialCode: string = "";
  materialDesc: string = "";
  materialType: string = "";
  dom: string = "";
  doe: string = "";
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
  dor: string = "";
  grnNo: string = "";
  uom: string = "";
  uomKG: string = "";
  uomMeter: string = "";
  uomNos: string = "";


  constructor(public fb: UntypedFormBuilder, private router: Router, private ser: MyService) {
    this.radioItems = ['Dip Roll', 'Wire'];
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
  }

  get formControl() {
    return this.storeInForm.controls;
  }

  Add() {
    debugger
    if (this.storeInForm.valid) {
      var val = {
        materialCategory: this.materialCategory,
        materialBarcode: this.materialBarcode,
        materialCode: this.materialCode,
        materialDesc: this.materialDesc,
        materialType: this.materialType,
        dom: this.dom,
        doe: this.doe,
        vendorCode: this.vendorCode,
        vendordesc: this.vendordesc,
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

      this.ser.insertMaterial(val).subscribe(res => {
        alert(res.toString());
      })
    }
    else {
      this.storeInForm.markAllAsTouched();
    }
  }

  Reset() {
    this.storeInForm.reset();
  }
  

}

