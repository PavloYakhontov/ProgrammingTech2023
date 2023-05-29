import { Coords } from '@type/defaults';
import { HaversineCalculation, toRadiansCoords } from '@utils/helpers';

export class GeolocationService {
  public calculateKilometers(coords1: Coords, coords2: Coords): number {
    const { x: x1, y: y1 } = coords1;
    const { x: x2, y: y2 } = coords2;

    const dLat = toRadiansCoords(x2 - x1);
    const dLon = toRadiansCoords(y2 - y1);

    return HaversineCalculation(dLat, dLon, x1, x2);
  }

  public async updateGeo() {

  }
}
