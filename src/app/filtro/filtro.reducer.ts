import { Action, createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';


export const estadoInicial:  filtrosValidos = 'todos';

const _filtroReducer = createReducer<filtrosValidos,Action>(
    estadoInicial,
  on(setFiltro , (state:filtrosValidos,{filtro}) => filtro),
 
);

export function filtroReducer(state:any, action:Action): filtrosValidos{
    
    return _filtroReducer(state,action)

}