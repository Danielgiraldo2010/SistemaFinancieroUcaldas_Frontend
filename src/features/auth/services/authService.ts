export async function verifyTwoFactor(code: string) {
  try {
    // Si tienes token previo (por ejemplo de registro o login simulado)
    const token = localStorage.getItem('token');

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/Authentication/verify-2fa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Solo incluye Authorization si tienes un token previo
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Código inválido o sesión expirada');
    }

    const data = await response.json();

    // Guarda el accessToken y refreshToken en localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data; // Puedes usar data.user si viene info del usuario
  } catch (error) {
    console.error('Error verifyTwoFactor:', error);
    throw error;
  }
}
