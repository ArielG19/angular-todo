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
  toggleDivVisibility(): void {
    const divElement = document.getElementById('myDiv');
    if (divElement) {
      const currentDisplay = divElement.style.display;
      divElement.style.display = currentDisplay === 'block' ? 'none' : 'block';
    }
  }
  
  
  //---------------- Crud + uso de service --------------------
  createTodo() {
    this.todoService.addTodoService(this.todoForm.value).subscribe(response => {
      // Limpiar el formulario
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
      completed:false,
      category:'otros'
    })
  }
  initForm(){
    //aqui pasamos nuestros campos del formulario y los retornamos
    return this.formBuilder.group({
      //validamos los campos desde aqui
      name:['',[Validators.minLength(5)]],
      completed:'',
      category:[''],
      comments:[''],
    })
  }
   //limpiando el formulario
   clearForm() {
    this.todoForm.reset({
          'name': '',
          'completed':false,
          'category': 'otros',
          'comments': '',
         });
    }
}
