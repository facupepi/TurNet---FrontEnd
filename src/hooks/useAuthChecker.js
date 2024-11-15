// Importa constantes y configuraciones comunes utilizadas en las peticiones a la API
import { API_BASE_URL, REQUEST_OPTIONS } from "../utils/const";

// Importa el contexto global del usuario para acceder y modificar su estado
import { UserContext } from "../contexts/userContext";

// Importa el hook `useContext` para interactuar con `UserContext`
import { useContext } from "react";

// Define un *custom hook* llamado `useAuthChecker` que devuelve una función para verificar la autenticación
const useAuthChecker = () => {
  // Extrae los métodos del contexto del usuario que permiten modificar su estado
  const { setUser, setIsTokenValid, setIsAdmin } = useContext(UserContext);

  // Función que realiza la verificación de autenticación
  const checkAuth = async () => {
    // Realiza una solicitud a la API para comprobar la autenticación del usuario
    fetch(`${API_BASE_URL}/auth`, {
      ...REQUEST_OPTIONS, // Incluye las opciones básicas definidas en `REQUEST_OPTIONS`
      credentials: 'include' // Incluye cookies (como `httpOnly`) en la solicitud
    })
      .then(response => {
        if (response.ok) {
          // Si la respuesta es satisfactoria, la convierte a JSON
          return response.json();
        } else {
          // Si no, lanza un error para manejar el flujo de rechazo
          throw new Error('Usuario no autenticado');
        }
      })
      .then(result => {
        // Actualiza el estado del usuario en el contexto si la autenticación es exitosa
        setUser(result); // Guarda los datos del usuario autenticado

        // Determina si el usuario es administrador basado en su rol
        setIsAdmin(result.role === 'admin'); // Devuelve `true` si el rol es "admin", `false` en caso contrario

        // Marca el token como válido en el estado global
        setIsTokenValid(true);
      })
      .catch(error => {
        // Maneja errores en caso de que la autenticación falle (error de red, token inválido, etc.)
        console.error('Error al verificar la autenticación:', error);

        // Resetea los estados relacionados con el usuario para indicar que no está autenticado
        setUser(null); // Limpia el estado del usuario
        setIsAdmin(false); // Indica que no es administrador
        setIsTokenValid(false); // Marca el token como no válido
      });
  };

  // Retorna la función `checkAuth` para que pueda ser utilizada en otros componentes
  return checkAuth;
};

// Exporta el *custom hook* para que otros componentes puedan utilizarlo
export default useAuthChecker;
