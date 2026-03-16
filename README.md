# MB92 Plastic Marketplace

> **MPG | MB92 | MetropolisFPLab — Phase 3 (Prototyping)**

A plastic materials marketplace developed as a prototype within the MetropolisFPLab project. Initially generated with [Lovable.dev](https://lovable.dev) and later modified to add reCAPTCHA and other improvements.

🔗 **Live demo:** [mb92-plastic-marketplace.vercel.app](https://mb92-plastic-marketplace.vercel.app)

---

## Tech Stack

- **Vite** — bundler and development server
- **TypeScript** — static typing
- **React** — UI library
- **shadcn/ui** — accessible and customizable UI components
- **Tailwind CSS** — utility-first styling
- **Google reCAPTCHA** — bot protection on forms

---

## Project Structure

```
mb92-plastic-marketplace/
├── api/          # Serverless functions (Vercel)
├── public/       # Static assets
├── src/          # React application source code
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Installation & Local Setup

Prerequisites: **Node.js** and **npm** (or **bun**). Version management with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is recommended.

```bash
# 1. Clone the repository
git clone https://github.com/guerau84/mb92-plastic-marketplace.git

# 2. Navigate to the project directory
cd mb92-plastic-marketplace

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build      # Build for production
npm run preview    # Preview the production build
npm run test       # Run tests (Vitest)
npm run lint       # Lint the code with ESLint
```

---

## Deployment

The project is deployed on **Vercel**. Any push to the `main` branch triggers an automatic deployment.

To deploy manually, import the repository on [vercel.com](https://vercel.com) and follow the setup steps.

---

## Environment Variables

For reCAPTCHA to work correctly, define the keys in a `.env` file:

```env
VITE_RECAPTCHA_SITE_KEY=your_public_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

> ⚠️ Never commit the `.env` file to the repository.

---

## Changes from the Original Lovable Project

- Integration of **Google reCAPTCHA v2/v3** on contact and registration forms
- Serverless functions under `/api` to validate the reCAPTCHA token on the backend
- Other minor UI and behaviour tweaks

---

## Project Context

This prototype is part of **Phase 3 (Prototyping)** of the **MPG | MB92 | MetropolisFPLab** project, an initiative that explores the reuse and trade of plastic materials through a digital marketplace.

---

## License

This project is open source. See the `LICENSE` file for more details (if applicable).
