export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  link?: string;
};

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to DCS!',
    description: 'Meet your team, tour the campus, and get your staff ID badge.'
  },
  {
    id: 'accounts',
    title: 'Set up your accounts',
    description: 'Log in to your DCS email, Sentral, Schoolbox, and M365. Ask ICT for help if needed.'
  },
  {
    id: 'policies',
    title: 'Review key policies',
    description: 'Read the Staff Code of Conduct, Child Safety Policy, and ICT Acceptable Use Policy.',
    link: 'https://www.dubbocs.edu.au/about-us/'
  },
  {
    id: 'systems',
    title: 'Learn the main systems',
    description: 'Familiarize yourself with Sentral, Schoolbox, library software, and device management.'
  },
  {
    id: 'contacts',
    title: 'Know who to contact',
    description: 'Find key staff in the Staff Directory for ICT, Library, Preschool, and Admin support.'
  },
  {
    id: 'daily',
    title: 'Understand daily routines',
    description: 'Attend staff devotions, check your duty roster, and read the staff bulletin.'
  },
  {
    id: 'safety',
    title: 'Emergency procedures',
    description: 'Learn evacuation routes, lockdown procedures, and where to find first aid.'
  },
  {
    id: 'help',
    title: 'Where to get help',
    description: 'Ask your supervisor, ICT, or admin team for support. Use the app for quick links and guides.'
  }
];
