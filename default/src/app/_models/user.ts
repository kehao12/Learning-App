import { Photo } from './photo';
import { Course } from './course';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  lastname: string;
  fullname: string;
  email: string;
  phone: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos ?: Photo[];
  roles?: string[];
  position: number;
  processing?: number;
  duration?: number;
  createdCourse?: Date;
  firstname: string;
  course?: Course;
}
