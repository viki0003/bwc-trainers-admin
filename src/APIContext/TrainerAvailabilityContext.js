import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axiosInstance from "../Config/axios";
import BASE_API_URL from "../Config/Config";
import { useLogin } from "./LoginContext";

const TrainerAvailabilityContext = createContext();
export const useTrainerAvailability = () => useContext(TrainerAvailabilityContext);

export const TrainerAvailabilityProvider = ({ children }) => {
  const [trainerLockedData, setTrainerLockedData] = useState(null);
  const [trainerWeeklyData, setTrainerWeeklyData] = useState(null);
  const [trainerTimeOffData, setTrainerTimeOffData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useLogin();
  

  const baseURL = `${BASE_API_URL}/trainer/trainer-availability/`;
  const baseURL_timeoff = `${BASE_API_URL}/trainer/`;

  const fetchTrainerAvailabilityLockedIn = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${baseURL}locked/`);
      setTrainerLockedData(res.data);
      
    } catch (err) {
      console.error("Failed to fetch trainer:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const fetchTrainerAvailabilityWeekly = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${baseURL}weekly/`);
      setTrainerWeeklyData(res.data);

    } catch (err) {
      console.error("Failed to fetch trainer:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const fetchTrainerTimeOff = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${baseURL_timeoff}time-off`);
      setTrainerTimeOffData(res.data);

    } catch (err) {
      console.error("Failed to fetch trainer:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL_timeoff]);

  const updateTrainerAvailabilityLockedIn = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}set_locked/`, updatedData);
      
      fetchTrainerAvailabilityLockedIn();
      fetchTrainerAvailabilityWeekly();
    } catch (err) {
      console.error("Failed to update trainer:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTrainerAvailabilityWeekly = async (updatedData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`${baseURL}set_weekly/`, updatedData);
  
      fetchTrainerAvailabilityLockedIn();
      fetchTrainerAvailabilityWeekly();
      
    } catch (err) {
      console.error("Failed to update trainer:", err);
    } finally {
      setLoading(false);
    }
  };


  const updateTrainerTimeOff = async (updatedData) => {
    setLoading(true);
    
    try {
      const response = await axiosInstance.post(`${baseURL_timeoff}time-off`, updatedData);
      
      fetchTrainerTimeOff();
    } catch (err) {
      console.error("Failed to update trainer:", err);
    } finally {
      setLoading(false);
    }
  };

    
  useEffect(() => {
    if (user ) {
      fetchTrainerAvailabilityLockedIn();
      fetchTrainerAvailabilityWeekly();
      fetchTrainerTimeOff();
    }
  }, []);

  return (
    <TrainerAvailabilityContext.Provider
      value={{
        trainerLockedData,
        trainerWeeklyData,
        trainerTimeOffData,
        fetchTrainerAvailabilityLockedIn,
        fetchTrainerAvailabilityWeekly,
        fetchTrainerTimeOff,
        updateTrainerAvailabilityLockedIn,
        updateTrainerAvailabilityWeekly,
        updateTrainerTimeOff
      }}
    >
      {children}
    </TrainerAvailabilityContext.Provider>
  );
};
