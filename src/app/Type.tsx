export interface Plan {
    id: number;
    from_city: string;
    to_city: string;
    transport: string;
    nights: number;
    days: number;
    keywords: string;
    created_at: Date;
  }
  
  export interface Tour {
    id: number;
    city: string;
    country: string;
    description: string;
    image: string;
  }

  export type Itinerary = {
    id: number;
    plan_id: number;
    time: string;
    activity: string;
    details: string;
    day: number;
  };

  export type Place = {
    id: number;
    plan_id: number;
    name: string;
    address: string;
  }

  export interface Location {
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
    photo: string;
  };

  export interface Hotel extends Location {
    rating: number;
  }