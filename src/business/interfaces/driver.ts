export interface DriverDetails {
  id: string;
  aadhar?: {
    aadharId: string;
    aadharImage: string;
  };
  license?: {
    licenseId: string;
    licenseImage: string;
  };
  vehicleDocuments?: {
    registration: {
      registrationId: string;
      registrationImage: string;
    };
    vehicleImage1?: string;
    vehicleImage2?: string;
  };
  firstName?: string;
  lastName?: string;
}

export interface QuickRideInterface {
  driverId?: string;
  userId: string;
  sourceCoordinates: {
    latitude: number;
    longitude: number;
  };
  destinationCoordinates: {
    latitude: number;
    longitude: number;
  };
  sourceLocation: string;
  destinationLocation: string;
  distance: number;
  // price: number;
  feedback?: string;
  rating?: number;
  duration:number;
}

export interface ScheduledRideInterface {
  driverId?: string;
  userId: string;
  sourceCoordinates: {
    latitude: number;
    longitude: number;
  };
  destinationCoordinates: {
    latitude: number;
    longitude: number;
  };
  sourceLocation: string;
  destinationLocation: string;
  distance: number;
  price: number;
  pickUpDate:Date;
  feedback?: string;
  rating?: number;
  duration:number;
  cabId:string
}