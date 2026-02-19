import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  percentage?: string;
  isCritical?: boolean;
  /* * TODO: Refactorización pendiente.
   * Actualmente el componente está acoplado al dominio financiero (budget, executed, etc.).
   * Para escalar a otros módulos (Nómina, Auditoría), se recomienda desacoplar
   * y pasar los estilos (icon, color, bg) como props genéricas.
   */
  type?: 'budget' | 'executed' | 'available' | 'alerts';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  percentage,
  isCritical = false,
  type = 'budget',
}) => {
  /**
   * CONFIGURACIÓN DE DOMINIO - CAPA FINANCIERA
   * Nota: Este objeto contiene lógica de negocio específica para el Dashboard de Secretaría.
   * Si se generaliza el componente, esta lógica debería vivir en un archivo de constantes
   * o ser inyectada desde el padre.
   */
  const config = {
    budget: {
      icon: '💰',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      trendColor: 'text-emerald-500',
    },
    executed: {
      icon: '📈',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      trendColor: 'text-emerald-500',
    },
    available: {
      icon: '🪙',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      trendColor: 'text-amber-500',
    },
    alerts: {
      icon: '⚠️',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      trendColor: 'text-rose-500',
    },
  };

  const { icon, color, bg, trendColor } = config[type as keyof typeof config] || config.budget;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center text-xl shadow-inner`}
        >
          {icon}
        </div>

        {!isCritical && (
          <span
            className={`text-xs font-bold ${trendColor} flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg`}
          >
            {type === 'available' ? '📉' : '📈'} {trend?.split(' ')[0]}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>

        {percentage && (
          <p className="text-[10px] font-medium text-emerald-500 mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {percentage}
          </p>
        )}

        {trend && !percentage && (
          <p
            className={`text-[10px] font-medium ${isCritical ? 'text-rose-500' : 'text-slate-400'} mt-2 italic`}
          >
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};
