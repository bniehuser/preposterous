export interface Point {
  x: number;
  y: number;
  z: number;
}

export const pointDifference = (a: Point, b: Point): Point => ({x:b.x-a.x,y:b.y-a.y,z:b.z-a.z});

export const pointDistance = (a: Point, b: Point) => {
  const d = pointDifference(a, b);
  return Math.sqrt((d.x*d.x)+(d.y*d.y)+(d.z*d.z));
}
