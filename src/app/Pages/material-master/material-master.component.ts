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


  radioItems: any = [];
  chkBox: any = [
    { Value: 1, Name: 'Yes', disabled: false }
    // { Value: 0, Name: 'No', disabled: false }
  ];

  material: any;

  palletType: any = [
    { "Id": 11, "Type": "Type 1" },
    { "Id": 12, "Type": "Type 2" }
  ];

  PRD_COD: string = "";
  PRD_GRP_COD: string = "";
  PRD_DESC: string = "";
  PRD_LENG: number=0;
  PRD_CTRL_TYPE: number=0;
  PRD_PACK_QTY: number=0 ;
  PRD_MEAS_UNIT: string = "";
  PRD_HUPT_ID: number =0;
  disable: boolean = false;


  constructor(public fb: UntypedFormBuilder, private router: Router, private service: MyService) {
  }

  form: FormGroup<{}> | undefined;

  ngOnInit(): void {

    this.masterForm = this.fb.group({
      PRD_COD: ['', [Validators.required]],
      PRD_GRP_COD: ['', [Validators.required]],
      PRD_DESC: ['', [Validators.required]],
      PRD_LENG: ['', [Validators.required]],
      // PRD_CTRL_TYPE: ['', [Validators.required]],
      PRD_PACK_QTY: ['', [Validators.required]],
      PRD_MEAS_UNIT: ['', [Validators.required]],
      // PRD_HUPT_ID: ['', [Validators.required]],
    });

    this.service.GetMatrial().subscribe(data => {
      this.material = data;
    });

    this.service.GetMaterialCategory().subscribe(res => {
      this.radioItems = res;
    });


  }

  get formControl() {
    return this.masterForm.controls;
  }

  Add() {
    debugger
    if (this.masterForm.valid) {

      var val = {
        PRD_COD: this.PRD_COD,
        PRD_GRP_COD: this.PRD_GRP_COD,
        PRD_DESC: this.PRD_DESC,
        PRD_LENG: this.PRD_LENG,
        PRD_CTRL_TYPE: this.PRD_CTRL_TYPE,
        PRD_PACK_QTY: this.PRD_PACK_QTY,
        PRD_MEAS_UNIT: this.PRD_MEAS_UNIT,
        // PRD_HUPT_ID: this.PRD_HUPT_ID,
      };

      this.service.insertMaterial(val).subscribe(res => {
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

  handleOptionClick(selectedOption: any) {
    debugger
    // this.chkBox.forEach((option: { disabled: any; }) => {
    //   if (option !== selectedOption) {
    //     option.disabled = selectedOption.value;
    //   }
    // });

    if (selectedOption.Value = 1) {
      this.disable = true;
    }
    if (selectedOption.Value = 2) {
      this.disable = true;
    }
  }
  // html code dynamic based on table configuration with ng model bind in angular 
}
