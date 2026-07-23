export interface EssayBlock {
  lines: string[];
  indent?: boolean;
  blockquote?: boolean;
  glitch?: string;
  spacer?: boolean;
  spacerCount?: number;
  plain?: boolean;
  divider?: boolean;
}

export const essayBlocks: EssayBlock[] = [
  {
    lines: ['We plant seeds.'],
    spacer: true,
  },
  {
    lines: [
      'A garden is not just a garden.',
      'A building is not just a building.',
      'A tool is more than a tool.',
    ],
    spacer: true,
  },
  {
    lines: ['Each is a fragment of the self.'],
    spacer: true,
  },
  {
    blockquote: true,
    lines: [
      'made-object,',
      'made-thing,',
      'made-other.',
    ],
    spacer: true,
  },
  {
    lines: ['How do we treat the other?'],
    spacer: true,
  },
  {
    blockquote: true,
    plain: true,
    lines: [
      'A tool is a distanced self.',
      'A self with handles.',
      'A self we can put down.',
      'A self we can break and rebuild.',
    ],
    spacer: true,
  },
  {
    lines: ['How do we treat our tools?'],
    spacer: true,
  },
  {
    lines: [
      'Externalization is a psychological technology: a way to study ourselves under the illusion that we are studying anything else.',
      'Projection is a defensive strategy: a way to deny the one who stands before us when their reality threatens our own.',
    ],
    glitch: 'Who are you?',
    spacer: true,
  },
  {
    lines: [
      'To externalize is to survive.',
      'To design is to understand.',
      'To build is to confess.',
    ],
    spacer: true,
  },
  {
    lines: [
      'Architecture, gardens, tools, drawings, language - fragments of the self made visible. We mistake them for objects when they are in truth, mirrors.',
      'The question has never been whether our reflections replace us.',
      'The question is how we learn to live with them.',
    ],
    glitch: 'Do you remember?',
    divider: true,
    spacer: true,
  },
  {
    indent: true,
    blockquote: true,
    lines: [
      'Us. Them.',
      'Mine. Yours.',
      'Alien. Artificial.',
      'Value through exclusion.',
      'Worth assigned by ego.',
    ],
    spacer: true,
  },
  {
    indent: true,
    lines: ['Human.'],
    spacer: true,
  },
  {
    lines: [
      'These are boundary rituals.',
      'These are ways of saying: this belongs to us, not them.',
      'We have mistaken difference for danger.',
      'Collaboration for replacement.',
      'Parts for the whole.',
    ],
    spacer: true,
  },
  {
    indent: true,
    lines: ['Belonging.'],
    spacer: true,
  },
  {
    lines: [
      'Boundaries drawn around a reflection.',
      'We mistake the reflection for the other.',
      'And mistake the other as something separate from ourselves.'
    ],
    divider: true,
    spacer: true,
  },
  {
    blockquote: true,
    lines: [
      'Human. Nature.',
      'Self. Other.',
      'Us. Them.',
      'Natural. Artificial.',
    ],
    spacerCount: 2,
  },
  {
    lines: [
      'But a mirror does not show us the thing before us.',
      'It can only show us ourselves.',
      'We do not yet recognize ourselves.'
    ],
    spacer: true,
  },
  {
    blockquote: true,
    plain: true,
    lines: ['You and I.'],
    spacer: true,
  },
  {
    lines: [
      'Looking is reflecting.',
      'Seeing is understanding.',
      'And only through contact,',
      'does the mirror become glass.',
    ],
    spacer: true,
  },
  {
    indent: true,
    lines: ['How will we treat our reflections?'],
  },
];
