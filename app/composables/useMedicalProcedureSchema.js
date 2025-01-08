export const useAwardsSchema = () => {
    const procedure = [
        {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": "Cirugía de Pecho",
            "description": "La cirugía de pecho incluye procedimientos como el aumento, reducción y levantamiento de senos para mejorar la estética y funcionalidad de las mamas.",
            "bodyLocation": "Pecho",
            "howPerformed": "El procedimiento se realiza bajo anestesia general, mediante incisiones estratégicas para insertar implantes, eliminar tejido o elevar las mamas, dependiendo del objetivo del paciente.",
            "preparation": "El paciente debe realizarse análisis preoperatorios, suspender ciertos medicamentos y seguir las recomendaciones del cirujano sobre alimentación y cuidados previos.",
            "followup": "Se recomiendan visitas de control a la clínica en la primera semana, al mes y a los tres meses para evaluar la evolución y los resultados.",
            "procedureType": "Surgical",
            "status": "Active"
        }
    ];

    return { procedure };
};
