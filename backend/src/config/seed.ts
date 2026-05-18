import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { Lead } from '../models/Lead.model';

export const seedDatabase = async () => {
  try {
    console.log('🔄 Checking database seeding requirement...');

    // 1. Seed Users if none exist
    let adminUser = await User.findOne({ email: 'admin@smartleads.com' });
    if (!adminUser) {
      const hashedAdminPassword = await bcrypt.hash('admin123', 12);
      adminUser = await User.create({
        name: 'Jane Admin',
        email: 'admin@smartleads.com',
        password: hashedAdminPassword,
        role: 'admin',
      });
      console.log('✅ Seeded Admin User: admin@smartleads.com');
    }

    let salesUser = await User.findOne({ email: 'sales@smartleads.com' });
    if (!salesUser) {
      const hashedSalesPassword = await bcrypt.hash('sales123', 12);
      salesUser = await User.create({
        name: 'John Sales',
        email: 'sales@smartleads.com',
        password: hashedSalesPassword,
        role: 'sales',
      });
      console.log('✅ Seeded Sales User: sales@smartleads.com');
    }

    // 2. Seed Leads if fewer than 15 exist
    const leadCount = await Lead.countDocuments();
    if (leadCount < 15) {
      console.log(`🌱 Database has only ${leadCount} leads. Seeding 18 realistic leads for rich pagination and search testing...`);
      
      const mockLeads = [
        {
          name: 'Rahul Sharma',
          email: 'rahul.sharma@techcorp.com',
          company: 'TechCorp Solutions',
          phone: '+919876543210',
          status: 'Qualified',
          source: 'Instagram',
          notes: 'Very interested in our premium MERN CRM system. Requested a customized enterprise quote.',
          createdBy: adminUser._id,
        },
        {
          name: 'Priya Patel',
          email: 'priya.patel@designstudio.io',
          company: 'Creative Design Studio',
          phone: '+919812345678',
          status: 'New',
          source: 'Website',
          notes: 'Submitted inquiry via contact form regarding pricing for 15 users.',
          createdBy: adminUser._id,
        },
        {
          name: 'Alex Mercer',
          email: 'alex.mercer@innovate.us',
          company: 'Innovate LLC',
          phone: '+15550199283',
          status: 'Contacted',
          source: 'LinkedIn',
          notes: 'Reached out after reading our article on AI pipelines. Scheduling an introductory call next Tuesday.',
          createdBy: adminUser._id,
        },
        {
          name: 'Siddharth Rao',
          email: 'siddharth@alphafinance.co',
          company: 'Alpha Finance Group',
          phone: '+919888776655',
          status: 'Lost',
          source: 'Cold Outreach',
          notes: 'Lead deemed budget too restrictive for deployment phase. Archive for future follow-up.',
          createdBy: adminUser._id,
        },
        {
          name: 'Elena Rostova',
          email: 'elena.r@cybersecurity.net',
          company: 'Apex CyberSec',
          phone: '+442079460192',
          status: 'Qualified',
          source: 'Referral',
          notes: 'Referred by senior software architect. Strongly interested in role-based access control setup.',
          createdBy: adminUser._id,
        },
        {
          name: 'Vikram Malhotra',
          email: 'vikram@malhotrahardware.in',
          company: 'Malhotra Hardware & Tools',
          phone: '+919922334455',
          status: 'New',
          source: 'Website',
          notes: 'Interested in automating follow-up emails and WhatsApp integration.',
          createdBy: adminUser._id,
        },
        {
          name: 'Sophie Dubois',
          email: 'sophie.d@luxuryretail.fr',
          company: 'Dubois Fashion House',
          phone: '+33140260401',
          status: 'Contacted',
          source: 'Event',
          notes: 'Met at Paris Retail Tech Summit. Follow up sent with customized pitch presentation.',
          createdBy: adminUser._id,
        },
        {
          name: 'Ananya Deshmukh',
          email: 'ananya@growthlabs.agency',
          company: 'GrowthLabs Marketing',
          phone: '+919845012345',
          status: 'Qualified',
          source: 'Instagram',
          notes: 'Looking for a clean platform to track lead funnels. Impressed by our glassmorphic analytics page.',
          createdBy: adminUser._id,
        },
        {
          name: 'Marcus Vance',
          email: 'marcus.v@cloudsystems.co',
          company: 'Vance Cloud Systems',
          phone: '+14155550267',
          status: 'New',
          source: 'LinkedIn',
          notes: 'Inquired about Docker deployment capabilities and on-premise hosting.',
          createdBy: adminUser._id,
        },
        {
          name: 'Kabir Mehta',
          email: 'kabir.mehta@edutech.edu',
          company: 'Mehta e-Learning Hub',
          phone: '+919765432109',
          status: 'Contacted',
          source: 'Referral',
          notes: 'Wants to manage student admissions pipeline. Sent demo credentials.',
          createdBy: adminUser._id,
        },
        {
          name: 'Zoe Jenkins',
          email: 'zoe.j@smartenergy.io',
          company: 'Smart Energy Innovations',
          phone: '+16175550143',
          status: 'Qualified',
          source: 'Website',
          notes: 'High-intent lead. Checked all boxes in questionnaire. Schedule contract review.',
          createdBy: adminUser._id,
        },
        {
          name: 'Aditya Sen',
          email: 'aditya.sen@realestate.in',
          company: 'Sen Luxury Housing',
          phone: '+919933445566',
          status: 'Lost',
          source: 'Cold Outreach',
          notes: 'Competitor locked them into a 2-year contract. Re-engage next year.',
          createdBy: adminUser._id,
        },
        {
          name: 'Chao Min',
          email: 'chao.min@asiabuilders.com',
          company: 'Asia Builders Corp',
          phone: '+861065550188',
          status: 'New',
          source: 'Event',
          notes: 'Met at Tokyo Trade Expo. Looking for a MERN database dashboard.',
          createdBy: adminUser._id,
        },
        {
          name: 'Neha Kapoor',
          email: 'neha.k@wellnessgroup.org',
          company: 'Kapoor Wellness Labs',
          phone: '+919867012345',
          status: 'Contacted',
          source: 'Instagram',
          notes: 'Requested WhatsApp demo. Expressed strong interest in Gemini follow-up integrations.',
          createdBy: adminUser._id,
        },
        {
          name: 'David Miller',
          email: 'david.m@apexlogistics.com',
          company: 'Apex Logistics Corp',
          phone: '+13125550198',
          status: 'Qualified',
          source: 'Website',
          notes: 'Wants integration with local mail clients. Extremely happy with the CSV export capability.',
          createdBy: adminUser._id,
        },
        {
          name: 'Meera Nair',
          email: 'meera.nair@ayurvedacare.com',
          company: 'Ayurveda Care Products',
          phone: '+919811223344',
          status: 'New',
          source: 'Referral',
          notes: 'Needs database sorting and filtering. Eager to check dark mode.',
          createdBy: adminUser._id,
        },
        {
          name: 'Ryan O-Connor',
          email: 'ryan.oc@fintechsolutions.ie',
          company: 'Fintech Solutions Ireland',
          phone: '+35316010203',
          status: 'Contacted',
          source: 'LinkedIn',
          notes: 'Evaluating compliance parameters and JWT session token safeguards.',
          createdBy: adminUser._id,
        },
        {
          name: 'Tanvi Joshi',
          email: 'tanvi.joshi@urbanstay.in',
          company: 'UrbanStay Co-living',
          phone: '+919844556677',
          status: 'Qualified',
          source: 'Website',
          notes: 'High-volume lead. Perfect candidate for our 10-lead pagination testing.',
          createdBy: adminUser._id,
        },
      ];

      await Lead.insertMany(mockLeads);
      console.log('✅ Seeded 18 realistic leads successfully!');
    } else {
      console.log(`ℹ️ Database already has ${leadCount} leads. Skipping lead seeding.`);
    }

    console.log('🎉 Database Seeding Process Completed Successfully!');
  } catch (error) {
    console.error('❌ Database seeding error:', error);
  }
};
