import * as fromStore from '../store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExitsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(id);
      })
    )
  }

  hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzasEntities).pipe(
      map((entities: {[key: number]: Pizza}) => !!entities[id]),
      take(1)
    )
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getAllPizzasLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}