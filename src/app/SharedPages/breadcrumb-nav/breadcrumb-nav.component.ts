import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb-nav',
  templateUrl: './breadcrumb-nav.component.html',
  styleUrls: ['./breadcrumb-nav.component.css']
})
export class BreadcrumbNavComponent {

  @Input() child_page: string = "";
  current_page :string="";

  constructor( public router: Router) { }

  ngOnInit(): void {

    if(this.child_page === "Vendor Master" || this.child_page === "Material Master" ){

      this.current_page = "Master";
      return;
    }

    if(this.child_page === "Manual StoreIN"){

      this.current_page = "Manual Request";
      return
    }

    if(this.child_page === "StoreIN Order View"){

      this.current_page = "Store In";
      return
    }

    if(this.child_page === "Palletization Process"){

      this.current_page = "Palletization";
      return
    }

  }
}