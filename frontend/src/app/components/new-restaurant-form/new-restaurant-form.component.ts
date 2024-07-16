import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantType } from 'src/app/models/restaurant_type';
import { AdminService } from 'src/app/services/model_services/admin.service';
import { RestaurantTypeService } from 'src/app/services/model_services/restaurant-type.service';
import { RegexPatterns } from '../../components/regex_patterns';
import { JsonService } from 'src/app/services/utility_services/json.service';
import { Table } from 'src/app/models/interfaces/table';
import { TimeService } from 'src/app/services/utility_services/time.service';

@Component({
  selector: 'app-new-restaurant-form',
  templateUrl: './new-restaurant-form.component.html',
  styleUrl: './new-restaurant-form.component.css',
})
export class NewRestaurantFormComponent implements OnInit {

  constructor(
    private admin_service: AdminService,
    private restaurant_type_service: RestaurantTypeService,
    private fb: FormBuilder,
    private json_service: JsonService,
    private timeService: TimeService
  ) {}

  restaurantTypes: RestaurantType[] = [];
  restaurantForm!: FormGroup;
  addressForm!: FormGroup;
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.initAddressForm();
    this.initRestaurantForm();

    this.restaurant_type_service.all().subscribe((data) => {
      this.restaurantTypes = data;
    });
  }
  initAddressForm(): void {
    this.addressForm = this.fb.group({
      street: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.STREET_NAME)],
      ],
      number: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.STREET_NUMBER)],
      ],
      city: ['', Validators.required],
    });
  }

  initRestaurantForm(): void {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: this.addressForm,
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      open: [void 0, Validators.required],
      close: [void 0, Validators.required],
      plan: [null, Validators.required],
      description: ['', Validators.required],
      rating: [0],
      tables: [[]],
      menu: [[]],
    });
  }

  // Getters for form fields
  get name() {
    return this.restaurantForm.get('name');
  }
  get type() {
    return this.restaurantForm.get('type');
  }
  get email() {
    return this.restaurantForm.get('email');
  }
  get phone_number() {
    return this.restaurantForm.get('phone_number');
  }
  get open() {
    return this.restaurantForm.get('open');
  }
  get close() {
    return this.restaurantForm.get('close');
  }
  get plan() {
    return this.restaurantForm.get('plan');
  }
  get description() {
    return this.restaurantForm.get('description');
  }

  // Getters for address form fields
  get street() {
    return this.addressForm.get('street');
  }
  get number() {
    return this.addressForm.get('number');
  }
  get city() {
    return this.addressForm.get('city');
  }

  onTypeSelectionChange(selectedType: RestaurantType) {
    this.restaurantForm.get('type')?.setValue(selectedType.name);
  }

  onFileUpload(event: any) {
    const file: File = event.files[0];

    const fileName = file.name; // Get the file name
    this.restaurantForm.patchValue({
      plan: fileName, // Assign file name to plan in form
    });
  }

  onSubmit() {
    const formattedOpen = this.timeService.formatTimeTo24HourString(
      new Date(this.open?.value)
    );
    const formattedClose = this.timeService.formatTimeTo24HourString(
      new Date(this.close?.value)
    );

    this.restaurantForm.patchValue({
      open: formattedOpen,
      close: formattedClose,
    });
    this.json_service.get_restaurant_plan(this.plan?.value).subscribe({
      next: (data) => {
        const tables = this.restaurantForm.get('tables')?.value || [];

        data.circles.forEach((circle: any) => {
          const capacity: number = Number(circle.label);
          const id: string = circle.id;
          const status: string = 'available';

          const table: Table = {
            id: id,
            capacity: capacity,
            status: status,
          };

          tables.push(table);
        });

        this.restaurantForm.patchValue({ tables });

        // Submit the form data to the backend
        this.admin_service.add_restaurant(this.restaurantForm.value).subscribe(
          (data) => {
            this.restaurantForm.reset();
          },
          (error) => {
            console.error(error);
          }
        );
      },
    });
  }
}
