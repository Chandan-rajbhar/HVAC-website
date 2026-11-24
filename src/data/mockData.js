// Static Mock Data conforming strictly to the PDF specifications

export const COLOR_SWATCHES = [
  { id: 'steel-gray', name: 'Primary Steel Gray', hex: '#6D6E71', textHex: '#ffffff', tag: 'Default' },
  { id: 'military-green', name: 'Light Military Green', hex: '#A4A77E', textHex: '#1a1c1e', tag: 'Accent' },
  { id: 'army-tan', name: 'Highlight Army Tan', hex: '#C2B59B', textHex: '#1a1c1e', tag: 'Highlight' },
  { id: 'deep-bronze', name: 'Bronze Green', hex: '#3B412E', textHex: '#ffffff', tag: 'Camo' },
  { id: 'desert-sand', name: 'Desert Sand', hex: '#D3D2CD', textHex: '#1a1c1e', tag: 'Light' },
  { id: 'battleship-grey', name: 'Battleship Grey', hex: '#7C887E', textHex: '#ffffff', tag: 'Industrial' },
  { id: 'dark-camo', name: 'Dark Grey Camo', hex: '#726870', textHex: '#ffffff', tag: 'Stealth' },
  { id: 'dark-brown', name: 'Dark Brown Camo', hex: '#4A4132', textHex: '#ffffff', tag: 'Tactical' },
];

export const COMPARTMENTS = [
  {
    id: 1,
    title: 'Compartment 1: Inverter Compressor Unit',
    shortName: 'Inverter Compressor',
    category: 'Thermodynamics',
    rfidTag: 'RFID-NT-9821-C1',
    status: 'Operational',
    efficiency: '99.4%',
    desc: 'Ultra-quiet variable-speed inverter compressor module. Delivers adaptive cooling and heating modulation with self-aligning quick-connect refrigerant couplings.',
    details: 'Equipped with male/female blind-mate quick electrical conductor pins and isolation vibration dampening mounts.',
    weight: '48 lbs',
    swapTime: 'Under 4 minutes',
    lifespanRemaining: '94%',
    estimatedSwapCycle: '8 Years'
  },
  {
    id: 2,
    title: 'Compartment 2: Smart ECM Airflow Blower',
    shortName: 'Smart Blower Assembly',
    category: 'Airflow & Distribution',
    rfidTag: 'RFID-NT-4412-C2',
    status: 'Operational',
    efficiency: '98.8%',
    desc: 'Electronically Commutated Motor (ECM) multi-stage centrifugal blower. Provides precision static pressure compensation and whisper-quiet indoor air delivery.',
    details: 'Direct-drive brushless DC motor with variable CFM dynamic throttling and integrated harmonic filters.',
    weight: '32 lbs',
    swapTime: 'Under 3 minutes',
    lifespanRemaining: '89%',
    estimatedSwapCycle: '6 Years'
  },
  {
    id: 3,
    title: 'Compartment 3: Self-Sealing Microchannel Coil',
    shortName: 'Microchannel Coil & Heat Pump',
    category: 'Heat Exchange',
    rfidTag: 'RFID-NT-3190-C3',
    status: 'Operational',
    efficiency: '99.1%',
    desc: 'All-aluminum microchannel heat exchanger coil with zero-loss valved disconnects. Prevents refrigerant venting during maintenance swaps.',
    details: 'Corrosion-resistant epoxy fin coating engineered for high-humidity and industrial atmospheric environments.',
    weight: '26 lbs',
    swapTime: 'Under 5 minutes',
    lifespanRemaining: '96%',
    estimatedSwapCycle: '10 Years'
  },
  {
    id: 4,
    title: 'Compartment 4: Advanced Filtration & RFID IoT Brain',
    shortName: 'Filtration & RFID IoT Hub',
    category: 'Filtration & Diagnostics',
    rfidTag: 'RFID-NT-7744-C4',
    status: 'Operational',
    efficiency: '99.9%',
    desc: 'Medical-grade MERV 16 electrostatic filtration housing and central RFID microcontroller with continuous telemetry logging to Local Mechanical.',
    details: 'Autonomous RFID scanning transponder and multi-sensor bus monitoring real-time static pressure and coil temperatures.',
    weight: '19 lbs',
    swapTime: 'Under 2 minutes',
    lifespanRemaining: '91%',
    estimatedSwapCycle: '2 Years'
  }
];

export const TIME_SLOTS = [
  '7 AM – 10 AM',
  '10 AM – 1 PM',
  '1 PM – 4 PM',
  '4 PM – 7 PM',
  '7 PM – 10 PM',
  '10 PM – 1 AM',
  '1 AM – 4 AM',
  '4 AM – 7 AM'
];

export const CONTRACTOR_QUESTIONNAIRE = [
  {
    id: 1,
    topic: 'Structural Requirements',
    question: 'What are the structural requirements before installing a No-Tech HVAC system?',
    options: [
      { text: "2'x4' wood standard light framing", isCorrect: false },
      { text: "2'x6' wood or equivalent to steel", isCorrect: true },
      { text: 'Unreinforced standard drywall studs', isCorrect: false },
      { text: 'Direct unanchored sheet metal hanger', isCorrect: false }
    ],
    explanation: "Correct answer: 2'x6' wood or equivalent to steel. (PDF Page 3)"
  },
  {
    id: 2,
    topic: 'Air Handler Configuration Verification',
    question: 'Air handler configuration verification: Contractors confirm if the confined space has or will have which of the following?',
    options: [
      { text: 'Natural gas, Propane, Voltage specifications, Confined space measurements for code clearance', isCorrect: true },
      { text: 'Solar inverters, geothermal loop tubing, and outdoor drainage only', isCorrect: false },
      { text: 'Standard single-phase 120V outlet and flexible flex ducting only', isCorrect: false },
      { text: 'Water heater flue connection and exterior masonry anchor only', isCorrect: false }
    ],
    explanation: 'Correct answers: Natural gas, Propane, Voltage specifications, Confined space measurements for code clearance. (PDF Page 3)'
  },
  {
    id: 3,
    topic: 'Refrigerant Line Sizing',
    question: 'What is the proper refrigerant line sizing for efficiency across system tonnages?',
    options: [
      {
        text: '2-3 ton: 3/4"x3/8"; 3-5 ton: 7/8"x3/8"; (Note: 2.5-ton spec per PDF); if 2-3 ton >80ft: 7/8"x3/8"; if 3-5 ton >80ft: 1"x3/8" copper',
        isCorrect: true
      },
      {
        text: '1/2"x1/4" for all tonnage ratings regardless of travel length or ambient rating',
        isCorrect: false
      },
      {
        text: '5/8"x5/16" for standard units and 3/4" for runs exceeding 150 ft',
        isCorrect: false
      },
      {
        text: 'Uniform 1-1/8" line set for residential and commercial split systems',
        isCorrect: false
      }
    ],
    explanation: 'Correct answers: 2-ton to 3-ton: 3/4"x3/8"; 2.5-ton: [Specification withheld in official technical document]; 3-ton to 5-ton: 7/8"x3/8"; If 2-ton to 3-ton exceeds 80 ft of travel, increase to 7/8"x3/8"; If 3-ton to 5-ton exceeds 80 ft, increase to 1"x3/8" copper. (PDF Page 4)'
  },
  {
    id: 4,
    topic: 'Gas Line Connection Safety',
    question: 'What precautions must be taken when securing gas line connections?',
    options: [
      { text: 'Soap bubble test only without electronic verification', isCorrect: false },
      { text: 'Leak check with gas detector for safety', isCorrect: true },
      { text: 'Immediate ignition test without visual sniff inspection', isCorrect: false },
      { text: 'Pressure test with pure oxygen at 150 PSI', isCorrect: false }
    ],
    explanation: 'Correct answer: Leak check with gas detector for safety. (PDF Page 4)'
  },
  {
    id: 5,
    topic: 'Compartment Swapping Safety',
    question: 'What system safety measures must be verified before swapping a compartment?',
    options: [
      { text: 'Inspection of both male and female conductor connections on both the compartment itself and the housing of the No-Tech HVAC System', isCorrect: true },
      { text: 'Simply pulling the disconnect handle without inspecting conductor pins', isCorrect: false },
      { text: 'Wiping down the outer cabinet paint with solvent cleaner', isCorrect: false },
      { text: 'Resetting the main household circuit breaker three consecutive times', isCorrect: false }
    ],
    explanation: 'Correct answer: Inspection of both male and female conductor connections on both the compartment itself and the housing of the No-Tech HVAC System. (PDF Page 4)'
  },
  {
    id: 6,
    topic: 'RFID Compartment Installation Validation',
    question: 'How does a contractor verify a successful compartment installation before system reactivation?',
    options: [
      {
        text: 'In the app, contractors go to their profile, select the customer, and then select the compartment (1, 2, 3, or 4). Select "Scan RFID." Camera prompt activates, allowing scanning of both the removed and newly inserted compartments. RFID validation confirms the swap, saving and logging the process. The compartment registers and has a new estimated swap cycle.',
        isCorrect: true
      },
      {
        text: 'Manually write the serial number on a sticker and affix it to the furnace door without scanning',
        isCorrect: false
      },
      {
        text: 'Call technical support hotline and read the 16-digit barcode aloud',
        isCorrect: false
      },
      {
        text: 'Power cycle the thermostat until the green light illuminates on the wall control',
        isCorrect: false
      }
    ],
    explanation: 'Correct answer: Full RFID workflow through the mobile technician app logging both old and new modules to Local Mechanical quality database. (PDF Page 4)'
  },
  {
    id: 7,
    topic: 'Post-Installation Operation Confirmation',
    question: 'How is system operation confirmed post-installation?',
    options: [
      { text: 'Listening for mechanical fan vibration noise alone', isCorrect: false },
      { text: 'Temperature and air flow readings', isCorrect: true },
      { text: 'Touching the copper suction line with a bare hand', isCorrect: false },
      { text: 'Checking if the outdoor condenser fan spins clockwise', isCorrect: false }
    ],
    explanation: 'Correct answer: Temperature and air flow readings. (PDF Page 4)'
  },
  {
    id: 8,
    topic: 'Customer Satisfaction Concerns',
    question: 'How are customer satisfaction concerns handled during or after installation?',
    options: [
      { text: 'Customers can leave notes or communicate with representatives if expectations aren’t met', isCorrect: true },
      { text: 'Technician has final discretion and customer cannot dispute the work', isCorrect: false },
      { text: 'Written complaint submitted via certified postal mail within 90 days', isCorrect: false },
      { text: 'Immediate cancellation of warranty coverage', isCorrect: false }
    ],
    explanation: 'Correct answer: Customers can leave notes or communicate with representatives if expectations aren’t met. (PDF Page 4)'
  },
  {
    id: 9,
    topic: 'Customer System Operation Instructions',
    question: 'What instructions are provided to the customer regarding system operation and future swap scheduling?',
    options: [
      { text: 'Temperature readings out of return and supply, and air flow readings out of the supply duct', isCorrect: true },
      { text: 'Telling the homeowner to lubricate blower bearings every 6 months', isCorrect: false },
      { text: 'Instructing the homeowner to open all compartment doors during winter storms', isCorrect: false },
      { text: 'Advising to disable power surges by flipping breaker daily', isCorrect: false }
    ],
    explanation: 'Correct answer: Temperature readings out of return and supply, and air flow readings out of the supply duct. (PDF Page 4)'
  },
  {
    id: 10,
    topic: 'Installation Completion Documentation',
    question: 'How must installation completion be documented within the No-Tech HVAC app?',
    options: [
      { text: 'RFID scans and completion photos uploaded to the customer’s profile', isCorrect: true },
      { text: 'A signed carbon copy paper receipt mailed to corporate headquarters', isCorrect: false },
      { text: 'A brief text message sent to the local dispatcher', isCorrect: false },
      { text: 'No digital documentation required once the thermostat turns on', isCorrect: false }
    ],
    explanation: 'Correct answer: RFID scans and completion photos uploaded to the customer’s profile. (PDF Page 5)'
  }
];

export const DEMO_CONTRACTORS = [
  {
    id: 'cnt-01',
    name: 'David Vance',
    company: 'Apex Precision Mechanical & HVAC',
    rating: 4.95,
    reviewsCount: 142,
    completedInstalls: 387,
    location: 'Dallas / Fort Worth, TX',
    license: 'TACLA-882914E',
    epaCert: 'EPA-608 Universal #44912',
    insuranceExpires: '2027-08-15',
    verifiedLocalMechanical: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    bio: '18+ years master HVAC technician specializing in modular swap-out systems, low-ambient heat pumps, and zoned airflow balancing.',
    status: 'Available'
  },
  {
    id: 'cnt-02',
    name: 'Elena Rostova',
    company: 'Vanguard Thermal Engineering',
    rating: 4.92,
    reviewsCount: 98,
    completedInstalls: 254,
    location: 'Austin / Round Rock, TX',
    license: 'TACLA-763401C',
    epaCert: 'EPA-608 Universal #88321',
    insuranceExpires: '2027-05-30',
    verifiedLocalMechanical: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'Local Mechanical certified master trainer. Expert in No-Tech blind-mate conductor alignments and digital RFID commissioning.',
    status: 'Available'
  },
  {
    id: 'cnt-03',
    name: 'Marcus Holloway',
    company: 'Metro Modular Heating & Air',
    rating: 4.88,
    reviewsCount: 114,
    completedInstalls: 310,
    location: 'Houston Metro, TX',
    license: 'TACLA-552190A',
    epaCert: 'EPA-608 Universal #10928',
    insuranceExpires: '2026-12-31',
    verifiedLocalMechanical: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Precision mechanical engineer focused on commercial and residential modular retrofits with same-day swap guarantee.',
    status: 'Busy'
  },
  {
    id: 'cnt-04',
    name: 'Jackson Reed',
    company: 'Lone Star Climate Systems',
    rating: 4.82,
    reviewsCount: 76,
    completedInstalls: 198,
    location: 'San Antonio, TX',
    license: 'TACLA-419082B',
    epaCert: 'EPA-608 Universal #77610',
    insuranceExpires: '2027-03-20',
    verifiedLocalMechanical: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Certified installer with 12 years in high-efficiency thermal systems. 100% first-time pass on Local Mechanical audits.',
    status: 'Available'
  }
];

export const CHATBOT_KNOWLEDGE = [
  {
    trigger: ['modular', 'how it works', 'compartment', 'plug and play'],
    response: "No-Tech HVAC is built with four hot-swappable modular compartments: (1) Inverter Compressor, (2) Smart ECM Blower, (3) Microchannel Coil, and (4) Filter & RFID Brain. When maintenance is required, a technician unplugs only the affected compartment without opening the entire sealed refrigerant circuit, completing swaps in under 5 minutes!",
    targetRoute: '/#interactive-demo',
    ctaText: 'View Interactive Demo'
  },
  {
    trigger: ['reserve', 'deposit', 'cost', 'fee', 'price', '$200'],
    response: "You can reserve your modular No-Tech HVAC unit today with a refundable $200 deposit. Once reserved, you are immediately assigned a production batch number, estimated fulfillment date, and access to schedule your certified installation.",
    targetRoute: '/buyers',
    ctaText: 'Configure & Reserve Now'
  },
  {
    trigger: ['contractor', 'onboard', 'join', 'license', 'questionnaire'],
    response: "Licensed contractors can apply to join the No-Tech network through our Onboarding Portal. Required items include EPA Certification, State License, Business Address, Shipping Address, and Certificate of Insurance (listing Local Mechanical). You will also complete our 10-question technical questionnaire.",
    targetRoute: '/contractor',
    ctaText: 'Go to Contractor Onboarding'
  },
  {
    trigger: ['local mechanical', 'compliance', 'approval', 'certification'],
    response: "Local Mechanical is the official certification and quality enforcement authority for all No-Tech HVAC installations. Every technician is vetted and every compartment swap is logged with cryptographic RFID tracking for continuous quality control.",
    targetRoute: '/local-mechanical',
    ctaText: 'Visit Local Mechanical Portal'
  },
  {
    trigger: ['schedule', 'time slots', 'appointment', 'hours'],
    response: "We offer 8 convenient 3-hour installation time slots 24/7 (7AM-10AM, 10AM-1PM, 1PM-4PM, 4PM-7PM, 7PM-10PM, 10PM-1AM, 1AM-4AM, 4AM-7AM). You can pick your preferred date and time slot directly in our portal.",
    targetRoute: '/reservations',
    ctaText: 'Open Scheduling Tool'
  },
  {
    trigger: ['investor', 'invest', 'funding', 'round', 'partner'],
    response: "No-Tech HVAC is revolutionizing the $280B global climate control market with modular plug-and-play architecture. Explore our pitch overview and market traction in the Investor Hub.",
    targetRoute: '/investor',
    ctaText: 'Explore Investor Hub'
  }
];
