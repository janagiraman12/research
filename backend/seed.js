require('dotenv').config();
const { sequelize, syncDatabase, Admin, Service, Pricing, Testimonial, Workflow } = require('./models');

// ─── Seed Data ────────────────────────────────────────────────────────────────

const services = [
  { title: 'Full Draft Writing from Data', description: 'Complete manuscript drafting from your raw data and findings. Our experts write publication-ready papers following journal guidelines.', category: 'Manuscript Writing Support', icon: 'DocumentText', order: 1 },
  { title: 'Section Writing', description: 'Need help with just the Introduction, Methods, Results, or Discussion? We write individual sections to your specifications.', category: 'Manuscript Writing Support', icon: 'PencilSquare', order: 2 },
  { title: 'Paraphrasing & Rewriting', description: 'Transform existing content into original, plagiarism-free academic writing while preserving your core ideas and arguments.', category: 'Manuscript Writing Support', icon: 'ArrowPath', order: 3 },
  { title: 'Reference Formatting', description: 'Accurate bibliography and in-text citation formatting in APA, MLA, Vancouver, IEEE, and 100+ other styles.', category: 'Manuscript Writing Support', icon: 'BookOpen', order: 4 },
  { title: 'Journal Selection', description: 'Strategic journal matching based on your research domain, impact factor goals, and publication timeline requirements.', category: 'Journal Support', icon: 'MagnifyingGlass', order: 5 },
  { title: 'Plagiarism Check', description: 'Comprehensive plagiarism screening using industry-leading tools with a detailed similarity report and editing recommendations.', category: 'Journal Support', icon: 'ShieldCheck', order: 6 },
  { title: 'Submission Assistance', description: 'End-to-end journal submission support including cover letter writing, author statement preparation, and portal submission.', category: 'Journal Support', icon: 'PaperAirplane', order: 7 },
  { title: 'Thesis Formatting', description: 'University-compliant thesis formatting including table of contents, list of figures, headers, footers, and page numbering.', category: 'Thesis/Dissertation', icon: 'AcademicCap', order: 8 },
  { title: 'Chapter Writing', description: 'Expert assistance in writing individual thesis or dissertation chapters including literature review, methodology, and analysis.', category: 'Thesis/Dissertation', icon: 'Bars3', order: 9 },
  { title: 'Conference Paper Writing', description: 'Concise, impactful conference papers formatted to specific conference requirements with strong abstracts and conclusions.', category: 'Conference Support', icon: 'PresentationChartBar', order: 10 },
  { title: 'Abstract Writing', description: 'Compelling structured and unstructured abstracts that highlight your research significance and attract reviewer attention.', category: 'Conference Support', icon: 'DocumentMagnifyingGlass', order: 11 },
  { title: 'Data Analysis (Python/R/MATLAB)', description: 'Statistical analysis, data visualization, and result interpretation using Python, R, MATLAB, or SPSS as per your requirement.', category: 'Technical Services', icon: 'ChartBarSquare', order: 12 },
  { title: 'Figure & Table Preparation', description: 'High-resolution, publication-quality figures, graphs, and formatted tables ready for journal submission.', category: 'Technical Services', icon: 'Photo', order: 13 },
];

const pricing = [
  // Basic
  { serviceName: 'Editing & Proofreading', tier: 'Basic', price: '₹500 – ₹800 / 1000 words', description: 'Language correction, grammar fixes, and basic structural improvements.', features: ['Grammar & spelling correction', 'Sentence restructuring', 'Turnaround: 3–5 days', '1 revision round'], isPopular: false },
  { serviceName: 'Full Paper Writing', tier: 'Basic', price: '₹5,000 – ₹7,000', description: 'Complete manuscript writing for short research papers (up to 4000 words).', features: ['Up to 4000 words', 'Standard journal format', 'References included', '2 revision rounds'], isPopular: false },
  { serviceName: 'Thesis Chapter', tier: 'Basic', price: '₹3,000 – ₹5,000', description: 'Single chapter writing for Masters-level thesis projects.', features: ['1 chapter (up to 5000 words)', 'Basic formatting', 'Reference list', '1 revision round'], isPopular: false },
  // Professional
  { serviceName: 'Editing & Proofreading', tier: 'Professional', price: '₹800 – ₹1,200 / 1000 words', description: 'Deep-level editing with structure improvement, flow enhancement, and clarity boost.', features: ['Deep language editing', 'Argument flow improvement', 'Plagiarism check included', 'Turnaround: 2–3 days', '2 revision rounds'], isPopular: true },
  { serviceName: 'Full Paper Writing', tier: 'Professional', price: '₹7,000 – ₹10,000', description: 'Complete manuscript for standard research papers (up to 7000 words) with journal formatting.', features: ['Up to 7000 words', 'Target journal formatting', 'Plagiarism report', 'Cover letter included', '3 revision rounds'], isPopular: true },
  { serviceName: 'Thesis Chapter', tier: 'Professional', price: '₹5,000 – ₹7,000', description: 'Comprehensive chapter writing for PhD-level thesis with advanced analysis.', features: ['1 chapter (up to 8000 words)', 'Advanced formatting', 'Data analysis support', '2 revision rounds'], isPopular: true },
  { serviceName: 'Journal Formatting', tier: 'Professional', price: '₹1,000 – ₹2,000', description: 'Complete manuscript formatting as per target journal template and guidelines.', features: ['Template-based formatting', 'Figure & table formatting', 'Reference style correction', 'Turnaround: 2 days'], isPopular: false },
  // Premium
  { serviceName: 'Editing & Proofreading', tier: 'Premium', price: '₹1,200+ / 1000 words', description: 'Premium editing including subject-matter expert review, journal targeting, and priority delivery.', features: ['Expert subject review', 'Journal-specific optimization', 'Plagiarism check & report', 'Priority 24hr turnaround', 'Unlimited revisions'], isPopular: false },
  { serviceName: 'Full Paper Writing', tier: 'Premium', price: '₹10,000 – ₹15,000+', description: 'Full-service paper writing with data analysis, expert review, submission support, and unlimited revisions.', features: ['Unlimited word count', 'Data analysis included', 'Submission assistance', 'Response to reviewers', 'Unlimited revisions'], isPopular: false },
  { serviceName: 'Thesis / Dissertation', tier: 'Premium', price: '₹25,000 – ₹60,000+', description: 'End-to-end thesis and dissertation support from proposal to final submission.', features: ['Full document (all chapters)', 'Data collection & analysis', 'University formatting', 'Plagiarism-free guarantee', 'Unlimited revisions', 'Dedicated expert assigned'], isPopular: false },
  { serviceName: 'Journal Formatting', tier: 'Premium', price: '₹2,000 – ₹3,000+', description: 'Premium formatting with graphic redesign, cover letter, and submission handling.', features: ['Precise journal template', 'Figure redesign', 'Cover letter writing', 'Online submission handled', 'Turnaround: same day'], isPopular: false },
];

const testimonials = [
  { name: 'Dr. Ananya Krishnan', designation: 'Assistant Professor', institution: 'IIT Madras', feedback: 'ResearchAssist Pro transformed my raw data into a polished manuscript that got accepted in a Q1 journal on the first submission. Their team understood my domain perfectly.', rating: 5 },
  { name: 'Rahul Mehta', designation: 'PhD Scholar', institution: 'University of Delhi', feedback: 'I was struggling with my thesis formatting for weeks. The team completed it in just 2 days, exactly as per my university guidelines. Absolutely professional service!', rating: 5 },
  { name: 'Dr. Priya Nair', designation: 'Research Scientist', institution: 'CSIR-NCL', feedback: 'The data analysis support using Python was outstanding. They delivered clear, well-commented code along with visualizations that made my results much more compelling.', rating: 5 },
  { name: 'Mohammed Salim', designation: 'Masters Student', institution: 'VIT University', feedback: 'Very responsive team. Got my conference paper reviewed and submitted within the deadline. The abstract they wrote significantly improved my acceptance chances.', rating: 4 },
  { name: 'Dr. Sujatha Venkatesh', designation: 'Senior Researcher', institution: 'AIIMS New Delhi', feedback: 'Exceptional quality of writing. The manuscript they prepared was indistinguishable from native English academic writing. Highly recommend their premium package.', rating: 5 },
  { name: 'Arjun Patel', designation: 'PhD Candidate', institution: 'NIT Trichy', feedback: 'Used their plagiarism check and rewriting service. Reduced my similarity score from 28% to under 10% while keeping all my original ideas intact. Great work!', rating: 4 },
];

const workflowSteps = [
  { step: 1, title: 'Inquiry', description: 'Reach out via our contact form or WhatsApp with your research topic, document type, and requirements.', icon: 'ChatBubbleLeftRight' },
  { step: 2, title: 'Requirement Gathering', description: 'Our expert team reviews your material, asks clarifying questions, and understands your exact needs.', icon: 'ClipboardDocumentList' },
  { step: 3, title: 'Custom Quote', description: 'We send you a transparent, no-hidden-fee quote based on scope, complexity, and turnaround time.', icon: 'CurrencyRupee' },
  { step: 4, title: 'Secure Payment', description: 'Confirm your order with a secure advance payment via UPI, bank transfer, or Razorpay.', icon: 'CreditCard' },
  { step: 5, title: 'Expert Assignment', description: 'Your project is assigned to a domain-specialist writer or analyst with relevant academic background.', icon: 'UserCheck' },
  { step: 6, title: 'Draft Delivery', description: 'Receive the first draft by your agreed deadline for review. All work is 100% original.', icon: 'DocumentArrowDown' },
  { step: 7, title: 'Feedback & Revision', description: 'Share your feedback and we incorporate revisions promptly as per your revision plan.', icon: 'ArrowPathRoundedSquare' },
  { step: 8, title: 'Final Delivery', description: 'Receive your polished, publication-ready document. Ready to submit!', icon: 'CheckBadge' },
];

// ─── Run Seed ─────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');

    // Sync tables (create if not exists)
    await syncDatabase();

    // Clear all tables
    await Workflow.destroy({ where: {} });
    await Testimonial.destroy({ where: {} });
    await Pricing.destroy({ where: {} });
    await Service.destroy({ where: {} });
    await Admin.destroy({ where: {} });
    console.log('🗑️  Cleared existing data');

    // Create admin (password will be hashed by beforeCreate hook)
    await Admin.create({ name: 'Admin', email: 'admin@researchassistpro.com', password: 'Admin@123' });
    console.log('👤 Admin created: admin@researchassistpro.com / Admin@123');

    // Seed services
    await Service.bulkCreate(services);
    console.log(`📚 ${services.length} services seeded`);

    // Seed pricing (bulkCreate doesn't trigger getters/setters, so create individually)
    for (const p of pricing) await Pricing.create(p);
    console.log(`💰 ${pricing.length} pricing plans seeded`);

    // Seed testimonials
    await Testimonial.bulkCreate(testimonials);
    console.log(`⭐ ${testimonials.length} testimonials seeded`);

    // Seed workflow
    await Workflow.bulkCreate(workflowSteps);
    console.log(`🔄 ${workflowSteps.length} workflow steps seeded`);

    console.log('\n✅ Database seeded successfully!');
    console.log('🔐 Admin login → admin@researchassistpro.com | Admin@123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
