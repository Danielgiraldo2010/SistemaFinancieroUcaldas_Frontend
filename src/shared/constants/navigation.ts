export interface MenuItem {
  label: string;
  icon: string;
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
];
