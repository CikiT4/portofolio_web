const bcrypt = require('bcryptjs');
const db = require('./db');

console.log('🌱 Seeding database with CV data...\n');

// ── Admin User ──────────────────────────────────────────────────────
const existingAdmin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!existingAdmin) {
  const hash = bcrypt.hashSync('hayden2024', 10);
  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run('admin', hash, 'admin');
  console.log('✅ Admin user created  (username: admin / password: hayden2024)');
} else {
  console.log('ℹ️  Admin user already exists');
}

// ── Hero ────────────────────────────────────────────────────────────
const existingHero = db.prepare('SELECT id FROM hero LIMIT 1').get();
if (!existingHero) {
  db.prepare(`INSERT INTO hero (title, subtitle, tagline, cta_text) VALUES (?, ?, ?, ?)`).run(
    'Hayden Novariyo Wira Alfisyahr',
    'Event Organizer · Content Creator · CS Student',
    'Turning moments into memories, and ideas into events.',
    'Explore My Work'
  );
  console.log('✅ Hero seeded');
}

// ── About ───────────────────────────────────────────────────────────
const existingAbout = db.prepare('SELECT id FROM about LIMIT 1').get();
if (!existingAbout) {
  db.prepare(`INSERT INTO about (name, role, bio, email, phone, instagram, location) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
    'Hayden Novariyo Wira Alfisyahr',
    'Event Organizer & Creative Technologist',
    'First year undergraduated Computer Science Degree at Binus University @Malang. Proficient in programming languages with a foundation in algorithms and data structures. Passionate about organizing event, solving complex problems and improving through innovative solutions. Strong collaboration skills, with experience working in diverse teams on projects from conception to deployment and having good interpersonal skill.',
    'hayden.novariyo@gmail.com',
    '082143724101',
    '@hxy.dn',
    'Landungsari, Malang, Jawa Timur'
  );
  console.log('✅ About seeded');
}

// ── Education ───────────────────────────────────────────────────────
const existingEdu = db.prepare('SELECT id FROM education LIMIT 1').get();
if (!existingEdu) {
  const eduInsert = db.prepare(`INSERT INTO education (institution, degree, field, start_date, end_date, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const eduData = [
    ['Binus University', 'Bachelor of Computer Science', 'Computer Science', '2024', 'Present', 'Currently pursuing a degree in Computer Science with focus on algorithms, data structures, and software engineering.', 1],
    ['SMK Telkom Sidoarjo', 'Vocational Diploma', 'Telecommunication and Network Engineering', '2022', '2024', 'Studied Telecommunication and Network Engineering, building a strong technical foundation.', 2],
  ];
  eduData.forEach(e => eduInsert.run(...e));
  console.log('✅ Education seeded (2 entries)');
}

// ── Work Experiences ────────────────────────────────────────────────
const existingExp = db.prepare('SELECT id FROM experiences LIMIT 1').get();
if (!existingExp) {
  const expInsert = db.prepare(`INSERT INTO experiences (title, company, start_date, end_date, description, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const expData = [
    ['Event Coordinator', 'PremierPlus Organizer', 'May 2025', 'Present', 'Manage the event flow and on-site technical operations including greeting guests, preparing event needs, and assisting attendees to ensure the wedding runs smoothly.', '["event","coordination","operations"]', 1],
    ['Event Division & Partnership', 'Google Developer Groups Binus Malang', 'October 2024', 'Present', 'Responsible for planning, organizing, and executing events. Key events: Introduction in Laravel GDG Binus Malang (Nov 2024), A Dive into Machine Learning & Sentiment Analysis GDG Binus Malang (Mar 2025), TFISC Pioneer (Jul 2025), TFISC Threads of Joy (Nov 2025).', '["event","partnership","gdg"]', 2],
    ['Event Planner and Documentation', 'D3 Event Organizer', 'February 2024', 'Present', 'Capture important moments through photos and videos while overseeing the venue setup, ensuring decorations, equipment, and seating are arranged according to plan. Events: Unsur Festival (Feb 2024), Roasting Sidoarjo vol2 @standupindo_sidoarjo (May 2024), Kayoko no Fest (Upcoming).', '["planning","documentation","photography"]', 3],
    ['(Media Partner) Live Report and Documentation', 'Event Sidoarjo', 'January 2024', 'Present', 'Storing all the event documentation for future use, such as for marketing or historical records, ensuring that all content is readily available for distribution. Covered: 8Th Kampung Ramadhan (Mar 2024), Peluncuran pemilihan gubernur Jatim (Mar 2024), LIVE SHOW PINKFOG BABY SHARK @royalplazasurabaya (Jun 2024), Konser @halumusicfestival (Sep 2024), Konser @kickfestid (Sep 2024), Konser @dprfestival (Oct 2024), Konser @livearena.id (Oct 2024), Konser @onfest.id (Nov 2024), Konser Korban Sakit Hati "Juicy Luicy" (Feb 2025), Konser @prestonfestival (Feb 2025).', '["media","documentation","live-report"]', 4],
    ['Moderator', 'GDG Binus Malang', 'August 2024', 'November 2024', 'Managing the flow of the discussion between speakers or panelists, asking questions, giving speaking opportunities, and keeping the topics aligned with the audience\'s interests. Event: Introduction in Laravel GDG Binus Malang (Nov 2024).', '["moderation","public-speaking"]', 5],
    ['Coordinator Documentation', 'SMK Telkom SDA', 'April 2024', 'April 2024', 'Responsible for overseeing and ensuring that all event-related information and materials are properly captured, organized, and stored. Event: Panitia Yearbook SMK Telkom SDA (Mar 2024).', '["documentation","coordination"]', 6],
    ['Livestreaming Team', 'Avepro (Freelancer)', 'June 2024', 'June 2024', 'Live broadcasting of the event to an online audience. Operating the live streaming software or platform, such as YouTube Live, Facebook Live, or Zoom, to broadcast the event to viewers. Event: The Lion Best Youth Tournament Basketball (Jun 2024).', '["livestream","broadcast","freelance"]', 7],
  ];
  expData.forEach(e => expInsert.run(...e));
  console.log('✅ Experiences seeded (7 entries)');
}

// ── Organizations ───────────────────────────────────────────────────
const existingOrg = db.prepare('SELECT id FROM organizations LIMIT 1').get();
if (!existingOrg) {
  const orgInsert = db.prepare(`INSERT INTO organizations (name, role, start_date, end_date, description, bullets, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const orgData = [
    ['Google Developer Groups Binus Malang', 'Manager Product & Curriculum', 'October 2024', 'Present', 'Searching for materials and ideas for the event to be held and finding speakers.', '["Searching for materials and ideas for events","Finding and coordinating speakers","Curriculum development for tech events"]', 1],
    ['Panorama Binus Malang', 'HOD Press Corps', 'October 2024', 'Present', 'Providing live updates, either through social media or other channels, during the event to engage the audience in real-time.', '["Live social media updates during events","Real-time audience engagement","Press coordination"]', 2],
    ['TFI Student Community', 'Partnership Division', 'January 2025', 'Present', 'Setting up and agreeing upon partnership agreements that cover terms and conditions, profit-sharing, and responsibilities of each party.', '["Partnership agreement negotiation","Terms and conditions management","Inter-organization collaboration"]', 3],
    ['D3 Event Organizer', 'Documentation and Event Planner', 'February 2024', 'Present', 'Documenting the Event Process and Creating a vision for the event, including goals, target audience, and the message to be conveyed.', '["Event process documentation","Vision and goal setting for events","Target audience analysis"]', 4],
    ['Event Sidoarjo', 'Content Creator & Live Reports', 'March 2024', 'Present', 'Keeping an eye on industry trends and providing live coverage of important events.', '["Industry trend monitoring","Live event coverage","Content creation and media partnership"]', 5],
    ['Weebs Entertainment', 'Community Leader, Photography', 'January 2023', 'Present', 'Managing Copyright and Licensing of Photos for the community.', '["Copyright and licensing management","Photography direction","Community leadership"]', 6],
    ['Avepro (Freelancer)', 'Livestreaming Team', 'June 2024', 'June 2024', 'Operating the live streaming software or platform to broadcast the event to viewers.', '["YouTube Live / Facebook Live / Zoom operations","Real-time broadcast management","Technical troubleshooting"]', 7],
    ['PremierPlus Organizer', 'Event Coordinator', 'May 2025', 'Present', 'Greeting guests, preparing event needs, and assisting attendees to ensure the wedding runs smoothly.', '["Guest management","Event logistics preparation","On-site attendee assistance"]', 8],
  ];
  orgData.forEach(o => orgInsert.run(...o));
  console.log('✅ Organizations seeded (8 entries)');
}

// ── Services ─────────────────────────────────────────────────────────
const existingService = db.prepare('SELECT id FROM services LIMIT 1').get();
if (!existingService) {
  const svcInsert = db.prepare(`INSERT INTO services (name, description, icon, details, sort_order) VALUES (?, ?, ?, ?, ?)`);
  const svcData = [
    ['Event Documentation', 'Professional photography and video coverage that captures every key moment of your event for lasting memories and marketing use.', 'Camera', 'Full-day photo & video coverage\nHigh-resolution deliverables\nSocial media ready edits\nMarketing & archival content\nRapid turnaround', 1],
    ['Event Planning & Organization', 'End-to-end event planning from concept to execution, ensuring every detail is perfectly orchestrated for a flawless experience.', 'Calendar', 'Concept & vision development\nVenue setup oversight\nVendor coordination\nTimeline management\nOn-site operations', 2],
    ['Live Streaming & Broadcast', 'Real-time live streaming of events to online audiences using professional setups on YouTube Live, Facebook Live, or Zoom.', 'Wifi', 'Multi-platform streaming\nReal-time audience engagement\nTechnical setup & support\nRecording & archiving\nStream quality monitoring', 3],
    ['Content Creation & Live Reports', 'Dynamic social media content creation and live reporting to keep audiences engaged and informed during events.', 'PenTool', 'Live social media updates\nEvent highlight reels\nPress release drafting\nAudience analysis\nBrand storytelling', 4],
  ];
  svcData.forEach(s => svcInsert.run(...s));
  console.log('✅ Services seeded (4 entries)');
}

// ── Skills ───────────────────────────────────────────────────────────
const existingSkill = db.prepare('SELECT id FROM skills LIMIT 1').get();
if (!existingSkill) {
  const skillInsert = db.prepare(`INSERT INTO skills (name, level, category, sort_order) VALUES (?, ?, ?, ?)`);
  const skillData = [
    ['Communication Skills', 92, 'soft', 1],
    ['Photography', 85, 'technical', 2],
    ['Problem Solving', 82, 'soft', 3],
    ['Time Management', 80, 'soft', 4],
    ['Critical Thinking', 80, 'soft', 5],
    ['Leadership', 78, 'soft', 6],
    ['Human Resource', 75, 'soft', 7],
    ['English', 95, 'language', 8],
    ['Indonesian', 100, 'language', 9],
    ['Spanish / Spanyol', 60, 'language', 10],
  ];
  skillData.forEach(s => skillInsert.run(...s));
  console.log('✅ Skills seeded (10 entries)');
}

// ── Stats ─────────────────────────────────────────────────────────────
const existingStat = db.prepare('SELECT id FROM stats LIMIT 1').get();
if (!existingStat) {
  const statInsert = db.prepare(`INSERT INTO stats (label, value, suffix, icon, sort_order) VALUES (?, ?, ?, ?, ?)`);
  const statData = [
    ['Events Documented', 160, '+', 'Camera', 1],
    ['Organizations', 8, '+', 'Users', 2],
    ['Years Active', 2, '+', 'Clock', 3],
    ['Events Organized', 10, '+', 'Calendar', 4],
  ];
  statData.forEach(s => statInsert.run(...s));
  console.log('✅ Stats seeded (4 entries)');
}

// ── FAQs ──────────────────────────────────────────────────────────────
const existingFaq = db.prepare('SELECT id FROM faqs LIMIT 1').get();
if (!existingFaq) {
  const faqInsert = db.prepare(`INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)`);
  const faqData = [
    ['What services do you offer?', 'I specialize in event documentation (photo & video), event planning & organization, live streaming & broadcast, and social media content creation. I cover everything from intimate gatherings to large-scale festivals.', 1],
    ['Are you available for freelance projects?', 'Yes! I take on freelance work for event documentation, live streaming, and content creation. Feel free to reach out via the contact form or directly via Instagram @hxy.dn to discuss your project.', 2],
    ['What events have you covered?', 'I have covered concerts (DPR Festival, Kickfest, Live Arena, Onfest), government events (Gubernur Jatim launch), campus events, sports tournaments (Lion Best Youth Basketball), and community festivals, among many others.', 3],
    ['What equipment do you use for live streaming?', 'I use professional streaming setups compatible with YouTube Live, Facebook Live, and Zoom. My setup ensures stable, high-quality broadcasts with real-time monitoring and technical troubleshooting capabilities.', 4],
    ['How can I get in touch for collaboration?', 'The best way is through the contact form on this page, or directly via email at hayden.novariyo@gmail.com. You can also DM me on Instagram @hxy.dn. I typically respond within 24 hours.', 5],
  ];
  faqData.forEach(f => faqInsert.run(...f));
  console.log('✅ FAQs seeded (5 entries)');
}

console.log('\n🎉 Database seeding complete!\n');
console.log('🔑 Admin credentials:');
console.log('   Username : admin');
console.log('   Password : hayden2024');
console.log('   Login at : http://localhost:5173/admin/login\n');
