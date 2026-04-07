import type { TechfestEvent } from '../types/event'

const poster =
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'

export const mockEvents: TechfestEvent[] = [
  {
    organizerId: 'org-1',
    title: 'I-SPY EVENT',
    slug: 'ispy',
    tagline: 'Silicon Valley themed Treasure Hunt',
    description: 'A full-day elimination-based treasure hunt. Participants solve binary puzzles, tech item guesses, and logic gate problems across RIT Campus blocks named after Silicon Valley companies, leading to high-stakes escape rooms.',
    posterURL: '/events/ispy.jpeg',
    dateTime: new Date('2026-04-11T08:00:00Z').toISOString(),
    venue: 'RIT Campus (Various Blocks)',
    prizePool: [
      { position: 1, amount: 5000 },
      { position: 2, amount: 3000 },
      { position: 3, amount: 2000 },
    ],
    minTeamSize: 3,
    maxTeamSize: 3,
    maxCapacity: 60, 
    registrationCount: 41,
    registrationStatus: 'OPEN',
    isVisible: true,
    registrationFees: { standard: 0, ieeeMember: 0 },
    rules: [
      'Team Composition: 3 members per team. Multi-disciplinary teams are encouraged.',
      'No external assistance is allowed.',
      'Respect the code of conduct: fairness, sportsmanship, and adherence to the rules.',
      'Participants must decode puzzles, solve questions, and find items to progress.',
      'Eliminations occur after Section 1 (Top 20), Section 2 (Top 10), and Section 3 (Top 5).'
    ],
        faqs: [
      {
        question: 'Who can participate?',
        answer: 'Open to undergraduate students.',
      },
      {
        question: 'How many members are required in a team?',
        answer: 'Each team must have exactly 3 members.',
      },
      {
        question: 'Are digital tools allowed?',
        answer: 'Only as specified in challenges; no external assistance.',
      },
      {
        question: 'How is the winner decided?',
        answer: 'Based on speed and accuracy in solving clues across all rounds.',
      },
    ],
    coordinators: [
      { name: 'Shivesh Tiwari', contactNumber: '9919403869' },
      { name: 'Ahad Ulla Baig', contactNumber: '9110654973' },
    ],
  },
  {
    organizerId: 'org-1',
    title: 'ROCKET LEAGUE: ROBO SOCCER',
    slug: 'robo-soccer',
    tagline: 'Understand the system by decoding its behavior',
    description: 'A 2v2 robo soccer tournament on an 8x5 meter field. Features bracket-style progression with evolving mechanics like inverted controls and "No Brake" full-throttle mode in the finale.',
    posterURL: '/events/robosoccer.jpeg',
    dateTime: new Date('2026-04-11T10:00:00Z').toISOString(),
    venue: 'TBD',
    prizePool: [
      { position: 1, amount: 5000 },
      { position: 2, amount: 3000 },
      { position: 3, amount: 2000 },
    ],
    minTeamSize: 2,
    maxTeamSize: 2,
    maxCapacity: 32,
    registrationCount: 30,
    registrationStatus: 'OPEN',
    isVisible: true,
    rules: [
      'Match consists of three rounds, each lasting 2 minutes.',
      'The ball must always be in motion; teams switch directions after each round.',
      'Participants may NOT touch the bots; handling is by authorized volunteers only.',
      'Deliberate blocking or unfair interference results in a free kick or point deduction.',
      'Deadlock Rule: If robots are stuck for >3 seconds, a free kick is awarded to the non-offending team.'
    ],
      faqs: [
      {
        question: 'Who can participate?',
        answer: 'Open to undergraduate students.',
      },
      {
        question: 'How many members are required in a team?',
        answer: 'Each team must have exactly 3 members.',
      },
      {
        question: 'Are digital tools allowed?',
        answer: 'Only as specified in challenges; no external assistance.',
      },
      {
        question: 'How is the winner decided?',
        answer: 'Based on speed and accuracy in solving clues across all rounds.',
      },
    ],
    coordinators: [
      { name: 'Adit Bissa', contactNumber: '75686 84717' },
      { name: 'Abhishek Reddy T', contactNumber: '74835 70657' },
    ],
  }
]
export function getEventBySlug(slug: string): TechfestEvent | undefined {
  return mockEvents.find((e) => e.slug === slug)
}

export function capacityPercent(e: TechfestEvent): number {
  const n = e.registrationCount ?? 0
  if (e.maxCapacity <= 0) return 0
  return Math.min(100, Math.round((n / e.maxCapacity) * 100))
}

