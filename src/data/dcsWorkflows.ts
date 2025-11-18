// Example data for DCS Workflows
export const dcsWorkflows = [
  {
    id: '1',
    title: 'Set up a new staff laptop',
    category: 'ICT',
    tags: ['laptop', 'setup', 'staff'],
    steps: [
      'Unbox the laptop and ensure all accessories are included.',
      'Install the operating system and necessary drivers.',
      'Set up user accounts and permissions.',
      'Install required software and configure settings.',
      'Test the laptop and hand it over to the staff member.',
    ],
    notes: 'Ensure the staff member signs the equipment receipt form.',
  },
  {
    id: '2',
    title: 'Support a classroom projector issue',
    category: 'ICT',
    tags: ['projector', 'classroom', 'support'],
    steps: [
      'Check the projector power and connections.',
      'Ensure the input source is correctly selected.',
      'Test with a different device to rule out connection issues.',
      'If the issue persists, escalate to the IT Manager.',
    ],
    notes: 'Keep a spare HDMI cable in the ICT office for quick replacements.',
  },
  {
    id: '3',
    title: 'Prepare for a fire drill',
    category: 'General',
    tags: ['emergency', 'fire drill', 'safety'],
    steps: [
      'Announce the drill to staff and students in advance.',
      'Check all exits and assembly points are clear.',
      'Sound the alarm and start the drill.',
      'Supervise evacuation and take roll at assembly point.',
      'Debrief with staff and record any issues.',
    ],
    notes: 'Review the emergency policy before each drill.',
  },
  {
    id: '4',
    title: 'Reserve library resources for a class',
    category: 'Library',
    tags: ['library', 'reservation', 'class'],
    steps: [
      'Log in to the library system.',
      'Search for the required resources.',
      'Select and reserve items for the class date.',
      'Confirm reservation with library staff.',
    ],
    notes: 'Reservations may be limited during exam periods.',
  },
];