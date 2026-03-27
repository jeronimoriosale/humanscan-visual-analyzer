export type RiskLevel = 'Bajo' | 'Medio' | 'Alto' | 'Emergencia';

export type ScanType = 'skin' | 'ocular';

export type SpecialistType = 'Dermatólogo' | 'Oftalmólogo' | 'Médico General';

export interface AnalysisResult {
  id: string;
  timestamp: number;
  scanType: ScanType;
  imageUri: string;
  descripcion_tecnica: string;
  hallazgos_principales: string[];
  triaje_riesgo: RiskLevel;
  analisis_abcde_detalle: string;
  especialista_recomendado: SpecialistType;
  guia_de_consulta: string[];
  pasos_a_seguir: string;
  aviso_legal: string;
}

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  scanType: ScanType;
  imageUri: string;
  riskLevel: RiskLevel;
  summary: string;
}
