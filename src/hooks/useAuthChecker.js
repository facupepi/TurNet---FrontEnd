import { API_BASE_URL, REQUEST_OPTIONS } from "../utils/const";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

const useAuthChecker = () => {
  const { setUser, setIsTokenValid, setIsAdmin } = useContext(UserContext);
  
  const checkAuth = async () => {
    fetch(`${API_BASE_URL}/auth`, { 
      ...REQUEST_OPTIONS, 
      credentials: 'include' 
    })
    .then(response => {
      if (response.ok) return response.json();
      else throw new Error('Usuario no autenticado');
    })
    .then(result => {
      // Asegúrate de que todos los estados se actualicen de manera coherente
      setUser(result);
      //console.log(result.role);
      setIsAdmin(result.role === 'admin'); // Comparación estricta y clara
      setIsTokenValid(true);
    })
    .catch(error => {
      console.error('Error al verificar la autenticación:', error);
      // Resetea el estado en caso de error de red u otro problema
      setUser(null);
      setIsAdmin(false);
      setIsTokenValid(false);
    });
  };

  return checkAuth;
};


export default useAuthChecker;