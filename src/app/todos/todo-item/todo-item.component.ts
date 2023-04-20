import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo = new Todo('');
  @ViewChild('inputFisico') txtInputFisico: ElementRef = new ElementRef('');

  chkCompletado: FormControl = new FormControl('');
  txtInput: FormControl = new FormControl('');

  editando = false;


  constructor(private store: Store<AppState>) {
    
  }

  ngOnInit(): void {
    
    
    
    this.chkCompletado.patchValue(this.todo.completado);

    this.txtInput = new FormControl(this.todo.texto, Validators.required)

    
    this.chkCompletado.valueChanges.subscribe((valor) => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
      console.log(valor);
    });
  
    
    
    
  }
  editar(){
    this.editando = true;

    setTimeout(()=>{
      this.txtInputFisico.nativeElement.select();
      
    },1)
   
  }

  terminarEdicion() {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }
    if(this.txtInput.value == this.todo.texto){
      return;
    }
    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
         texto: this.txtInput.value
        }))
  }

  borrar(){
    this.store.dispatch(actions.borrar({id: this.todo.id}))
  }

}
