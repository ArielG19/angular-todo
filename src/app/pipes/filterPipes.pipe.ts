import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../model/todo.model";

@Pipe({
  name: 'pipeFilter',
})
export class FilterPipe implements PipeTransform {

  transform(value: Todo[], args: string): Todo[] {
    if (!args) {
      return value;
    }

    const searchTerm = args.toLowerCase();
    const filteredTodos: Todo[] = [];

    // Opciones de filtrado
    const filters = {
      name: true, // Filtrar por nombre
      category: true, // Filtrar por categoría
      completed: true, // Filtrar por completado
    };

    // Recorrer cada tarea
    for (const todo of value) {
      // Verificar cada opción de filtrado
      if (
        (filters.name && todo.name.toLowerCase().includes(searchTerm)) ||
        (filters.category && todo.category.toLowerCase().includes(searchTerm)) ||
        (filters.completed && todo.completed.toString().toLowerCase() === searchTerm)
      ) {
        // Agregar tarea al resultado filtrado
        filteredTodos.push(todo);
      }
    }

    if (filteredTodos.length === 0) {
      // Agregar un objeto con el texto de "No hay resultados" al resultado filtrado
     // filteredTodos.push({ id: '', name: 'No hay resultados', category: '', completed: false, comments: '' });
    }

    return filteredTodos;
  }
}
