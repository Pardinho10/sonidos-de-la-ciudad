# Sonidos de la Ciudad - Guía para el Equipo

## Instrucciones de trabajo con Git

### 1. Configuración inicial (solo la primera vez)

```bash
# Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd sonidos-de-la-ciudad
```

### 2. Antes de empezar a trabajar (TODOS LOS DÍAS)

```bash
# Traer los últimos cambios de la rama principal
git checkout main
git pull origin main
```

### 3. Crear tu rama de trabajo

Cada persona debe trabajar en su propia rama. Usa un nombre descriptivo:

```bash
# Crear y cambiar a tu nueva rama
git checkout -b feature/TU_NOMBRE-descripcion

# Ejemplos:
git checkout -b feature/juan-pagina-artistas
git checkout -b feature/maria-css-responsive
git checkout -b feature/carlos-validacion-formulario
```

### 4. Mientras trabajas

```bash
# Ver qué archivos cambiaste
git status

# Agregar archivos modificados
git add nombre-del-archivo

# Guardar cambios con un mensaje descriptivo
git commit -m "Agregado: descripción clara de lo que hiciste"
```

**Reglas para los commits:**

- Mensajes cortos y descriptivos (en español)
- Ejemplos buenos:
  - "Agregado: estructura HTML de la página artistas"
  - "Corregido: padding del navbar en mobile"
  - "Implementado: validación de email con regex"
- Ejemplos malos:
  - "cambios"
  - "fix"
  - "asdfg"

### 5. Subir tus cambios a tu rama remota

```bash
git push origin feature/TU_NOMBRE-descripcion
```

### 6. Fusionar tu trabajo en main

**IMPORTANTE: Solo el líder (o quien coordine) hace el merge a main.**

```bash
# Cambiar a main
git checkout main

# Traer últimos cambios
git pull origin main

# Fusionar tu rama
git merge feature/TU_NOMBRE-descripcion

# Subir main actualizado
git push origin main

# (Opcional) Eliminar la rama ya fusionada
git branch -d feature/TU_NOMBRE-descripcion
git push origin --delete feature/TU_NOMBRE-descripcion
```

### 7. Si hay conflictos

Si al hacer merge o pull aparecen conflictos:

1. Abrir los archivos con conflicto
2. Buscar los marcadores `<<<<<<<`, `=======`, `>>>>>>>`
3. Decidir qué código dejar (o combinar ambos)
4. Eliminar los marcadores
5. Guardar, hacer `git add` y `git commit`

**Si no sabés resolverlo, consultá con el líder antes de hacer nada.**

---

## Archivos .gitkeep (carpetas vacías)

Git no rastrea carpetas vacías. Para mantener la estructura del proyecto, se agregaron archivos `.gitkeep` en las carpetas que aún no tienen contenido:

- `assets/img/artists/.gitkeep`
- `assets/img/banners/.gitkeep`
- `assets/img/icons/.gitkeep`
- `assets/audio/.gitkeep`
- `data/.gitkeep`

**¿Cuándo borrarlos?** Cuando agregues un archivo real a esa carpeta (ej: una foto, un audio, un JSON), podés borrar el `.gitkeep` de esa carpeta. Git ya empezará a rastrear la carpeta por el archivo real.

**Ejemplo:** Si subís una foto de artista a `assets/img/artists/foto1.jpg`, podés borrar `assets/img/artists/.gitkeep`.

---

## Estructura del Proyecto

```
sonidos-de-la-ciudad/
│
├── index.html              → Página principal (Inicio)
├── artistas.html           → Listado de artistas
├── cronograma.html         → Horarios de actuaciones
├── entradas.html           → Información de entradas
├── compra.html             → Formulario de compra (TAP3)
├── ubicacion.html          → Cómo llegar + mapa
├── contacto.html           → Formulario de contacto
│
├── components/
│   ├── navbar.html         → Markup parcial del navbar
│   └── footer.html         → Markup parcial del footer
│
├── css/
│   ├── style.css           → Global (reset, variables, tipografía)
│   ├── navbar.css          → Estilos del navbar
│   ├── footer.css          → Estilos del footer
│   ├── index.css           → Estilos de Inicio
│   ├── artistas.css        → Estilos de Artistas
│   ├── cronograma.css      → Estilos de Cronograma
│   ├── entradas.css        → Estilos de Entradas
│   ├── compra.css          → Estilos de Compra (TAP3)
│   ├── ubicacion.css       → Estilos de Ubicación
│   └── contacto.css        → Estilos de Contacto
│
├── js/
│   ├── components/
│   │   ├── navbar.js       → Fetch del navbar + menú hamburguesa
│   │   └── footer.js       → Fetch del footer
│   ├── compra.js           → Lógica de compra, JSON, regex (TAP3)
│   └── main.js             → Scripts globales
│
├── assets/
│   ├── img/
│   │   ├── artists/        → Fotos de artistas
│   │   ├── banners/        → Imágenes de cabecera, hero sections
│   │   └── icons/          → Íconos custom, logo, detector de tarjetas
│   └── audio/              → 3 jingles/canciones (.mp3)
│
└── data/
    └── events.json         → Datos de eventos musicales (TAP3)
```

---

## Reglas Importantes

### NO hacer esto:

- ❌ Trabajar directamente en main
- ❌ Hacer push sin hacer pull primero
- ❌ Modificar archivos de otras personas sin avisar
- ❌ Hacer commits con todo el trabajo de un día entero

### SÍ hacer esto:

- ✅ Trabajar siempre en tu rama
- ✅ Hacer pull de main al empezar cada día
- ✅ Hacer commits pequeños y frecuentes
- ✅ Comunicar qué archivos estás editando

---

## Reparto de Tareas (TAP1 - HTML)

| Persona    | Páginas asignadas                           |
| ---------- | ------------------------------------------- |
| P1 (Líder) | index.html, estructura base, navbar, footer |
| P2         | artistas.html, audios                       |
| P3         | cronograma.html, ubicacion.html             |
| P4         | entradas.html, contacto.html, favicon       |

---

## Recursos Útiles

- [Documentación Git](https://git-scm.com/doc)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [Color Hunt (paletas)](https://www.colorhunt.co/)

---

## ¿Problemas?

Si tenés algún problema con Git o no sabés cómo hacer algo, consultá con Claudio IA antes de intentar arreglarlo solo.
