export interface MenuItem {
  label: string;
  icon: string;
<<<<<<< HEAD
  path: string;
}

export const SECRETARY_MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
  },
  {
    label: 'Proyectos',
    icon: '📁',
    path: '/dashboard/projects',
  },
  {
    label: 'Reportes',
    icon: '📈',
    path: '/dashboard/reports',
  },
  {
    label: 'Configuración',
    icon: '⚙️',
    path: '/dashboard/settings',
  },
=======
  active?: boolean;
}

export const SECRETARY_MENU: MenuItem[] = [
  { label: 'Resumen Global', icon: '📊', active: true },
  { label: 'Gestión de Ingresos', icon: '📈', active: false },
  { label: 'Gastos y Ejecución', icon: '💰', active: false },
  { label: 'Nómina', icon: '👥', active: false },
  { label: 'Normatividad BPMN', icon: '📋', active: false },
  { label: 'Auditoría Reforzada', icon: '🛡️', active: false },
>>>>>>> main
];
