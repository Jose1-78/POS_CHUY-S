# 🛒 Mi Tienda POS

**Sistema de Punto de Venta (POS) Ligero basado en Web**

Mi Tienda POS es una aplicación web desarrollada en **Python (Flask)** 
    diseñada para gestionar ventas, inventario y reportes de pequeños negocios de manera rápida y eficiente. 
       A diferencia de sistemas complejos con bases de datos SQL, 
         este proyecto utiliza **Excel** como motor de almacenamiento, 
            permitiendo una fácil portabilidad y respaldo de datos.

---

## 🚀 Características Principales

### 1. Módulo de Ventas (Caja)
- **Escaneo Rápido:** Compatibilidad con lectores de códigos de barras.
- **Cálculo Automático:** Suma de totales en tiempo real.
- **Interfaz Limpia:** Diseño intuitivo para agilizar el cobro.
- **Ticket Virtual:** Visualización de productos en carrito antes de confirmar la venta.

### 2. Gestión de Inventario
- **CRUD Completo:** Crear, Leer, Actualizar y Borrar productos.
- **Edición de Stock:** Ajuste rápido de cantidades sin necesidad de borrar el producto.
- **Seguridad:** Protección con contraseña (`ADMIN`) para la eliminación de productos críticos. contraseña por defecto, teniendo la opcion de cambiarlo en ajustes 
- **Base de Datos en Excel:** Los datos se guardan en `data/inventario.xlsx` automáticamente.

### 3. Reportes Inteligentes
- **Filtro por Fecha:** Calendario interactivo para seleccionar el día a consultar.
- **Métricas Clave:** Visualización inmediata de:
  - Total de dinero ingresado ($).
  - Cantidad de transacciones realizadas.
- **Desglose de Ventas:** Tabla detallada con hora y productos vendidos.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Python 3.10+ (Framework Flask).
- **Manejo de Datos:** Pandas & OpenPyXL.
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla).
- **Almacenamiento:** Microsoft Excel (`.xlsx`).

---

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el sistema en tu computadora local:

### 1. Prerrequisitos
Asegúrate de tener instalado Python. Puedes verificarlo en tu terminal con:
```bash
python --version