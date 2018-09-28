import {PizzasGuard} from './pizzas.guard';
import { PizzaExitsGuard } from './pizza-exits.guard';
import { ToppingsGuard } from './toppings.guard';

export const guards: any[] = [PizzasGuard, PizzaExitsGuard, ToppingsGuard];

export * from './pizzas.guard';
export * from './pizza-exits.guard';
export * from './toppings.guard';