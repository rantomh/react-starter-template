# 🚀 React SPA Template

A modern, production-ready **React Single Page Application starter template** built with:

- ⚡ **Vite**
- 🧩 **Redux Toolkit**
- 🌐 **React Router**
- 🎨 **Bootstrap 5 + Sass**
- 🔤 **Custom Poppins fonts (local)**
- 🔧 **TypeScript**
- 🌍 **Internationalization with i18next**
- 📁 Clean & scalable architecture

This template is designed as a robust starter for enterprise-grade front-end apps, with modular domains, layouts, authentication routing, providers, utilities, and a structured file system following clean architecture principles.

---

## 📂 Project Structure

```
src
├─ main.tsx
├─ vite-env.d.ts
│
├─ application
│  ├─ infrastructure
│  │  ├─ httpClient.ts
│  │  └─ localStorage.ts
│  ├─ redux
│  │  ├─ auth.slice.ts
│  │  └─ index.ts
│  └─ services
│     └─ auth.sa.ts
│
├─ assets
│  ├─ fonts/
│  ├─ images/
│  │  └─ icon/
│  └─ styles
│     └─ extention.scss
│
├─ common
│  ├─ configs (i18n, mocks, store...)
│  ├─ hooks (ui, redux, lang, util...)
│  ├─ locales
│  │  ├─ translation.en.json
│  │  └─ translation.fr.json
│
├─ domain
│  ├─ constants (API, ENV...)
│  ├─ mock
│  └─ types
│
├─ envs
│  └─ index.ts
│
├─ presentation
│  ├─ components (elements, hocs, layouts...)
│  ├─ containers (error pages, sections...)
│  ├─ pages (public, admin, common...)
│  ├─ providers (UserProvider, LangueProvider)
│  └─ routes (PublicRoute, PrivateRoute...)
│
└─ utils (security, toast, urls, user)
```

---

## 🛠 Installation & Setup

### **Clone the project**

```bash
git clone https://github.com/rantomh/react-starter-template.git
cd react-starter-template
```

### **Install dependencies**

```bash
yarn install
```

### **Start development server**

```bash
yarn dev
```

### **Production build**

```bash
yarn build
```

### **Preview build**

```bash
yarn preview
```

---

## 📦 Included Scripts

| Command        | Description           |
| -------------- | --------------------- |
| `yarn dev`     | Run dev server        |
| `yarn build`   | Build production      |
| `yarn preview` | Preview build         |
| `yarn lint`    | Run ESLint            |
| `yarn format`  | Format using Prettier |

---

## 🔌 Tech Stack

### **Core**

- React 18
- Vite
- TypeScript
- Redux Toolkit + React Redux
- React Router DOM

### **UI & UX**

- Bootstrap 5 + Sass
- React-Toastify
- React-Error-Boundary
- React-Select
- Lucide Icons

### **Utilities**

- Axios + Axios-Mock
- Lodash
- CryptoJS
- Formik + Yup
- Moment Timezone

---

## 🌍 Internationalization

i18next is preconfigured. Add translations via:

```
src/common/locales/translation.en.json
src/common/locales/translation.fr.json
```

Switch language using `useLangue()` hook.

---

## 🔐 Auth & Security

✔ Auth service abstraction  
✔ Redux auth slice ready  
✔ Token encryption with `crypto-js`  
✔ Private / Public route guards  
✔ `UserProvider` for session context

---

## 🧱 Folder Design Philosophy

- **Separation by domain**, not by tech
- `application/` = business logic
- `presentation/` = UI only
- `domain/` = models, types, constants
- `common/` = shared cross-domain tools

This allows maintainability & scalability for large teams.

---

## 📜 License

MIT — free to use, modify and distribute.

---

## 👤 Author

**Rantomah** [Linkedin](https://www.linkedin.com/in/rantomah)\
Senior Fullstack Developer & Software Architect
