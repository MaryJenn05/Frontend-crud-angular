import { Component, Inject } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entity } from '../../models/entity.model';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {
  
  entity !: Entity;
  constructor(private entityService: EntityService, @Inject(MAT_DIALOG_DATA) public dataDialog: any) { }
  ngOnInit(): void {
    this.getEntityById(this.dataDialog.id);
  }
  getEntityById(id: number){
    this.entityService.getEntityById(id).subscribe(
      (response:any)=>{
        this.entity = response.body;
      },
      error => {
        console.log(error);
      }
    );
  }
}
