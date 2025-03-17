// composables/useMedicalProcedureSchema.js

export const useProcedureData = (tratamiento) => {
    const generateProcedureData = () => {
        // Verifica si hay error o si los datos no están disponibles
        if (!tratamiento.value) {
            console.error('Error al cargar los datos de la cirugía o los datos no están disponibles.');
            return null;
        }

        return {
            "@context": "https://schema.org",
            "@type": tratamiento.value.acf.datos.type,
            "name": tratamiento.value.acf.datos.name,
            "description": tratamiento.value.acf.datos.description,
            "bodyLocation": tratamiento.value.acf.datos.bodylocation,
            "howPerformed": tratamiento.value.acf.datos.howperformed,
            "preparation": tratamiento.value.acf.datos.preparation,
            "followup": tratamiento.value.acf.datos.followup,
            "procedureType": tratamiento.value.acf.datos.procedureType,
            "status": "Active",
        };
    };

    return { generateProcedureData };
};
