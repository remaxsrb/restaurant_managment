import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { Waiter } from 'src/app/models/waiter';
import { RestaurantService } from 'src/app/services/model_services/restaurant.service';
import { UserService } from 'src/app/services/model_services/user.service';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { RestaurantPlanService } from 'src/app/services/utility_services/restaurant-plan.service';
import { TimeService } from 'src/app/services/utility_services/time.service';
import { SortableTableService } from 'src/app/services/utility_services/sortable-table.service';
import { SortDirection } from 'src/app/models/types/sort_direction';

@Component({
  selector: 'app-guest-dashboard-restaurants',
  templateUrl: './guest-dashboard-restaurants.component.html',
  styleUrls: ['./guest-dashboard-restaurants.component.css'],
})
export class GuestDashboardRestaurantsComponent implements OnInit {
  constructor(
    private restaurant_service: RestaurantService,
    private user_service: UserService,

    private json_service: JsonService,
    private restaurant_plan_service: RestaurantPlanService,
    private time_service: TimeService,
    private sortable_table_service: SortableTableService
  ) {}

  restaurants: Restaurant[] = [];
  waiters: Waiter[] = [];

  selected_restaurant: string | null = null;

  current_sort_column: string = '';
  current_sort_direction: SortDirection = '';

  max: number = 5;
  isReadonly: boolean = true;

  ngOnInit(): void {
    this.restaurant_service.all().subscribe((data) => {
      this.restaurants = data;
    });

    this.user_service.find_by_role('waiter').subscribe((data) => {
      this.waiters = data;
    });
  }

  isRestaurantChecked(restourant_name: string): boolean {
    return this.selected_restaurant === restourant_name;
  }
  onRestaurantRadioChange(restourant_name: string) {
    this.selected_restaurant = restourant_name;
  }

  get_sorted_restaurants() {
    switch (this.current_sort_column) {
      case 'name':
        this.current_sort_direction === 'asc'
          ? this.restaurant_service.sort_by_name_asc().subscribe((data) => {
              this.restaurants = data;
            })
          : this.restaurant_service.sort_by_name_dsc().subscribe((data) => {
              this.restaurants = data;
            });
        break;
      case 'type':
        this.current_sort_direction === 'asc'
          ? this.restaurant_service.sort_by_type_asc().subscribe((data) => {
              this.restaurants = data;
            })
          : this.restaurant_service.sort_by_type_dsc().subscribe((data) => {
              this.restaurants = data;
            });
        break;
      case 'address':
        this.current_sort_direction === 'asc'
          ? this.restaurant_service.sort_by_address_asc().subscribe((data) => {
              this.restaurants = data;
            })
          : this.restaurant_service.sort_by_address_dsc().subscribe((data) => {
              this.restaurants = data;
            });
        break;
      default:
        // Handle default case or error scenario
        break;
    }
  }

  on_sort(column: keyof Restaurant) {
    if (this.current_sort_column === column) {
      this.current_sort_direction = this.sortable_table_service.rotate(
        this.current_sort_direction
      );
    } else {
      this.current_sort_column = column;
      this.current_sort_direction =
        this.sortable_table_service.get_default_direction();
    }

    this.get_sorted_restaurants();
  }

  onLinkClick(restaurant: Restaurant) {
    localStorage.setItem('restaurant', JSON.stringify(restaurant));
  }

}
