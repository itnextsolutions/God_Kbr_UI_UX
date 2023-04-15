import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-material-master',
  templateUrl: './material-master.component.html',
  styleUrls: ['./material-master.component.css']
})

export class MaterialMasterComponent {
  public masterForm = new UntypedFormGroup({
  });


  radioItems: Array<string> = [];
  chkBox: Array<string> = [];

  materialCategory: string = "";
  materialCode: string = "";
  materialDesc: string = "";
  shelfLife: string = "";
  vendorContinuity: any;
  noOfSpool: string = "";
  uom: string = "";

  constructor(public fb: UntypedFormBuilder, private router: Router, private ser: MyService) {
    this.radioItems = ['Dip Roll', 'Wire'];
    this.chkBox = ['Yes', 'No'];
  }
  
  form: FormGroup<{}> | undefined;

  ngOnInit(): void {

    this.masterForm = this.fb.group({
      materialCategory: ['', [Validators.required]],
      materialCode: ['', [Validators.required]],
      materialDesc: ['', [Validators.required]],
      shelfLife: ['', [Validators.required]],
      vendorContinuity: ['', [Validators.required]],
      noOfSpool: ['', [Validators.required]],
      uom: ['', [Validators.required]],
    });
  }

  get formControl() {
    return this.masterForm.controls;
  }

  Add() {

    if (this.masterForm.valid) {
      var val = {
        materialCategory: this.materialCategory,
        materialCode: this.materialCode,
        materialDescription: this.materialDesc,
        shelfLife: this.shelfLife,
        vendorContinuity: this.vendorContinuity,
        numberOfSpool: this.noOfSpool,
        uom: this.uom,
      };

      this.ser.insertMaterial(val).subscribe(res => {
        alert(res.toString());
      })
    }
      else {
      this.masterForm.markAllAsTouched();
    }
 
}

Reset() {
  this.masterForm.reset();
}
// html code dynamic based on table configuration with ng model bind in angular 
}
