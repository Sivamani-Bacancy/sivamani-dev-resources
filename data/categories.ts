export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {
    id: 'color-tools',
    name: 'Color Tools',
    description: 'Color palettes, gradient generators, and other color-related tools',
    icon: '🎨',
    color: 'bg-pink-500'
  },
  {
    id: 'css-tools',
    name: 'CSS Tools & Loaders',
    description: 'CSS loaders, animations, and other CSS-related tools',
    icon: '💅',
    color: 'bg-blue-500'
  },
  {
    id: 'ui-components',
    name: 'UI Components',
    description: 'UI component libraries for React, Vue, and other frameworks',
    icon: '🧩',
    color: 'bg-purple-500'
  },
  {
    id: 'js-libraries',
    name: 'JS Libraries',
    description: 'JavaScript libraries for animations, effects, and functionality',
    icon: '📚',
    color: 'bg-yellow-500'
  },
  {
    id: 'sliders',
    name: 'Sliders & Carousels',
    description: 'JavaScript libraries for creating sliders and carousels',
    icon: '🎠',
    color: 'bg-green-500'
  },
  {
    id: 'dev-tools',
    name: 'Development Tools',
    description: 'Tools and resources for developers',
    icon: '🔧',
    color: 'bg-red-500'
  },
  {
    id: 'visual-tools',
    name: 'Visual Tools',
    description: 'Tools for creating and editing visuals',
    icon: '👁️',
    color: 'bg-indigo-500'
  },
  {
    id: 'learning',
    name: 'Learning Resources',
    description: 'Resources for learning web development',
    icon: '🧠',
    color: 'bg-orange-500'
  },
  {
    id: 'git-tools',
    name: 'Git Tools',
    description: 'Tools for working with Git repositories',
    icon: '🗂️',
    color: 'bg-gray-500'
  }
];