import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../Service/todo-service.service';
import { SharedService } from '../Service/shared-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  //propiedad para guardar nuestra data
  saveTodo: Todo [] = [];
  categoryTodo:string[] = ['Otros','Iglesia','Trabajo','Casa','Familia'];
  isVisible: boolean = true;
  

  //creamos nuestra propiedad para trabajar nuestro formulario reactivo
  todoForm!:FormGroup;
  

  constructor(
    private readonly todoService: TodoService,
    private readonly sharedService:SharedService,
    private readonly formBuilder:FormBuilder) { }

  ngOnInit(): void {
    //creamos nuestra instancia del formulario para trabajar el html
    this.todoForm = this.initForm();
    this.onPatchValue();
  }
  

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }
  
  
  //---------------- Crud + uso de service --------------------
  createTodo() {
    
    this.todoService.addTodoService(this.todoForm.value).subscribe(response => {
   this.clearForm();
      // Obtener la lista actualizada de tareas
      this.todoService.getTodoService().subscribe(todos => {
        // Emitir los cambios al servicio compartido
        this.sharedService.actualizarTodos(todos);
      });
    });
  }
 
  
  
  //---------------- implementacion de form reactive --------------------

   //metodo para asignar o cargar datos en el formulario
   onPatchValue(){
    this.todoForm.patchValue({
      category:'otros'
    })
  }
 
  initForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      completed: false,
      category: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }
   //limpiando el formulario
   clearForm() {
    this.todoForm.reset();
    Object.keys(this.todoForm.controls).forEach(key => {
      //eliminando cualquier error de validación en los formcontrol
      this.todoForm.get(key)?.setErrors(null);
    });
  }
}
