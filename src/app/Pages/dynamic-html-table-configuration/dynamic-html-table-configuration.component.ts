import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dynamic-html-table-configuration',
  templateUrl: './dynamic-html-table-configuration.component.html',
  styleUrls: ['./dynamic-html-table-configuration.component.css']
})
export class DynamicHtmlTableConfigurationComponent {
  public tableConfigForm = new UntypedFormGroup({
  });


  clientName: any = ['MRF','TATA','ABC'];
  pageName:any = ['Master','Vendor','Store In','Store Out'];
  databaseTable: any = ['PRODUCT','EX1','EX2','EX3'];

  chkBox :any =[];
  coloumnName : any=[];
  displayText : any=[];
  isRequired : any=[];
  readonly : any=[];

  constructor(public fb: UntypedFormBuilder, private router: Router, private ser: MyService) {
  }

  ngOnInit(): void {

  }
}
