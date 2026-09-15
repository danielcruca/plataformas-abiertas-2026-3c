# 💥 Guía Completa: Cómo Provocar y Resolver Conflictos en Git y GitHub (Desde Cero)

Un conflicto en Git ocurre cuando dos ramas modifican la **misma línea** de un archivo con contenido distinto, y Git no sabe automáticamente cuál versión conservar. 

Esta guía está diseñada paso a paso para estudiantes que están aprendiendo GitHub, simulando un escenario real de trabajo en equipo donde un despiste provoca un choque.

---

## 🚀 Paso 0: Preparar el repositorio local y remoto

Crea tu repositorio de prueba desde cero en tu terminal:

```bash
# 1. Crear una carpeta y entrar en ella
mkdir demo-conflictos
cd demo-conflictos

# 2. Inicializar Git
git init

# 3. Crear el archivo inicial README.md
echo "# Práctica de Conflictos" > README.md

# 4. Hacer el primer commit
git add README.md
git commit -m "Commit inicial: archivo README creado"
```

Conéctalo a tu repositorio vacío en GitHub (reemplaza con tu URL):

```bash
git branch -M main
git remote add origin https://github.com/danielcruca/demo-conflictos.git
git push -u origin main
```

---

## 🌱 Paso 1: Simular el trabajo del "Alumno A"

Imaginemos que el Alumno A crea su propia rama para trabajar:

1. Crea y cámbiate a la rama `rama-alumno-a`:
   ```bash
   git checkout -b rama-alumno-a
   ```

2. Abre tu archivo `README.md` y agrega esta línea exactamente **al final**:
   ```markdown
   Esta línea fue escrita por el Alumno A 🍎
   ```

3. Guarda los cambios, haz `add`, `commit` y súbela a GitHub:
   ```bash
   git add README.md
   git commit -m "Agrega línea del Alumno A"
   git push origin rama-alumno-a
   ```

---

## 🔀 Paso 2: Integrar el Alumno A a la rama principal (`main`)

1. Ve a tu repositorio en [GitHub](https://github.com).
2. Haz clic en **"Compare & pull request"** para la `rama-alumno-a`.
3. Haz clic en **"Create pull request"** y luego en **"Merge pull request"** para fusionarlo con `main`.
4. ¡Listo! La rama `main` en GitHub ya tiene este cambio guardado oficialmente.

---

## ⚠️ Paso 3: El error clásico del Alumno B (Crear conflicto)

Ahora simularemos que el **Alumno B** empieza a trabajar en paralelo, pero **olvida actualizar su computadora** antes de empezar.

1. Vuelve a tu terminal y regrésate a la rama `main`:
   ```bash
   git checkout main
   ```
   *(Nota clave: **NO** ejecutes `git pull origin main` aquí. Queremos simular que el Alumno B tiene su código desactualizado).*

2. Crea y cámbiate a la nueva rama `rama-alumno-b` desde ese `main` viejo:
   ```bash
   git checkout -b rama-alumno-b
   ```

3. Abre el archivo `README.md`. Como tu computadora no sabe que el Alumno A ya escribió ahí, edita **exactamente la misma línea** del final y escribe esto en su lugar:
   ```markdown
   Esta línea fue escrita por el Alumno B 🍌
   ```

4. Guarda los cambios, haz `add`, `commit` y súbela a GitHub:
   ```bash
   git add README.md
   git commit -m "Agrega línea del Alumno B"
   git push origin rama-alumno-b
   ```

---

## 🛑 Paso 4: Ver el aviso de conflicto en GitHub

1. Ve a GitHub y haz clic en **"Compare & pull request"** para la `rama-alumno-b`.
2. Verás que GitHub te bloquea el botón y te muestra un aviso en rojo que dice:
   > **"Can't currently merge automatically"** o **"Conflicting files"**.
3. **Explicación para clase:** GitHub detecta que la `rama-alumno-b` intenta modificar una línea que ya fue alterada en `main` por el Alumno A. ¡Tenemos un choque!

---

## 🛠️ Paso 5: Simular y Resolver el Conflicto en la Terminal

Para que Git detecte el conflicto de forma local en tu computadora (y puedas ver cómo se ve "por dentro"), primero debemos actualizar la información de GitHub en tu máquina sin tocar tu código actual:

1. Trae los cambios recientes de GitHub a tu computadora:
   ```bash
   git fetch origin
   ```

2. Estando parado en tu `rama-alumno-b`, intenta fusionar los cambios de la rama `main` oficial (`origin/main`):
   ```bash
   git merge origin/main
   ```

Git te arrojará este mensaje advirtiendo el problema:
> `Auto-merging README.md`
> `CONFLICT (content): Merge conflict in README.md`
> `Automatic merge failed; fix conflicts and then commit the result.`

Si abres tu archivo `README.md` en tu editor (como VS Code), verás que Git ha insertado marcas visuales:

```markdown
# Práctica de Conflictos
<<<<<<< HEAD
Esta línea fue escrita por el Alumno B 🍌
=======
Esta línea fue escrita por el Alumno A 🍎
>>>>>>> origin/main
```

* **`<<<<<<< HEAD`**: Lo que tú escribiste en tu rama (`rama-alumno-b`).
* **`=======`**: La línea divisoria.
* **`>>>>>>> origin/main`**: Lo que ya estaba guardado en `main` en GitHub (Alumno A).

---

## 🧹 Paso 6: Limpiar y Decidir qué Queda

Para solucionar el conflicto, edita el archivo manualmente:
1. **Borra por completo** las marcas que puso Git (`<<<<<<<`, `=======`, `>>>>>>>`).
2. Deja el texto final que desees conservar (puedes unificar ambos mensajes):

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno A y el Alumno B en equipo 🚀
```

Guarda los cambios en el archivo.

---

## 💾 Paso 7: Finalizar la Resolución

Una vez que el archivo está limpio y guardado, cierra el conflicto registrándolo en Git:

```bash
# 1. Preparar el archivo corregido
git add README.md

# 2. Guardar el cambio con un commit de resolución
git commit -m "Resuelve conflicto manualmente entre Alumno A y B"

# 3. Subir los cambios limpios a GitHub
git push origin rama-alumno-b
```

Vuelve a tu navegador en GitHub: ¡verás que el Pull Request ahora se puso de color verde y está listo para hacerse *Merge* sin problemas!