import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-master',
  templateUrl: './material-master.component.html',
  styleUrls: ['./material-master.component.css']
})

export class MaterialMasterComponent {
  public pageName: string = "Material Master";

  public masterForm = new UntypedFormGroup({
  });


  radioItems: any = [];
  chkBox: any = [
    { Value: "1", Name: 'Yes', disabled: false }
    // { Value: 0, Name: 'No', disabled: false }
  ];

  material: any;



  PRD_COD: string = "";
  PRD_GRP_COD: string = "";
  PRD_DESC: string = "";
  PRD_LENG: number | undefined;
  PRD_CTRL_TYPE: String = "1";
  PRD_PACK_QTY: number | undefined;
  PRD_MEAS_UNIT: string = "";
  PRD_HUPT_ID: string="";
  disable: boolean = false;

  radio1 = false;
  readOnly = false;
  isChecked = false;
  material_list: any=[];

  pageSize : number =1;
  itemsPerPage : number=10;
  pageSizeOptions = [5, 10, 25, 50];
  update: number=0;
  palletType: any=[];
 




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
      PRD_HUPT_ID: ['', [Validators.required]],
    });


    this.GetMaterialData();
    
    this.service.GetMaterialCategory().subscribe(res => {
      this.radioItems = res;
    });

  

    this.service.getPalletType().subscribe(res =>{
      this.palletType=res;
    })
  }

  GetMaterialData() {
    this.service.GetMaterialData().subscribe(data => {
      this.material = data;
      this.material_list = this.material;
    });
  }

  filterData(val : any){
  this.material_list =this.material.filter((res : any)=>{return res.PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) ||
                                  res.PRD_GRP_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())})                               
  }

  key:string='id';
  reverse: boolean= false;
  sort(key: any){
    this.key=key;
    this.reverse =! this.reverse
  }

  get formControl() {
    return this.masterForm.controls;
  }

  Add() {
    debugger
    if (this.masterForm.valid) {

      var val = {
       
        MSG_MATERIAL_CODE: this.PRD_COD,
        MSG_MATERIAL_CATEGORY: this.PRD_GRP_COD,
        MSG_DESCRIPTION: this.PRD_DESC,
        MSG_SHELF_LIFE: this.PRD_LENG,
        MSG_VENDOR_CON: this.PRD_CTRL_TYPE,
        MSG_NO_OF_SP_BOX: this.PRD_PACK_QTY,
        MSG_UOM: this.PRD_MEAS_UNIT,
        MSG_PAL_TYPE: this.PRD_HUPT_ID,
        MSG_TRANS_TYPE :"MASTER",
        MSG_PART_FLAG :"y"
      };

      this.service.insertHostToWms(val).subscribe(res => {

        if (res == "Success") {
          this.sucessAlert();
          this.GetMaterialData();
          this.GetMaterialData();
          this.Reset();
        }
        else {
          this.errorAlert()
        }
      })
    }
    else {
      this.masterForm.markAllAsTouched();
    }

  }


  Edit(item: any) {

    this.update =1;
    this.PRD_COD = item.PRD_COD;
    this.PRD_GRP_COD = item.PRD_GRP_COD;
    this.PRD_DESC = item.PRD_DESC;
    this.PRD_LENG = item.PRD_LENG;
    this.PRD_CTRL_TYPE = item.PRD_CTRL_TYPE;
    this.PRD_PACK_QTY = item.PRD_PACK_QTY;
    this.PRD_MEAS_UNIT = item.PRD_MEAS_UNIT;
    this.PRD_HUPT_ID = item.PRD_HUPT_ID;

    this.readOnly = true;
    this.radio1 = true;
    if (this.PRD_CTRL_TYPE ==="1") {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }


  }

  Update() {
    if (this.masterForm.valid) {
      var val = {
        MSG_MATERIAL_CODE: this.PRD_COD,
        MSG_MATERIAL_CATEGORY: this.PRD_GRP_COD,
        MSG_DESCRIPTION: this.PRD_DESC,
        MSG_SHELF_LIFE: this.PRD_LENG,
        MSG_VENDOR_CON: this.PRD_CTRL_TYPE,
        MSG_NO_OF_SP_BOX: this.PRD_PACK_QTY,
        MSG_UOM: this.PRD_MEAS_UNIT,
        MSG_PAL_TYPE: this.PRD_HUPT_ID,
        MSG_TRANS_TYPE :"MASTER",
        MSG_PART_FLAG :"y"
      };

      this.service.insertHostToWms(val).subscribe(res => {
        if (res == "Success") {
          this.sucessAlert();
          this.GetMaterialData();
          this.Reset();
        }
        else {
          this.errorAlert()
        }
      })
    }
    else {
      this.masterForm.markAllAsTouched();
    }

  }

  Reset() {
    this.masterForm.reset();
  }

  // handleOptionClick(selectedOption: any) {
  //   debugger
  //   // this.chkBox.forEach((option: { disabled: any; }) => {
  //   //   if (option !== selectedOption) {
  //   //     option.disabled = selectedOption.value;
  //   //   }
  //   // });

  //   if (selectedOption.Value = 1) {
  //     this.disable = true;
  //   }
  //   if (selectedOption.Value = 2) {
  //     this.disable = true;
  //   }
  // }


  sucessAlert() {

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Data has been saved',
      showConfirmButton: true,
      timer: 3000
    })

  }

  errorAlert() {

    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      showConfirmButton: true,
      timer: 3000
    })
  }
  // html code dynamic based on table configuration with ng model bind in angular 
}
