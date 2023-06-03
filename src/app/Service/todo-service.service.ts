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
   private readonly API = environment.api
   constructor(private readonly http: HttpClient) { }
 
 
   //metodos crud service //

   //Agregar
   addTodoService(todo: Todo): Observable<Todo>{
     //Propiedad body, contiene la data a modificar
     const body = {name:todo.name,completed:todo.completed,category:todo.category,comments:todo.comments}
 
     //pasamos nuestra url + la data
     return this.http.post<Todo>(this.API, body);
   }
   
   //Listar
   getTodoService():Observable<Todo[]>{
    //obtenemos los datos de la API y los devuelve como un Observable de tipo Todo[].
    return this.http.get<Todo[]>(this.API);
   }
   updateTodoService(todo: Todo): Observable<void>{
    const body = {name:todo.name,completed:todo.completed,category:todo.category,comments:todo.comments}
    //aqui pasamos nuestra url + id y como segundo parametro la data a modificar
    return this.http.put<void>(`${this.API}/${todo.id}`,body);
  }
   //Eliminar
   deleteTodoService(id: string): Observable<void>{
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
