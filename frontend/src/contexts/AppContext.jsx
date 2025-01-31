import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createLink,
  updateLink,
  deleteLink,
  fetchAllLinks,
} from "./../services/appService";
import { formatDate } from "../utils/dateUtils";
import useMobile from "./../hooks/useMobile";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const isMobile = useMobile();
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const limit = 10;

  const fetchData = useCallback(async (page = 1) => {
    try {
      const response = await fetchAllLinks(page, limit);
      setLinks(response.links);
      setPagination(response.pagination);
      filterLinks(response.links, searchTerm);
    } catch {
      throw new Error("Failed to fetch links");
    }
  }, []);

  const filterLinks = (links, term) => {
    if (!term) {
      setFilteredLinks(links);
    } else {
      const filtered = links.filter((link) =>
        link.remarks.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredLinks(filtered);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [fetchData, pagination.currentPage]);

  useEffect(() => {
    filterLinks(links, searchTerm);
  }, [links, searchTerm]);

  // Create new link
  const createNewLink = async (linkData) => {
    try {
      const response = await createLink(linkData);
      fetchData(pagination.currentPage);
      return response;
    } catch (error) {
      throw new Error(error?.message || "Failed to create link");
    }
  };

  // Update link by id
  const updateLinkById = async (id, linkData) => {
    try {
      const response = await updateLink(id, linkData);
      return response;
    } catch (error) {
      throw new Error(error?.message || "Failed to update link");
    }
  };

  // Delete link by id
  const deleteLinkById = async (id) => {
    try {
      await deleteLink(id);
      fetchData(pagination.currentPage);
    } catch (error) {
      throw new Error(error?.message || "Failed to delete link");
    }
  };

  const refetch = () => {
    fetchData(pagination.currentPage);
  };

  const handlePageChange = (page) => {
    if (
      page >= 1 &&
      page <= pagination.totalPages &&
      page !== pagination.currentPage
    ) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  return (
    <AppContext.Provider
      value={{
        links: filteredLinks,
        pagination,
        handlePageChange,
        fetchData,
        refetch,
        createNewLink,
        updateLinkById,
        deleteLinkById,
        searchTerm,
        setSearchTerm,
        isMobile,
        formatDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useApp };
