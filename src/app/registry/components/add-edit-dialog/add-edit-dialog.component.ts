import { Component, Inject } from '@angular/core';
import { Entity } from '../../models/entity.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.scss']
})
export class AddEditDialogComponent {
  entity !: Entity;
  newEntity !: Entity;
  empForm = new FormGroup({
    'uen' : new FormControl(''),
    'issuanceAgency' : new FormControl(''),
    'uenStatus' : new FormControl(''),
    'entityName' : new FormControl(''),
    'entityType' : new FormControl(''),
    'uenIssueDate' : new FormControl(''),
    'regStreetName' : new FormControl(''),
    'regPostalCode' : new FormControl(''),
  });

  constructor(private entityService: EntityService ,private dialogRef: MatDialogRef<AddEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    this.entity = dataDialog.entity;
    this.newEntity = {} as Entity;
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.entity);    
  }

  addEntity(){
    this.newEntity = { ...this.empForm.value } as Entity;
    this.entityService.createEntity( this.newEntity).subscribe(
      (response:any)=>{
        console.log(response);
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }
  editEntity(){
    this.newEntity = { ...this.empForm.value } as Entity;
    this.entityService.updateEntity( this.entity.id, this.newEntity).subscribe(
      (response:any)=>{
        console.log(response);
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.entity){
        console.log(this.dataDialog);
        this.editEntity();
      }else{
        console.log(this.dataDialog);
        this.addEntity();
      }
      
    }else{
      console.log("no valid form");
    }
  }
}
