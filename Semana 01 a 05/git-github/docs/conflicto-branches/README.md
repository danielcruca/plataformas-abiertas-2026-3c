# 💥 Resolución de Conflictos en Git y GitHub

Un conflicto en Git ocurre cuando dos personas (o tú mismo en diferentes ramas) modifican la **misma línea** de un archivo de la misma manera pero con contenido distinto, y Git no sabe cuál versión conservar de forma automática.

En esta guía aprenderemos a **provocar un conflicto intencional** paso a paso y cómo resolverlo para mostrárselo a tus alumnos de forma sencilla.

---

## 🌿 Paso 1: Partir desde la rama principal (`main`)

Asegúrate de estar en tu rama principal (`main`) y de tenerla actualizada con los últimos cambios de GitHub:

```bash
git checkout main
git pull origin main
```

---

## 🌱 Paso 2: Crear una rama para el primer cambio

Crea y cámbiate a una nueva rama llamada `rama-alumno-a`:

```bash
git checkout -b rama-alumno-a
```

---

## 🧪 Paso 3: Modificar el archivo `README.md` (Alumno A)

Edita tu archivo `README.md` agregando la siguiente línea al final del archivo:

```markdown
Esta línea fue escrita por el Alumno A 🍎
```

Guarda los cambios, haz `add`, `commit` y súbelos a GitHub:

```bash
git add README.md
git commit -m "Cambio realizado por Alumno A"
git push origin rama-alumno-a
```

---

## 🔀 Paso 4: Crear un Pull Request y hacer Merge en GitHub

1. Ve a tu repositorio en [https://github.com](https://github.com).
2. Haz clic en **"Compare & pull request"** para la rama `rama-alumno-a`.
3. Haz clic en **"Create pull request"** y finalmente en **"Merge pull request"** para integrar estos cambios en la rama `main`.
4. ¡Listo! La rama `main` en GitHub ya tiene este cambio.

---

## 🔄 Paso 5: Volver a `main` local y actualizar

Vuelve a tu terminal, cámbiate a la rama `main` local y tráete los cambios recién fusionados desde GitHub:

```bash
git checkout main
git pull origin main
```

---

## ⚠️ Paso 6: Crear el conflicto intencional

Ahora simularemos que olvidaste actualizarte o que estás trabajando en paralelo. 

1. Crea y cámbiate a una nueva rama llamada `rama-alumno-b`:

```bash
git checkout -b rama-alumno-b
```

2. Vuelve a editar la **misma línea** (o el mismo lugar) del archivo `README.md` donde editó el Alumno A, pero esta vez escribe esto:

```markdown
Esta línea fue escrita por el Alumno B 🍌
```

3. Guarda los cambios, haz `add` y `commit` en esta nueva rama:

```bash
git add README.md
git commit -m "Cambio realizado por Alumno B"
```

4. Sube esta rama a GitHub:

```bash
git push origin rama-alumno-b
```

---

## 🔁 Paso 7: Intentar hacer el Pull Request del Conflicto

1. Ve a GitHub y crea un Pull Request para la rama `rama-alumno-b`.
2. GitHub te detectará el problema de inmediato y te mostrará un mensaje de advertencia que dice: 
   > **"Can't currently merge automatically"** o **"Conflicting files"**.
3. Esto ocurre porque la línea que modificó el Alumno B choca directamente con la que ya había integrado el Alumno A en `main`.

---

## 🛠️ Paso 8: Resolver el Conflicto en la Terminal

Para que tus alumnos entiendan cómo se ve un conflicto "por dentro", haz lo siguiente en tu terminal (estando en la rama `rama-alumno-b` o intentando hacer un merge local):

Si intentamos fusionar `main` dentro de nuestra rama actual para ver el choque:

```bash
git merge main
```

Git te advertirá:
> `Auto-merging README.md`
> `CONFLICT (content): Merge conflict in README.md`
> `Automatic merge failed; fix conflicts and then commit the result.`

Si abres tu archivo `README.md` en tu editor de código (como VS Code), verás las marcas de conflicto que pone Git:

```markdown
<<<<<<< HEAD
Esta línea fue escrita por el Alumno B 🍌
=======
Esta línea fue escrita por el Alumno Alumno A 🍎
>>>>>>> main
```

---

## 🧹 Paso 9: Limpiar y Decidir qué Queda

Para solucionar el conflicto, debes borrar las líneas de marcado de Git (`<<<<<<<`, `=======`, `>>>>>>>`) y dejar el texto final que tú decidas conservar (por ejemplo, combinando ambos o eligiendo uno):

```markdown
Esta línea fue escrita por el Alumno A y el Alumno B en equipo 🚀
```

Guarda el archivo corregido.

---

## 💾 Paso 10: Finalizar la Resolución

Una vez editado y guardado el archivo sin las marcas de conflicto, agrégalo al área de `staging` y haz el `commit` final de resolución:

```bash
git add README.md
git commit -m "Conflicto resuelto manualmente"
```

Si estabas haciendo un merge local, con esto finaliza. Si estabas en GitHub, puedes actualizar tu rama o completar el merge en la plataforma web.

---

## 🔁 Resumen Visual del Conflicto

```plaintext
main ───────[ Cambio A ]──────────────┐
                                      ▼
rama-B ─────[ Cambio B (conflicto) ]──┼──➤ ¡Conflicto! ──➤ Resolver ──➤ ¡Listo!
```