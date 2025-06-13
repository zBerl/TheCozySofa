# The Cozy Sofa

Welcome to The Cozy Sofa, your go-to destination for comfortable and stylish home decor. This project is built using Next.js and integrates various features to enhance user experience and site functionality.

## Features

- **Home Page**: A welcoming landing page showcasing featured products and blog posts.
- **Products Page**: Browse through a variety of home decor products.
- **Blog Page**: Read articles and tips on home decor and lifestyle.
- **Contact Page**: Reach out to us with questions or feedback.
- **About Page**: Learn more about our brand and mission.
- **FAQ Page**: Find answers to common questions.
- **Privacy Policy & Terms of Service**: Legal information for users.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Vercel Analytics**: For tracking site analytics.
- **Google Analytics**: For detailed user behavior insights.
- **Contentful**: For content management.

## Environment Setup

1. **Contentful Setup**:

   - Create a space in Contentful
   - Create a Production environment
   - Get your Space ID and API keys:
     - Content Delivery API token
     - Content Preview API token

2. **Local Development**:

   - Copy `.env.example` to `.env.local`
   - Fill in your Contentful credentials:
     ```
     CONTENTFUL_SPACE_ID=your_space_id
     CONTENTFUL_ACCESS_TOKEN=your_delivery_token
     CONTENTFUL_PREVIEW_TOKEN=your_preview_token
     CONTENTFUL_ENVIRONMENT=master  # Use 'master' for development
     ```

3. **Vercel Deployment**:
   - Add the same environment variables in your Vercel project settings
   - Important: All sensitive variables (tokens and IDs) must be available in all environments
   - Do not set any `target=development` restrictions for sensitive variables
   - Required variables:
     ```
     CONTENTFUL_SPACE_ID=your_space_id
     CONTENTFUL_ACCESS_TOKEN=your_delivery_token
     CONTENTFUL_PREVIEW_TOKEN=your_preview_token
     CONTENTFUL_ENVIRONMENT=Production  # Must be 'Production' for production builds
     ```
   - Safety measures:
     - The code includes checks to prevent using non-Production environments in production builds
     - Development environments should use `master` or your dev environment
     - Production deployments must use the `Production` environment

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone <your-private-repo-url>
   cd TheCozySofa
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Deployment

This project is set up for deployment on Vercel. Follow these steps to deploy:

1. Push your code to a private repository on GitHub or GitLab.
2. Connect your repository to Vercel and deploy.
3. Set up environment variables in Vercel project settings:
   - Add all required variables
   - Make sure sensitive variables are available in all environments
   - Set `CONTENTFUL_ENVIRONMENT=Production` for production deployments
   - The code will prevent accidental use of non-Production environments in production

## License

All Rights Reserved

Copyright © 2025 The Cozy Sofa

All code, content, images, and other assets in this repository and associated websites are the exclusive property of The Cozy Sofa. Unauthorized use, reproduction, or distribution is strictly prohibited.

This repository is provided for reference and personal inspiration only. Commercial or public use is not allowed without explicit written permission.
