import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantPlanService {

  renderRestaurantPlan(floorPlan: any, canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Render rectangles
      floorPlan.rectangles.forEach((rect: any) => {
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const text = rect.label;
        const textWidth = ctx.measureText(text).width;

        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillText(text, centerX - textWidth / 2, centerY);
      });
      // Render circles
      floorPlan.circles.forEach((circle: any) => {
        const text = circle.label;
        const textWidth = ctx.measureText(text).width;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(text, circle.x - textWidth / 2, circle.y);
      });
    }
  }
}
