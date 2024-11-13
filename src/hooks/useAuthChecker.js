import { API_BASE_URL, REQUEST_OPTIONS } from "../utils/const";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

const useAuthChecker = () => {
  const { setUser, setIsTokenValid } = useContext(UserContext);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        ...REQUEST_OPTIONS,
        credentials: 'include' // Incluye las cookies en la solicitud
      });
      if (response.ok) {
        const result = await response.json();
        setUser(result);
        setIsTokenValid(true);
      } else {
        setUser(null);
        setIsTokenValid(false);
      }
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      setUser(null);
      setIsTokenValid(false);
    }
  };

  return checkAuth;
};

export default useAuthChecker;