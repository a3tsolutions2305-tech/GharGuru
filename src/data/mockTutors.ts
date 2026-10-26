import { Board, Grade, Subject, TutorProfile, ChildRequirement } from '../types';

export const BOARDS: Board[] = [
  { id: 'b1', name: 'Central Board of Secondary Education', code: 'CBSE', description: 'National curriculum emphasizing conceptual clarity and NCERT textbooks.' },
  { id: 'b2', name: 'Maharashtra State Board (SSC/HSC)', code: 'Maharashtra SSC', description: 'State curriculum with Balbharati textbooks, widely recognized across Maharashtra.' },
  { id: 'b3', name: 'Indian Certificate of Secondary Education', code: 'ICSE', description: 'Comprehensive, rigorous syllabus with strong emphasis on language and detailed sciences.' },
  { id: 'b4', name: 'National Institute of Open Schooling', code: 'NIOS', description: 'Flexible self-paced open learning board recognized across Indian universities.' },
];

export const GRADES: Grade[] = [
  { id: 'g1', displayName: 'Class 1', category: 'Primary (1-5)' },
  { id: 'g2', displayName: 'Class 2', category: 'Primary (1-5)' },
  { id: 'g3', displayName: 'Class 3', category: 'Primary (1-5)' },
  { id: 'g4', displayName: 'Class 4', category: 'Primary (1-5)' },
  { id: 'g5', displayName: 'Class 5', category: 'Primary (1-5)' },
  { id: 'g6', displayName: 'Class 6', category: 'Middle (6-8)' },
  { id: 'g7', displayName: 'Class 7', category: 'Middle (6-8)' },
  { id: 'g8', displayName: 'Class 8', category: 'Middle (6-8)' },
  { id: 'g9', displayName: 'Class 9', category: 'Secondary (9-10)' },
  { id: 'g10', displayName: 'Class 10 (Board Exam)', category: 'Secondary (9-10)' },
  { id: 'g11', displayName: 'Class 11 (Junior College)', category: 'Higher Secondary (11-12)' },
  { id: 'g12', displayName: 'Class 12 (HSC/Board)', category: 'Higher Secondary (11-12)' },
];

export const SUBJECTS: Subject[] = [
  { id: 's1', name: 'Mathematics', iconName: 'Calculator' },
  { id: 's2', name: 'Science & EVS', iconName: 'FlaskConical' },
  { id: 's3', name: 'Physics', iconName: 'Atom' },
  { id: 's4', name: 'Chemistry', iconName: 'TestTube' },
  { id: 's5', name: 'Biology', iconName: 'Dna' },
  { id: 's6', name: 'English Literature & Grammar', iconName: 'BookOpen' },
  { id: 's7', name: 'Hindi', iconName: 'Languages' },
  { id: 's8', name: 'Social Studies (History & Civics)', iconName: 'Landmark' },
  { id: 's9', name: 'Computer Science & Python', iconName: 'Code' },
];

export const MUMBAI_LOCALITIES = [
  'Andheri West (Lokhandwala, Oshiwara, Versova)',
  'Andheri East (Chakala, Marol, JB Nagar)',
  'Bandra West (Pali Hill, Carter Road, Bandstand)',
  'Powai (Hiranandani Gardens, Chandivali)',
  'Juhu & Vile Parle West',
  'Dadar & Matunga',
  'Borivali West (IC Colony, Shimpoli)',
  'Chembur (Diamond Garden, Collector Colony)',
  'Ghatkopar East & West',
  'Kandivali West (Mahavir Nagar)',
  'Thane West (Ghodbunder, Majiwada)',
  'Mulund West'
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    id: 'tut-1',
    userId: 'u-tut-1',
    fullName: 'Ananya Sharma',
    headline: 'Senior ICSE & CBSE Mathematics Specialist • 9+ Yrs Experience',
    bio: 'Dedicated home educator passionate about turning math anxiety into genuine confidence. Former senior faculty at a reputed Bandra academy. I emphasize conceptual foundations, step-by-step problem dissection, and disciplined board-exam paper solving.',
    qualificationSummary: 'M.Sc. Applied Mathematics (Mumbai University), B.Ed (St. Xavier’s Institute of Education)',
    educationDegrees: ['M.Sc. Applied Mathematics - University of Mumbai (2014)', 'B.Ed Mathematics & Science - SXIE (2016)'],
    yearsOfExperience: 9,
    teachingApproach: 'Diagnostic assessment during trial -> customized visual learning roadmaps -> weekly chapter tests with immediate error-analysis worksheets.',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Hindi', 'Marathi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['ICSE', 'CBSE'],
    grades: ['Class 8', 'Class 9', 'Class 10 (Board Exam)'],
    subjects: ['Mathematics', 'Physics'],
    primaryLocality: 'Bandra West (Pali Hill, Carter Road, Bandstand)',
    serviceAreas: [
      { locality: 'Bandra West', city: 'Mumbai', pincode: '400050', travelRadiusKm: 5 },
      { locality: 'Khar West', city: 'Mumbai', pincode: '400052', travelRadiusKm: 4 },
      { locality: 'Juhu & Vile Parle West', city: 'Mumbai', pincode: '400049', travelRadiusKm: 6 },
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 950,
      sessionDurationMinutes: 60,
      notes: 'Includes diagnostic assessment, customized homework worksheets, and quarterly mock papers.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v1', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-15', notes: 'Aadhaar verified' },
      { id: 'v2', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-16', notes: 'M.Sc. degree verified with Mumbai Univ' },
      { id: 'v3', type: 'Address Proof', status: 'verified', verifiedAt: '2026-01-16', notes: 'Electricity bill verified' },
      { id: 'v4', type: 'Background Check', status: 'verified', verifiedAt: '2026-01-18', notes: 'Clear police verification' }
    ],
    reviews: [
      {
        id: 'r1',
        parentName: 'Sunita Mehra (Bandra West)',
        rating: 5,
        comment: 'Ananya ma’am completely transformed my son’s relationship with Class 10 ICSE Math. His score jumped from 61% in prelims to 94% in the actual board exam! Her patience and rigor are unmatched.',
        date: '2026-03-12',
        subject: 'Mathematics',
        board: 'ICSE',
        grade: 'Class 10',
        isVerifiedTuition: true
      },
      {
        id: 'r2',
        parentName: 'Rajesh Kulkarni (Khar)',
        rating: 5,
        comment: 'Very punctual, highly professional home tutor. She brings curated questions from past 10 years of ICSE papers.',
        date: '2026-02-04',
        subject: 'Mathematics',
        board: 'ICSE',
        grade: 'Class 9',
        isVerifiedTuition: true
      }
    ],
    rating: 4.95,
    totalReviews: 18,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 2,
    createdAt: '2025-08-10'
  },
  {
    id: 'tut-2',
    userId: 'u-tut-2',
    fullName: 'Dr. Vikramaditya Kulkarni',
    headline: 'IIT Bombay Alum • Physics & Chemistry for CBSE & SSC (9-12)',
    bio: 'Former researcher and experienced high school mentor with 12 years of private home tutoring experience across Powai and Central Mumbai. Specialises in demystifying mechanics, electromagnetism, and organic chemistry through real-world experiments and intuition.',
    qualificationSummary: 'Ph.D. Physical Sciences (IIT Bombay), B.Tech Mechanical Engineering',
    educationDegrees: ['Ph.D. Applied Physics - IIT Bombay (2013)', 'B.Tech Mechanical Engineering - VJTI Mumbai (2008)'],
    yearsOfExperience: 12,
    teachingApproach: 'First-principles thinking. We never memorize formulas blindly; we derive and connect them with practical physical phenomena.',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['English', 'Marathi', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['CBSE', 'Maharashtra SSC'],
    grades: ['Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Physics', 'Chemistry', 'Science & EVS'],
    primaryLocality: 'Powai (Hiranandani Gardens, Chandivali)',
    serviceAreas: [
      { locality: 'Powai', city: 'Mumbai', pincode: '400076', travelRadiusKm: 6 },
      { locality: 'Kanjurmarg West', city: 'Mumbai', pincode: '400078', travelRadiusKm: 4 },
      { locality: 'Ghatkopar East & West', city: 'Mumbai', pincode: '400077', travelRadiusKm: 7 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 1200,
      sessionDurationMinutes: 75,
      notes: '75-minute in-depth sessions. Special board mock exam prep series included.'
    },
    availability: [
      { day: 'Tuesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Thursday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v5', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-10', notes: 'Passport verified' },
      { id: 'v6', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-12', notes: 'IIT Bombay Ph.D. verified' },
      { id: 'v7', type: 'Address Proof', status: 'verified', verifiedAt: '2026-01-12', notes: 'Powai flat ownership doc verified' },
      { id: 'v8', type: 'Background Check', status: 'verified', verifiedAt: '2026-01-14', notes: 'Clear background' }
    ],
    reviews: [
      {
        id: 'r3',
        parentName: 'Arun Iyer (Hiranandani Gardens)',
        rating: 5,
        comment: 'Dr. Vikramaditya made physics intuitive for my daughter in Class 12 CBSE. Her score went from 68/100 to 95/100. Brilliant educator with exceptional clarity.',
        date: '2026-02-28',
        subject: 'Physics',
        board: 'CBSE',
        grade: 'Class 12',
        isVerifiedTuition: true
      }
    ],
    rating: 4.98,
    totalReviews: 24,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 1,
    createdAt: '2025-07-20'
  },
  {
    id: 'tut-3',
    userId: 'u-tut-3',
    fullName: 'Pooja Deshmukh',
    headline: 'Maharashtra SSC & ICSE Specialist • Maths & Marathi (Class 5-10)',
    bio: 'Patient, warm educator with 7 years of specialized home tutoring for state board and ICSE students in Andheri Lokhandwala and Versova. Focused on building study discipline, handwriting clarity, and thorough textbook memorization with fun mnemonics.',
    qualificationSummary: 'B.Sc. Mathematics (Ruparel College), D.Ed. Certified Primary Educator',
    educationDegrees: ['B.Sc. Mathematics - DG Ruparel College (2017)', 'Diploma in Elementary Education (2019)'],
    yearsOfExperience: 7,
    teachingApproach: 'Gentle, encouraging environment. I conduct mini 10-minute quizzes at the start of every session to make recall effortless.',
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['Marathi', 'Hindi', 'English'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['Maharashtra SSC', 'ICSE'],
    grades: ['Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10 (Board Exam)'],
    subjects: ['Mathematics', 'Science & EVS', 'Hindi'],
    primaryLocality: 'Andheri West (Lokhandwala, Oshiwara, Versova)',
    serviceAreas: [
      { locality: 'Andheri West', city: 'Mumbai', pincode: '400053', travelRadiusKm: 5 },
      { locality: 'Juhu & Vile Parle West', city: 'Mumbai', pincode: '400049', travelRadiusKm: 4 },
      { locality: 'Oshiwara', city: 'Mumbai', pincode: '400102', travelRadiusKm: 3 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 650,
      sessionDurationMinutes: 60,
      notes: 'Monthly discount available for 4+ sessions per week.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v9', type: 'ID Proof', status: 'verified', verifiedAt: '2026-02-01', notes: 'Voter ID verified' },
      { id: 'v10', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-02-02', notes: 'B.Sc. verified' }
    ],
    reviews: [
      {
        id: 'r4',
        parentName: 'Kavita Joshi (Lokhandwala)',
        rating: 4.8,
        comment: 'Pooja did wonders for my 8th-grade son who was terrified of algebra. Very warm and reliable.',
        date: '2026-01-20',
        subject: 'Mathematics',
        board: 'Maharashtra SSC',
        grade: 'Class 8',
        isVerifiedTuition: true
      }
    ],
    rating: 4.88,
    totalReviews: 12,
    featured: false,
    profileCompleteness: 95,
    responseTimeHours: 3,
    createdAt: '2025-09-01'
  },
  {
    id: 'tut-4',
    userId: 'u-tut-4',
    fullName: 'Rohan Sen',
    headline: 'English Literature, Grammar & History • ICSE & CBSE (Class 6-12)',
    bio: 'Published essayist and gold medallist in English Literature from St. Xavier’s College, Mumbai. Helping students master critical essay writing, Shakespearean drama analysis, and nuanced grammar rules for board examinations.',
    qualificationSummary: 'M.A. English Literature (St. Xavier’s College, Mumbai), UGC-NET Qualified',
    educationDegrees: ['M.A. English Literature - St. Xavier’s College (2018)', 'B.A. English & History - Wilson College (2016)'],
    yearsOfExperience: 6,
    teachingApproach: 'Socratic dialogue. We unpack texts line-by-line, build vocabulary naturally, and practice board-certified rubric answers.',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['English', 'Hindi', 'Bengali'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['ICSE', 'CBSE'],
    grades: ['Class 7', 'Class 8', 'Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['English Literature & Grammar', 'Social Studies (History & Civics)'],
    primaryLocality: 'Juhu & Vile Parle West',
    serviceAreas: [
      { locality: 'Juhu', city: 'Mumbai', pincode: '400049', travelRadiusKm: 5 },
      { locality: 'Bandra West', city: 'Mumbai', pincode: '400050', travelRadiusKm: 6 },
      { locality: 'Andheri West', city: 'Mumbai', pincode: '400053', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 800,
      sessionDurationMinutes: 60,
      notes: 'Detailed line-by-line essay feedback provided outside of scheduled session time.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Tuesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v11', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-11', notes: 'Aadhaar verified' },
      { id: 'v12', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-13', notes: 'Master’s degree verified' }
    ],
    reviews: [
      {
        id: 'r5',
        parentName: 'Tara Merchant (Juhu Tara Road)',
        rating: 5,
        comment: 'Rohan’s mastery over Shakespeare for ICSE English was a game changer for my daughter. Highly recommended!',
        date: '2026-03-01',
        subject: 'English Literature & Grammar',
        board: 'ICSE',
        grade: 'Class 10',
        isVerifiedTuition: true
      }
    ],
    rating: 4.92,
    totalReviews: 15,
    featured: true,
    profileCompleteness: 95,
    responseTimeHours: 2,
    createdAt: '2025-10-05'
  },
  {
    id: 'tut-5',
    userId: 'u-tut-5',
    fullName: 'Shabana Shaikh',
    headline: 'NIOS & CBSE Inclusive Home Educator • All Primary & Middle Subjects',
    bio: 'Specially trained educator with 10 years of experience supporting diverse learning paces, including NIOS students and children needing empathetic, one-on-one structured tutoring at home.',
    qualificationSummary: 'B.Sc. Child Development (SNDT Women’s Univ), Specialized Diploma in Remedial Education',
    educationDegrees: ['B.Sc. Human Development - SNDT University (2014)', 'Diploma in Learning Difficulties & Special Needs (2016)'],
    yearsOfExperience: 10,
    teachingApproach: 'Multisensory teaching. Breaking down tasks into digestible micro-goals with frequent positive reinforcement.',
    profilePhoto: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Hindi', 'Urdu'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['NIOS', 'CBSE'],
    grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'],
    subjects: ['Mathematics', 'Science & EVS', 'English Literature & Grammar', 'Hindi'],
    primaryLocality: 'Andheri East (Chakala, Marol, JB Nagar)',
    serviceAreas: [
      { locality: 'Andheri East', city: 'Mumbai', pincode: '400059', travelRadiusKm: 5 },
      { locality: 'Powai', city: 'Mumbai', pincode: '400076', travelRadiusKm: 6 },
      { locality: 'Ghatkopar East & West', city: 'Mumbai', pincode: '400077', travelRadiusKm: 5 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 700,
      sessionDurationMinutes: 60,
      notes: 'Customized multisensory study material included.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true },
      { day: 'Tuesday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true },
      { day: 'Thursday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v13', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-20', notes: 'Aadhaar checked' },
      { id: 'v14', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-22', notes: 'SNDT degree verified' }
    ],
    reviews: [
      {
        id: 'r6',
        parentName: 'Farhan Siddiqui (Chakala)',
        rating: 5,
        comment: 'Shabana ma’am is extremely kind and patient with my 4th grader. He looks forward to every session now.',
        date: '2026-02-14',
        subject: 'Science & EVS',
        board: 'CBSE',
        grade: 'Class 4',
        isVerifiedTuition: true
      }
    ],
    rating: 4.9,
    totalReviews: 11,
    featured: false,
    profileCompleteness: 90,
    responseTimeHours: 4,
    createdAt: '2025-06-18'
  },
  {
    id: 'tut-6',
    userId: 'u-tut-6',
    fullName: 'Mahesh Nair',
    headline: 'Senior Biology & Chemistry Expert • Maharashtra SSC & CBSE (9-12)',
    bio: 'Senior educator with 14 years of teaching experience across South & Central Mumbai schools. Specializes in clear diagrams, botanical physiology, genetics, and board scoring techniques.',
    qualificationSummary: 'M.Sc. Life Sciences (Sophia College), B.Ed (Mumbai Univ)',
    educationDegrees: ['M.Sc. Life Sciences (2010)', 'B.Ed Science (2012)'],
    yearsOfExperience: 14,
    teachingApproach: 'Visual organ models, memory mapping of pathways, and past 15 years question pattern solving.',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['English', 'Malayalam', 'Hindi', 'Marathi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['Maharashtra SSC', 'CBSE'],
    grades: ['Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Biology', 'Chemistry', 'Science & EVS'],
    primaryLocality: 'Dadar & Matunga',
    serviceAreas: [
      { locality: 'Dadar', city: 'Mumbai', pincode: '400014', travelRadiusKm: 5 },
      { locality: 'Matunga', city: 'Mumbai', pincode: '400019', travelRadiusKm: 4 },
      { locality: 'Mahim', city: 'Mumbai', pincode: '400016', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 900,
      sessionDurationMinutes: 60,
      notes: 'Includes printed biology diagrams and weekly objective revision sets.'
    },
    availability: [
      { day: 'Tuesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Thursday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v15', type: 'ID Proof', status: 'verified', verifiedAt: '2025-12-10', notes: 'PAN & Aadhaar' },
      { id: 'v16', type: 'Degree Certificate', status: 'verified', verifiedAt: '2025-12-12', notes: 'Master’s degree verified' }
    ],
    reviews: [
      {
        id: 'r7',
        parentName: 'Geeta Balasubramanian (Matunga East)',
        rating: 5,
        comment: 'Sir has an incredible grasp over the HSC Biology board syllabus. My son scored 96 in Biology thanks to his guidance.',
        date: '2026-01-25',
        subject: 'Biology',
        board: 'Maharashtra SSC',
        grade: 'Class 12',
        isVerifiedTuition: true
      }
    ],
    rating: 4.96,
    totalReviews: 29,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 1,
    createdAt: '2025-05-12'
  },
  {
    id: 'tut-7',
    userId: 'u-tut-7',
    fullName: 'Sneha Patel',
    headline: 'Computer Science, Coding & High School Maths • ICSE & CBSE',
    bio: 'Former software engineer turned passionate tutor. Teaching Java (ICSE BlueJ curriculum), Python (CBSE Class 11/12), and Middle School Mathematics. Making algorithmic thinking intuitive for school kids.',
    qualificationSummary: 'B.E. Computer Engineering (Thadomal Shahani), Certified Java & Python Educator',
    educationDegrees: ['B.E. Computer Engineering - TSEC Bandra (2018)'],
    yearsOfExperience: 5,
    teachingApproach: 'Hands-on live coding on laptop + whiteboard syntax breakdown. We write code from day one.',
    profilePhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Gujarati', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['ICSE', 'CBSE'],
    grades: ['Class 8', 'Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Computer Science & Python', 'Mathematics'],
    primaryLocality: 'Borivali West (IC Colony, Shimpoli)',
    serviceAreas: [
      { locality: 'Borivali West', city: 'Mumbai', pincode: '400092', travelRadiusKm: 5 },
      { locality: 'Kandivali West', city: 'Mumbai', pincode: '400067', travelRadiusKm: 4 },
      { locality: 'Dahisar West', city: 'Mumbai', pincode: '400068', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 850,
      sessionDurationMinutes: 60,
      notes: 'Laptop programming practice included in every session.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Afternoon (12 PM - 4 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v17', type: 'ID Proof', status: 'verified', verifiedAt: '2026-02-11', notes: 'Passport' },
      { id: 'v18', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-02-12', notes: 'Engineering degree verified' }
    ],
    reviews: [
      {
        id: 'r8',
        parentName: 'Hitesh Shah (IC Colony)',
        rating: 4.9,
        comment: 'Sneha made ICSE Java coding so easy for my daughter. The projects and logic exercises were superb.',
        date: '2026-03-05',
        subject: 'Computer Science & Python',
        board: 'ICSE',
        grade: 'Class 10',
        isVerifiedTuition: true
      }
    ],
    rating: 4.89,
    totalReviews: 14,
    featured: false,
    profileCompleteness: 95,
    responseTimeHours: 2,
    createdAt: '2025-08-30'
  },
  {
    id: 'tut-8',
    userId: 'u-tut-8',
    fullName: 'Amitabh Sen',
    headline: 'Senior Physics & Mathematics • CBSE & NIOS (Class 10-12)',
    bio: 'Over 18 years of mentoring students in Mumbai for senior school examinations. Known for calm temperament and systematic breakdown of complex calculus and electrostatics.',
    qualificationSummary: 'M.Sc. Physics (Delhi University), B.Ed',
    educationDegrees: ['M.Sc. Physics - DU (2004)', 'B.Ed - Jamia Millia Islamia (2006)'],
    yearsOfExperience: 18,
    teachingApproach: 'Strict focus on NCERT textbook numericals and derivation rigor followed by past board problem banks.',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['English', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['CBSE', 'NIOS'],
    grades: ['Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Physics', 'Mathematics'],
    primaryLocality: 'Chembur (Diamond Garden, Collector Colony)',
    serviceAreas: [
      { locality: 'Chembur', city: 'Mumbai', pincode: '400071', travelRadiusKm: 5 },
      { locality: 'Ghatkopar East & West', city: 'Mumbai', pincode: '400077', travelRadiusKm: 6 },
      { locality: 'Sion', city: 'Mumbai', pincode: '400022', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 1100,
      sessionDurationMinutes: 60,
      notes: 'Special crash course options available for Class 12 board preparation.'
    },
    availability: [
      { day: 'Tuesday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Thursday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v19', type: 'ID Proof', status: 'verified', verifiedAt: '2025-11-01', notes: 'Aadhaar' },
      { id: 'v20', type: 'Degree Certificate', status: 'verified', verifiedAt: '2025-11-03', notes: 'M.Sc. verified' }
    ],
    reviews: [
      {
        id: 'r9',
        parentName: 'Deepa Menon (Chembur East)',
        rating: 5,
        comment: 'Amitabh sir is a veteran tutor who knows every single question type that appears in CBSE Class 12. Invaluable mentor.',
        date: '2026-02-18',
        subject: 'Physics',
        board: 'CBSE',
        grade: 'Class 12',
        isVerifiedTuition: true
      }
    ],
    rating: 4.97,
    totalReviews: 35,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 1,
    createdAt: '2025-04-10'
  },
  {
    id: 'tut-9',
    userId: 'u-tut-9',
    fullName: 'Radhika Trivedi',
    headline: 'Primary & Middle School Foundation Tutor • CBSE & ICSE (Class 1-6)',
    bio: 'Warm, patient female home tutor specializing in foundational literacy, mental math, science curiosity, and good homework habits for young learners in Bandra and Santacruz.',
    qualificationSummary: 'B.A. Psychology & Education (Mithibai College), Montessori Certified',
    educationDegrees: ['B.A. Psychology - Mithibai (2019)', 'Montessori Teacher Training Diploma (2020)'],
    yearsOfExperience: 6,
    teachingApproach: 'Story-based learning and interactive physical counters for mathematics.',
    profilePhoto: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Hindi', 'Gujarati'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['CBSE', 'ICSE'],
    grades: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'],
    subjects: ['Mathematics', 'Science & EVS', 'English Literature & Grammar', 'Hindi'],
    primaryLocality: 'Bandra West (Pali Hill, Carter Road, Bandstand)',
    serviceAreas: [
      { locality: 'Bandra West', city: 'Mumbai', pincode: '400050', travelRadiusKm: 4 },
      { locality: 'Santacruz West', city: 'Mumbai', pincode: '400054', travelRadiusKm: 4 },
      { locality: 'Khar West', city: 'Mumbai', pincode: '400052', travelRadiusKm: 3 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 600,
      sessionDurationMinutes: 60,
      notes: 'Fun learning activity sheets provided each week.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Tuesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v21', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-25', notes: 'Aadhaar' },
      { id: 'v22', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-26', notes: 'B.A. degree verified' }
    ],
    reviews: [
      {
        id: 'r10',
        parentName: 'Nalini Varma (Pali Hill)',
        rating: 5,
        comment: 'My daughter in Class 3 loves Radhika didi! Homework time used to be a battle, but now she finishes it with a smile.',
        date: '2026-03-08',
        subject: 'Mathematics',
        board: 'CBSE',
        grade: 'Class 3',
        isVerifiedTuition: true
      }
    ],
    rating: 4.93,
    totalReviews: 16,
    featured: false,
    profileCompleteness: 95,
    responseTimeHours: 2,
    createdAt: '2025-09-15'
  },
  {
    id: 'tut-10',
    userId: 'u-tut-10',
    fullName: 'Siddharth Rane',
    headline: 'Maharashtra SSC Specialist • Mathematics & Science (Class 8-10)',
    bio: 'Fluent in Marathi and English, guiding students across Dadar, Prabhadevi, and Lower Parel through SSC textbook question patterns, theorem derivations, and geometric constructions.',
    qualificationSummary: 'B.Sc. Mathematics (Ruia College), M.Sc. IT (Mumbai University)',
    educationDegrees: ['B.Sc. Mathematics - Ramnarain Ruia College (2016)', 'M.Sc. IT - Univ of Mumbai (2018)'],
    yearsOfExperience: 8,
    teachingApproach: 'Targeted chapter-wise tests from Navneet & Balbharati question sets. High stress on clean presentation for board examiners.',
    profilePhoto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['Marathi', 'English', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['Maharashtra SSC'],
    grades: ['Class 8', 'Class 9', 'Class 10 (Board Exam)'],
    subjects: ['Mathematics', 'Science & EVS'],
    primaryLocality: 'Dadar & Matunga',
    serviceAreas: [
      { locality: 'Dadar', city: 'Mumbai', pincode: '400028', travelRadiusKm: 5 },
      { locality: 'Prabhadevi', city: 'Mumbai', pincode: '400025', travelRadiusKm: 4 },
      { locality: 'Parel', city: 'Mumbai', pincode: '400012', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 700,
      sessionDurationMinutes: 60,
      notes: 'Navneet test papers and preliminary exam practice tests included.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v23', type: 'ID Proof', status: 'verified', verifiedAt: '2026-02-04', notes: 'Aadhaar' },
      { id: 'v24', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-02-05', notes: 'B.Sc. verified' }
    ],
    reviews: [
      {
        id: 'r11',
        parentName: 'Makarand Patil (Prabhadevi)',
        rating: 4.8,
        comment: 'Siddharth sir gave my son confidence for Class 10 SSC Geometry. Great teacher with strict focus on steps.',
        date: '2026-02-22',
        subject: 'Mathematics',
        board: 'Maharashtra SSC',
        grade: 'Class 10',
        isVerifiedTuition: true
      }
    ],
    rating: 4.84,
    totalReviews: 19,
    featured: false,
    profileCompleteness: 90,
    responseTimeHours: 3,
    createdAt: '2025-07-04'
  },
  {
    id: 'tut-11',
    userId: 'u-tut-11',
    fullName: 'Meenakshi Sundaram',
    headline: 'Chemistry Specialist for CBSE & ICSE (Class 9-12)',
    bio: 'M.Sc. Organic Chemistry with 11 years of coaching students in Powai and Vikhroli. Helps students conquer chemical equations, periodic table periodicity, and stoichiometric problems with ease.',
    qualificationSummary: 'M.Sc. Organic Chemistry (Institute of Science, Mumbai)',
    educationDegrees: ['M.Sc. Chemistry - The Institute of Science (2013)', 'B.Sc. Chemistry - Wilson College (2011)'],
    yearsOfExperience: 11,
    teachingApproach: 'Formula flashcards, mechanism flowcharts, and daily 5-minute revision drills.',
    profilePhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Tamil', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['CBSE', 'ICSE'],
    grades: ['Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Chemistry', 'Science & EVS'],
    primaryLocality: 'Powai (Hiranandani Gardens, Chandivali)',
    serviceAreas: [
      { locality: 'Powai', city: 'Mumbai', pincode: '400076', travelRadiusKm: 5 },
      { locality: 'Vikhroli West', city: 'Mumbai', pincode: '400083', travelRadiusKm: 4 },
      { locality: 'Kanjurmarg', city: 'Mumbai', pincode: '400078', travelRadiusKm: 4 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 900,
      sessionDurationMinutes: 60,
      notes: 'Chemical equation summary books provided to every student.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Wednesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v25', type: 'ID Proof', status: 'verified', verifiedAt: '2026-01-18', notes: 'Aadhaar' },
      { id: 'v26', type: 'Degree Certificate', status: 'verified', verifiedAt: '2026-01-19', notes: 'Master’s degree verified' }
    ],
    reviews: [
      {
        id: 'r12',
        parentName: 'Vivek Agarwal (Powai)',
        rating: 5,
        comment: 'Meenakshi ma’am turned Chemistry into my son’s favorite subject. Her organic reaction charts are brilliant.',
        date: '2026-03-10',
        subject: 'Chemistry',
        board: 'CBSE',
        grade: 'Class 11',
        isVerifiedTuition: true
      }
    ],
    rating: 4.94,
    totalReviews: 21,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 2,
    createdAt: '2025-06-25'
  },
  {
    id: 'tut-12',
    userId: 'u-tut-12',
    fullName: 'Sameer Merchant',
    headline: 'High School Economics, Social Studies & Hindi • CBSE & NIOS',
    bio: 'Bilingual mentor with 6 years experience helping students achieve top scores in Social Sciences, Indian History, Civics, and Hindi literature.',
    qualificationSummary: 'M.A. History & Political Science, B.A. Hindi Literature',
    educationDegrees: ['M.A. Political Science - Mumbai University (2018)'],
    yearsOfExperience: 6,
    teachingApproach: 'Connecting historical events to current affairs to make social studies engaging rather than dry facts.',
    profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['Hindi', 'English', 'Urdu'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['CBSE', 'NIOS'],
    grades: ['Class 7', 'Class 8', 'Class 9', 'Class 10 (Board Exam)'],
    subjects: ['Social Studies (History & Civics)', 'Hindi'],
    primaryLocality: 'Andheri West (Lokhandwala, Oshiwara, Versova)',
    serviceAreas: [
      { locality: 'Andheri West', city: 'Mumbai', pincode: '400053', travelRadiusKm: 5 },
      { locality: 'Juhu', city: 'Mumbai', pincode: '400049', travelRadiusKm: 4 },
      { locality: 'Goregaon West', city: 'Mumbai', pincode: '400104', travelRadiusKm: 5 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 600,
      sessionDurationMinutes: 60,
      notes: 'Map work and timeline study guides included.'
    },
    availability: [
      { day: 'Tuesday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Thursday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Saturday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v27', type: 'ID Proof', status: 'verified', verifiedAt: '2026-02-15', notes: 'Aadhaar' }
    ],
    reviews: [
      {
        id: 'r13',
        parentName: 'Preeti Kapoor (Versova)',
        rating: 4.8,
        comment: 'Sameer sir made Class 10 History enjoyable. My son easily remembered all dates and treaties.',
        date: '2026-01-30',
        subject: 'Social Studies (History & Civics)',
        board: 'CBSE',
        grade: 'Class 10',
        isVerifiedTuition: true
      }
    ],
    rating: 4.82,
    totalReviews: 9,
    featured: false,
    profileCompleteness: 90,
    responseTimeHours: 4,
    createdAt: '2025-11-02'
  },
  {
    id: 'tut-13',
    userId: 'u-tut-13',
    fullName: 'Varun Singhania',
    headline: 'Mathematics & Mental Math Coach • Primary & Middle (Class 3-8)',
    bio: 'Passionate young mathematician focusing on Vedic maths speed techniques, algebra fundamentals, and geometry proofs. Active in Andheri West and Juhu.',
    qualificationSummary: 'B.Sc. Mathematics & Statistics (NM College, Vile Parle)',
    educationDegrees: ['B.Sc. Mathematics - Narsee Monjee College (2021)'],
    yearsOfExperience: 4,
    teachingApproach: 'Gamified math puzzles, mental arithmetic games, and building curiosity.',
    profilePhoto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    gender: 'Male',
    languages: ['English', 'Hindi', 'Marwari'],
    listingStatus: 'pending_review', // Demonstrates the admin review queue!
    verificationStatus: 'pending',
    boards: ['CBSE', 'ICSE'],
    grades: ['Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'],
    subjects: ['Mathematics'],
    primaryLocality: 'Andheri West (Lokhandwala, Oshiwara, Versova)',
    serviceAreas: [
      { locality: 'Andheri West', city: 'Mumbai', pincode: '400053', travelRadiusKm: 4 },
      { locality: 'Juhu', city: 'Mumbai', pincode: '400049', travelRadiusKm: 3 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 550,
      sessionDurationMinutes: 60,
      notes: 'Introductory promotional rates.'
    },
    availability: [
      { day: 'Monday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true },
      { day: 'Friday', timeSlot: 'Evening (4 PM - 8 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v28', type: 'ID Proof', status: 'pending', notes: 'Documents under admin review' }
    ],
    reviews: [],
    rating: 4.7,
    totalReviews: 2,
    featured: false,
    profileCompleteness: 75,
    responseTimeHours: 5,
    createdAt: '2026-03-20'
  },
  {
    id: 'tut-14',
    userId: 'u-tut-14',
    fullName: 'Shalini Saxena',
    headline: 'Senior Physics & ICSE Board Topper Mentor • 15+ Yrs Experience',
    bio: 'Former head of department at an elite South Mumbai ICSE institution. Proven track record of 200+ students scoring 95+ in ICSE Physics and Mathematics.',
    qualificationSummary: 'M.Sc. Physics (Gold Medallist), B.Ed',
    educationDegrees: ['M.Sc. Physics (2007)', 'B.Ed (2009)'],
    yearsOfExperience: 16,
    teachingApproach: 'Precision in numerical answers, SI units rigor, and mastering board-pattern question papers.',
    profilePhoto: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=600&q=80',
    gender: 'Female',
    languages: ['English', 'Hindi'],
    listingStatus: 'approved',
    verificationStatus: 'verified',
    boards: ['ICSE', 'CBSE'],
    grades: ['Class 9', 'Class 10 (Board Exam)', 'Class 11 (Junior College)', 'Class 12 (HSC/Board)'],
    subjects: ['Physics', 'Mathematics'],
    primaryLocality: 'Bandra West (Pali Hill, Carter Road, Bandstand)',
    serviceAreas: [
      { locality: 'Bandra West', city: 'Mumbai', pincode: '400050', travelRadiusKm: 6 },
      { locality: 'Juhu', city: 'Mumbai', pincode: '400049', travelRadiusKm: 5 }
    ],
    fee: {
      pricingType: 'hourly',
      amountInr: 1500,
      sessionDurationMinutes: 60,
      notes: 'Includes bespoke proprietary formula handbooks and personalized test series.'
    },
    availability: [
      { day: 'Saturday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true },
      { day: 'Sunday', timeSlot: 'Morning (8 AM - 12 PM)', isAvailable: true }
    ],
    verificationRecords: [
      { id: 'v29', type: 'ID Proof', status: 'verified', verifiedAt: '2025-10-10', notes: 'Passport' },
      { id: 'v30', type: 'Degree Certificate', status: 'verified', verifiedAt: '2025-10-11', notes: 'Degree verified' }
    ],
    reviews: [
      {
        id: 'r14',
        parentName: 'Anita Godrej (Carter Road)',
        rating: 5,
        comment: 'Shalini ma’am is simply an institution in herself for ICSE Physics. The best tutor in Mumbai.',
        date: '2026-03-15',
        subject: 'Physics',
        board: 'ICSE',
        grade: 'Class 10',
        isVerifiedTuition: true
      }
    ],
    rating: 5.0,
    totalReviews: 38,
    featured: true,
    profileCompleteness: 100,
    responseTimeHours: 1,
    createdAt: '2025-03-15'
  }
];

export const INITIAL_CHILD_REQUIREMENT: ChildRequirement = {
  studentName: 'Aarav Sharma',
  board: 'ICSE',
  grade: 'Class 10 (Board Exam)',
  subjects: ['Mathematics', 'Physics'],
  locality: 'Bandra West (Pali Hill, Carter Road, Bandstand)',
  monthlyBudgetInr: 12000,
  hourlyBudgetInr: 1000,
  preferredTiming: 'Evening (4 PM - 8 PM)'
};
