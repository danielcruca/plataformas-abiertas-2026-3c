# 💥 Guía Completa: Cómo Provocar y Resolver Conflictos en Git y GitHub (Desde Cero)

Un conflicto en Git ocurre cuando dos ramas modifican la **misma línea** de un archivo con contenido distinto, y Git no sabe automáticamente cuál versión conservar. 

Esta guía te lleva desde la creación del repositorio hasta la resolución manual del conflicto, ideal para proyectar en clase.

---

## 🚀 Paso 0: Preparar el repositorio local y remoto

Si aún no tienes un repositorio de prueba, créalo desde cero en tu terminal:

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

Ahora, conéctalo a un repositorio vacío en tu cuenta de GitHub (reemplaza la URL con la tuya):

```bash
git branch -M main
git remote add origin https://github.com/tu-usuario/demo-conflictos.git
git push -u origin main
```

---

## 🌱 Paso 1: Crear la rama y el trabajo del "Alumno A"

Imaginemos que vamos a simular el trabajo del **Alumno A**. 

1. Crea y cámbiate a una nueva rama llamada `rama-alumno-a`:
   ```bash
   git checkout -b rama-alumno-a
   ```

2. Edita tu archivo `README.md` agregando esta línea al final:
   ```markdown
   Esta línea fue escrita por el Alumno A 🍎
   ```

3. Guarda los cambios, haz `add`, `commit` y súbelos a GitHub:
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
4. ¡Listo! La rama `main` en GitHub ya tiene este cambio integrado.

---

## 🔄 Paso 3: Sincronizar tu computadora con `main`

Vuelve a tu terminal local. Debes asegurarte de bajarte los cambios recientes que subió el Alumno A:

```bash
# Regresar a la rama main
git checkout main

# Traer los cambios actualizados desde GitHub
git pull origin main
```

*(En este punto, tu archivo `README.md` en tu `main` local ya incluye la contribución del Alumno A).*

---

## ⚠️ Paso 4: Crear la rama y el trabajo del "Alumno B" (El Conflicto)

Ahora simularemos que el **Alumno B** trabaja en paralelo (o que olvidó actualizar su repositorio antes de empezar a escribir).

1. Crea y cámbiate a una nueva rama llamada `rama-alumno-b` (partiendo desde el `main` actualizado):
   ```bash
   git checkout -b rama-alumno-b
   ```

2. Abre el archivo `README.md` y edita **exactamente la misma línea** donde escribió el Alumno A, pero escribe esto en su lugar:
   ```markdown
   Esta línea fue escrita por el Alumno B 🍌
   ```

3. Guarda los cambios, haz `add` y `commit`:
   ```bash
   git add README.md
   git commit -m "Agrega línea del Alumno B"
   ```

4. Sube esta rama a GitHub:
   ```bash
   git push origin rama-alumno-b
   ```

---

## 🛑 Paso 5: Intentar fusionar en GitHub (Ver el aviso de conflicto)

1. Ve a GitHub y haz clic en **"Compare & pull request"** para la `rama-alumno-b`.
2. Verás que GitHub te bloquea el botón de merge y te muestra una advertencia roja:
   > **"Can't currently merge automatically"** o **"Conflicting files"**.
3. **Explicación para tus alumnos:** Esto pasa porque la línea que modificó el Alumno B choca directamente con la línea que el Alumno A ya guardó previamente en `main`.

---

## 🛠️ Paso 6: Simular y Resolver el Conflicto en la Terminal

Para mostrarles a tus alumnos cómo se ve un conflicto "por dentro" a nivel de código, regresa a tu terminal (estando parado en la `rama-alumno-b`) e intenta fusionar `main` localmente para forzar el choque:

```bash
git merge main
```

Git te arrojará este mensaje de advertencia:
> `Auto-merging README.md`
> `CONFLICT (content): Merge conflict in README.md`
> `Automatic merge failed; fix conflicts and then commit the result.`

Si abres tu archivo `README.md` en tu editor de código (como VS Code), verás que Git ha insertado marcas especiales de texto:

```markdown
# Práctica de Conflictos
<<<<<<< HEAD
Esta línea fue escrita por el Alumno B 🍌
=======
Esta línea fue escrita por el Alumno A 🍎
>>>>>>> main
```

* **`<<<<<<< HEAD`** muestra lo que tú tienes en tu rama actual (`rama-alumno-b`).
* **`=======`** es el separador.
* **`>>>>>>> main`** muestra lo que viene de la rama `main`.

---

## 🧹 Paso 7: Limpiar y Decidir qué Queda

Para solucionar el conflicto, debes **borrar por completo** las líneas de marcado que puso Git (`<<<<<<<`, `=======`, `>>>>>>>`) y dejar el texto final limpio que desees conservar. 

Por ejemplo, puedes unificar ambos aportes editando el archivo para que quede así:

```markdown
# Práctica de Conflictos
Esta línea fue escrita por el Alumno A y el Alumno B en equipo 🚀
```

Guarda los cambios en el archivo.

---

## 💾 Paso 8: Finalizar la Resolución

Una vez que el archivo está limpio y guardado sin marcas de conflicto, intégralo formalmente al flujo de Git:

```bash
# 1. Agregar el archivo corregido al área de preparación
git add README.md

# 2. Hacer el commit de resolución
git commit -m "Resuelve conflicto manualmente entre Alumno A y B"
```

¡Felicidades! El conflicto ha quedado resuelto de manera local. Si deseas subir los cambios ya limpios a GitHub, solo ejecuta:

```bash
git push origin rama-alumno-b
```
Y ahora verás que el Pull Request en GitHub se vuelve color verde y está listo para hacerle *Merge*.