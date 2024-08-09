# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## CI/CD Pipeline

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). Every time code is pushed to the `main` branch, the project is automatically built and deployed to Vercel.

### Deployment Steps

1. Code is pushed or merged into the `main` branch.
2. GitHub Actions is triggered by the push event.
3. The project dependencies are installed, and the project is built.
4. If the build is successful, the project is automatically deployed to Vercel.

### Setting up CI/CD

1. Clone this repository.
2. Ensure you have a Vercel account and a project set up.
3. Set the following secrets in your GitHub repository:
   - `VERCEL_PROJECT_ID`
   - `VERCEL_ORG_ID`
   - `VERCEL_TOKEN`
4. Push changes to the `main` branch, and your project will be automatically deployed.
