# Frontend de la Intranet

Este proyecto corresponde al **frontend de la intranet**, desarrollado con **React + Vite**.  
Permite la interacción del usuario con el sistema, gestionando productos, empleados, ventas y reportes a través de una interfaz moderna.


## 🚀 Tecnologías Utilizadas

- **React 18+**
- **Vite** como entorno de desarrollo rápido
- **React Router DOM** para la navegación entre páginas
- **Context API** para el manejo de autenticación y sesiones
- **Tailwind CSS** para el diseño y estilos
- **Axios / Fetch API** para la comunicación con el backend (Spring Boot)
- **JavaScript**
- **Node.js y npm** como entorno de ejecución y gestor de dependencias

---

## Estructura del Proyecto

```
frontend-tienda-ropa/
├── public/                       # Archivos estáticos públicos
├── src/
│   ├── assets/                   # Imágenes, íconos y recursos multimedia
│   ├── components/               # Componentes reutilizables
│   │   ├── MetodoPago.jsx
│   │   ├── ModalCategoria.jsx
│   │   ├── ModalEmpleado.jsx
│   │   ├── ModalProducto.jsx
│   │   ├── ModalProveedor.jsx
│   │   ├── PrivateRoute.jsx      # Protege rutas privadas (requiere autenticación)
│   │   └── Sidebar.jsx           # Menú lateral de navegación
│   ├── context/
│   │   └── AuthContext.jsx       # Contexto de autenticación global
│   ├── data/
│   │   ├── productos.js          # Datos simulados o conexión a la API de productos
│   │   └── usuario.js            # Datos de usuarios o funciones de login
│   ├── pages/                    # Vistas principales del sistema
│   │   ├── Configuracion.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Empleados.jsx
│   │   ├── GestionProveedores.jsx
│   │   ├── GestionUsuarios.jsx
│   │   ├── Login.jsx
│   │   ├── Productos.jsx
│   │   ├── ReporteVentas.jsx
│   │   ├── SignUp.jsx
│   │   └── Ventas.jsx
│   ├── styles/                   # Estilos CSS adicionales
│   │   └── App.css
│   ├── App.jsx                   # Componente raíz principal
│   ├── index.css                 # Estilos globales
│   ├── main.jsx                  # Punto de entrada de la aplicación React
│   └── vite.config.js            # Configuración de Vite
├── .eslintrc.cjs                 # Reglas de ESLint
├── .gitignore                    # Archivos y carpetas ignorados por Git
├── index.html                    # Plantilla base de la aplicación
├── package.json                  # Dependencias y scripts del proyecto
├── postcss.config.js             # Configuración de PostCSS
├── tailwind.config.js            # Configuración de Tailwind CSS
└── README.md                     # Documentación del proyecto
```

---

## Instalación y Configuración

1. **Clonar el repositorio**
   ```bash
    https://github.com/SH4M1R/frontend-fullstack/main
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (si aplica)**
   Crear un archivo `.env` en la raíz del proyecto con la URL del backend:

   ```
   VITE_API_URL=http://localhost:8500/api
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   Luego, abre en tu navegador:
   ```
   http://localhost:7500
   ```

5. **Generar versión de producción**
   ```bash
   npm run build
   ```

---

## 🧭 Navegación y Páginas Principales

| Página | Descripción |
|--------|--------------|
| `/login` | Inicio de sesión del usuario |
| `/signup` | Registro de nuevos usuarios |
| `/dashboard` | Panel general con estadísticas |
| `/productos` | Gestión de productos |
| `/empleados` | Mantenimiento de empleados |
| `/proveedores` | Gestión de proveedores |
| `/ventas` | Registro y reporte de ventas |
| `/configuracion` | Configuración del sistema |

---

## Estilos y Diseño

El diseño está implementado con **Tailwind CSS**, permitiendo un estilo responsivo, moderno y fácil de personalizar.  

---

## 🔗 Conexión con Backend

El frontend se comunica con el backend (Spring Boot) a través de peticiones HTTP usando `fetch` o `axios`.  


---

## Funcionalidades

- Inicio de sesión y registro de usuarios  
- Gestión de productos, empleados y proveedores  
- Control de ventas y reportes  
- Validación de formularios  
- Diseño adaptativo con Tailwind CSS  
- Integración con API REST del backend  