import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/Service/shared-service.service';
import { TodoService } from 'src/app/Service/todo-service.service';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

   //propiedad para guardar nuestra data
   saveTodo: Todo [] = [];
   item: Todo;
   categoryTodo:string[] = ['Otros','Iglesia','Trabajo','Casa','Familia'];
   
  //creamos nuestra propiedad para trabajar nuestro formulario reactivo
  editForm!:FormGroup;
  
  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private readonly todoService: TodoService,
    private sharedService:SharedService,
    private readonly formBuilder:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data:Todo) { 
      
    //recibimos la data del formulario
    this.item = data; 
    //console.log(this.item);


    //creamos la instancia de nuestro formBuilder y tambien le asignamos los valores a mostrar
    this.editForm = this.formBuilder.group({
      name: [this.item.name, [Validators.required, Validators.minLength(5)]],
      completed: [this.item.completed],
      category: [this.item.category, Validators.required],
      comments: [this.item.comments, Validators.required],
    });
  }

  ngOnInit(): void {
    
  }
  // Método para cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
    this.editForm.reset();
  }
  updateTodo(){
    //validamos si hay errores
    if (this.editForm.invalid) {
      return;
    }
    //almacenamos la data actual + la actualizada
    const updatedTodo: Todo = {
      ...this.item,
      ...this.editForm.value
    };
  
    this.todoService.updateTodoService(updatedTodo).subscribe(
      () => {
        //console.log('Todo updated successfully');

        // Obtener la lista actualizada de tareas
        this.todoService.getTodoService().subscribe(todos => {
          // Emitir los cambios al servicio compartido
          this.sharedService.actualizarTodos(todos);
        });
        this.closeModal();
      },
      (error: any) => {
        console.error('Error updating todo:', error);
      }
    );


  }


}
