export const FOUNDER_DATA = {
  name: "Oyewole Samod Atanda",
  title: "Founder & Visionary",
  credentials: "First-Class Graduate, Chemical & Polymer Engineering | Multiple-Time Scholar of the Year",
  institution: "Lagos State University (LASU)",
  photo: "/Founder.jpg",
  narrative: `NEX was conceived and founded by Oyewole Samod Atanda, a first-class graduate of Chemical and Polymer Engineering from Lagos State University, and a multiple-time recipient of the Scholar of the Year award. Driven by a conviction that engineering education must extend beyond the classroom into real, implemented solutions, he conceptualized NEX to bridge the gap between academic research and real-world societal impact. NEX stands today as a testament to what happens when academic excellence is paired with a genuine commitment to community transformation.`
};



export const FOCUS_AREAS = [
  {
    id: "water",
    title: "Water",
    icon: "Droplets",
    description: "Purification, solar irrigation systems, flood mitigation, and campus distribution network optimization.",
    color: "from-blue-500 to-cyan-400",
    subdomains: ["Purification", "Irrigation", "Flood Management", "Distribution"]
  },
  {
    id: "energy",
    title: "Energy",
    icon: "Zap",
    description: "Solar photovoltaic integration, bioenergy generation, biogas digesters, and energy storage efficiency.",
    color: "from-amber-500 to-orange-400",
    subdomains: ["Solar PV", "Bioenergy", "Biogas", "Energy Efficiency"]
  },
  {
    id: "waste",
    title: "Waste",
    icon: "Recycle",
    description: "Plastic recycling, circular economy frameworks, waste-to-energy technologies, and campus litter reduction.",
    color: "from-emerald-500 to-teal-400",
    subdomains: ["Recycling", "Circular Economy", "Waste-to-Energy", "Plastic Mgmt"]
  },
  {
    id: "agriculture",
    title: "Agriculture",
    icon: "Sprout",
    description: "Smart farming IoT sensors, food security, post-harvest solar preservation, and hydroponic systems.",
    color: "from-green-600 to-emerald-400",
    subdomains: ["Smart Farming", "Food Security", "Post-Harvest", "Precision Ag"]
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: "Building2",
    description: "Affordable eco-housing, sustainable eco-bricks, smart campus lighting, and rainwater harvesting structures.",
    color: "from-purple-600 to-indigo-400",
    subdomains: ["Affordable Housing", "Smart Cities", "Sustainable Constr.", "Eco-Materials"]
  },
  {
    id: "digital",
    title: "Digital Innovation",
    icon: "Cpu",
    description: "AI machine learning diagnostics, embedded IoT firmware, automated monitoring systems, and software platforms.",
    color: "from-sky-500 to-indigo-500",
    subdomains: ["Artificial Intelligence", "Embedded Systems", "IoT & Robotics", "Software Dev"]
  }
];

export const PUBLISHED_PROJECTS = [
  {
    id: "proj-1",
    title: "Solar-Powered Multi-Stage Water Purification Kiosk",
    cycle: "2026 First Cycle",
    focusArea: "Water",
    teamName: "AquaX Team",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    abstract: "A self-contained solar water kiosk capable of filtering 2,500 liters of river water daily using UV-C disinfection and bio-sand filters for rural communities.",
    metrics: { before: "84 NTU Turbidity", after: "< 1 NTU Safe Standard", impact: "2,500 L/day capacity" },
    authors: ["Samod Atanda", "Tunde Lawal", "Zainab Alabi"],
    publishedDate: "2026-06-15",
    pdfUrl: "#",
    featured: true
  },
  {
    id: "proj-2",
    title: "IoT Hydroponic Smart Farm & Post-Harvest Solar Dryer",
    cycle: "2026 First Cycle",
    focusArea: "Agriculture",
    teamName: "AgriTech Pioneers",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
    abstract: "Integrated precision hydroponics system reducing water consumption by 85% with an automated solar crop dehumidifier extending vegetable shelf-life by 21 days.",
    metrics: { before: "4 Days Tomato Lifespan", after: "25 Days Shelf-Life", impact: "85% Water Reduction" },
    authors: ["Chidinma Nwosu", "Kelechi Okafor", "Victor Adeyemi"],
    publishedDate: "2026-05-20",
    pdfUrl: "#",
    featured: true
  },
  {
    id: "proj-3",
    title: "Waste Plastic to Thermal Insulation Bricks",
    cycle: "2025 Second Cycle",
    focusArea: "Waste",
    teamName: "EcoBuild Innovators",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    abstract: "Converting low-density polyethylene campus waste into compressed structural eco-bricks with 3x higher thermal resistance than conventional cement.",
    metrics: { before: "1.2 Ton Campus Waste/mo", after: "800kg Recycled/mo", impact: "3x Insulation Power" },
    authors: ["Engr. Femi Babatunde", "Amina Yusuf", "Blessing Eniola"],
    publishedDate: "2025-12-10",
    pdfUrl: "#",
    featured: true
  }
];

export const CURRENT_CYCLE = {
  id: "cycle-2026-1",
  name: "2026 First Cycle (Harmattan Phase)",
  status: "Development", // Options: Forming, Research, Review, Development, Closed
  startDate: "2026-02-01",
  endDate: "2026-08-31",
  totalMembers: 142,
  activeGroups: 24,
  selectedProjectsCount: 4,
  proposalsSubmitted: 18
};

export const MOCK_USER_PROFILES = {
  publicGuest: {
    id: "guest-000",
    name: "Visitor",
    email: "guest@nex.edu.ng",
    role: "public",
    avatar: null
  },
  execAdmin: {
    id: "exec-000",
    name: "Engr. Oyewole Samod Atanda",
    email: "admin@lasu.edu.ng",
    role: "exec_admin",
    dept: "Executive Governance & Administration",
    level: "Executive Level",
    points: 0,
    avatar: null
  },
  unplacedStudent: {
    role: "unplaced_member",
    id: "usr-101",
    name: "David Olanrewaju",
    matric: "200408112",
    email: "d.olanrewaju@student.lasu.edu.ng",
    dept: "Faculty of Engineering (Electrical)",
    level: "300 Level",
    skills: ["Embedded Systems", "C++", "Circuit Design", "IoT"],
    focusAreaInterest: ["Energy", "Digital Innovation"],
    status: "Verified (Unplaced)",
    points: 120
  },
  researchMember: {
    role: "group_member_research",
    id: "usr-202",
    name: "Nkechi Eze",
    matric: "210405089",
    email: "n.eze@student.lasu.edu.ng",
    dept: "Faculty of Environmental Sciences",
    level: "400 Level",
    skills: ["GIS Mapping", "CAD Design", "Environmental Impact Assessment"],
    group: {
      id: "grp-alpha",
      name: "Group Alpha - Clean Hydro Systems",
      focusArea: "Water",
      status: "Researching",
      members: [
        { name: "Nkechi Eze", dept: "Environmental Sciences", role: "Environmental Lead" },
        { name: "Segun Arinze", dept: "Engineering (Chemical)", role: "Chemical Analyst" },
        { name: "Fatima Bello", dept: "Agriculture (Soil Science)", role: "Agricultural Specialist" },
        { name: "Tobi Bakre", dept: "Engineering (Mechanical)", role: "CAD & Fluid Dynamics" },
        { name: "Emeka Okonkwo", dept: "Engineering (Computer)", role: "IoT Firmware" }
      ]
    },
    status: "Placed in Group",
    points: 340
  },
  selectedMember: {
    role: "group_member_selected",
    id: "usr-303",
    name: "Tunde Lawal",
    matric: "190401055",
    email: "t.lawal@student.lasu.edu.ng",
    dept: "Faculty of Engineering (Mechanical)",
    level: "500 Level",
    skills: ["CAD 3D", "Thermodynamics", "Prototyping", "Project Mgmt"],
    group: {
      id: "grp-solar",
      name: "Selected Project: High-Efficiency Biogas Digester Kiosk",
      focusArea: "Energy",
      status: "Selected",
      proposalId: "prop-99",
      members: [
        { name: "Tunde Lawal", dept: "Engineering (Mechanical)", role: "Build Lead" },
        { name: "Zainab Alabi", dept: "Environmental Sciences", role: "Safety Inspector" },
        { name: "Kelechi Okafor", dept: "Agriculture", role: "Feedstock Specialist" },
        { name: "Sam Charles", dept: "Engineering (Computer)", role: "Sensors & Telemetry" },
        { name: "Amina Yusuf", dept: "Environmental Sciences", role: "Documentation" }
      ]
    },
    status: "Placed in Selected Project",
    points: 780
  },
  execAdmin: {
    role: "exec_admin",
    id: "usr-001",
    name: "Engr. Femi Babatunde",
    email: "femi.b@nex.org.ng",
    dept: "Technical & Research Lead",
    permissions: ["proposal_review", "group_placement", "analytics", "exec_mgmt", "content_mgmt"],
    points: 1250
  }
};


