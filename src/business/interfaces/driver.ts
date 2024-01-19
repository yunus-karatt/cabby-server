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
