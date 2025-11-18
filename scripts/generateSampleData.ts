import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

// Create sample staff data
const generateStaff = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `staff-${i + 1}`,
    name: faker.person.fullName(),
    email: `user${i + 1}@example.com`,
    role: faker.helpers.arrayElement(['Teacher', 'Admin', 'Support', 'Librarian']),
    department: faker.helpers.arrayElement(['Primary', 'Secondary', 'Admin', 'Support']),
    phone: faker.phone.number(),
    isActive: true,
    lastLogin: faker.date.recent().toISOString(),
  }));
};

// Create sample knowledge base articles
const generateKBArticles = (count = 15) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `kb-${i + 1}`,
    title: `How to ${faker.hacker.verb()} ${faker.hacker.noun()}`,
    content: faker.lorem.paragraphs(3),
    category: faker.helpers.arrayElement(['IT', 'HR', 'Facilities', 'Teaching']),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => 
      faker.hacker.noun()
    ),
    author: faker.person.fullName(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    isPinned: faker.datatype.boolean(),
  }));
};

// Create sample announcements
const generateAnnouncements = (count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `announcement-${i + 1}`,
    title: `${faker.company.catchPhrase()} - ${faker.company.buzzPhrase()}`,
    content: faker.lorem.paragraphs(2),
    author: faker.person.fullName(),
    date: faker.date.recent().toISOString(),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    targetAudience: faker.helpers.arrayElements(
      ['All Staff', 'Teachers', 'Admin', 'Support', 'New Hires'],
      { min: 1, max: 3 }
    ),
  }));
};

// Create sample events
const generateEvents = (count = 8) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i + 1}`,
    title: `${faker.company.buzzPhrase()} ${faker.company.buzzNoun()}`,
    description: faker.lorem.sentences(2),
    date: faker.date.future().toISOString(),
    location: faker.location.streetAddress(),
    organizer: faker.person.fullName(),
    attendees: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => 
      faker.person.fullName()
    ),
    type: faker.helpers.arrayElement(['meeting', 'training', 'event', 'maintenance']),
    status: faker.helpers.arrayElement(['scheduled', 'in-progress', 'completed', 'cancelled']),
  }));
};

// Generate and save sample data
const sampleData = {
  staffDirectory: generateStaff(),
  dcsKnowledgeBase: generateKBArticles(),
  announcementsPanel: generateAnnouncements(),
  eventRoster: generateEvents(),
};

// Create the data directory if it doesn't exist
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Save each collection to a separate file
Object.entries(sampleData).forEach(([fileName, data]) => {
  const filePath = path.join(dataDir, `${fileName}.ts`);
  const content = `// Sample data - Replace with real data from Firestore in production
// This is auto-generated sample data for development purposes only

export default ${JSON.stringify(data, null, 2)};`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated ${filePath}`);
});

console.log('\n🎉 Sample data generation complete!');
