// middleware/force-cirugias.global.js
export default function ({ path, query, hash }) {
  let nextPath = path;

  // Eliminar '/false' o '/false/' al final de cualquier ruta
  if (nextPath.endsWith('/false') || nextPath.endsWith('/false/')) {
    nextPath = nextPath.replace(/\/false\/?$/, '');
  } else {
    // Eliminar el patrón específico que incluye las comillas tipográficas codificadas
    // seguido de "https://www.test.clinicaegos.com/"
    const encodedTestPattern = /%E2%80%9Dhttps:\/\/www\.test\.clinicaegos\.com\//;
    nextPath = nextPath.replace(encodedTestPattern, '');
    const encodedDomainPattern = /%E2%80%9Dhttps:\/\/www\.clinicaegos\.com\//;
    nextPath = nextPath.replace(encodedDomainPattern, '');
    const encodedDoubleQuoteSlashPattern = /%22\/$/;
    nextPath = nextPath.replace(encodedDoubleQuoteSlashPattern, '');
    const encodedQuotesSlashPattern = /%E2%80%9D\/$/;
    nextPath = nextPath.replace(encodedQuotesSlashPattern, '');


    // https://www.clinicaegos.com/estetica-corporal/lifting-de-muslos/”https:/www.clinicaegos.com/”/

    // Reemplazos basados en contenido específico de la ruta
    if (nextPath.includes('/facial/')) {
      nextPath = nextPath.replace('/facial/', '/estetica-facial/');
    } else if (nextPath.includes('/cirugia-facial/')) {
      nextPath = nextPath.replace('/cirugia-facial/', '/estetica-facial/');
    } else if (nextPath.includes('/corporal/')) {
      nextPath = nextPath.replace('/corporal/', '/estetica-corporal/');
    } else if (nextPath.includes('/intima/')) {
      nextPath = nextPath.replace('/intima/', '/cirugia-intima/');
    } else if (nextPath.includes('/pechos/')) {
      nextPath = nextPath.replace('/pechos/', '/cirugia-de-pechos/');
    } else if (nextPath.includes('/cirugia-bariatrica/')) {
      nextPath = nextPath.replace('/cirugia-bariatrica/', '/obesidad/');
    }

    // Asegurar que todas las URLs válidas terminen con una barra, excepto cuando se maneja '/false'
    if (!nextPath.endsWith('/')) {
      nextPath += '/';
    }
  }

  // Comparar el camino original con el nuevo, ignorando '/false' para evitar redirecciones infinitas
  const normalizedPath = path.replace(/\/false\/?$/, '');
  if (nextPath !== normalizedPath) {
    // Si después de la normalización y la limpieza, el nextPath es diferente,
    // realizar la redirección a nextPath
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 308 });
  }
}
