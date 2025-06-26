# Taqui - My Portfolio

Welcome to the source code of my personal portfolio website. This project is a comprehensive showcase of my skills, projects, and professional experience, built from the ground up with modern web technologies. The site features a clean, responsive, and interactive design.

**[Live Demo](https://taqui-imam.vercel.app/)**

## Features

-   **Interactive UI**: A dynamic hero section with a flickering grid background and a pixelated typing animation.
-   **Responsive Design**: A fully mobile-friendly layout that ensures a great user experience on all devices.
-   **Theme Toggling**: Seamless switching between light and dark modes.
-   **Detailed Sections**:
    -   **Profile**: An overview with a profile picture and an animated text flipper for my roles.
    -   **About Me**: A detailed section about my background and passion for development.
    -   **Experience**: A collapsible accordion showcasing my professional and freelance work history.
    -   **Projects**: An organized display of my projects with descriptions, features, and links.
    -   **Tech Stack**: A visual grid of the technologies and tools I'm proficient with.
    -   **Social Links**: A grid of my social and professional profiles.
-   **Contact Form**: A functional contact form that uses Nodemailer to send messages directly to my inbox.

## Tech Stack

This portfolio is built using a modern technology stack:

-   **Framework**: [Next.js](https://nextjs.org/) (v15)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
-   **Email Service**: [Nodemailer](https://nodemailer.com/)
-   **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (v20 or higher) and a package manager like `npm` or `yarn` installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/taqui-786/Taqui.git
    cd Taqui
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following SMTP credentials for the contact form to work.

    ```env
    SMPT_HOST="your-smtp-host"
    SMPT_USER="your-smtp-user"
    SMPT_PASS="your-smtp-password"
    ```

### Running the Development Server

Once the installation is complete, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
