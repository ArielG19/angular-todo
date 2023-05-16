import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

   //propiedad de nuestra url
   private readonly API = environment.api;
   constructor(private readonly http: HttpClient) { }
 
 
   //metodos crud service
 
   addTodoService(todo: Todo): Observable<Todo>{
     //Propiedad body, contiene la data a modificar
     const body = {name:todo.name,completed:todo.completed,category:todo.category,comments:todo.comments}
 
     //pasamos nuestra url + la data
     return this.http.post<Todo>(this.API, body);
   }
}
