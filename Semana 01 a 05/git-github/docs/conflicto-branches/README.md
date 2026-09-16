# 💥 Práctica sencilla: Crear y resolver un conflicto en Git

En esta práctica vamos a provocar un conflicto de Git intencionalmente y aprenderemos a resolverlo.

La idea es muy sencilla:

> 👨‍💻 Alumno A y 👨‍💻 Alumno B modifican **la misma línea** de un archivo de manera diferente.

Git no sabe cuál versión debe conservar y nos pide que decidamos.

---

# 1. Crear el proyecto

Crea una carpeta:

```bash
mkdir practica-git
cd practica-git
```

Inicializa Git:

```bash
git init
```

Crea un archivo llamado `README.md`:

```bash
echo "# Mi proyecto" > README.md
```

Guarda el archivo en Git:

```bash
git add .
git commit -m "Primer commit"
```

Crea un repositorio en GitHub y conecta tu proyecto:

```bash
git remote add origin https://github.com/TU_USUARIO/practica-git.git
```

Sube el proyecto:

```bash
git branch -M main
git push -u origin main
```

---

# 2. Alumno A crea una rama

Crea una rama:

```bash
git checkout -b alumno-a
```

Abre `README.md`.

Actualmente tenemos:

```text
# Mi proyecto
```

Agrega debajo:

```text
Hola, soy el Alumno A
```

Quedará:

```text
# Mi proyecto
Hola, soy el Alumno A
```

Guarda y haz commit:

```bash
git add .
git commit -m "Cambio del Alumno A"
```

Sube la rama:

```bash
git push -u origin alumno-a
```

---

# 3. Fusionar Alumno A con main

En GitHub crea un **Pull Request**:

```text
alumno-a → main
```

Haz el Merge.

Ahora `main` contiene:

```text
# Mi proyecto
Hola, soy el Alumno A
```

---

# 4. Alumno B crea su rama

Ahora regresa a tu computadora.

Primero vuelve a `main`:

```bash
git checkout main
```

⚠️ **IMPORTANTE:** NO hagas `git pull`.

Esto es intencional.

Tu copia local de `main` todavía tiene:

```text
# Mi proyecto
```

Ahora crea la rama de B:

```bash
git checkout -b alumno-b
```

---

# 5. Alumno B hace un cambio diferente

Abre `README.md`.

Agrega exactamente la misma línea que modificó el Alumno A, pero con otro texto:

```text
# Mi proyecto
Hola, soy el Alumno B
```

Guarda el archivo.

Haz commit:

```bash
git add .
git commit -m "Cambio del Alumno B"
```

Sube la rama:

```bash
git push -u origin alumno-b
```

---

# 6. Crear el Pull Request

En GitHub crea otro Pull Request:

```text
alumno-b → main
```

GitHub detectará que existe un conflicto.

¿Por qué?

Porque Git encuentra:

```text
main:
Hola, soy el Alumno A

alumno-b:
Hola, soy el Alumno B
```

Git no puede decidir cuál de las dos versiones queremos.

---

# 7. Resolver el conflicto

En lugar de resolverlo directamente en GitHub, vamos a hacerlo en nuestra computadora.

Primero asegúrate de estar en:

```bash
git checkout alumno-b
```

Descarga la información actual de GitHub:

```bash
git pull origin main
```

Git mostrará que existe un conflicto.

Abre `README.md`.

Encontrarás algo parecido a esto:

```text
# Mi proyecto

<<<<<<< HEAD
Hola, soy el Alumno B
=======
Hola, soy el Alumno A
>>>>>>> main
```

---

# 8. ¿Qué significan esos símbolos?

Git nos está mostrando las dos versiones:

```text
<<<<<<< HEAD
Hola, soy el Alumno B
=======
Hola, soy el Alumno A
>>>>>>> main
```

Podemos decidir cuál conservar.

Por ejemplo, podemos dejar:

```text
# Mi proyecto

Hola, soy el Alumno A y B
```

⚠️ Debemos eliminar también estos símbolos:

```text
<<<<<<<
=======
>>>>>>>
```

El archivo debe quedar limpio:

```text
# Mi proyecto

Hola, soy el Alumno A y B
```

---

# 9. Guardar la solución

Ahora le decimos a Git que resolvimos el conflicto:

```bash
git add README.md
```

Hacemos un commit:

```bash
git commit -m "Resolver conflicto"
```

Finalmente:

```bash
git push
```

---

# 🎉 ¡Listo!

Regresa a GitHub y revisa el Pull Request.

El conflicto debería haber desaparecido.

Ahora puedes hacer el Merge.

---

# 🧠 ¿Qué aprendimos?

El conflicto ocurrió porque:

```text
              main
                │
                ▼
        Alumno A modifica
                │
                ▼
       "Hola, soy el Alumno A"


Alumno B tenía una versión
anterior de main
                │
                ▼
        Alumno B modifica
                │
                ▼
       "Hola, soy el Alumno B"
```

Git encuentra dos cambios diferentes en la **misma parte del archivo**.

Por eso pregunta:

> "¿Cuál quieres conservar?"

Y nosotros resolvemos el conflicto manualmente.

---

# ⭐ Regla importante

Un conflicto normalmente ocurre cuando:

**Dos personas modifican la misma parte de un archivo de manera diferente.**

Si modifican partes diferentes, Git normalmente puede combinar los cambios automáticamente.

```text
👨‍💻 Alumno A → modifica línea 5
👨‍💻 Alumno B → modifica línea 20

              ↓

        Git puede combinar
        los dos cambios
```

Pero:

```text
👨‍💻 Alumno A → modifica línea 5
👨‍💻 Alumno B → modifica línea 5

              ↓

        💥 CONFLICTO
```
