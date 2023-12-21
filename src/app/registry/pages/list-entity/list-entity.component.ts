import { Component, ViewChild } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Entity } from '../../models/entity.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../../components/view-dialog/view-dialog.component';
import { AddEditDialogComponent } from '../../components/add-edit-dialog/add-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.scss']
})
export class ListEntityComponent {
  displayedColumns: string[] = [
  'id',
  'uen',
  'issuanceAgency',
  'uenStatus',
  'entityName',
  'entityType',
  'uenIssueDate',
  'regStreetName',
  'regPostalCode',
  'actions',
];

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entityService: EntityService, private router: Router, private dialog: MatDialog, private _snackBar : MatSnackBar) {
  }

  dataSource = new MatTableDataSource<Entity>([]);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.getAllEntities();
  } 

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getAllEntities() {
    let entities: Entity[] = [];
    this.entityService.getAllEntities().subscribe(
      (response:any)=>{
        entities = response;
        entities.forEach((entity: Entity) => {
          let entityData: Entity;
          entityData = entity;
          this.dataSource.data.push(entityData);
          this.dataSource.paginator = this.paginator;
        });
      },
      error => {
        this.openSnackBar("Error Fetching Entities", "Close");
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  deleteEntity(id: number){
    this.entityService.deleteEntity(id).subscribe({
      next: (response) => {
        this.openSnackBar("Entity Deleted Successfully", "Close");
        this.dataSource.data = [];
        this.getAllEntities();
      },
      error: error => {
        this.openSnackBar("Error Deleting Entity", "Close");
        console.log(error);
      }
    });
    }

    viewEntityDialog(id: number){
      this.dialog.open(ViewDialogComponent,{
        data: {
          id: id,
        }
      });
  }
  addEntityDialog(){
    const dialogRef = this.dialog.open(AddEditDialogComponent,{
      data:{
        entity: null,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        this.dataSource.data = [];
        this.getAllEntities();
      });
  }
  
  editEntityDialog(entity : any){
    const dialogRef =  this.dialog.open(AddEditDialogComponent,{
      data:{
        entity : entity,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        this.dataSource.data = [];
        this.getAllEntities();
      });
  }
}
