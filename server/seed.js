const bcrypt = require('bcryptjs');
const db = require('./db');

async function seed() {
  console.log('🌱 Seeding MySQL database with comprehensive CV data...\n');
  try {
    // ── Create Tables ───────────────────────────────────────────────────
    await db.initDB();

    // ── Admin User ──────────────────────────────────────────────────────
    const [users] = await db.execute('SELECT id FROM users WHERE username = ?', ['admin']);
    if (users.length === 0) {
      const hash = bcrypt.hashSync('hayden2024', 10);
      await db.execute('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
      console.log('✅ Admin user created (username: admin / password: hayden2024)');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    // ── Hero ────────────────────────────────────────────────────────────
    await db.execute('DELETE FROM hero');
    await db.execute(
      'INSERT INTO hero (title, subtitle, tagline, cta_text) VALUES (?, ?, ?, ?)',
      ['Hayden Novariyo Wira Alfisyahr', 'Junior Product Designer | Event Organizer', 'Turning moments into memories, and ideas into events.', 'Explore My Work']
    );
    console.log('✅ Hero updated');

    // ── About ───────────────────────────────────────────────────────────
    await db.execute('DELETE FROM about');
    await db.execute(
      'INSERT INTO about (name, role, bio, email, phone, instagram, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        'Hayden Novariyo Wira Alfisyahr',
        'Junior Product Designer & Event Coordinator',
        'First year undergraduated Computer Science Degree at Binus University @Malang. Proficient in programming languages with a foundation in algorithms and data structures. Passionate about organizing event, solving complex problems and improving through innovative solutions. Strong collaboration skills, with experience working in diverse teams on projects from conception to deployment and having good interpersonal skill.',
        'hayden.novariyo@gmail.com',
        '082143724101',
        '@hxy.dn',
        'Landungsari, Malang, Jawa Timur'
      ]
    );
    console.log('✅ About updated');

    // ── Education ───────────────────────────────────────────────────────
    await db.execute('DELETE FROM education');
    const eduData = [
      ['Binus University', 'Bachelor of Computer Science', 'Computer Science', '2024', 'Present', 'Currently pursuing a degree in Computer Science with focus on algorithms, data structures, and software engineering.', 1],
      ['SMK Telkom Sidoarjo', 'Vocational High School', 'Telecommunication and Network Engineering', '2022', '2024', 'Studied Telecommunication and Network Engineering, building a strong technical foundation.', 2],
    ];
    for (const e of eduData) {
      await db.execute('INSERT INTO education (institution, degree, field, start_date, end_date, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', e);
    }
    console.log('✅ Education updated');

    // ── Work Experiences ────────────────────────────────────────────────
    await db.execute('DELETE FROM experiences');
    const expData = [
      ['Event Coordinator', 'PremierPlus Organizer', 'May 2025', 'Present', 'Manage the event flow and on-site technical operations. Greeting guests, preparing event needs, and assisting attendees to ensure the wedding runs smoothly.', '["event","coordination","operations"]', 1],
      ['Event Division & Partnership', 'GDG Binus Malang', 'October 2024', 'Present', 'Responsible for planning, organizing, and executing events. Handling partnerships and ensuring smooth event delivery.', '["event","partnership","gdg"]', 2],
      ['Event Planner and Documentation', 'D3 Event Organizer', 'February 2024', 'Present', 'Capture important moments through photos and videos while overseeing the venue setup and seating.', '["planning","documentation","photography"]', 3],
      ['(Media Partner) Live Report and Documentation', 'Event Sidoarjo', 'January 2024', 'Present', 'Storing all the event documentation for future use, such as for marketing or historical records.', '["media","documentation","live-report"]', 4],
      ['Moderator', 'GDG Binus Malang', 'August 2024', 'August 2024', 'Managing the flow of the discussion between speakers or panelists, asking questions, and keeping the topics aligned.', '["moderation","public-speaking"]', 5],
      ['Coordinator Documentation', 'SMK Telkom SDA', 'April 2024', 'April 2024', 'Responsible for overseeing and ensuring that all event-related information and materials are properly captured.', '["documentation","coordination"]', 6],
      ['Livestreaming Team', 'Avepro (Freelancer)', 'June 2024', 'June 2024', 'Live broadcasting of the event to an online audience using professional streaming software.', '["livestream","broadcast","freelance"]', 7],
    ];
    for (const e of expData) {
      await db.execute('INSERT INTO experiences (title, company, start_date, end_date, description, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', e);
    }
    console.log('✅ Experiences updated');

    // ── Organizations ───────────────────────────────────────────────────
    await db.execute('DELETE FROM organizations');
    const orgData = [
      ['Weebs Entertainment', 'Community Leader, Photography', 'January 2023', 'Present', 'Managing Copyright and Licensing of Photos.', '["Leadership","Photography"]', 1],
      ['D3 Event Organizer', 'Documentation and Event Planner', 'February 2024', 'Present', 'Creating a vision for the event and documenting the process.', '["Vision","Documentation"]', 2],
      ['Event Sidoarjo', 'Content Creator, Live Reports', 'March 2024', 'Present', 'Keeping an eye on industry trends and live coverage of important events.', '["Content","Trends"]', 3],
      ['TFI Student Community', 'Partnership', 'January 2025', 'Present', 'Setting up and agreeing upon partnership agreements.', '["Partnership","Contract"]', 4],
      ['Google Developer Groups Binus Malang', 'Manager Product & Curriculum', 'October 2024', 'Present', 'Searching for materials and ideas for the event and finding speakers.', '["Materials","Speakers"]', 5],
      ['Panorama Binus Malang', 'HOD Press Corps', 'October 2024', 'Present', 'Providing live updates to engage the audience in real-time.', '["Live","Engagement"]', 6],
    ];
    for (const o of orgData) {
      await db.execute('INSERT INTO organizations (name, role, start_date, end_date, description, bullets, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', o);
    }
    console.log('✅ Organizations updated');

    // ── Services ─────────────────────────────────────────────────────────
    await db.execute('DELETE FROM services');
    const svcData = [
      ['Event Documentation', 'Professional photography and video coverage for various events.', 'Camera', 'Full-day photo\nHigh-resolution edit\nCloud storage access', 1],
      ['Event Planning', 'End-to-end event planning from concept to execution.', 'Calendar', 'Concept Development\nTimeline Management\nVendor Coordination', 2],
      ['Moderator & Speaking', 'Professional moderation for seminars, talkshows, and workshops.', 'Mic', 'Panelist Management\nAudience Engagement\nFlow Control', 3],
      ['Livestreaming', 'Quality live broadcasting to YouTube, Facebook, or custom platforms.', 'Video', 'Multi-cam setup\nProfessional overlay\nRecording included', 4],
    ];
    for (const s of svcData) {
      await db.execute('INSERT INTO services (name, description, icon, details, sort_order) VALUES (?, ?, ?, ?, ?)', s);
    }
    console.log('✅ Services updated');

    // ── Skills ───────────────────────────────────────────────────────────
    await db.execute('DELETE FROM skills');
    const skillData = [
      ['Communication Skills', 95, 'soft', 1],
      ['Time Management', 90, 'soft', 2],
      ['Photography', 90, 'technical', 3],
      ['Leadership', 88, 'soft', 4],
      ['Problem Solving', 85, 'soft', 5],
      ['Critical Thinking', 87, 'soft', 6],
      ['Human Resource', 80, 'soft', 7],
      ['English (Fluent)', 95, 'language', 8],
      ['Spanish (Intermediate)', 65, 'language', 9],
      ['Indonesian (Native)', 100, 'language', 10],
    ];
    for (const s of skillData) {
      await db.execute('INSERT INTO skills (name, level, category, sort_order) VALUES (?, ?, ?, ?)', s);
    }
    console.log('✅ Skills updated (Progress Bars ready)');

    // ── FAQs ────────────────────────────────────────────────────────────
    await db.execute('DELETE FROM faqs');
    const faqData = [
      ['What services do you offer for events?', 'I offer comprehensive Event Planning, Documentation (Photo/Video), Moderation, and professional Livestreaming services.', 1],
      ['How can I hire you for my project or event?', 'You can contact me directly via the WhatsApp or Email buttons in the Contact section. I usually respond within 24 hours.', 2],
      ['Do you handle documentation for small private events?', 'Yes, I provide documentation services for both professional corporate events and smaller private functions like weddings or birthday events.', 3],
      ['Are you available for freelance projects?', 'Absolutely! I am always open to freelance opportunities in event coordination, documentation, or creative technologies.', 4],
      ['What areas or regions do you cover?', 'I am primarily based in Malang and Sidoarjo, but I am open to traveling for significant event projects or remote creative work.', 5],
    ];
    for (const f of faqData) {
      await db.execute('INSERT INTO faqs (question, answer, sort_order) VALUES (?, ?, ?)', f);
    }
    console.log('✅ FAQs seeded');

    console.log('\n🎉 MySQL Database seeding complete with full CV data!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
