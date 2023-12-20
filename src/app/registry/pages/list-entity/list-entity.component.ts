import { Component, ViewChild } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Entity } from '../../models/entity.model';

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
  'actions' ]

  @ViewChild(MatPaginator, {static :true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entityService: EntityService) {
    console.log('ListEntityComponent constructor');
  }

  dataSource = new MatTableDataSource<Entity>([]);


  ngOnInit(): void {
    this.getAllEntities();
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
        console.log(response);
      },
      error => {
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
}
