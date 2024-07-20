import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { FloorPlan } from 'src/app/models/interfaces/FloorPlan';
import { Circle } from 'src/app/models/interfaces/circle';
import { Rechtangle } from 'src/app/models/interfaces/rechtangle';
import { Table } from 'src/app/models/interfaces/table';

@Injectable({
  providedIn: 'root',
})
export class RestaurantPlanService {
  private ctx: CanvasRenderingContext2D | null = null;
  private hoveredCircleIndex: number | null = null;
  private clickedCircleIndex: number | null = null;

  private tables: Table[] = [];

  renderRestaurantPlan(
    floorPlan: FloorPlan,
    restaurant: Restaurant,
    canvas: HTMLCanvasElement,
    hoveredIndex: number | null,
    clickedIndex: number | null
  ): void {
    this.ctx = canvas.getContext('2d');
    this.tables = restaurant.tables;
    this.hoveredCircleIndex = hoveredIndex;
    this.clickedCircleIndex = clickedIndex;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.renderRechtangles(floorPlan.rechtangles);
      this.renderCircles(this.ctx, floorPlan.circles);
    } else {
      console.error('Failed to get 2D context from canvas element.');
    }
  }

  renderCircle(
    ctx: CanvasRenderingContext2D,
    circle: Circle,
    isHovered: boolean = false,
    isClicked: boolean = false
  ): void {
    const text = circle.label;
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.closePath();

    if (circle.id && this.tables[circle.id - 1]?.status === 'reserved') {
      ctx.fillStyle = 'black';
      ctx.fillText('', circle.x, circle.y);
  } else if (isClicked && this.tables[circle.id - 1]?.status === 'available') {
      ctx.fillStyle = 'green';
      ctx.fillText(text, circle.x - textWidth / 2, circle.y);
  } else if (isHovered && this.tables[circle.id - 1]?.status === 'available') {
      ctx.fillStyle = 'gray';
      ctx.fillText(text, circle.x - textWidth / 2, circle.y);
  } else {
      ctx.fillStyle = 'white';
      ctx.fillText(text, circle.x - textWidth / 2, circle.y);
  }
  

    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.fillText(text, circle.x - textWidth / 2, circle.y + 5);
  }

  private renderRechtangles(rectangles: Rechtangle[]): void {
    rectangles.forEach((rect) => {
      if (this.ctx) {
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const text = rect.label;
        const textWidth = this.ctx.measureText(text).width;

        this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this.ctx.fillText(text, centerX - textWidth / 2, centerY);
      }
    });
  }

  renderCircles(ctx: CanvasRenderingContext2D, circles: Circle[]): void {
    circles.forEach((circle, index) => {
      const isHovered = index === this.hoveredCircleIndex;
      const isClicked = index === this.clickedCircleIndex;

      this.renderCircle(ctx, circle, isHovered, isClicked);
    });
  }

  getHoveredCircleIndex(circles: Circle[], x: number, y: number): number {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      const dx = x - circle.x;
      const dy = y - circle.y;
      if (dx * dx + dy * dy <= circle.radius * circle.radius) {
        return i;
      }
    }
    return -1;
  }
}
