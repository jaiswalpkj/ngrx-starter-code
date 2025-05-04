import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GroceryService } from '../../grocery.service';
import { groceryAction } from '../actions/grocery.action';

@Injectable()
export class GroceriesEffects {
  private actions$ = inject(Actions);
  private groceryService = inject(GroceryService);

  loadGroceries$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(groceryAction.loadGroceries),
        exhaustMap(() => this.groceryService.fetchAllGroceries()
          .pipe(
            map((groceries:any) => groceryAction.loadGroceriesCompleted({payload:groceries})),
            catchError(() => of(groceryAction.loadGroceriesFailure()))
          ))
    );
  });
}