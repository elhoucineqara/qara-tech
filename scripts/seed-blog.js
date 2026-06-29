import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

// Read .env file manually since we are running a standalone Node script
const envPath = path.resolve('.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found at', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmedLine = line.trim();
  if (!trimmedLine || trimmedLine.startsWith('#')) return;
  const eqIdx = trimmedLine.indexOf('=');
  if (eqIdx > 0) {
    const key = trimmedLine.substring(0, eqIdx).trim();
    let val = trimmedLine.substring(eqIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
});

const uri = env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not found in .env');
  process.exit(1);
}

function getDbNameFromUri(uri) {
  const match = uri.match(/mongodb(?:\+srv)?:\/\/[^/]+\/([^/?]+)/);
  return match ? match[1] : null;
}

const dbName = env.MONGODB_DB_NAME || getDbNameFromUri(uri) || 'qaratech';

const posts = [
  {
    slug: 'ai-and-education',
    title: {
      en: 'AI in Education: Revolution or Assisted Evolution?',
      fr: "L'Intelligence Artificielle dans l'Éducation : Révolution ou Évolution Assistée ?"
    },
    excerpt: {
      en: 'Discover how artificial intelligence is transforming learning, personalizing student paths, and helping teachers teach better.',
      fr: "Découvrez comment l'intelligence artificielle transforme l'apprentissage, personnalise les parcours des élèves et aide les enseignants à mieux enseigner."
    },
    content: {
      en: `The integration of Artificial Intelligence (AI) into education marks the beginning of an unprecedented transformation. Far from replacing teachers, AI is emerging as a pedagogical co-pilot capable of pushing the boundaries of traditional learning.

## 1. Personalization of Learning

Every student learns at their own pace. One of the greatest challenges of traditional teaching has always been adapting a single course to a diverse classroom. Thanks to AI, this challenge finally has a solution.

- **Real-time adaptation**: AI-based learning platforms analyze student performance and instantly adjust the difficulty of exercises.
- **Tailored pathways**: If a student struggles with a specific mathematical concept, the AI can offer alternative explanations or targeted exercises.

## 2. A Valuable Assistant for Teachers

Teachers spend a significant portion of their time on administrative tasks or grading. AI helps free up this valuable time for human interaction and individual support.

> AI does not replace the teacher; it frees them from repetitive tasks so they can focus on the human connection.

- **Automated grading**: For multiple-choice questionnaires or even short open-ended answers, AI provides instant evaluation.
- **Resource generation**: AI can assist in designing lesson plans, custom exercises, or innovative visual aids in seconds.

## 3. Challenges and Ethical Responsibility

Despite these promising advances, the adoption of AI raises crucial questions that require strict regulation:

- **Equal access**: It is vital that these technologies benefit all students and do not widen the digital divide.
- **Data privacy**: Student data must be protected with the utmost rigor, in compliance with GDPR.
- **Critical thinking**: Students must learn to use AI as an assistance tool while developing their own critical thinking, to avoid cognitive dependence or passive plagiarism.

## Conclusion

Artificial intelligence represents an extraordinary opportunity to design a more inclusive, efficient, and human-centric education. By combining the empathy and pedagogical expertise of teachers with the analytical power of AI, we pave the way for a school truly adapted to the challenges of the 21st century.`,
      fr: `L'intégration de l'Intelligence Artificielle (IA) dans le domaine de l'éducation marque le début d'une transformation sans précédent. Loin de remplacer l'enseignant, l'IA s'impose comme un copilote pédagogique capable de repousser les limites de l'apprentissage traditionnel.

## 1. La Personnalisation de l'Apprentissage

Chaque élève apprend à son propre rythme. L'un des plus grands défis de l'enseignement traditionnel a toujours été d'adapter un cours unique à une classe hétérogène. Grâce à l'IA, ce défi trouve enfin une solution.

- **Adaptation en temps réel** : Les plateformes d'apprentissage basées sur l'IA analysent les performances de l'élève et ajustent instantanément la difficulté des exercices.
- **Parcours sur mesure** : Si un élève rencontre des difficultés sur un concept mathématique particulier, l'IA peut lui proposer des explications alternatives ou des exercices ciblés.

## 2. Un Assistant Précieux pour les Enseignants

Les enseignants passent une part considérable de leur temps sur des tâches administratives ou de correction. L'IA permet de libérer ce temps précieux au profit de la relation humaine et de l'accompagnement individuel.

> L'IA ne remplace pas l'enseignant ; elle le libère des tâches répétitives pour lui permettre de se concentrer sur l'humain.

- **Correction automatisée** : Pour les questionnaires à choix multiples ou même certaines réponses ouvertes courtes, l'IA fournit une évaluation instantanée.
- **Génération de ressources** : L'IA peut aider à concevoir des plans de cours, des exercices personnalisés ou des supports visuels innovants en quelques secondes.

## 3. Les Défis et la Responsabilité Éthique

Malgré ces avancées prometteuses, l'adoption de l'IA soulève des questions cruciales qui nécessitent une régulation stricte :

- **Équité d'accès** : Il est primordial que ces technologies profitent à tous les élèves et ne creusent pas le fossé de la fracture numérique.
- **Confidentialité des données** : Les données des élèves doivent être protégées avec la plus grande rigueur, conformément au RGPD.
- **Esprit critique** : Les étudiants doivent apprendre à utiliser l'IA comme un outil d'assistance tout en développant leur propre pensée critique, afin d'éviter la dépendance cognitive ou le plagiat passif.

## Conclusion

L'intelligence artificielle représente une opportunité extraordinaire pour concevoir une éducation plus inclusive, plus efficace et plus humaine. En combinant l'empathie et l'expertise pédagogique des enseignants avec la puissance analytique de l'IA, nous ouvrons la voie à une école véritablement adaptée aux défis du XXIe siècle.`
    },
    author: 'El Houcine QARA',
    date: '2026-06-29',
    tags: ['AI', 'Education', 'Technology', 'Future'],
    readTime: 7,
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    image: '/images/blog/ai-education.png',
    published: true
  },
  {
    slug: 'getting-started-with-sveltekit',
    title: {
      en: 'Getting Started with SvelteKit',
      fr: 'Débuter avec SvelteKit : Le Guide Complet'
    },
    excerpt: {
      en: 'Learn how to build modern web applications with SvelteKit, the full-stack framework for Svelte.',
      fr: 'Apprenez à construire des applications web modernes avec SvelteKit, le framework full-stack pour Svelte.'
    },
    content: {
      en: `SvelteKit is the official framework for building applications with Svelte. It provides a complete, modern development experience, including routing, server-side rendering (SSR), static site generation (SSG), and API routes.

## Why SvelteKit?

Unlike traditional frameworks, Svelte compiles your code down to tiny, framework-less vanilla JavaScript at build time. SvelteKit builds on top of this by providing:

- **File-system routing**: Define your pages by simply creating files.
- **Server-side rendering (SSR)**: Improve SEO and initial load times.
- **Hydration**: Pages load instantly as HTML and become interactive.
- **Zero-config deployment**: Adapters for Vercel, Netlify, Cloudflare, etc.

## Getting Started

To create a new SvelteKit project, run the following command:

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open
\`\`\`

## Project Structure

A typical SvelteKit project has the following directory structure:

- \`src/routes/\`: The pages and endpoints of your application.
- \`src/app.html\`: The main HTML template.
- \`static/\`: Static assets like images, robots.txt, etc.
- \`svelte.config.js\`: Configuration for Svelte and SvelteKit.

Build your next project with SvelteKit and feel the speed!`,
      fr: `SvelteKit est le framework officiel pour créer des applications avec Svelte. Il fournit une expérience de développement complète et moderne, incluant le routage, le rendu côté serveur (SSR), la génération de sites statiques (SSG) et les routes API.

## Pourquoi SvelteKit ?

Contrairement aux frameworks traditionnels, Svelte compile votre code en JavaScript pur, léger et ultra-rapide au moment du build. SvelteKit s'appuie sur cela en fournissant :

- **Routage basé sur le système de fichiers** : Définissez vos pages en créant simplement des fichiers.
- **Rendu côté serveur (SSR)** : Améliore le référencement (SEO) et le temps de chargement initial.
- **Hydratation** : Les pages se chargent instantanément en HTML et deviennent interactives.
- **Déploiement sans configuration** : Adaptateurs pour Vercel, Netlify, Cloudflare, etc.

## Commencer

Pour créer un nouveau projet SvelteKit, exécutez la commande suivante :

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev -- --open
\`\`\`

## Structure du Projet

Un projet SvelteKit typique a la structure de répertoires suivante :

- \`src/routes/\` : Les pages et points de terminaison de votre application.
- \`src/app.html\` : Le modèle HTML principal.
- \`static/\` : Les ressources statiques comme les images, robots.txt, etc.
- \`svelte.config.js\` : Configuration pour Svelte et SvelteKit.

Construisez votre prochain projet avec SvelteKit et découvrez la vitesse !`
    },
    author: 'El Houcine QARA',
    date: '2024-01-15',
    tags: ['SvelteKit', 'Web Development', 'Tutorial'],
    readTime: 5,
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    image: '',
    published: true
  },
  {
    slug: 'mastering-typescript',
    title: {
      en: 'Mastering TypeScript for Better Code',
      fr: 'Maîtriser TypeScript pour un Code Plus Robuste'
    },
    excerpt: {
      en: 'Discover how TypeScript can improve your development experience and code quality.',
      fr: 'Découvrez comment TypeScript améliore votre expérience de développement et la qualité de votre code.'
    },
    content: {
      en: `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and interfaces to the language, helping you catch errors early and write more maintainable code.

## Key Benefits of TypeScript

1. **Static Type Checking**: Catch bugs during development before running your code.
2. **Enhanced IDE Support**: Rich auto-completion, navigation, and refactoring tools.
3. **Better Documentation**: Types serve as self-documenting contracts in your codebase.
4. **Modern JS Features**: Use the latest JavaScript features with confidence.

## Basic Types Example

Here is a quick look at how you define types in TypeScript:

\`\`\`typescript
interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

function greetUser(user: User): string {
  return \`Hello, \${user.username}!\`;
}
\`\`\`

By adopting TypeScript, you make your codebase robust, scalable, and easy to refactor.`,
      fr: `TypeScript est un sur-ensemble typé de JavaScript qui se compile en JavaScript simple. Il ajoute un typage statique optionnel, des classes et des interfaces, vous aidant à détecter les erreurs tôt et à écrire du code plus maintenable.

## Principaux Avantages de TypeScript

1. **Vérification Statique des Types** : Détectez les bugs pendant le développement avant d'exécuter votre code.
2. **Support IDE Amélioré** : Autocomplétion riche, navigation et outils de refactoring.
3. **Meilleure Documentation** : Les types servent de contrats auto-documentés dans votre code.
4. **Fonctionnalités JS Modernes** : Utilisez les dernières nouveautés de JavaScript en toute confiance.

## Exemple de Types de Base

Voici un aperçu de la définition des types en TypeScript :

\`\`\`typescript
interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

function greetUser(user: User): string {
  return \`Bonjour, \${user.username} !\`;
}
\`\`\`

En adoptant TypeScript, vous rendez votre base de code robuste, évolutive et facile à maintenir.`
    },
    author: 'El Houcine QARA',
    date: '2024-01-10',
    tags: ['TypeScript', 'Programming', 'Best Practices'],
    readTime: 8,
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    image: '',
    published: true
  },
  {
    slug: 'building-responsive-designs-with-tailwindcss',
    title: {
      en: 'Building Responsive Designs with TailwindCSS',
      fr: 'Créer des Designs Responsives avec TailwindCSS'
    },
    excerpt: {
      en: 'Create beautiful, responsive user interfaces with TailwindCSS utility-first approach.',
      fr: "Créez de superbes interfaces utilisateur fluides et responsives avec l'approche utility-first de TailwindCSS."
    },
    content: {
      en: `TailwindCSS is a utility-first CSS framework packed with classes like \`flex\`, \`pt-4\`, \`text-center\` and \`rotate-90\` that can be composed to build any design, directly in your markup.

## The Utility-First Workflow

Instead of writing custom CSS classes and maintaining huge stylesheets, Tailwind lets you style elements by applying pre-existing utility classes.

- **No CSS files to maintain**: Style directly in your HTML/Svelte files.
- **Consistent design system**: Restrict styles to a predefined set of colors, spacing, and font sizes.
- **Fast styling**: Build custom designs without leaving your editor.

## Responsive Design

Tailwind uses mobile-first breakpoints. To apply styles at a specific breakpoint, prefix the class name with the breakpoint size:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- This div is full-width on mobile, half-width on tablet, and one-third on desktop -->
</div>
\`\`\`

With TailwindCSS, designing responsive and modern layouts is incredibly fast and intuitive.`,
      fr: `TailwindCSS est un framework CSS basé sur des classes utilitaires telles que \`flex\`, \`pt-4\`, \`text-center\` et \`rotate-90\` qui peuvent être combinées pour concevoir n'importe quel design, directement dans votre balisage.

## Le Flux de Travail Utility-First

Au lieu d'écrire des classes CSS personnalisées et de maintenir d'immenses feuilles de style, Tailwind vous permet de styliser les éléments en appliquant des classes utilitaires préexistantes.

- **Pas de fichiers CSS à maintenir** : Stylisez directement dans vos fichiers HTML/Svelte.
- **Système de conception cohérent** : Limite les styles à un ensemble prédéfini de couleurs, d'espacements et de tailles de police.
- **Stylisation rapide** : Créez des designs personnalisés sans quitter votre éditeur.

## Design Responsif

Tailwind utilise des points d'arrêt (breakpoints) orientés d'abord mobile (mobile-first). Pour appliquer des styles à un point d'arrêt spécifique, préfixez la classe avec le nom du breakpoint :

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Ce div est en pleine largeur sur mobile, à moitié sur tablette, et à un tiers sur ordinateur -->
</div>
\`\`\`

Avec TailwindCSS, concevoir des mises en page réactives et modernes est incroyablement rapide et intuitif.`
    },
    author: 'El Houcine QARA',
    date: '2024-01-05',
    tags: ['CSS', 'TailwindCSS', 'Design'],
    readTime: 6,
    gradient: 'from-cyan-500 via-teal-500 to-emerald-500',
    image: '',
    published: true
  }
];

async function seed() {
  console.log('Connecting to MongoDB...');
  console.log('URI:', uri.substring(0, uri.indexOf(':', 10)) + ':***@' + uri.substring(uri.indexOf('@') + 1));
  console.log('Database Name:', dbName);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('blog_posts');

    // Clean existing
    console.log('Cleaning existing blog posts...');
    await collection.deleteMany({});

    // Create indexes if they do not exist
    console.log('Creating indexes...');
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ date: -1 });
    await collection.createIndex({ published: 1 });

    // Insert new
    console.log(`Inserting ${posts.length} blog posts...`);
    const result = await collection.insertMany(posts);
    console.log(`Successfully inserted ${result.insertedCount} posts.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed.');
  }
}

seed();
