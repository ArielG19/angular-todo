import { Injectable, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
   // Evento EventEmitter para emitir cambios en la lista de tareas de tipo Todo[]
  public todosUpdatedEmitter: EventEmitter<Todo[]> = new EventEmitter<Todo[]>();

  constructor() { }
  //El método actualizarTodos() recibe una lista de tareas (todos) y emite los cambios a través del evento todosUpdated.
  public actualizarTodos(todos: Todo[]): void {
    this.todosUpdatedEmitter.emit(todos);
  }
}
