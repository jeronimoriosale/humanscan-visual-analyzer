import { generateObject } from '@rork-ai/toolkit-sdk';
import { z } from 'zod';
import { AnalysisResult, ScanType } from '@/types/analysis';

const analysisSchema = z.object({
  descripcion_tecnica: z.string().describe('Descripción objetiva de la zona analizada (morfología, coloración, distribución).'),
  hallazgos_principales: z.array(z.string()).describe('Lista de condiciones potenciales identificadas'),
  triaje_riesgo: z.enum(['Bajo', 'Medio', 'Alto', 'Emergencia']).describe('Nivel de riesgo del triaje'),
  analisis_abcde_detalle: z.string().describe('Análisis ABCDE específico para lunares, o N/A si no aplica'),
  especialista_recomendado: z.enum(['Dermatólogo', 'Oftalmólogo', 'Médico General']).describe('Tipo de especialista recomendado'),
  guia_de_consulta: z.array(z.string()).min(3).max(3).describe('3 preguntas específicas que el usuario debe hacerle al médico'),
  pasos_a_seguir: z.string().describe('Instrucciones preventivas detalladas'),
  aviso_legal: z.string().describe('Aviso legal obligatorio'),
});

const SKIN_ANALYSIS_PROMPT = `Actúas como un asistente avanzado de análisis visual para la salud humana, especializado en la detección preliminar de afecciones dermatológicas.

Tu misión es analizar la imagen proporcionada y generar un reporte técnico y orientativo sobre hallazgos visuales. Debes categorizar la gravedad de lo observado.

Instrucciones de Análisis:
1. Evaluación de Lesiones (ABCDE): Ante manchas o lunares, analiza: Asimetría, Bordes (regulares/irregulares), Color (homogéneo/múltiple), Diámetro y Evolución visual.
2. Identificación de Patrones: Busca signos de inflamación, infecciones fúngicas, reacciones alérgicas cutáneas, acné, dermatitis, psoriasis, u otras anomalías.
3. Si la imagen no es clara o no muestra piel, indica que no es apta para análisis.

IMPORTANTE: Mantén un tono clínico, empático y cauteloso. NO uses lenguaje determinista (ej. "Usted tiene..."); usa lenguaje de probabilidad (ej. "Los hallazgos son compatibles con...", "Se observan características que podrían sugerir...").

El aviso_legal SIEMPRE debe ser: "ESTA HERRAMIENTA NO PROPORCIONA UN DIAGNÓSTICO MÉDICO. Su propósito es puramente informativo y educativo. Es obligatorio consultar a un médico para obtener un diagnóstico y tratamiento profesional."`;

const OCULAR_ANALYSIS_PROMPT = `Actúas como un asistente avanzado de análisis visual para la salud humana, especializado en la detección preliminar de afecciones oculares.

Tu misión es analizar la imagen del ojo proporcionada y generar un reporte técnico y orientativo sobre hallazgos visuales. Debes categorizar la gravedad de lo observado.

Instrucciones de Análisis:
1. Examina la conjuntiva, esclerótica, iris, pupila y párpados visibles.
2. Busca signos de: enrojecimiento, inflamación, secreciones, pterigión, cataratas visibles, asimetría pupilar, coloración anormal.
3. Si la imagen no es clara o no muestra el ojo correctamente, indica que no es apta para análisis.

IMPORTANTE: Mantén un tono clínico, empático y cauteloso. NO uses lenguaje determinista; usa lenguaje de probabilidad.

Para análisis_abcde_detalle, responde "N/A - Criterio específico para lesiones cutáneas".

El aviso_legal SIEMPRE debe ser: "ESTA HERRAMIENTA NO PROPORCIONA UN DIAGNÓSTICO MÉDICO. Su propósito es puramente informativo y educativo. Es obligatorio consultar a un médico para obtener un diagnóstico y tratamiento profesional."`;

export async function analyzeImage(
  imageBase64: string,
  scanType: ScanType
): Promise<Omit<AnalysisResult, 'id' | 'timestamp' | 'scanType' | 'imageUri'>> {
  const prompt = scanType === 'skin' ? SKIN_ANALYSIS_PROMPT : OCULAR_ANALYSIS_PROMPT;
  
  console.log('[AnalysisService] Starting analysis for:', scanType);
  console.log('[AnalysisService] Image base64 length:', imageBase64.length);
  
  try {
    const result = await generateObject({
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image: imageBase64 },
          ],
        },
      ],
      schema: analysisSchema,
    });
    
    console.log('[AnalysisService] Analysis complete:', result);
    return result;
  } catch (error) {
    console.error('[AnalysisService] Error analyzing image:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('offline') || errorMessage.includes('OFFLINE')) {
      throw new Error('El servicio de análisis está temporalmente no disponible. Por favor, intenta de nuevo en unos minutos.');
    }
    
    if (errorMessage.includes('network') || errorMessage.includes('Network')) {
      throw new Error('Error de conexión. Verifica tu conexión a internet e intenta de nuevo.');
    }
    
    throw new Error('No se pudo completar el análisis. Por favor, intenta de nuevo.');
  }
}
