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