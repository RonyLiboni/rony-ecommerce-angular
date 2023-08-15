import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export abstract class CreateAndEditAbstractService<Model> {
  constructor(protected readonly _http: HttpClient) {}

  public create(model: Model): Observable<HttpResponse<Model>> {
    return this._http.post<Model>(this.getUrl(), model, { observe: 'response' });
  }

  public edit(model: Model): Observable<Model> {
    return this._http.put<Model>(this.getEditUrl(model), model);
  }

  protected abstract getEditUrl(model: Model): string;
  protected abstract getUrl(): string;
}
