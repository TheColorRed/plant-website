import { Component, Input } from '@angular/core';
import { Fields, Model, Page, Paginator } from '@hasura-query-builder/core';
import { Observable } from 'rxjs';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent<T extends Model> {
  /** Should the paginator show the page number? */
  @Input() showPages = true;
  /** A reference to the paginator. */
  @Input({ required: true })
  set paginator(paginator: Paginator<Fields<T>>) {
    this.paginatorService.paginator = paginator;
  }
  /** The page to display. */
  @Input({ alias: 'page', required: true }) page$!: Observable<Page<Fields<T>>>;

  route$ = this.paginatorService.route$;

  constructor(private readonly paginatorService: PaginatorService) {}
}
