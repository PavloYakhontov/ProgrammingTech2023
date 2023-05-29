import { Boundary } from '@core/http/Boundary';

export interface Global {
  fatalModal: {
    show: boolean;
    boundary: Boundary | null;
  };
  toast: {
    show: boolean;
    callback: Function | null;
  },
  isAuth: boolean;
}
