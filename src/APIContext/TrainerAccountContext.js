import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import BASE_API_URL from "../Config/Config";
import { useLogin } from "./LoginContext";

const TrainerAccountContext = createContext();
export const useTrainerAccounts = () => useContext(TrainerAccountContext);

export const TrainerAccountProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useLogin();
  const baseURL = `${BASE_API_URL}/trainer/trainer-account/`;

  const getAuthConfig = () => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const fetchTrainers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseURL, getAuthConfig());
      setTrainers(res.data);
    } catch (err) {
      console.error("Failed to fetch trainers:", err);
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const getTrainerById = async (trainerId) => {
    try {
      const res = await axios.get(`${baseURL}${trainerId}/`, getAuthConfig());
      return res.data;
    } catch (err) {
      console.error(`Failed to get trainer ID ${trainerId}:`, err);
      return null;
    }
  };

  const createTrainer = async (trainerData) => {
    try {
      const res = await axios.post(baseURL, trainerData, getAuthConfig());
      await fetchTrainers();
      return res.data;
    } catch (err) {
      console.error("Trainer creation failed:", err);
      throw err;
    }
  };

  const updateTrainer = async (trainerId, updatedData) => {
    try {
      const res = await axios.patch(`${baseURL}${trainerId}/`, updatedData, getAuthConfig());
      await fetchTrainers();
      return res.data;
    } catch (err) {
      console.error("Trainer update failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTrainers();
    }
  }, [user, fetchTrainers]);

  return (
    <TrainerAccountContext.Provider
      value={{
        trainers,
        loading,
        fetchTrainers,
        createTrainer,
        updateTrainer,
        getTrainerById,
      }}
    >
      {children}
    </TrainerAccountContext.Provider>
  );
};
