const bcrypt = require('bcryptjs');
const db = require('./db');

async function seed() {
  console.log('🌱 Seeding MySQL database with CV data...\n');
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
    const [heroRows] = await db.execute('SELECT id FROM hero LIMIT 1');
    if (heroRows.length === 0) {
      await db.execute(
        'INSERT INTO hero (title, subtitle, tagline, cta_text) VALUES (?, ?, ?, ?)',
        ['Hayden Novariyo Wira Alfisyahr', 'Event Organizer · Content Creator · CS Student', 'Turning moments into memories, and ideas into events.', 'Explore My Work']
      );
      console.log('✅ Hero seeded');
    }

    // ── About ───────────────────────────────────────────────────────────
    const [aboutRows] = await db.execute('SELECT id FROM about LIMIT 1');
    if (aboutRows.length === 0) {
      await db.execute(
        'INSERT INTO about (name, role, bio, email, phone, instagram, location) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          'Hayden Novariyo Wira Alfisyahr',
          'Event Organizer & Creative Technologist',
          'First year undergraduated Computer Science Degree at Binus University @Malang. Proficient in programming languages with a foundation in algorithms and data structures. Passionate about organizing event, solving complex problems and improving through innovative solutions. Strong collaboration skills, with experience working in diverse teams on projects from conception to deployment and having good interpersonal skill.',
          'hayden.novariyo@gmail.com',
          '082143724101',
          '@hxy.dn',
          'Landungsari, Malang, Jawa Timur'
        ]
      );
      console.log('✅ About seeded');
    }

    // ── Education ───────────────────────────────────────────────────────
    const [eduRows] = await db.execute('SELECT id FROM education LIMIT 1');
    if (eduRows.length === 0) {
      const eduData = [
        ['Binus University', 'Bachelor of Computer Science', 'Computer Science', '2024', 'Present', 'Currently pursuing a degree in Computer Science with focus on algorithms, data structures, and software engineering.', 1],
        ['SMK Telkom Sidoarjo', 'Vocational Diploma', 'Telecommunication and Network Engineering', '2022', '2024', 'Studied Telecommunication and Network Engineering, building a strong technical foundation.', 2],
      ];
      for (const e of eduData) {
        await db.execute('INSERT INTO education (institution, degree, field, start_date, end_date, description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', e);
      }
      console.log('✅ Education seeded');
    }

    // ── Work Experiences ────────────────────────────────────────────────
    const [expRows] = await db.execute('SELECT id FROM experiences LIMIT 1');
    if (expRows.length === 0) {
      const expData = [
        ['Event Coordinator', 'PremierPlus Organizer', 'May 2025', 'Present', 'Manage the event flow and on-site technical operations including greeting guests, preparing event needs, and assisting attendees to ensure the wedding runs smoothly.', '["event","coordination","operations"]', 1],
        ['Event Division & Partnership', 'Google Developer Groups Binus Malang', 'October 2024', 'Present', 'Responsible for planning, organizing, and executing events.', '["event","partnership","gdg"]', 2],
        ['Event Planner and Documentation', 'D3 Event Organizer', 'February 2024', 'Present', 'Capture important moments through photos and videos.', '["planning","documentation","photography"]', 3],
        ['(Media Partner) Live Report and Documentation', 'Event Sidoarjo', 'January 2024', 'Present', 'Storing all the event documentation for future use.', '["media","documentation","live-report"]', 4],
        ['Moderator', 'GDG Binus Malang', 'August 2024', 'November 2024', 'Managing the flow of the discussion between speakers.', '["moderation","public-speaking"]', 5],
        ['Coordinator Documentation', 'SMK Telkom SDA', 'April 2024', 'April 2024', 'Responsible for overseeing and ensuring that all event-related information.', '["documentation","coordination"]', 6],
        ['Livestreaming Team', 'Avepro (Freelancer)', 'June 2024', 'June 2024', 'Live broadcasting of the event to an online audience.', '["livestream","broadcast","freelance"]', 7],
      ];
      for (const e of expData) {
        await db.execute('INSERT INTO experiences (title, company, start_date, end_date, description, tags, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', e);
      }
      console.log('✅ Experiences seeded');
    }

    // ── Organizations ───────────────────────────────────────────────────
    const [orgRows] = await db.execute('SELECT id FROM organizations LIMIT 1');
    if (orgRows.length === 0) {
      const orgData = [
        ['Google Developer Groups Binus Malang', 'Manager Product & Curriculum', 'October 2024', 'Present', 'Searching for materials.', '["Searching","Speaker","Curriculum"]', 1],
        ['Panorama Binus Malang', 'HOD Press Corps', 'October 2024', 'Present', 'Providing live updates.', '["Live","Updates","Engagement"]', 2],
      ];
      for (const o of orgData) {
        await db.execute('INSERT INTO organizations (name, role, start_date, end_date, description, bullets, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)', o);
      }
      console.log('✅ Organizations seeded');
    }

    // ── Services ─────────────────────────────────────────────────────────
    const [serviceRows] = await db.execute('SELECT id FROM services LIMIT 1');
    if (serviceRows.length === 0) {
      const svcData = [
        ['Event Documentation', 'Professional photography and video coverage.', 'Camera', 'Full-day photo\nHigh-res', 1],
        ['Event Planning', 'End-to-end event planning.', 'Calendar', 'Concept\nTimeline', 2],
      ];
      for (const s of svcData) {
        await db.execute('INSERT INTO services (name, description, icon, details, sort_order) VALUES (?, ?, ?, ?, ?)', s);
      }
      console.log('✅ Services seeded');
    }

    // ── Skills ───────────────────────────────────────────────────────────
    const [skillRows] = await db.execute('SELECT id FROM skills LIMIT 1');
    if (skillRows.length === 0) {
      const skillData = [
        ['Communication', 92, 'soft', 1],
        ['Photography', 85, 'technical', 2],
      ];
      for (const s of skillData) {
        await db.execute('INSERT INTO skills (name, level, category, sort_order) VALUES (?, ?, ?, ?)', s);
      }
      console.log('✅ Skills seeded');
    }

    console.log('\n🎉 MySQL Database seeding complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
