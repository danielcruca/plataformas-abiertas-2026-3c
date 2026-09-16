# 💥 Guía práctica: provocar y resolver un conflicto en Git y GitHub

Esta práctica crea un conflicto **de forma reproducible** y permite verlo tanto en GitHub como en la terminal.

> **Importante:** el error de la guía original está en el momento en que se crea `rama-alumno-b`. Si trabajas en la misma carpeta y ya hiciste el merge del Alumno A en `main`, tu `main` local ya conoce ese cambio. Para simular correctamente a dos alumnos, necesitamos mantener una copia local "vieja" de `main` para B mientras GitHub ya tiene el cambio de A.

La forma más sencilla de hacerlo en una sola computadora es usar **dos carpetas locales**, una para cada alumno.

---

## 🎯 Objetivo

Vamos a terminar con esta situación:

```text
main
  │
  └── Alumno A modifica README.md
          │
          └── merge a main en GitHub

Alumno B todavía tiene una versión vieja de main
          │
          └── modifica LA MISMA línea de README.md
```

Cuando B intente fusionar su rama con `main`, Git detectará:

```text
CONFLICT (content): Merge conflict in README.md
```

---

# 🚀 Paso 0: Crear el repositorio

## 0.1 Crear el repositorio en GitHub

Crea un repositorio vacío llamado:

```text
demo-conflictos
```

Por ejemplo:

```text
https://github.com/TU_USUARIO/demo-conflictos.git
```

No agregues README desde GitHub, porque lo vamos a crear localmente.

---

## 0.2 Crear la carpeta del proyecto

En una terminal:

```bash
mkdir demo-conflictos
cd demo-conflictos
```

Inicializa Git:

```bash
git init
```

Configura la rama principal como `main`:

```bash
git branch -M main
```

Crea el README:

```bash
echo "# Práctica de Conflictos" > README.md
```

Haz el primer commit:

```bash
git add README.md
git commit -m "Commit inicial: crea README"
```

Conecta el repositorio con GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/demo-conflictos.git
```

Sube `main`:

```bash
git push -u origin main
```

---

# 🍎 Paso 1: Simular al Alumno A

Ahora trabajaremos como si fuéramos el Alumno A.

## 1.1 Crear la rama de A

```bash
git checkout -b rama-alumno-a
```

Comprueba dónde estás:

```bash
git branch
```

Deberías ver:

```text
* rama-alumno-a
  main
```

---

## 1.2 Modificar README.md

Abre `README.md`.

Actualmente debe contener:

```markdown
# Práctica de Conflictos
```

Agrega al final:

```markdown
Esta línea fue escrita por el Alumno A 🍎
```

El archivo queda:

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno A 🍎
```

Guarda el archivo.

---

## 1.3 Hacer commit

```bash
git add README.md
git commit -m "Agrega línea del Alumno A"
```

---

## 1.4 Subir la rama a GitHub

```bash
git push -u origin rama-alumno-a
```

---

# 🔀 Paso 2: Integrar al Alumno A en `main`

Ve al repositorio en GitHub.

Debería aparecer la opción para crear un Pull Request desde:

```text
rama-alumno-a
```

Crea el Pull Request y haz:

```text
Create pull request
        ↓
Merge pull request
        ↓
Confirm merge
```

Ahora GitHub tiene:

```text
main
│
└── Esta línea fue escrita por el Alumno A 🍎
```

---

# ⚠️ Paso 3: Crear correctamente la situación del Alumno B

Aquí está la parte importante.

**No vamos a actualizar el `main` local que estás usando para A.**

En cambio, vamos a crear una **segunda carpeta**, que representa la computadora del Alumno B.

## 3.1 Volver a la carpeta anterior

Primero sal del proyecto:

```bash
cd ..
```

Ahora deberías estar en la carpeta que contiene:

```text
demo-conflictos
```

---

## 3.2 Crear una segunda copia para B

Clona el repositorio desde GitHub:

```bash
git clone https://github.com/TU_USUARIO/demo-conflictos.git alumno-b
```

Entra:

```bash
cd alumno-b
```

### ⚠️ Pero hay un detalle

Como GitHub ya contiene el cambio del Alumno A, esta copia **ya estaría actualizada**.

Por eso vamos a retroceder el `main` local de B al commit anterior al cambio de A.

Primero mira el historial:

```bash
git log --oneline
```

Verás algo parecido a:

```text
abc1234 Merge pull request...
def5678 Agrega línea del Alumno A
789abcd Commit inicial: crea README
```

El commit que queremos para B es:

```text
789abcd Commit inicial: crea README
```

Copia el identificador del commit inicial.

---

## 3.3 Crear una rama de B desde el `main` viejo

Crea la rama desde ese commit:

```bash
git checkout -b rama-alumno-b 789abcd
```

> Reemplaza `789abcd` por el identificador real de tu commit inicial.

Ahora B está trabajando sobre una versión antigua del proyecto.

Comprueba el estado:

```bash
git status
```

Y revisa el archivo:

```bash
cat README.md
```

Deberías ver solamente:

```markdown
# Práctica de Conflictos
```

Esto es exactamente lo que queremos.

---

# 🍌 Paso 4: El Alumno B modifica la misma línea

Abre:

```text
README.md
```

B va a agregar una línea en el mismo lugar donde A había agregado la suya.

Escribe:

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno B 🍌
```

Guarda.

---

## 4.1 Hacer commit

```bash
git add README.md
git commit -m "Agrega línea del Alumno B"
```

---

## 4.2 Subir la rama de B

```bash
git push -u origin rama-alumno-b
```

Ahora GitHub tiene:

```text
main
│
└── Alumno A 🍎

rama-alumno-b
│
└── Alumno B 🍌
```

Las dos ramas parten del mismo commit inicial, pero modificaron la misma parte del archivo de manera diferente.

---

# 🛑 Paso 5: Crear el Pull Request de B

En GitHub, crea un Pull Request:

```text
rama-alumno-b → main
```

Ahora GitHub debería indicar que existen conflictos.

Dependiendo de la interfaz de GitHub, puedes ver mensajes como:

```text
Can't automatically merge
```

o:

```text
This branch has conflicts that must be resolved
```

Esto ocurre porque Git encuentra:

```text
main:
Esta línea fue escrita por el Alumno A 🍎

rama-alumno-b:
Esta línea fue escrita por el Alumno B 🍌
```

Git no puede decidir automáticamente cuál debe quedar.

---

# 🛠️ Paso 6: Resolver el conflicto desde la terminal

Ahora vamos a resolverlo manualmente.

Seguimos trabajando dentro de la carpeta:

```text
alumno-b
```

Comprueba que estás en la rama correcta:

```bash
git branch
```

Debe aparecer:

```text
* rama-alumno-b
  main
```

---

## 6.1 Obtener la información más reciente de GitHub

```bash
git fetch origin
```

Esto descarga la información de `origin/main`, pero **no modifica tu archivo automáticamente**.

---

## 6.2 Intentar fusionar `main`

Ejecuta:

```bash
git merge origin/main
```

Git debería detectar el conflicto y mostrar algo parecido a:

```text
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

🎉 **El conflicto ya está creado localmente.**

---

# 🔍 Paso 7: Ver el conflicto

Abre:

```text
README.md
```

Ahora probablemente encontrarás:

```markdown
# Práctica de Conflictos
<<<<<<< HEAD
Esta línea fue escrita por el Alumno B 🍌
=======
Esta línea fue escrita por el Alumno A 🍎
>>>>>>> origin/main
```

Estas marcas fueron agregadas temporalmente por Git.

### `<<<<<<< HEAD`

Indica la versión de tu rama actual:

```text
rama-alumno-b
```

Por eso aparece:

```text
Esta línea fue escrita por el Alumno B 🍌
```

### `=======`

Es el separador entre las dos versiones.

### `>>>>>>> origin/main`

Indica la versión proveniente de:

```text
origin/main
```

En este caso:

```text
Esta línea fue escrita por el Alumno A 🍎
```

---

# 🧹 Paso 8: Resolver el conflicto

Git no decide por nosotros.

Nosotros debemos editar el archivo.

Por ejemplo, podemos decidir conservar ambas contribuciones:

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno A y el Alumno B en equipo 🚀
```

Lo importante es eliminar completamente las marcas:

```text
<<<<<<<
=======
>>>>>>>
```

El archivo debe quedar como Markdown normal.

---

# 💾 Paso 9: Finalizar la resolución

Primero dile a Git que ya resolviste el archivo:

```bash
git add README.md
```

Comprueba el estado:

```bash
git status
```

Git debería indicar que el conflicto fue resuelto y que queda completar el merge.

Ahora crea el commit:

```bash
git commit -m "Resuelve conflicto entre Alumno A y B"
```

---

# 🚀 Paso 10: Subir la resolución a GitHub

```bash
git push origin rama-alumno-b
```

Vuelve al Pull Request de GitHub.

El Pull Request debería actualizarse automáticamente.

Ahora GitHub debería permitir hacer el merge porque el conflicto ya fue resuelto.

Puedes hacer:

```text
Merge pull request
        ↓
Confirm merge
```

---

# 🧠 ¿Qué ocurrió realmente?

La historia puede visualizarse así:

```text
                 ┌── rama-alumno-a
                 │
                 │   🍎 cambio de A
                 │
Commit inicial ──┤
                 │
                 │   🍌 cambio de B
                 │
                 └── rama-alumno-b
```

Después:

```text
             main
              │
              │ 🍎
              ▼
        cambio de A


rama-alumno-b
      │
      │ 🍌
      ▼
cambio de B
```

Cuando intentamos hacer:

```bash
git merge origin/main
```

Git encuentra dos cambios diferentes sobre la misma parte del archivo.

Por eso necesita nuestra decisión.

---

# 🎓 Concepto clave para los estudiantes

Un conflicto **no significa que Git esté roto**.

Significa:

> **Git encontró dos versiones incompatibles de una misma parte del proyecto y necesita que una persona decida cómo combinarlas.**

El flujo profesional suele ser:

```text
Modificar código
      ↓
commit
      ↓
push
      ↓
Pull Request
      ↓
¿Hay conflicto?
   ↙       ↘
 NO         SÍ
 ↓           ↓
Merge     Resolver
             ↓
           add
             ↓
          commit
             ↓
           push
             ↓
           Merge
```

---

# 🧪 Comandos utilizados

| Comando | Propósito |
|---|---|
| `git init` | Inicializa un repositorio |
| `git clone` | Crea una copia del repositorio |
| `git branch` | Muestra las ramas |
| `git checkout -b` | Crea y cambia a una rama |
| `git add` | Prepara cambios |
| `git commit` | Guarda cambios en el historial |
| `git push` | Sube cambios a GitHub |
| `git fetch` | Actualiza la información remota sin fusionarla |
| `git merge` | Intenta combinar dos historiales |
| `git status` | Muestra el estado del repositorio |
| `git log --oneline` | Muestra el historial resumido |

---

# 🚨 Si te quedas atrapado durante el conflicto

Si quieres cancelar el merge y volver al estado anterior:

```bash
git merge --abort
```

Esto es especialmente útil durante una práctica.

---

# ✅ Resultado final

Al terminar, `main` debería contener:

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno A y el Alumno B en equipo 🚀
```

Y habrás practicado el flujo completo:

```text
Ramas
  ↓
Commit
  ↓
Push
  ↓
Pull Request
  ↓
Conflicto
  ↓
Fetch
  ↓
Merge
  ↓
Resolver manualmente
  ↓
Commit
  ↓
Push
  ↓
Merge
```

## 💡 Nota para el profesor

La clave de esta práctica es **usar dos carpetas locales**. Esto representa mejor el escenario real:

```text
Computadora del Alumno A
        ↓
       GitHub
        ↑
Computadora del Alumno B
```

Así se evita el problema de intentar simular dos computadoras dentro de un único `main` local ya actualizado.
