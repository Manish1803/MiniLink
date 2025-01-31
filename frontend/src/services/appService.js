import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/app`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchAllLinks = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/links`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to fetch links");
  }
};

export const fetchAnalytics = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/analytics`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// LINKS SERVICE
export const createLink = async (linkData) => {
  try {
    const response = await axios.post(`${BASE_URL}/link`, linkData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getLink = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/link/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateLink = async (id, linkData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/link/${id}`, linkData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteLink = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/link/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
