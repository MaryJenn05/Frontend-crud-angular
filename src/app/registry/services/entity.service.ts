import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entity } from '../models/entity.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private baseUrl = environment.baseUrl;
  constructor( private http: HttpClient) { }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handlerError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(
      'Something happened with request, please try again later.'
      ); 
  }

  getAllEntities() {
    return this.http.get<Entity>(`${this.baseUrl}/entities`).pipe(retry(2), catchError(this.handlerError));
  }
  getEntityById(id: number) {
    return this.http.get(`${this.baseUrl}/entities/${id}`, { observe: 'response'});
  }
  createEntity(entity: any) {
    return this.http.post(`${this.baseUrl}/entities`, entity, { observe: 'response'});
  }
  updateEntity(id: number, entity: any) {
    return this.http.put(`${this.baseUrl}/entities/${id}`, entity, { observe: 'response'});
  }
  deleteEntity(id: number) {
    return this.http.delete(`${this.baseUrl}/entities/${id}`, { observe: 'response'});
  }

}
