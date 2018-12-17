import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { PreOrder } from '../models/pre-order';
import { OrderService } from '../services/order.service';



export interface ActionWithPayload extends Action {
    payload?: any;
}

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';

export function itemCounterReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case INCREMENT: return state + 1;
        case DECREMENT: return state - 1;
        case RESET: return 0;
        default: return state;
    }
}

export function preOrderReducer(state: PreOrder, action: ActionWithPayload) {
    switch (action.type) {
        case 'UPDATE': {
            return Object.assign({}, action.payload);
        }
        default: {
            return state || {};
        }
    }
}

@Injectable()
export class PreOrderEffects {

    constructor(
        private actions: Actions,
        private orderService: OrderService) { }

    @Effect()
    initPreOrder: Observable<ActionWithPayload> = this.actions.pipe(
        ofType('INIT_PRE_ORDER'),
        mergeMap<ActionWithPayload, ActionWithPayload>(action => {
            return this.orderService.createPreOrder().pipe(map(preOrder => {
                return { type: 'UPDATE', payload: preOrder };
            }));
        })
    );

    @Effect()
    addItem: Observable<ActionWithPayload> = this.actions.pipe(
        ofType('ADD_ITEM'),
        mergeMap<ActionWithPayload, ActionWithPayload>(action => {
            return this.orderService.addItemToOrder(action.payload).pipe(map(preOrder => {
                return { type: 'UPDATE', payload: preOrder };
            }));
        })
    );

    @Effect()
    removeItem: Observable<ActionWithPayload> = this.actions.pipe(
        ofType('REMOVE_ITEM'),
        mergeMap<ActionWithPayload, ActionWithPayload>(action => {
            return this.orderService.deleteItemFromOrder(action.payload).pipe(map(preOrder => {
                return { type: 'UPDATE', payload: preOrder };
            }));
        })
    );

    @Effect()
    cleanOrder: Observable<ActionWithPayload> = this.actions.pipe(
        ofType('CLEAN_ORDER'),
        mergeMap<ActionWithPayload, ActionWithPayload>(action => {
            return this.orderService.cleanOrder().pipe(map(preOrder => {
                return { type: 'UPDATE', payload: preOrder };
            }));
        })
    );

    @Effect()
    setOrderItems: Observable<ActionWithPayload> = this.actions.pipe(
        ofType('SET_ITEMS'),
        mergeMap<ActionWithPayload, ActionWithPayload>(action => {
            return this.orderService.setOrderItems(action.payload).pipe(map(preOrder => {
                return { type: 'UPDATE', payload: preOrder };
            }));
        })
    );
}


