import React, { useState, useRef } from 'react';
import { verify2FA } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useTwoFactor } from '../hooks/useTwoFactor';

export const TwoFactorForm: React.FC = () => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const tempToken = useAuthStore((state) => state.tempToken);
  const setToken = useAuthStore((state) => state.setToken);

  const navigate = useNavigate();
  const totalTime = 300;
  const { seconds, expired } = useTwoFactor(totalTime);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = seconds / totalTime;
  const strokeDashoffset = circumference * (1 - progress);

  const formattedTime = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  const focusInput = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const handleDigitChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 5) focusInput(index + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = digits.join('');

    if (!tempToken) {
      setError('Debes iniciar sesión nuevamente.');
      return;
    }

    if (code.length !== 6) {
      setError('Ingresa los 6 dígitos.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await verify2FA({
        code,
        token: tempToken,
      });

      if (!response.success) {
        setError(response.message || 'Código incorrecto.');
        return;
      }

      setToken(response.token);
      navigate('/dashboard');
    } catch {
      setError('Error al verificar el código.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
      {/* Temporizador dinámico */}
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 transform -rotate-90">
          <circle cx="56" cy="56" r={radius} stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#b45309"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-gray-800">{formattedTime}</span>
          <span className="text-xs text-gray-500">restantes</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            placeholder="•"
            id={`digit-${index}`} // ← agregamos id único
            name={`digit-${index}`} // ← agregamos name único
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleDigitChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-14 h-16 border border-gray-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={expired || loading}
        className="w-full bg-yellow-700 hover:bg-yellow-800 text-white py-3 rounded-lg transition font-medium disabled:opacity-50"
      >
        {loading ? 'Verificando...' : 'Verificar e Ingresar'}
      </button>
    </form>
  );
};
