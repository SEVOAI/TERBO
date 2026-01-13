
export type Category = 'Action' | 'Drama' | 'New Releases' | 'Sci-Fi' | 'Horror' | 'Comedy' | 'Animation';

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: Category;
  thumbnail: string;
  videoUrl: string;
  rating: number;
  year: number;
}

export enum AdminView {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  Main = 'MAIN'
}
