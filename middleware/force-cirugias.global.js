export default function ({ path, query, hash }) {
  // Ignorar el middleware para archivos .xml
  if (path.endsWith(".xml")) {
    return;
  }
  
  let nextPath = path;

  // Verificar si la ruta actual es una ruta de promoción
  const isPromotionPath = path.startsWith('/promocion/');

  if (nextPath.endsWith('/false') || nextPath.endsWith('/false/')) {
    nextPath = nextPath.replace(/\/false\/?$/, '');
  } else {
    const encodedTestPattern = /%E2%80%9Dhttps:\/\/www\.test\.clinicaegos\.com\//;
    nextPath = nextPath.replace(encodedTestPattern, '');
    const encodedDomainPattern = /%E2%80%9Dhttps:\/\/www\.clinicaegos\.com\//;
    nextPath = nextPath.replace(encodedDomainPattern, '');
    const encodedDoubleQuoteSlashPattern = /%22\/$/;
    nextPath = nextPath.replace(encodedDoubleQuoteSlashPattern, '');
    const encodedQuotesSlashPattern = /%E2%80%9D\/$/;
    nextPath = nextPath.replace(encodedQuotesSlashPattern, '');

    if (!isPromotionPath) {
      // Solo aplicar estas redirecciones si no estamos en una ruta de promoción
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
      } else if (nextPath.includes('/cirugia-mamaria/')) {
        nextPath = nextPath.replace('/cirugia-mamaria/', '/cirugia-de-pechos/');
      } else if (nextPath.includes('/cirugia-bariatrica/')) {
        nextPath = nextPath.replace('/cirugia-bariatrica/', '/obesidad/');
      }
    }

    if (!nextPath.endsWith('/') && !isPromotionPath) {
      nextPath += '/';
    }
  }

  const normalizedPath = path.replace(/\/false\/?$/, '');
  if (nextPath !== normalizedPath) {
    const nextRoute = { path: nextPath, query, hash };
    return navigateTo(nextRoute, { redirectCode: 308 });
  }
}
