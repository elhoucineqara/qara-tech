import { MongoClient } from 'mongodb';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file manually
const envPath = join(__dirname, '..', '.env');
const envFile = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    envVars[match[1]] = match[2];
  }
});

const uri = envVars['MONGODB_URI'];

if (!uri) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('qaratech'); // Assuming default db or matching connection string
    const collection = db.collection('blog_posts');

    const dummyArticles = [
      {
        slug: 'ai-in-modern-education',
        title: {
          en: 'The Role of Artificial Intelligence in Modern Education',
          fr: 'Le rôle de l\'Intelligence Artificielle dans l\'éducation moderne'
        },
        excerpt: {
          en: 'Discover how AI is transforming classrooms, personalizing learning, and empowering teachers.',
          fr: 'Découvrez comment l\'IA transforme les salles de classe, personnalise l\'apprentissage et donne du pouvoir aux enseignants.'
        },
        content: {
          en: `## Introduction
Artificial Intelligence (AI) is no longer a futuristic concept; it is actively reshaping our educational landscape. From intelligent tutoring systems to automated grading, AI is stepping in to support educators and students alike.

### Personalized Learning
One of the most significant impacts of AI is its ability to tailor educational experiences to individual students. Algorithms analyze a student's learning speed, strengths, and weaknesses to provide custom resources.

### Empowering Teachers
AI doesn't replace teachers; it augments them. By handling administrative tasks like grading and attendance, teachers have more time to focus on what matters most: mentoring students.

## Conclusion
As we move forward, the integration of AI in education will only deepen, making learning more accessible, engaging, and effective for everyone.`,
          fr: `## Introduction
L'Intelligence Artificielle (IA) n'est plus un concept futuriste ; elle remodèle activement notre paysage éducatif. Des systèmes de tutorat intelligents à la notation automatisée, l'IA intervient pour soutenir les éducateurs et les élèves.

### Apprentissage Personnalisé
L'un des impacts les plus significatifs de l'IA est sa capacité à adapter les expériences éducatives à chaque élève. Les algorithmes analysent la vitesse d'apprentissage, les forces et les faiblesses pour fournir des ressources sur mesure.

### Autonomisation des Enseignants
L'IA ne remplace pas les enseignants ; elle les complète. En gérant les tâches administratives, les enseignants ont plus de temps pour se concentrer sur l'essentiel : encadrer les élèves.

## Conclusion
L'intégration de l'IA dans l'éducation ne fera que s'approfondir, rendant l'apprentissage plus accessible, engageant et efficace pour tous.`
        },
        author: 'El Houcine QARA',
        date: new Date().toISOString(),
        tags: ['AI', 'Education', 'Technology'],
        readTime: 4,
        gradient: 'from-blue-600 to-cyan-500',
        published: true
      },
      {
        slug: 'future-of-learning-ai',
        title: {
          en: 'The Future of Learning: How AI is Bridging the Gap',
          fr: 'L\'avenir de l\'apprentissage : comment l\'IA comble les lacunes'
        },
        excerpt: {
          en: 'Exploring the tools and methodologies powered by AI that are democratizing education globally.',
          fr: 'Exploration des outils et méthodologies propulsés par l\'IA qui démocratisent l\'éducation à l\'échelle mondiale.'
        },
        content: {
          en: `## The Educational Divide
For decades, access to quality education has been a challenge for many parts of the world. Geographic barriers and lack of resources have created a significant gap.

## AI as a Bridge
Enter AI-powered platforms. These platforms provide high-quality educational content to anyone with an internet connection. Language translation models break down language barriers in real-time.

### Virtual Classrooms
Virtual Reality (VR) combined with AI allows students to experience historical events or conduct complex scientific experiments safely from their homes.

## The Way Forward
While challenges like the digital divide remain, AI holds the promise of a more equitable future in education.`,
          fr: `## Le Fossé Éducatif
Pendant des décennies, l'accès à une éducation de qualité a été un défi dans de nombreuses régions du monde. Les barrières géographiques et le manque de ressources ont créé un fossé important.

## L'IA comme Pont
Les plateformes propulsées par l'IA fournissent un contenu éducatif de haute qualité à toute personne disposant d'une connexion Internet. Les modèles de traduction brisent les barrières linguistiques en temps réel.

### Salles de Classe Virtuelles
La Réalité Virtuelle (RV) combinée à l'IA permet aux élèves de vivre des événements historiques ou de mener des expériences scientifiques complexes en toute sécurité depuis chez eux.

## La Voie à Suivre
Bien que des défis subsistent, l'IA promet un avenir plus équitable dans l'éducation.`
        },
        author: 'El Houcine QARA',
        date: new Date(Date.now() - 86400000).toISOString(),
        tags: ['AI', 'Future', 'EdTech'],
        readTime: 5,
        gradient: 'from-purple-600 to-pink-500',
        published: true
      }
    ];

    for (const article of dummyArticles) {
      await collection.updateOne(
        { slug: article.slug },
        { $set: article },
        { upsert: true }
      );
    }
    console.log("Successfully seeded articles.");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
