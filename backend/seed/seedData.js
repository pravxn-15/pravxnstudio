const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const Project = require('../models/Project');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Enquiry = require('../models/Enquiry');
const Admin = require('../models/Admin');
const Setting = require('../models/Setting');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pravxnstudio';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB...');

    // Clear existing data
    await Project.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await Enquiry.deleteMany({});
    await Admin.deleteMany({});
    await Setting.deleteMany({});
    console.log('[Seed] Cleared existing data.');

    // 1. Create Admin
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await Admin.create({
      username: 'admin',
      passwordHash
    });
    console.log('[Seed] Created default admin account (username: admin, password: admin123)');

    // 2. Create Settings
    await Setting.create({
      studioName: 'pravxnstudio',
      tagline: 'Every frame tells a story.',
      heroSubtitle: 'Wedding Photography & Films — Chennai · Tamil Nadu · Worldwide',
      phone: '8056807652',
      whatsapp: '918056807652',
      email: 'praveencse1503@gmail.com',
      instagram: 'https://www.instagram.com/its_tomy14',
      footerCreditUrl: 'https://www.instagram.com/pravxn_offl',
      address: 'Chennai, Tamil Nadu, India',
      heroImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop'
    });
    console.log('[Seed] Studio settings initialized.');

    // 3. Create Services
    await Service.insertMany([
      {
        title: 'Full Day Wedding Coverage',
        description: 'Comprehensive candid photography & cinematic film capturing every emotion, ritual, and celebration from dawn till late evening.',
        icon: 'Camera',
        features: ['2 Senior Photographers & 2 Cinematographers', '4K Cinematic Highlight Film (3-5 min)', 'Full Ceremony Documentation (30-60 min)', '350+ Retouched High-Res Images', 'Custom Luxury Hardcover Photo Album'],
        order: 1
      },
      {
        title: 'Pre-Wedding & Destination Stories',
        description: 'Editorial pre-wedding photo sessions in breathtaking outdoor locations crafted like a cinematic romance film.',
        icon: 'Heart',
        features: ['Full Day Shoot at Destination of Choice', 'Drone Aerial Footage & Photography', 'Short Teaser Film (60 sec for Instagram)', '50+ High-Res Retouched Prints', 'Styling & Location Consultation'],
        order: 2
      },
      {
        title: 'Cinematic Wedding Films',
        description: 'Motion picture grade wedding films with rich sound design, acoustic score selection, and deeply moving audio vows.',
        icon: 'Video',
        features: ['4K Ultra HD Multi-Cam Production', 'Dedicated Audio Engineer for Clean Vows', 'Directorial Storytelling Approach', 'Social Media Teaser + Extended Feature Film', 'Cloud Delivery & Archival USB Box'],
        order: 3
      },
      {
        title: 'Intimate Couples & Fine Art Portraits',
        description: 'Atmospheric portraits emphasizing raw emotion, subtle lighting, and editorial composition.',
        icon: 'Sparkles',
        features: ['3-Hour Signature Session', '2 Styling Theme Changes', '30 Retouched Art Prints', 'Private Digital Gallery Access'],
        order: 4
      }
    ]);
    console.log('[Seed] Services created.');

    // 4. Create Projects
    await Project.insertMany([
      {
        title: 'Royal Heritage Symphony',
        clientNames: 'Ananya & Vikram',
        category: 'Weddings',
        location: 'Udaipur, Rajasthan',
        date: new Date('2026-02-14'),
        description: 'A grand multi-day palace celebration enveloped in rich silk, marigold blooms, and sunset acoustic scores.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_1'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop', section: 'The Ceremony' },
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop', section: 'The Ceremony' },
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' },
          { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' },
          { url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1600&auto=format&fit=crop', section: 'The Family' },
          { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop', section: 'The Celebration' }
        ],
        filmUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        featured: true,
        showOnInstagramSection: true,
        slug: 'royal-heritage-symphony-ananya-vikram'
      },
      {
        title: 'Coastal Sunset Vows',
        clientNames: 'Kavya & Rohan',
        category: 'Pre-Weddings',
        location: 'Mahabalipuram, Tamil Nadu',
        date: new Date('2026-01-20'),
        description: 'Soft golden hour ocean breeze and intimate moments along the ancient shore temples of Tamil Nadu.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_2'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' },
          { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' },
          { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1600&auto=format&fit=crop', section: 'The Celebration' }
        ],
        filmUrl: '',
        featured: true,
        showOnInstagramSection: true,
        slug: 'coastal-sunset-vows-kavya-rohan'
      },
      {
        title: 'Traditional Temple Union',
        clientNames: 'Meera & Siddharth',
        category: 'Weddings',
        location: 'Chennai, Tamil Nadu',
        date: new Date('2025-11-12'),
        description: 'Vibrant Kanchipuram silk sarees, nadaswaram melodies, and sacred fire rituals captured with deep reverence.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_3'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1600&auto=format&fit=crop', section: 'The Ceremony' },
          { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop', section: 'The Family' },
          { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' }
        ],
        filmUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        featured: true,
        showOnInstagramSection: true,
        slug: 'traditional-temple-union-meera-siddharth'
      },
      {
        title: 'Whimsical Estate Romance',
        clientNames: 'Pooja & Arjun',
        category: 'Couples',
        location: 'Ooty, Nilgiris',
        date: new Date('2025-10-05'),
        description: 'Misty tea plantation walks and warm candlelit estate evenings.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_4'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' }
        ],
        filmUrl: '',
        featured: false,
        showOnInstagramSection: true,
        slug: 'whimsical-estate-romance-pooja-arjun'
      },
      {
        title: 'High Fashion Bride',
        clientNames: 'Diya V.',
        category: 'Portraits',
        location: 'Bengaluru, Karnataka',
        date: new Date('2025-08-18'),
        description: 'Editorial bridal portraits highlighting delicate jewelry and luminous skin texture.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_5'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop', section: 'The Couple' }
        ],
        filmUrl: '',
        featured: false,
        showOnInstagramSection: true,
        slug: 'high-fashion-bride-diya-v'
      },
      {
        title: 'Ethereal Forest Wedding Film',
        clientNames: 'Tara & Varun',
        category: 'Films',
        location: 'Coorg, Karnataka',
        date: new Date('2025-06-30'),
        description: 'A cinematic short story set amidst pine trees, ambient acoustic guitar, and raw emotional promises.',
        coverImage: {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
          publicId: 'seed_cover_6'
        },
        gallery: [
          { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop', section: 'The Ceremony' }
        ],
        filmUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        featured: true,
        showOnInstagramSection: true,
        slug: 'ethereal-forest-wedding-film-tara-varun'
      }
    ]);
    console.log('[Seed] Projects created.');

    // 5. Create Testimonials
    await Testimonial.insertMany([
      {
        quote: "pravxnstudio preserved the soul of our wedding day. Every time we look at our album, tears fill our eyes. The colors, the candid giggles, the quiet glances — absolute magic.",
        clientNames: "Ananya & Vikram",
        location: "Udaipur",
        order: 1
      },
      {
        quote: "Praveen and his team felt like family. They were so discreet yet captured every intimate moment with artist-grade precision. Our wedding film is like a Netflix cinema!",
        clientNames: "Meera & Siddharth",
        location: "Chennai",
        order: 2
      },
      {
        quote: "Our pre-wedding photoshoot in Mahabalipuram was effortless. We didn't feel posed for even a second. Highly recommended for couples who want genuine storytelling.",
        clientNames: "Kavya & Rohan",
        location: "Mahabalipuram",
        order: 3
      }
    ]);
    console.log('[Seed] Testimonials created.');

    // 6. Create Sample Enquiries
    await Enquiry.insertMany([
      {
        name: "Priyanka N.",
        email: "priyanka.n@example.com",
        phone: "+91 9876543210",
        eventType: "Wedding",
        weddingDate: new Date("2026-12-15"),
        venue: "ITC Grand Chola, Chennai",
        guestCount: 500,
        message: "Looking for complete candid photography and 4K film coverage for our 3-day wedding festivities.",
        status: "new"
      }
    ]);
    console.log('[Seed] Sample enquiries created.');

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedData();
