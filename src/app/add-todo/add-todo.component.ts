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

  // Propiedad para guardar nuestra data
  saveTodo: Todo[] = [];
  categoryTodo: string[] = ['Otros', 'Iglesia', 'Trabajo', 'Casa', 'Familia'];
  isVisible: boolean = true;

  // Creamos nuestra propiedad para trabajar con nuestro formulario reactivo
  todoForm!: FormGroup;

  constructor(
    private readonly todoService: TodoService,
    private readonly sharedService: SharedService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Creamos nuestra instancia del formulario para trabajar con el HTML
    this.todoForm = this.initForm();
    this.onPatchValue();
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  //---------------- CRUD + Uso del servicio --------------------

  createTodo() {
    // Agrega un nuevo todo utilizando el servicio
    this.todoService.addTodoService(this.todoForm.value).subscribe(response => {
      // Limpia el formulario después de agregar el todo
      this.clearForm(); 
      // Emite un evento para indicar que se ha agregado un nuevo todo
      this.sharedService.newTodoAddedEmitter.emit(); 
    });
  }

  //---------------- Implementación del formulario reactivo --------------------

  // Método para asignar o cargar datos en el formulario
  onPatchValue() {
    this.todoForm.patchValue({
      category: 'Otros'
    });
  }

  initForm() {
    // Inicializa el formulario reactivo con sus controles y validaciones
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      completed: false,
      category: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  // Limpia el formulario
  clearForm() {
    this.todoForm.reset();
    Object.keys(this.todoForm.controls).forEach(key => {
      // Elimina cualquier error de validación en los formcontrols
      this.todoForm.get(key)?.setErrors(null);
    });
  }
}
