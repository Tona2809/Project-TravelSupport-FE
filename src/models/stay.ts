import Amentity from "./amenity";
import Image from "./image";
import Province from "./province";
import Rating from "./rating";
import User from "./user";

interface Stay {
  id: string;
  name?: string;
  addressDescription?: string;
  stayDescription?: string;
  timeOpen?: Date;
  timeClose?: Date;
  host?: User;
  maxPeople?: Number;
  price?: Number;
  roomNumber?: Number;
  bathNumber?: Number;
  bedroomNumber?: Number;
  bedNumber?: Number;
  status?: Number;
  createdAt?: Date;
  latestUpdateAt?: Date;
  type?: string;
  province?: Province;
  hidden?: boolean;
  amenities?: Amentity[];
  stayRating?: Rating[];
  stayImage: Image[];
  userLiked?: User[];
}

export default Stay;
