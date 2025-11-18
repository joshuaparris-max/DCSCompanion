export type KbDoc = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  body: string;
};

export const dcsKbDocs: KbDoc[] = [
  {
    id: 'ict-overview',
    title: 'ICT Overview',
    category: 'ICT',
    tags: ['network', 'devices', 'support'],
    summary: 'Overview of ICT systems and processes at DCS.',
    body: 'DCS uses a mix of networked devices, cloud services, and on-premise systems to support staff and students. Key systems include Sentral, Office 365, and the ICT Helpdesk.',
  },
  {
    id: 'library-workflow',
    title: 'Library Workflow',
    category: 'Library',
    tags: ['resources', 'loans', 'returns'],
    summary: 'Daily checklist for library operations.',
    body: 'The library workflow includes checking in returned items, processing new loans, and assisting students with resource searches.',
  },
  {
    id: 'dcs-values',
    title: 'DCS Values',
    category: 'General',
    tags: ['mission', 'discipleship', 'community'],
    summary: 'Core values and mission of Dubbo Christian School.',
    body: 'DCS is a Bible-based, Christ-centred school that partners with families to disciple students and provide a high-quality education.',
  },
];