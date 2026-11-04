# 🚀 Guía de Configuración: Entorno Virtual (`venv`) en Python

Esta guía explica paso a paso cómo configurar y utilizar un entorno virtual de Python en tu proyecto backend. Usar entornos virtuales nos permite aislar las librerías del proyecto para evitar conflictos con otras aplicaciones en tu equipo.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado **Python 3.x** en tu sistema y de contar con el archivo `requirements.txt` en la raíz de la carpeta de ejecución de tu proyecto.

### Archivo `requirements.txt`
Tu proyecto debe incluir este archivo con las dependencias necesarias:

```text
Flask==3.0.2
pymongo==4.6.1
flask-pymongo==2.3.0
flask-cors==4.0.0
dnspython==2.6.0
python-dotenv==1.0.1
```

---

## 🛠️ Guía Paso a Paso

### 1. Creación del Entorno Virtual

Abre tu terminal (PowerShell, CMD o Terminal de VS Code) y navega hasta la carpeta del proyecto donde se encuentra tu archivo principal. Luego, ejecuta el siguiente comando:

```bash
python -m venv venv
```

> **¿Qué hace este comando?** Crea una carpeta oculta o local llamada `venv` que contendrá una copia independiente de ejecutable de Python y sus paquetes.

---

### 2. Activación del Entorno Virtual

Para que los comandos de Python y `pip` utilicen la carpeta aislada que acabamos de crear, debemos activar el entorno virtual.

#### 🪟 En Windows (PowerShell / CMD)
```bash
venv\Scripts\activate
```

> 💡 **Nota en Windows:** Si al ejecutar el comando en PowerShell obtienes un error sobre la "ejecución de scripts desactivada", ejecuta PowerShell como administrador y corre: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.

#### 🍎 / 🐧 En macOS / Linux
```bash
source venv/bin/activate
```

---

### 3. Instalación de Dependencias

Una vez activado el entorno (notarás el prefijo `(venv)` en tu consola), procede a instalar todas las librerías definidas en el archivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

> **¡Listo!** En este punto tu proyecto cuenta con todas las herramientas necesarias para ejecutarse sin fallos de paquetes faltantes.

---

### ⚡ Ejecución del Proyecto

Con el entorno activo y las dependencias instaladas, puedes iniciar tu servidor web o API corriendo el script principal:

```bash
python run.py
```
*(O usando `py run.py` en Windows)*

---

### 🛑 Desactivación del Entorno Virtual

Cuando hayas terminado de trabajar en tu proyecto y desees volver a la consola normal de tu sistema, simplemente ejecuta:

```bash
deactivate
```

---

## 📌 Resumen de Comandos Rápidos

| Acción | Comando (Windows) | Comando (macOS/Linux) |
| :--- | :--- | :--- |
| **Crear venv** | `python -m venv venv` | `python3 -m venv venv` |
| **Activar venv** | `venv\Scripts\activate` | `source venv/bin/activate` |
| **Instalar librerías** | `pip install -r requirements.txt` | `pip install -r requirements.txt` |
| **Desactivar venv** | `deactivate` | `deactivate` |
