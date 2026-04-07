import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://karinga.dev';
  
  // Static Routes
  const routes = ['', '/work', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Project Routes
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
