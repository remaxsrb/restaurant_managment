import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { GeocodingService } from 'src/app/services/utility_services/geocoding.service';

//thanks to this github user I have found a solution for webpack messing up leeflet image path https://github.com/ghybs/leaflet-defaulticon-compatibility?tab=readme-ov-file

import * as L from 'leaflet';
import 'leaflet-providers';
import 'leaflet-defaulticon-compatibility'; // Import the package
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; // Optional CSS for default icon compatibility

// Ensure Leaflet's default icons can be found by this package
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

import { OSMSrbija, tileLayerOSMSrbija } from 'src/app/OSMSerbia/leaflet_OSMSerbia_layer'; 




@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  restaurant: Restaurant = new Restaurant();
  private map!: L.Map;

  constructor(private geocodingService: GeocodingService) {}


  ngOnInit(): void {
    const restaurant_data = localStorage.getItem('restaurant');
    if (restaurant_data) {
      this.restaurant = JSON.parse(restaurant_data);
    }

    
  }

  ngAfterViewInit(): void {
    this.initMap();
    if (this.restaurant.address) {
      const fullAddress = `${this.restaurant.address.street} ${this.restaurant.address.number}, ${this.restaurant.address.city}`;
      console.log(fullAddress)
      this.geocodeRestaurantAddress(fullAddress);
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([44.788744, 20.459097], 75); // Example coordinates (Humska 1)
    tileLayerOSMSrbija().addTo(this.map);
  }

  private geocodeRestaurantAddress(address: string): void {
    this.geocodingService.geocode(address).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lon = parseFloat(result.lon);

          console.log('Geocoding result:', lat, lon);

          this.map.setView([lat, lon], 75);
          L.marker([lat, lon]).addTo(this.map);
        } else {
          console.error('No geocoding results found for address:', address);
        }
      },
      (error) => {
        console.error('Error geocoding address:', error);
      }
    );
  }
}
