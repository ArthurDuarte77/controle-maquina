import { Nodemcu } from './../interfaces/nodemcu';
import { loadThdados, setThdados, sucessoThdados, IAppState } from './app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Injectable({
  providedIn: 'root',
})
export class ThdadosEffectService {
  constructor(private actions$: Actions, private http: HttpClient, private store: Store<{app: IAppState}>) {}

  api: string = 'http://localhost:8090/nodemcu';

  carregaThdados = createEffect(() =>
    this.actions$.pipe(
      ofType(loadThdados),
      switchMap(() => this.http.get<Nodemcu[]>(this.api)
      ),
      tap(thdados => this.store.dispatch(setThdados({payload: thdados}))),
      map(() => sucessoThdados()) 
    )
  );
}
