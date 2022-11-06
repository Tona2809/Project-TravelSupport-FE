import User from "./user";

interface Rating {
  id?: string;
  rate?: number;
  userRating?: User;
  message?: string;
  created_at?: Date;
}

export default Rating;
