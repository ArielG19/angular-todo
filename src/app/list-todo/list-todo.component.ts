import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../Service/todo-service.service';
import { SharedService } from '../Service/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialogs/dialog-component/dialog-component.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  //propiedad para guardar nuestra data
  saveTodo: Todo [] = [];
  searchItem!: '';
  

  constructor(private dialog: MatDialog,private readonly todoService: TodoService, private readonly sharedService:SharedService) { }

  ngOnInit(): void {
    //nos suscribimos al EventEmitter y recibimos los todos
    this.sharedService.todosUpdatedEmitter.subscribe(todos => {
      // asignamos los todos a la propiedad saveTodo del componente. 
      this.saveTodo = todos;
    });
    // Obtener la lista completa de tareas al iniciar el componente
    this.refreshTodoList();
  }

  /*Dialogs */
  addDialog() {
    this.dialog.open(DialogComponent);
  }
  editDialog(todo:Todo){
    //console.log(todo.id);
    this.dialog.open(EditDialogComponent, {data:todo});
  }
  /*Dialogs */

  deleteTodo(id:string){
    //creamos confirmacion para eliminar
    if(confirm('Deseas eleminar este item')){
      this.todoService.deleteTodoService(id).subscribe(response =>{
        //creamos array temporal sin el item eliminado
        //filter incluye todos lo elementos diferentes(!==) a id(el que elimninamos)
        const arrayTempo = this.saveTodo.filter(item => item.id != id);
        //actualizamos nuestra lista
        this.saveTodo = [...arrayTempo]
      })
    }
  }
  private refreshTodoList() {
    //obtenemos la lista de tareas del servicio TodoService 
    this.todoService.getTodoService().subscribe(todos => {
      //asignamos los resultados a saveTodo.
      this.saveTodo = todos;
      //emitimos los cambios al servicio compartido utilizando el método actualizarTodos() del servicio SharedService.
      this.sharedService.actualizarTodos(this.saveTodo);
    });
  }

  
  

}
