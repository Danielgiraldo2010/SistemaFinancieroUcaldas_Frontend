# 💰 Sistema Financiero Ucaldas – Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 Descripción

El **Sistema Financiero Ucaldas – Frontend** es una aplicación SPA desarrollada con **React + TypeScript + Vite**, diseñada para consumir una API construida con **ASP.NET Core 8 bajo Clean Architecture**.

El proyecto sigue principios modernos de desarrollo frontend:

- Arquitectura modular por features  
- Separación de responsabilidades  
- Tipado estricto con TypeScript  
- Escalabilidad y mantenibilidad  
- Buenas prácticas de desarrollo  

Actualmente el proyecto está desplegado en **Vercel** para entorno de producción.

---

## 🌍 Demo en Producción

```
https://sistema-financiero-ucaldas-frontend.vercel.app
```

---

## ✨ Características

- ⚛️ Arquitectura modular por funcionalidades  
- 🔐 Sistema de autenticación con protección de rutas  
- 📊 Dashboard financiero interactivo  
- 🌐 Consumo de API REST (.NET 8 Backend)  
- 🧩 Componentes reutilizables  
- 🧠 Tipado fuerte con TypeScript  
- 🔎 ESLint configurado  
- 🚀 Optimización con Vite  
- ☁️ Despliegue automático en Vercel  

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|------|
| React 18 | Librería de UI |
| TypeScript 5 | Tipado estático |
| Vite 5 | Bundler y Dev Server |
| React Router | Manejo de rutas |
| Axios / Fetch | Consumo de API |
| ESLint | Calidad de código |
| Vercel | Hosting y despliegue |

---

## 🏗️ Estructura del Proyecto

```
SistemaFinancieroUcaldas_Frontend/
├── src/
│   ├── core/               # Configuración global, providers y rutas
│   ├── features/
│   │   ├── auth/           # Login y manejo de sesión
│   │   └── dashboard/      # Vista principal financiera
│   ├── components/         # Componentes reutilizables
│   ├── services/           # Comunicación con API
│   ├── types/              # Interfaces y tipos TypeScript
│   └── App.tsx
├── public/
└── vite.config.ts
```

---

## 🔐 Módulo de Autenticación

- Formulario de login  
- Validaciones de campos  
- Manejo de token JWT  
- Protección de rutas privadas  
- Interceptores para requests autenticadas  

---

## 📊 Módulo Dashboard

- Visualización de métricas financieras  
- Integración con endpoints protegidos  
- Componentes preparados para gráficos  
- Estructura escalable para reportes y estadísticas  

---

## 🚀 Instalación y Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Danielgiraldo2010/SistemaFinancieroUcaldas_Frontend.git
```

### 2️⃣ Entrar al proyecto

```bash
cd SistemaFinancieroUcaldas_Frontend
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
http://localhost:5173
```

---

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```
VITE_API_BASE_URL=https://localhost:5001/api
```

En producción (Vercel), configurar la variable desde:

```
Project Settings → Environment Variables
```

Acceso desde el código:

```ts
import.meta.env.VITE_API_BASE_URL
```

---

## ☁️ Despliegue en Vercel

El proyecto está configurado para despliegue automático conectado al repositorio de GitHub.

Configuración utilizada:

- Framework: Vite  
- Build Command:

```bash
npm run build
```

- Output Directory:

```
dist
```

Cada push a la rama `main` genera un nuevo despliegue automático en Vercel.

---

## 🌿 Estrategia de Ramas

- `main` → Rama estable  
- `feat/login` → Desarrollo del módulo de autenticación  
- `feat/dashboard` → Desarrollo del dashboard financiero  

Cada funcionalidad se desarrolla en ramas independientes y se integra mediante Pull Request.

---

## 🔄 Integración con Backend

El frontend está diseñado para integrarse con un backend desarrollado bajo:

- ASP.NET Core 8  
- Clean Architecture  
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
/dist
```

Para previsualizar el build:

```bash
npm run preview
```

---

## 📄 Licencia

Proyecto bajo licencia MIT.
