import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../Service/todo-service.service';
import { SharedService } from '../Service/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialogs/dialog-component/dialog-component.component';
import { EditDialogComponent } from '../dialogs/edit-dialog/edit-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements OnInit {
  // Propiedad para guardar nuestros todos
  saveTodo: Todo[] = [];
  searchItem!: '';
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  constructor(
    private dialog: MatDialog,
    private readonly todoService: TodoService,
    private readonly sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // Nos suscribimos al EventEmitter y recibimos los todos actualizados
    this.sharedService.todosUpdatedEmitter.subscribe((todos: Todo[]) => {
      // Asignamos los todos a la propiedad saveTodo del componente
      this.saveTodo = todos;
    });

    // Nos suscribimos al EventEmitter para detectar cuando se agrega un nuevo todo
    this.sharedService.newTodoAddedEmitter.subscribe(() => {
      // Reiniciamos la página actual y actualizamos la lista de todos
      this.currentPage = 1;
      this.refreshTodoList();
    });

    // Obtenemos la lista de todos al iniciar el componente
    this.refreshTodoList();
  }

  /*Dialogs */
  addDialog() {
    // Abre el diálogo para agregar un nuevo todo
    this.dialog.open(DialogComponent);
  }

  editDialog(todo: Todo) {
    // Abre el diálogo para editar un todo existente
    this.dialog.open(EditDialogComponent, { data: todo });
  }
  /*Dialogs */

  deleteTodo(id: string) {
    // Mostramos una confirmación antes de eliminar el todo
    if (confirm('¿Deseas eliminar este elemento?')) {
      this.todoService.deleteTodoService(id).subscribe(response => {
        // Filtramos los elementos diferentes (!==) al ID que queremos eliminar
        const arrayTempo = this.saveTodo.filter(item => item.id != id);
        // Actualizamos nuestra lista de todos
        this.saveTodo = [...arrayTempo];
      });
    }
  }

  private refreshTodoList() {
    this.todoService.getTodoService().subscribe(todos => {
      this.totalItems = todos.length;

      // Ordenamos los todos por ID en orden descendente
      todos.sort((a, b) => parseInt(b.id) - parseInt(a.id));

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.saveTodo = todos.slice(startIndex, endIndex);

      // Actualizamos los todos en el servicio compartido
      this.sharedService.actualizarTodos(this.saveTodo);

      // Si la página actual es mayor que el número total de páginas, ajustamos la página actual
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.refreshTodoList();
      }
    });
  }

  goToPage(pageNumber: number) {
    // Navega a la página solicitada si es válida
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.refreshTodoList();
    }
  }
  

  get totalPages(): number {
    // Calcula el número total de páginas basado en la cantidad de elementos por página
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
