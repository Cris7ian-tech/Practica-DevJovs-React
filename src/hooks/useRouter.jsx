import { useEffect, useState } from "react";


function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname); //identificar path actual, en que page estoy

  // Actualizamos el path actual cada vez que cambia la URL
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
      console.log("Cambio de url:", window.location.pathname)
    };

    window.addEventListener("popstate", handleLocationChange);
        //limpiamos efectos
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [])

  
  function navigateTo(path) {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return {
    currentPath,
    navigateTo
  }
}


export default useRouter