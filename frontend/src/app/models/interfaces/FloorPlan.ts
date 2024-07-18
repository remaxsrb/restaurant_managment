import { Circle } from "./circle";
import { Rechtangle } from "./rechtangle";

export interface FloorPlan {
    circles: Circle[],
    rechtangles: Rechtangle[]
  }