import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../Service/todo-service.service';

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
  

  constructor(private readonly todoService: TodoService,private readonly formBuilder:FormBuilder) { }

  ngOnInit(): void {

    //Cargando datos de api
    this.todoService.getTodoService().subscribe(response => {
        console.log(response)
        this.saveTodo = [...response]
        this.clearForm();
    })

    //creamos nuestra instancia del formulario para trabajar el html
    this.todoForm = this.initForm();
    this.onPatchValue();
  }

  //---------------- Crud + uso de service --------------------
  createTodo(){
    //console.log(this.todoForm.value);
    this.todoService.addTodoService(this.todoForm.value).subscribe(response => {
      //console.log(response)
      this.saveTodo.push(response)
      this.clearForm();
    })
    
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
      name:['',[Validators.required,Validators.minLength(5)]],
      completed:'',
      category:[''],
      comments:['',[Validators.required]],
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
