import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';

const rules = [
  { label: 'Mínimo 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Al menos una mayúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Al menos un número', test: (p: string) => /\d/.test(p) },
  { label: 'Al menos un carácter especial (!@#$...)', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const ChangePassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allRulesPassed = rules.every((r) => r.test(newPassword));

  const handleVerify = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPassword) {
      setMessageType('error');
      setMessage('Ingresa tu contraseña actual.');
      return;
    }

    // Pendiente integrar validación real con backend.
    // Ejemplo de integración:
    // try {
    //   await authService.verifyPassword({ currentPassword });
    //   setMessage('');
    //   setStep(2);
    // } catch (error) {
    //   setMessageType('error');
    //   setMessage('Contraseña incorrecta. Intenta de nuevo.');
    // }

    // Simulación temporal - remover cuando el backend esté listo
    setMessage('');
    setStep(2);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allRulesPassed) {
      setMessageType('error');
      setMessage('La contraseña no cumple todos los requisitos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessageType('error');
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    // Pendiente integrar cambio real de contraseña con backend.
    // Ejemplo de integración:
    // try {
    //   await authService.changePassword({ currentPassword, newPassword });
    //   setMessageType('success');
    //   setMessage('✅ Contraseña cambiada correctamente.');
    //   setIsSubmitting(false);
    // } catch (error) {
    //   setMessageType('error');
    //   setMessage('Error al cambiar la contraseña. Intenta de nuevo.');
    //   setIsSubmitting(false);
    // }

    // Simulación temporal - remover cuando el backend esté listo
    setTimeout(() => {
      setMessageType('success');
      setMessage('✅ Contraseña cambiada correctamente.');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Encabezado con logo institucional */}
      <div className="flex flex-col items-center gap-2 mb-1">
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/images/logo1ucaldas.png"
            alt="Logo Universidad de Caldas"
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
          />
          <p className="text-[10px] text-[#d5bb87] font-semibold tracking-wide uppercase">
            Universidad de Caldas
          </p>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 text-center mt-1">
          {step === 1 ? 'Verifica tu identidad' : 'Nueva contraseña'}
        </h2>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          {step === 1
            ? 'Para continuar, primero debes verificar tu identidad.'
            : 'Elige una contraseña segura y no la uses en otros sitios.'}
        </p>
      </div>

      {/* PASO 1 - Verificar identidad */}
      {step === 1 && (
        <form onSubmit={handleVerify} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="current-password" className="text-sm text-gray-600 font-medium">
              Contraseña actual
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {message && <p className="text-sm text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-[#003e70] hover:bg-[#00284d] text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-1"
          >
            Siguiente
          </button>
        </form>
      )}

      {/* PASO 2 - Nueva contraseña */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="new-password" className="text-sm text-gray-600 font-medium">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Indicador de requisitos en tiempo real */}
            {newPassword.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1.5 mt-1">
                {rules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-2">
                    {rule.test(newPassword) ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={`text-xs ${rule.test(newPassword) ? 'text-green-600' : 'text-gray-400'}`}>
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-sm text-gray-600 font-medium">
              Confirma la contraseña
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-red-500 mt-0.5">Las contraseñas no coinciden.</p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-xs text-green-600 mt-0.5">✓ Las contraseñas coinciden.</p>
            )}
          </div>

          {message && (
            <p className={`text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setMessage('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !allRulesPassed || newPassword !== confirmPassword}
              className="flex-1 bg-[#003e70] hover:bg-[#00284d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              {isSubmitting ? 'Cambiando...' : 'Cambiar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;