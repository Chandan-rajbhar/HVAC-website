// Syncable HVAC Companion State matching c:\Users\Uxdlab\Desktop\HVAC system (hvacData.js / HVACContext.jsx)

export const HVAC_SYNC_STORAGE_KEY = 'notech_hvac_sync_state';
export const HVAC_SYNC_CHANNEL = 'notech_hvac_sync';
export const HVAC_SYNC_API = '/api/hvac-sync';

export const INITIAL_COMPANION_STATE = {
  power: true,
  currentTemp: 72,
  targetTemp: 70,
  tempUnit: 'F', // 'F' | 'C'
  mode: 'cooling', // 'cooling' | 'heating' | 'auto' | 'eco'
  fanSpeed: 'auto', // 'low' | 'med' | 'high' | 'auto' | 'turbo'
  faceplateColor: 'white', // 'white' | 'tan' | 'red' | 'blue'
  filterLife: 78,
  daysUntilAdvance: 21,
  seasonsRemaining: 3,
  systemHealth: 96,
  roomHumidity: 46,
  outdoorTemp: 79,
  airQuality: 'Excellent',
  lastSync: 'Just now',
  syncStatus: 'connected',
  model: 'NO-TECH VIVID-400 In-Wall HVAC',
  serialNumber: 'NT-8492-2026-X',
  customer: {
    name: 'Sarah Jenkins',
    email: 'customer@notechhvac.com',
  },
  contractor: {
    id: 'cnt-01',
    company: 'Apex Precision Mechanical & HVAC',
    technician: 'David Vance',
    phone: '1-800-555-NOTECH',
    installedDate: 'October 14, 2024',
  },
  compartments: [
    {
      id: 'heating',
      name: 'Modular Heating Element',
      shortName: 'Heating',
      slot: 1,
      lifeMonths: 60,
      usedMonths: 9,
      status: 'operational',
      ledStatus: 'green',
      spec: 'PTC Ceramic 3.8 kW',
      lastService: 'Installed Oct 14, 2024',
      nextDue: 'Oct 2029',
    },
    {
      id: 'evaporator',
      name: 'Evaporator Coil Cassette',
      shortName: 'Evaporator',
      slot: 2,
      lifeMonths: 48,
      usedMonths: 9,
      status: 'operational',
      ledStatus: 'green',
      spec: 'Micro-Channel R-454B Eco Coil',
      lastService: 'Inspected Oct 14, 2024',
      nextDue: 'Oct 2028',
    },
    {
      id: 'blower',
      name: 'Modular Blower Array',
      shortName: 'Quad Blower',
      slot: 3,
      lifeMonths: 36,
      usedMonths: 18,
      status: 'operational',
      ledStatus: 'green',
      spec: '4x Brushless DC Blower Motors (480 CFM)',
      lastService: 'Routine cycle check',
      nextDue: 'Oct 2027',
    },
    {
      id: 'filtration',
      name: 'Modular Filtration Compartment',
      shortName: 'Smart Filter',
      slot: 4,
      lifeMonths: 3,
      usedDays: 69,
      daysRemaining: 21,
      status: 'operational',
      ledStatus: 'green',
      spec: '4-Season Continuous Media Dispenser (MERV 14)',
      lastService: 'Auto-advance completed 9 days ago',
      nextDue: 'In 21 days',
    },
  ],
  maintenanceHistory: [
    {
      id: 'h-1',
      date: 'Nov 09, 2026',
      title: 'Automatic Filter Media Advance',
      compartment: 'Filtration Dispenser',
      technician: 'System Automated',
      type: 'auto',
      status: 'Success',
      notes: 'Media index advanced 18 inches. Static pressure reduced by 0.12 in. w.g.',
    },
    {
      id: 'h-2',
      date: 'Oct 14, 2024',
      title: 'Full Modular Commissioning',
      compartment: 'All 4 Compartments',
      technician: 'Apex Climate Solutions (#ACS-9021)',
      type: 'manual',
      status: 'Verified',
      notes: 'Initial in-wall install and electrical bus synchronization.',
    },
  ],
};

export const COMPANION_FACEPLATES = [
  { id: 'white', name: 'Polar White', hex: '#F8FAFC' },
  { id: 'tan', name: 'Architectural Tan', hex: '#C8B69E' },
  { id: 'red', name: 'Heritage Red', hex: '#C83228' },
  { id: 'blue', name: 'Deep Navy Blue', hex: '#1E3A8A' },
];

export function loadCompanionState() {
  try {
    const raw = localStorage.getItem(HVAC_SYNC_STORAGE_KEY);
    if (!raw) return INITIAL_COMPANION_STATE;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_COMPANION_STATE, ...parsed };
  } catch {
    return INITIAL_COMPANION_STATE;
  }
}

export function saveCompanionState(nextState, { pushRemote = true } = {}) {
  try {
    localStorage.setItem(HVAC_SYNC_STORAGE_KEY, JSON.stringify(nextState));
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel(HVAC_SYNC_CHANNEL);
      ch.postMessage(nextState);
      ch.close();
    }
  } catch {
    // ignore storage quota errors
  }

  if (pushRemote && typeof fetch !== 'undefined') {
    fetch(HVAC_SYNC_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextState),
    }).catch(() => {
      // ignore if static preview without dev server
    });
  }
}

export async function fetchSyncedCompanionState() {
  try {
    const res = await fetch(HVAC_SYNC_API);
    if (!res.ok) return null;
    const json = await res.json();
    if (json?.ok && json?.data) {
      return { ...INITIAL_COMPANION_STATE, ...json.data };
    }
  } catch {
    // ignore if offline
  }
  return null;
}
