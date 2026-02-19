export interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
}

export const SECRETARY_MENU: MenuItem[] = [
  { label: 'Resumen Global', icon: '📊', active: true },
  { label: 'Gestión de Ingresos', icon: '📈', active: false },
  { label: 'Gastos y Ejecución', icon: '💰', active: false },
  { label: 'Nómina', icon: '👥', active: false },
  { label: 'Normatividad BPMN', icon: '📋', active: false },
  { label: 'Auditoría Reforzada', icon: '🛡️', active: false },
];
