import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../model/todo.model";

@Pipe({
  name: 'pipeFilter',
})
export class FilterPipe implements PipeTransform {

  //values -> contiene el objeto, arg -> el texto de busqueda
  transform(value: Todo[], args: string): Todo[] {
    //si arg no tiene un valor, devolvemos el value si modificar nada
    if (!args) {
      return value;
    }

    const searchTerm = args.toLowerCase(); //convertimos la busqueda a minus.
    const filteredTodos: Todo[] = []; //los items filtrados

    // Opciones de filtrado
    const filters = {
      name: true, // Filtrar por nombre
      category: true, // Filtrar por categoría
      completed: true, // Filtrar por completado
    };

    // Recorrer cada tarea
    for (const todo of value) {
      // Verificar cada opción de filtrado si coincide para incluirlo al nuevo objeto
      if (
        (filters.name && todo.name.toLowerCase().includes(searchTerm)) ||
        (filters.category && todo.category.toLowerCase().includes(searchTerm)) ||
        (filters.completed && todo.completed.toString().toLowerCase() === searchTerm)
      ) {
        // Agregar tarea al resultado filtrado
        filteredTodos.push(todo);
      }
    }
    //sino un objeto vacio, para mostrar un mensaje
    if (filteredTodos.length === 0 && args) {
      return [];
    }

    //regresamos un objetos con la busqueda
    return filteredTodos;
  }
}
