
export enum PatientStatus {
  STABLE = 'Estável',
  CRITICAL = 'Crítico',
  OBSERVATION = 'Observação',
  DISCHARGED = 'Alta'
}

export enum ReligiousAffiliation {
  CATHOLIC = 'Católico',
  EVANGELICAL = 'Evangélico',
  SPIRITIST = 'Espírita',
  NONE = 'Nenhuma',
  OTHER = 'Outra'
}

/* Fix: Added missing enums and interfaces used across the app */
export enum UserRole {
  ADMIN = 'ADMIN',
  CHAPLAIN = 'CHAPLAIN'
}

export enum Unit {
  HAB = 'HAB',
  HABA = 'HABA'
}

export enum RecordStatus {
  INICIO = 'Início',
  CONTINUACAO = 'Continuação',
  TERMINO = 'Término'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  profilePic?: string;
}

export interface Config {
  id?: string;
  muralText: string;
  headerLine1: string;
  headerLine2: string;
  headerLine3: string;
  fontSize1: number;
  fontSize2: number;
  fontSize3: number;
  reportLogoWidth: number;
  reportLogoX: number;
  reportLogoY: number;
  headerLine1X: number;
  headerLine1Y: number;
  headerLine2X: number;
  headerLine2Y: number;
  headerLine3X: number;
  headerLine3Y: number;
  headerPaddingTop: number;
  headerTextAlign: 'left' | 'center' | 'right';
  primaryColor: string;
  appLogoUrl?: string;
  reportLogoUrl?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
}

export interface Patient {
  id: string;
  name: string;
  bed: string;
  sector: string;
  status: PatientStatus;
  religion: ReligiousAffiliation;
  admissionDate: string;
  lastVisit?: string;
}

export interface Visit {
  id: string;
  patientId: string;
  chaplainName: string;
  date: string;
  summary: string;
  durationMinutes: number;
  spiritualNeedMet: boolean;
}

export interface DashboardStats {
  totalVisits: number;
  activePatients: number;
  urgentRequests: number;
  visitsPerSector: { sector: string; count: number }[];
}
