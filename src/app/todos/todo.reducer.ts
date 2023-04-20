import { createReducer, on,Action } from '@ngrx/store';
import { borrar, crear,editar,limpiarTodos,toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';



export const estadoInicial:Todo[] = [];

const _todoReducer = createReducer(
    estadoInicial,
  on(crear, (state,{texto}) => [...state,new Todo(texto)]),

  on(toggle, (state,{id}) => {

    return state.map( todo => {

        if(todo.id === id) {
            return {
                ...todo,
                completado: !todo.completado
            }
        } else {
            return todo;
        }
       
    });
  }),
  on(editar, (state,{id,texto}) => {

    return state.map( todo => {

        if(todo.id === id) {
            return {
                ...todo,
                texto: texto
            }
        } else {
            return todo;
        }
       
    });
  }),
  on(borrar, (state,{id}) => state.filter(todo => todo.id !== id) ),
  on(toggleAll, (state,{completado}) =>  {
    return state.map(todo => {
        
            return {
                ...todo,
                completado: completado
            }
       
    })
  }),
  on(limpiarTodos, state => state.filter(todo => !todo.completado) )
)
export function todoReducer(state:Todo[]=estadoInicial, action:Action){
    
    return _todoReducer(state,action)

}