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

const TrainerAccountContext = createContext();
export const useTrainerAccounts = () => useContext(TrainerAccountContext);

export const TrainerAccountProvider = ({ children }) => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useLogin();

  const baseURL = `${BASE_API_URL}/trainer/trainer-account/`;

  const fetchTrainer = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(baseURL);
      setTrainer(res.data);
    } catch (err) {
      console.error("Failed to fetch trainer:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const createTrainer = async (trainerData) => {
    try {
      const res = await axiosInstance.post(baseURL, trainerData);
      await fetchTrainer();
      return res.data;
    } catch (err) {
      console.error("Trainer creation failed:", err);
      throw err;
    }
  };

  const updateTrainer = async (updatedData) => {
    try {
      const res = await axiosInstance.patch(baseURL, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTrainer(res.data);
      return res.data;
    } catch (err) {
      console.error("Trainer update failed:", err.response?.data || err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTrainer();
    }
  }, [user, fetchTrainer]);

  return (
    <TrainerAccountContext.Provider
      value={{
        trainer,
        loading,
        fetchTrainer,
        createTrainer,
        updateTrainer,
      }}
    >
      {children}
    </TrainerAccountContext.Provider>
  );
};
