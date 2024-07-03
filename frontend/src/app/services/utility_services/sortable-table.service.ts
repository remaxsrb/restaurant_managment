import { Injectable } from '@angular/core';
import { SortDirection } from 'src/app/models/types/sort_direction';

@Injectable({
  providedIn: 'root',
})
export class SortableTableService {
  constructor() {}

  //maps current sort direction to next sort direction
  private rotate_directions: { [key: string]: SortDirection } = {
    asc: 'desc',
    desc: '',
    '': 'asc',
  };

  get_default_direction(): SortDirection {
    return '';
  }

  rotate(direction: SortDirection) : SortDirection {
    return this.rotate_directions[direction]
  }

}
