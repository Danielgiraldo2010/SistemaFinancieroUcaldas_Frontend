
# 💼 SAPFIAI — Sistema de Administración Financiera

![Next.js](https://img.shields.io/badge/Next.js-16.x-000000)
![React](https://img.shields.io/badge/React-19.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---


## 📋 Descripción

**SAPFIAI** es una plataforma web SPA desarrollada con **Next.js + React + TypeScript**, orientada a la administración financiera y de seguridad, consumiendo una API backend bajo arquitectura limpia.

El proyecto implementa:

- Arquitectura modular por features
- Separación de responsabilidades (core, infraestructura, presentación)
- Tipado estricto con TypeScript
- Escalabilidad y mantenibilidad
- Buenas prácticas de desarrollo

Actualmente está desplegado en **Vercel** para producción.

---

## 🌍 Demo en Producción

```
https://sapfiai.vercel.app
```

---

## ✨ Características

- ⚛️ Modularidad por funcionalidades
- 🔐 Autenticación JWT + 2FA, protección de rutas
- 📊 Dashboard financiero interactivo
- 🛡️ Gestión de seguridad (IPs bloqueadas, logs de auditoría)
- 🌐 Consumo de API REST (backend .NET/Clean Architecture)
- 🧩 Componentes reutilizables
- 🧠 Tipado fuerte con TypeScript
- 🔎 ESLint configurado
- 🚀 Optimización con Next.js y TailwindCSS
- ☁️ Despliegue automático en Vercel

---

## 🛠️ Stack Tecnológico

| Tecnología      | Uso                        |
|----------------|-----------------------------|
| Next.js 16     | Framework React + SSR/SSG   |
| React 19       | Librería de UI              |
| TypeScript 5   | Tipado estático             |
| TailwindCSS 3  | Estilos utilitarios         |
| Axios          | Consumo de API REST         |
| ESLint         | Calidad de código           |
| Zustand        | State management            |
| Vercel         | Hosting y despliegue        |

---

## 🏗️ Estructura del Proyecto

```
sapfiai/
├── src/
│   ├── app/                # Entrypoint, layouts, páginas, rutas Next.js
│   │   ├── (auth)/         # Módulo de autenticación (login, 2FA, recuperación)
│   │   ├── (dashboard)/    # Dashboard, auditoría, perfil, seguridad, settings
│   │   └── api/proxy/      # Proxy para requests backend
│   ├── core/               # Dominios, entidades, tipos, interfaces
│   ├── infrastructure/     # Servicios API, guards, token manager, http client
│   ├── presentation/       # Componentes, hooks, store, utilidades
│   └── globals.css         # Estilos globales
├── public/                 # Recursos estáticos
├── package.json            # Configuración y dependencias
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.ts      # Configuración TailwindCSS
├── eslint.config.mjs       # Configuración ESLint
└── README.md               # Documentación
```

---

## 🔐 Módulo de Autenticación

- Formulario de login
- Validaciones de campos
- Manejo de token JWT y refresh
- Protección de rutas privadas (AuthGuard)
- Interceptores para requests autenticadas
- Soporte para 2FA (verificación de código)
- Recuperación de contraseña

---

## 📊 Módulo Dashboard

- Visualización de métricas financieras
- Integración con endpoints protegidos
- Registro de actividad (audit logs)
- Gestión de perfil de usuario
- Seguridad: listado y desbloqueo de IPs
- Estructura escalable para reportes y estadísticas

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sapfiai.git
```

### 2️⃣ Entrar al proyecto

```bash
cd sapfiai
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Aplicación disponible en:

```
http://localhost:3000
```

---

## ⚙️ Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_API_URL=https://localhost:5001/api
```

En producción (Vercel), configurar la variable desde:

```
Project Settings → Environment Variables
```

Acceso desde el código:

```ts
process.env.NEXT_PUBLIC_API_URL
```

---

## ☁️ Despliegue en Vercel

El proyecto está configurado para despliegue automático conectado al repositorio de GitHub.

Configuración utilizada:

- Framework: Next.js
- Build Command:

```bash
npm run build
```

- Output Directory:

```
.next
```

Cada push a la rama `main` genera un nuevo despliegue automático en Vercel.

---

## 🌿 Estrategia de Ramas

- `main` → Rama estable
- `feat/auth` → Desarrollo del módulo de autenticación
- `feat/dashboard` → Desarrollo del dashboard financiero
- `feat/security` → Desarrollo de seguridad y auditoría

Cada funcionalidad se desarrolla en ramas independientes y se integra mediante Pull Request.

---

## 🔄 Integración con Backend

El frontend está diseñado para integrarse con un backend desarrollado bajo:

- ASP.NET Core (Clean Architecture)
- Entity Framework Core
- CQRS + MediatR
- Endpoints protegidos con autenticación

Se mantiene una separación clara entre:

- UI
- Lógica de presentación
- Servicios de infraestructura (API)

---

## 📦 Build para Producción

```bash
npm run build
```

Se genera la carpeta:

```
.next
```

Para previsualizar el build:

```bash
npm run start
```

---

## 📄 Licencia

Proyecto bajo licencia MIT.
