import { saveAdmin } from "../../../adapters/data-access/repositories/adminRepository/saveAdmin";
import { getDriver } from "../../../adapters/data-access/repositories/driverRepository/getDriver";
import { saveDriver } from "../../../adapters/data-access/repositories/driverRepository/saveDriver";
import { updateDriver } from "../../../adapters/data-access/repositories/driverRepository/updateDriver";
import { saveUser } from "../../../adapters/data-access/repositories/userRepository/saveUser";
import { signupData } from "../../interfaces/comman";
import { DriverDetails } from "../../interfaces/driver";
import { generateToken } from "../../shared/utilities/generateToken";

export default {
  getDriverByMobile: async (mobile: { mobile: string }) => {
    try {
      const driver = await getDriver.getDriverByMobile(mobile);
      if (driver) {
        const driverData = {
          firstName: driver.firstName,
          lastName: driver.lastName,
          id: driver._id,
          mobile: driver.mobile,
          cabModel: driver.cabModel,
        };
        return driverData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  getDriverByMail: async ({ mail }: { mail: string }) => {
    try {
      const driver = await getDriver.getDriverByMail(mail);
      if (driver) {
        const driverData = {
          firstName: driver.firstName,
          lastName: driver.lastName,
          id: driver._id,
          mobile: driver.mobile,
        };
        return driverData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  registerDriver: async (data: signupData) => {
    try {
      const driverData = {
        ...data,
        cityCoors: {
          latitude: data.cityData.latitude,
          longitude: data.cityData.longitude,
          cityName: data.cityData.placeName,
        },
      };
      console.log({driverData})
      const driver = await saveDriver.registerDriver(driverData);
      if (driver) {
        let driverData = {
          firstName: driver.firstName,
          lastName: driver.lastName,
          id: driver._id,
          cabModel: driver.cabModel,
          mobile: driver.mobile,
        };
        //  const token=generateToken(driver._id)
        return driverData;
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  loginWithMobile: async (mobile: { mobile: string }) => {
    try {
      let driverData;
      let token;
      const driver = await getDriver.getDriverByMobile(mobile);
      if (driver) {
        driverData = {
          firstName: driver.firstName,
          lastName: driver.lastName,
          id: driver._id,
          cabModel: driver.cabModel,
        };
        token = generateToken(driver._id);
      }
      return { driverData, token };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
  updateDriverDetails: async (data: DriverDetails) => {
    try {
      const driverData = await updateDriver.updateDriverDetails(data);
      return driverData;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
