import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CreateAndEditAbstractService<Model> {
  constructor(protected readonly _http: HttpClient) {}

  public create(model: Model): Observable<Model> {
    return this._http.post<Model>(this.getUrl(), model);
  }

  public edit(model: Model): Observable<Model> {
    return this._http.put<Model>(this.getEditUrl(model), model);
  }

  protected abstract getEditUrl(model: Model): string;
  protected abstract getUrl(): string;
}
