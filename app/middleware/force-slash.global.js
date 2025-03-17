// middleware/force-slash.global.js

export default function ({ path, query, hash }) {
  // Excluir rutas que terminen en .xml (o cualquier otro formato de archivo que desees excluir)
  if (path.endsWith(".xml")) {
    return;
  }

  // Verificar si el path NO es la raíz y NO termina con una barra
  if (path !== "/" && !path.endsWith("/")) {
    const nextPath = `${path}/`; // Añadir la barra al final
    const nextRoute = { path: nextPath, query, hash };

    // 308 Permanent Redirect
    return navigateTo(nextRoute, { redirectCode: 308 });
  }
}
