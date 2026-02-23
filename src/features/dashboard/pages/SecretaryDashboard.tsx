import { StatCard } from '@/shared/components/StatCard';
import { ProjectsTable } from '@/features/dashboard/components/ProjectsTable';

export const SecretaryDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Encabezado Dinámico */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Panel de Control Total
          </h1>
          <p className="text-slate-500 mt-1">
            Vista general del sistema financiero - Universidad de Caldas
          </p>
        </div>

        {/* Selector de Año */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 px-2 italic">Año Fiscal:</span>
          <select className="text-sm font-bold text-slate-700 bg-slate-50 rounded-lg px-3 py-1 outline-none border-none cursor-pointer">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>
      </div>

      {/* Grid de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Presupuesto Total"
          value="$3.020M"
          trend="+12.5% vs año anterior"
          type="budget"
        />
        <StatCard
          title="Ejecutado"
          value="$1.845M"
          percentage="61.1% de ejecución"
          type="executed"
        />
        <StatCard
          title="Disponible"
          value="$1.175M"
          percentage="38.9% remanente"
          type="available"
        />
        <StatCard
          title="Alertas Pendientes"
          value="7"
          trend="Requieren atención inmediata"
          isCritical={true}
          type="alerts"
        />
      </div>

      {/* Sección de la Tabla */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-800">Ingresos Discriminados por Proyecto</h3>
          <button className="px-6 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Exportar
          </button>
        </div>

        {/* Tabla de Proyectos */}
        <div className="w-full">
          <ProjectsTable />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
          <p className="italic text-xs text-slate-400">
            Sincronizado con API de .NET Core - Universidad de Caldas
          </p>
        </div>
      </div>
    </div>
  );
};
