import * as fromPizzas from './pizzas.reducers'
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductState {
  pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductState> = {
  pizzas: fromPizzas.reducer,
};

export const getProductsState = createFeatureSelector<ProductState>('products');
