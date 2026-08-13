import './lib/load-env'
import { getPayload } from 'payload'
import config from './payload.config'

type TextNode = {
  type: 'text'
  text: string
  format: 0
  mode: 'normal'
  detail: 0
  version: 1
}

const textNode = (text: string): TextNode => ({
  type: 'text',
  text,
  format: 0,
  mode: 'normal',
  detail: 0,
  version: 1,
})

const paragraph = (children: TextNode[]) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  textFormat: 0,
  direction: 'ltr',
  version: 1,
  children,
})

const bulletList = (items: string[]) => ({
  type: 'list',
  tag: 'ul',
  listType: 'bullet',
  format: '',
  indent: 0,
  start: 1,
  textFormat: 0,
  direction: 'ltr',
  version: 1,
  children: items.map((text) => ({
    type: 'listitem',
    value: 1,
    format: '',
    indent: 0,
    version: 1,
    children: [textNode(text)],
  })),
})

function toLexical(content: string): object {
  const children: object[] = []
  const raw = content.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  while (i < raw.length) {
    const line = raw[i].trim()
    if (!line) {
      i++
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < raw.length && raw[i].trim().startsWith('- ')) {
        items.push(raw[i].trim().slice(2))
        i++
      }
      children.push(bulletList(items))
    } else {
      const lines: string[] = []
      while (i < raw.length && raw[i].trim() && !raw[i].trim().startsWith('- ')) {
        lines.push(raw[i].trim())
        i++
      }
      children.push(paragraph([textNode(lines.join(' '))]))
    }
  }
  if (children.length === 0) {
    children.push(paragraph([textNode('')]))
  }
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}

async function main() {
  const payload = await getPayload({ config })

  if ((await payload.count({ collection: 'announcements' })).totalDocs === 0) {
    for (const a of seedAnnouncements) {
      await payload.create({
        collection: 'announcements',
        overrideAccess: true,
        data: a,
      })
    }
    console.log(`Seeded ${seedAnnouncements.length} announcements`)
  }

  if ((await payload.count({ collection: 'public-notices' })).totalDocs === 0) {
    for (const a of seedPublicNotices) {
      await payload.create({
        collection: 'public-notices',
        overrideAccess: true,
        data: a,
      })
    }
    console.log(`Seeded ${seedPublicNotices.length} public notices`)
  }

  if ((await payload.count({ collection: 'events' })).totalDocs === 0) {
    for (const e of seedEvents) {
      await payload.create({
        collection: 'events',
        overrideAccess: true,
        data: e,
      })
    }
    console.log(`Seeded ${seedEvents.length} events`)
  }

  if ((await payload.count({ collection: 'success-stories' })).totalDocs === 0) {
    for (const s of seedSuccessStories) {
      await payload.create({
        collection: 'success-stories',
        overrideAccess: true,
        data: s,
      })
    }
    console.log(`Seeded ${seedSuccessStories.length} success stories`)
  }

  if ((await payload.count({ collection: 'press-releases' })).totalDocs === 0) {
    for (const r of seedPressReleases) {
      await payload.create({
        collection: 'press-releases',
        overrideAccess: true,
        data: r,
      })
    }
    console.log(`Seeded ${seedPressReleases.length} press releases`)
  }

  if ((await payload.count({ collection: 'news-categories' })).totalDocs === 0) {
    for (const c of seedNewsCategories) {
      await payload.create({
        collection: 'news-categories',
        overrideAccess: true,
        data: c,
      })
    }
    console.log(`Seeded ${seedNewsCategories.length} news categories`)
  }

  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    for (const u of seedUsers) {
      await payload.create({
        collection: 'users',
        overrideAccess: true,
        data: u,
      })
    }
    console.log(`Seeded ${seedUsers.length} users`)
  }

  const categoryIds = (
    await payload.find({
      collection: 'news-categories',
      overrideAccess: true,
      limit: 0,
    })
  ).docs.reduce<Record<string, number>>((acc, c) => {
    if (c.slug) acc[c.slug] = Number(c.id)
    return acc
  }, {})

  const adminUser = (
    await payload.find({
      collection: 'users',
      overrideAccess: true,
      limit: 1,
      where: { email: { equals: 'admin@southethiopia.gov.et' } },
    })
  ).docs[0]

  const editorUser = (
    await payload.find({
      collection: 'users',
      overrideAccess: true,
      limit: 1,
      where: { email: { equals: 'editor@southethiopia.gov.et' } },
    })
  ).docs[0]

  if ((await payload.count({ collection: 'posts' })).totalDocs === 0) {
    for (const p of seedPosts) {
      await payload.create({
        collection: 'posts',
        overrideAccess: true,
        data: {
          ...p,
          status: p.status ?? 'publish',
          author: editorUser ? Number(editorUser.id) : adminUser ? Number(adminUser.id) : 1,
          category: categoryIds[p.category ?? 'announcements'],
        },
      })
    }
    console.log(`Seeded ${seedPosts.length} posts`)
  }

  if ((await payload.count({ collection: 'programs' })).totalDocs === 0) {
    for (const p of seedPrograms) {
      await payload.create({
        collection: 'programs',
        overrideAccess: true,
        data: p,
      })
    }
    console.log(`Seeded ${seedPrograms.length} programs`)
  }

  if ((await payload.count({ collection: 'gallery-items' })).totalDocs === 0) {
    for (const g of seedGallery) {
      await payload.create({
        collection: 'gallery-items',
        overrideAccess: true,
        data: g,
      })
    }
    console.log(`Seeded ${seedGallery.length} gallery items`)
  }

  if ((await payload.count({ collection: 'documents' })).totalDocs === 0) {
    for (const d of seedDocuments) {
      const media = await payload.create({
        collection: 'media',
        overrideAccess: true,
        file: createSampleFile(d.title),
        data: { alt: d.title },
      })
      await payload.create({
        collection: 'documents',
        overrideAccess: true,
        data: {
          title: d.title,
          category: d.category,
          date: d.date,
          description: d.description,
          file: Number(media.id),
          published: true,
        },
      })
    }
    console.log(`Seeded ${seedDocuments.length} documents`)
  }

  const existingSettings = await payload.findGlobal({ slug: 'site-settings' })
  if (!existingSettings?.footer?.copyright) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        branding: {
          siteName: 'South Ethiopia Regional State',
          siteSubtitle: 'Deputy Regional President',
        },
        organizationTitle: {
          line1: 'Deputy Regional President of the',
          line2: 'South Ethiopia Regional State',
        },
        meta: {
          titleTemplate: '%s | Deputy Regional President of the South Ethiopia Regional State',
        },
        footer: {
          description: 'Office of the Deputy Regional President of the South Ethiopia Regional State.',
          copyright: 'Office of the Deputy Regional President, South Ethiopia Regional State',
          developedBy: 'Developed by SEITB',
        },
        contact: {
          emergencyHotline: 'Emergency Hotline: 911',
          email: 'emergency@southethiopia.gov.et',
          address: 'Regional HQ: Hawassa, Ethiopia',
          officeHours: 'Office Hours: Mon-Fri 8:00-17:00',
        },
      },
    })
    console.log('Seeded site settings')
  }

  console.log('CMS seed complete.')
}

const seedAnnouncements = [
  {
    title: 'Regional Development Forum Announced',
    date: 'July 25, 2026',
    category: 'Events',
    excerpt:
      "The Deputy Regional President's office announces a regional development forum to discuss economic growth strategies for the upcoming fiscal year.",
    content: toLexical(
      "The Office of the Deputy Regional President is pleased to announce a regional development forum scheduled for the upcoming fiscal year. The forum will bring together stakeholders from various sectors to discuss economic growth strategies, infrastructure development, and social programs.\n\nKey topics to be discussed include:\n- Economic diversification and investment opportunities\n- Infrastructure development priorities\n- Social service enhancement programs\n- Public-private partnership frameworks\n\nThe forum aims to create a collaborative platform for aligning regional development goals with national strategies and ensuring inclusive growth across all zones of the South Ethiopia Regional State.",
    ),
    pinned: false,
  },
  {
    title: 'New Infrastructure Projects Underway',
    date: 'July 18, 2026',
    category: 'Development',
    excerpt:
      'Multiple infrastructure projects have been launched across the region, focusing on road construction, water supply, and healthcare facilities.',
    content: toLexical(
      'The regional government has launched multiple infrastructure projects across the South Ethiopia Regional State. These projects focus on road construction, water supply systems, and healthcare facilities.\n\nThe initiative includes:\n- Construction of 200 km of new roads connecting rural communities\n- Installation of 15 new water supply systems\n- Construction and renovation of 10 healthcare facilities\n- Development of 5 new schools\n\nThese projects are expected to significantly improve access to essential services and stimulate economic activity in the region.',
    ),
    pinned: false,
  },
  {
    title: 'Peace and Reconciliation Initiative',
    date: 'July 10, 2026',
    category: 'Governance',
    excerpt:
      'A new peace and reconciliation initiative has been launched to strengthen social harmony among communities in the region.',
    content: toLexical(
      'A comprehensive peace and reconciliation initiative has been launched to strengthen social harmony among communities in the South Ethiopia Regional State. The initiative focuses on dialogue, conflict resolution, and community building.\n\nThe initiative includes:\n- Community dialogue platforms at the zonal level\n- Training for peace ambassadors\n- Support for traditional conflict resolution mechanisms\n- Youth engagement programs for peacebuilding\n\nThe Office calls upon all citizens to actively participate in building a peaceful and harmonious society.',
    ),
    pinned: false,
  },
  {
    title: 'Education Sector Reform Update',
    date: 'June 28, 2026',
    category: 'Education',
    excerpt:
      'Updates on the education reform program, including new school construction and teacher training programs across the region.',
    content: toLexical(
      'Significant progress has been made in the education sector reform program. New school construction projects, teacher training programs, and curriculum enhancements are being implemented across the region.\n\nAchievements include:\n- Construction of 25 new primary schools\n- Training of 500 teachers in modern pedagogy\n- Distribution of educational materials to 100,000 students\n- Establishment of 10 new libraries\n\nThe Office remains committed to improving access to quality education for all children in the region.',
    ),
    pinned: false,
  },
]

const seedEvents = [
  {
    title: 'Regional Development Forum',
    type: 'Conferences',
    date: 'Aug 15, 2026',
    location: 'Ombudsman Hall, Hawassa',
    description:
      "The Deputy Regional President's office hosts a regional development forum to discuss economic growth strategies for the upcoming fiscal year.",
    content: toLexical(
      "The Office of the Deputy Regional President is pleased to announce the Regional Development Forum, bringing together stakeholders from government, the private sector, civil society, and development partners.\n\nThe forum will address:\n- Economic diversification and investment opportunities\n- Infrastructure development priorities\n- Social service enhancement programs\n- Public-private partnership frameworks\n\nThe forum aims to create a collaborative platform for aligning regional development goals with national strategies and ensuring inclusive growth across all zones of the South Ethiopia Regional State.",
    ),
  },
  {
    title: 'Peace & Reconciliation Workshop',
    type: 'Workshops',
    date: 'Sep 2, 2026',
    location: 'Regional Culture Center, Hawassa',
    description:
      'A hands-on workshop focused on strengthening community dialogue, conflict resolution, and social harmony across the region.',
    content: toLexical(
      'The Peace & Reconciliation Workshop brings together community leaders, peace ambassadors, and facilitators to strengthen social harmony across the region.\n\nThe workshop covers:\n- Community dialogue platforms at the zonal level\n- Training for peace ambassadors\n- Support for traditional conflict resolution mechanisms\n- Youth engagement programs for peacebuilding\n\nThe Office calls upon all citizens to actively participate in building a peaceful and harmonious society.',
    ),
  },
  {
    title: 'Budget Planning Meeting',
    type: 'Meetings',
    date: 'Sep 10, 2026',
    location: 'Conference Hall, Regional Government Building',
    description:
      'Working session to review priority allocations and finalize the regional budget plan for the upcoming fiscal year.',
    content: toLexical(
      'The Budget Planning Meeting convenes sector bureaus and zone representatives to review priority allocations for the upcoming fiscal year.\n\nAgenda items include:\n- Review of the previous year\u2019s performance\n- Sectoral budget proposals\n- Capital project financing priorities\n- Public transparency and reporting commitments\n\nThe outcome will feed the consolidated budget submission for the Regional Council.',
    ),
  },
  {
    title: 'Infrastructure Investment Workshop',
    type: 'Workshops',
    date: 'Sep 22, 2026',
    location: 'Investment Bureau Training Hall, Hawassa',
    description:
      'Interactive workshop on structuring and financing regional infrastructure projects with private investors and development partners.',
    content: toLexical(
      'The Infrastructure Investment Workshop is designed to accelerate implementation of key regional projects through improved financing structures.\n\nTopics include:\n- Project preparation and bankability\n- Public-private partnership frameworks\n- Access to development finance\n- Monitoring and evaluation of infrastructure programs\n\nThe workshop is open to project owners, finance officers, and partner organizations.',
    ),
  },
  {
    title: 'Quarterly Stakeholder Meeting',
    type: 'Meetings',
    date: 'Oct 5, 2026',
    location: 'Regional Government Building, Hawassa',
    description:
      "Quarterly review of regional development progress, program delivery, and priorities with all stakeholders.",
    content: toLexical(
      'The Quarterly Stakeholder Meeting provides an update on regional development progress and program delivery to all partners.\n\nThe meeting reviews:\n- Progress against the current action plan\n- Sector performance highlights\n- Emerging challenges and corrective measures\n- Commitments for the coming quarter\n\nAll stakeholder representatives are requested to confirm participation in advance.',
    ),
  },
  {
    title: 'Education Summit',
    type: 'Conferences',
    date: 'Oct 18, 2026',
    location: 'Hawassa University Main Hall',
    description:
      'High-level summit on education reforms, teacher training, and improving learning outcomes across the region.',
    content: toLexical(
      'The Education Summit convenes educators, administrators, development partners, and civil society to advance the region\u2019s education reform agenda.\n\nKey sessions include:\n- School construction and infrastructure programs\n- Teacher training and professional development\n- Curriculum enhancement and digital learning\n- Equal access for girls and learners with disabilities\n\nThe summit will produce an action plan for the coming academic year.',
    ),
  },
]

const seedPublicNotices = [
  {
    title: 'Tender: Supply of Building Materials for Regional Schools',
    date: 'August 10, 2026',
    excerpt:
      'The Regional Government invites qualified suppliers to bid for the supply of building materials for school construction projects across the region.',
    content: toLexical(
      'The Office of the Deputy Regional President, on behalf of the Regional Government, invites qualified bidders to submit sealed bids for the supply of building materials for ongoing school construction projects.\n\nThe tender covers the following lots:\n- Lot 1: Cement and aggregate (12 zones)\n- Lot 2: Steel and roofing materials\n- Lot 3: Windows, doors, and fittings\n\nEligibility:\n- Business license for the current fiscal year\n- VAT registration certificate\n- Capability statement and past performance records\n\nInterested bidders may obtain the full tender document from the Regional Procurement Office, Hawassa, upon payment of a non-refundable fee.\n\nBid submission closes on September 15, 2026 at 5:00 PM. Bids will be opened publicly on September 16, 2026 at 10:00 AM.',
    ),
  },
  {
    title: 'Vacancy Announcement: Senior Policy Analysts',
    date: 'August 8, 2026',
    excerpt:
      'The Office invites qualified professionals to apply for Senior Policy Analyst positions to support regional policy formulation and program coordination.',
    content: toLexical(
      'The Office of the Deputy Regional President invites qualified applicants for the following positions:\n\n- Senior Policy Analyst (Policy & Planning Directorate)\n- Program Coordination Officer (Program Coordination Directorate)\n\nRequired qualifications:\n- MA/MSc in Public Policy, Economics, Development Studies, or related fields\n- 5+ years of relevant professional experience\n- Strong analytical, writing, and coordination skills\n- Proficiency in English and Amharic; knowledge of southern Ethiopian languages is an advantage\n\nInterested applicants should submit their CV, cover letter, and copies of credentials to the office address or email listed below within 15 days of this notice.\n\nThe Office is an equal opportunity employer. Women candidates are strongly encouraged to apply.',
    ),
  },
  {
    title: 'Public Notice: Water Supply Project Environmental Review',
    date: 'August 5, 2026',
    excerpt:
      'Public disclosure of the environmental and social impact review for the regional rural water supply expansion program.',
    content: toLexical(
      'Notice is hereby given that the Regional Water, Mines and Energy Bureau has prepared an Environmental and Social Impact Review for the expansion of rural water supply systems in five zones.\n\nThe program will install 25 new water supply schemes, benefiting approximately 150,000 residents.\n\nCopies of the Environmental and Social Impact Review are available for public inspection at:\n- The Regional Water, Mines and Energy Bureau, Hawassa\n- Zonal water development offices\n\nThe public is invited to submit comments and feedback within 30 days of this notice. Comments should be addressed to the Environmental Review Coordinator.',
    ),
  },
]

const seedSuccessStories = [
  {
    title: 'From Drought to Harvest: Farmers Transform Agriculture',
    date: 'July 22, 2026',
    excerpt:
      'How innovative irrigation techniques helped a community overcome drought and achieve food security.',
    content: toLexical(
      'In the lowlands of the region, a farming community once threatened by recurring drought has transformed its fate through innovative water management.\n\nThe community, working with the Regional Agriculture Bureau, adopted water harvesting and drip irrigation technologies that changed the agricultural landscape.\n\nKey outcomes:\n- Grain production tripled within two seasons\n- 40,000+ farmers reached with modern techniques\n- Year-round cultivation made possible\n- Reduced dependence on unreliable rainfall\n\nThe success is now being replicated in neighboring villages, turning a story of hardship into one of resilience and hope for the entire region.',
    ),
  },
  {
    title: 'Youth Employment Program Creates 5,000 Jobs',
    date: 'July 15, 2026',
    excerpt:
      'A targeted youth employment program has successfully placed thousands of young people in meaningful jobs.',
    content: toLexical(
      'A region-wide youth employment initiative has exceeded all expectations, creating thousands of sustainable jobs for young people.\n\nThrough a mix of digital skills training, entrepreneurship support, and private sector partnerships, the program has connected youth with real opportunities.\n\nHighlights:\n- 5,000+ young people placed in jobs\n- Digital skills training through the Ethio Coders program\n- Startup and micro-enterprise grants for young entrepreneurs\n- Partnerships with businesses across the region\n\nThe initiative is now expanding to reach every zone, giving the region’s youth a stake in its growing economy.',
    ),
  },
  {
    title: 'New Healthcare Initiative Launched in Three Zones',
    date: 'July 25, 2026',
    excerpt:
      'A comprehensive healthcare initiative is improving maternal and child health services across three zones.',
    content: toLexical(
      'A comprehensive healthcare initiative has improved access to quality care for mothers and children in three zones of the region.\n\nThe program established new health posts, trained extension workers, and deployed mobile clinics to underserved areas.\n\nKey achievements:\n- 30 new health posts established in underserved areas\n- 200 health extension workers trained\n- Mobile clinics serving remote communities\n- Essential maternal health supplies distributed\n\nCommunity health committees have been central to the initiative, sustaining services and driving health education across the region.',
    ),
  },
]

const seedPressReleases = [
  {
    title: 'Regional Development Forum Concludes with Action Plan',
    date: 'July 28, 2026',
    excerpt:
      'The two-day regional development forum brought together stakeholders from all sectors to align on priority initiatives for the upcoming fiscal year.',
    content: toLexical(
      'The Office of the Deputy Regional President has concluded the two-day Regional Development Forum with a comprehensive action plan for the upcoming fiscal year.\n\nThe forum brought together government officials, the private sector, civil society, and development partners to align on the region\'s growth priorities.\n\nAgreed priorities include:\n- Expanding economic diversification and investment\n- Accelerating infrastructure development\n- Strengthening public service delivery\n- Enhancing social protection programs\n\nThe action plan will now be operationalized across all zones, with quarterly progress reviews to keep implementation on track.',
    ),
  },
  {
    title: 'Infrastructure Development Package Approved by Cabinet',
    date: 'July 20, 2026',
    excerpt:
      'The regional cabinet has approved a comprehensive infrastructure development package for the fiscal year.',
    content: toLexical(
      'The Regional Cabinet has approved a comprehensive infrastructure development package spanning roads, water, energy, and public facilities for the fiscal year.\n\nThe package represents one of the largest infrastructure investments in the region\'s history.\n\nKey components:\n- 200 km of new road construction\n- 15 new water supply systems\n- 10 healthcare facility construction and renovation projects\n- 5 new schools\n\nThe projects are expected to significantly improve access to essential services and stimulate economic activity across the region.',
    ),
  },
  {
    title: 'New Education Reforms Announced for 2026-2027',
    date: 'July 5, 2026',
    excerpt:
      'The regional government has announced new education reforms aimed at improving quality and access for all children.',
    content: toLexical(
      'The Regional Government has announced a new round of education reforms for the 2026-2027 academic year, focused on quality, access, and equity.\n\nThe reforms build on recent progress to expand enrollment and improve learning outcomes across the region.\n\nKey measures:\n- 25 new primary schools to be constructed\n- Teacher training and professional development programs\n- Distribution of learning materials to all students\n- Expansion of digital learning initiatives\nThe Office reaffirms its commitment to ensuring every child in the region has access to quality education.',
    ),
  },
]

const seedPosts = [
  {
    slug: 'healthcare-initiative-expands-maternal-services',
    title: 'Healthcare Initiative Expands Maternal and Child Services',
    excerpt:
      'A comprehensive healthcare initiative is improving maternal and child health services across three zones.',
    category: 'success-stories',
    author: 'Regional Health Bureau',
    status: 'publish',
    sticky: true,
    content: toLexical(
      'A comprehensive healthcare initiative has been launched to improve maternal and child health services across three zones of the South Ethiopia Regional State.\n\nThe initiative aims to reduce maternal and child mortality by expanding access to quality care at the community level.\n\nKey components:\n- 30 new health posts established in underserved areas\n- Training for 200 health extension workers\n- Mobile clinics serving remote communities\n- Distribution of essential maternal health supplies\n\nCommunity engagement is central to the initiative, with local health committees supporting service delivery and health education campaigns.',
    ),
  },
  {
    slug: 'regional-development-forum-highlights-economic-prospects',
    title: 'Regional Development Forum Highlights Economic Prospects',
    excerpt:
      'The regional development forum brought together stakeholders to discuss economic growth strategies for the upcoming fiscal year.',
    category: 'press-releases',
    author: 'Office of the Deputy Regional President',
    status: 'publish',
    content: toLexical(
      'The Office of the Deputy Regional President hosted a regional development forum bringing together stakeholders from government, the private sector, and civil society.\n\nThe forum provided a platform to discuss the region\'s economic outlook and align priorities for the upcoming fiscal year.\n\nKey topics discussed:\n- Economic diversification and investment opportunities\n- Infrastructure development priorities\n- Social service enhancement programs\n- Public-private partnership frameworks\n\nThe forum created a collaborative platform for aligning regional development goals with national strategies and ensuring inclusive growth across all zones of the South Ethiopia Regional State.',
    ),
  },
  {
    slug: 'new-rural-road-network-improves-access',
    title: 'New Rural Road Network Improves Access',
    excerpt:
      'Completion of key road segments connects previously isolated rural communities to markets and services.',
    category: 'announcements',
    author: 'Regional Communications Bureau',
    status: 'publish',
    content: toLexical(
      'A new rural road network has been completed, connecting previously isolated communities to markets, schools, and health centers.\n\nThe network represents a significant investment in regional connectivity and has transformed daily life for thousands of residents.\n\nThe network includes:\n- 120 km of newly paved roads\n- Four new bridges across seasonal rivers\n- Improved all-weather access for 15 rural villages\n\nTransport times to the nearest district capitals have been reduced by half, supporting local trade and access to essential services.',
    ),
  },
  {
    slug: 'education-reform-reaches-new-milestones',
    title: 'Education Reform Reaches New Milestones',
    excerpt:
      'School construction and teacher training programs report strong progress across the region.',
    category: 'success-stories',
    author: 'Regional Education Bureau',
    status: 'publish',
    content: toLexical(
      'The education sector reform program has reached significant milestones this quarter.\n\nThe reforms aim to expand access, improve quality, and equip young people with the skills needed for the regional economy.\n\nKey achievements:\n- 25 new primary schools constructed\n- 500 teachers trained in modern pedagogy\n- Educational materials distributed to 100,000 students\n- 10 new libraries established\n\nThe Office remains committed to improving access to quality education for all children in the region.',
    ),
  },
  {
    slug: 'peacebuilding-initiatives-expand-across-zones',
    title: 'Peacebuilding Initiatives Expand Across Zones',
    excerpt:
      'Community dialogue platforms and peace ambassador training are strengthening social harmony.',
    category: 'public-notices',
    author: 'Regional Peace Bureau',
    status: 'publish',
    content: toLexical(
      'A comprehensive peace and reconciliation initiative is expanding across the region, focusing on dialogue, conflict resolution, and community building.\n\nThe initiative is grounded in the belief that sustainable peace is built from the community upward, combining modern approaches with traditional conflict resolution mechanisms.\n\nThe initiative includes:\n- Community dialogue platforms at the zonal level\n- Training for peace ambassadors\n- Support for traditional conflict resolution mechanisms\n- Youth engagement programs for peacebuilding\n\nThe Office calls upon all citizens to actively participate in building a peaceful and harmonious society.',
    ),
  },
]

const seedNewsCategories = [
  { name: 'Announcements', slug: 'announcements' },
  { name: 'Press Releases', slug: 'press-releases' },
  { name: 'Success Stories', slug: 'success-stories' },
  { name: 'Public Notices', slug: 'public-notices' },
]

const seedPrograms = [
  {
    title: 'Economic Development',
    description:
      'Programs aimed at stimulating economic growth, supporting small and medium enterprises, and attracting investment to the region.',
    icon: '📈',
    sortOrder: 1,
  },
  {
    title: 'Infrastructure & Public Works',
    description:
      'Road construction, water supply systems, healthcare facilities, and other critical infrastructure projects across the region.',
    icon: '🏗️',
    sortOrder: 2,
  },
  {
    title: 'Education & Capacity Building',
    description:
      'School construction, teacher training, scholarship programs, and vocational training initiatives.',
    icon: '📚',
    sortOrder: 3,
  },
  {
    title: 'Peace & Security',
    description:
      'Community peacebuilding initiatives, conflict resolution programs, and public safety enhancement.',
    icon: '🕊️',
    sortOrder: 4,
  },
  {
    title: 'Good Governance',
    description:
      'Transparency initiatives, public service improvement, anti-corruption measures, and citizen engagement programs.',
    icon: '⚖️',
    sortOrder: 5,
  },
  {
    title: 'Social Protection',
    description:
      'Programs supporting vulnerable populations, including food security, healthcare access, and social welfare.',
    icon: '🤝',
    sortOrder: 6,
  },
]

const seedGallery = [
  { title: 'Community Engagement Forum', date: 'July 2026' },
  { title: 'Infrastructure Project Launch', date: 'June 2026' },
  { title: 'Peace Conference', date: 'June 2026' },
  { title: 'Education Summit', date: 'May 2026' },
  { title: 'Development Workshop', date: 'May 2026' },
  { title: 'Cultural Festival', date: 'April 2026' },
]

type SeedDocument = {
  title: string
  category:
    | 'annual-reports'
    | 'policies'
    | 'guidelines'
    | 'strategic-plans'
    | 'tender-documents'
    | 'budget'
    | 'manuals'
  date: string
  description: string
}

const seedDocuments: SeedDocument[] = [
  {
    title: 'Annual Report 2025',
    category: 'annual-reports',
    date: 'June 2026',
    description:
      'Comprehensive report on regional development, financial performance, and program outcomes for the fiscal year 2025.',
  },
  {
    title: 'Annual Report 2024',
    category: 'annual-reports',
    date: 'June 2025',
    description:
      'Yearly review of achievements, investments, and governance across the South Ethiopia Regional State for 2024.',
  },
  {
    title: 'Annual Report 2023',
    category: 'annual-reports',
    date: 'June 2024',
    description:
      'Development progress report covering infrastructure, social services, and economic growth during 2023.',
  },
  {
    title: 'Regional Development Policy',
    category: 'policies',
    date: 'March 2026',
    description:
      'Official policy framework guiding sustainable regional development, investment, and resource mobilization.',
  },
  {
    title: 'Good Governance Strategy',
    category: 'policies',
    date: 'February 2026',
    description:
      'Strategic directives for transparency, accountability, and citizen participation in regional administration.',
  },
  {
    title: 'Service Delivery Guidelines',
    category: 'guidelines',
    date: 'January 2026',
    description:
      'Operational standards and procedures for effective public service delivery across all sectors.',
  },
  {
    title: 'Strategic Plan 2026-2030',
    category: 'strategic-plans',
    date: 'October 2025',
    description:
      'Medium-term strategic plan setting out the region\u2019s development priorities, targets, and resource allocation.',
  },
  {
    title: 'Tender: School Construction 2026',
    category: 'tender-documents',
    date: 'August 2026',
    description:
      'Public tender invitation for the construction of new primary schools in three zones.',
  },
  {
    title: 'Budget Overview 2026',
    category: 'budget',
    date: 'July 2026',
    description:
      'Regional budget documents and expenditure summary for public transparency in the fiscal year 2026.',
  },
  {
    title: 'Public Procurement Manual',
    category: 'manuals',
    date: 'May 2026',
    description:
      'Reference guide for procurement officers and bidders on regional procurement procedures.',
  },
]

function createSampleFile(title: string) {
  const safe = title.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()
  const content = `${title}\n\nOfficial document of the South Ethiopia Regional State.\nSample content provided for demonstration purposes.\n`
  return {
    data: Buffer.from(content, 'utf8'),
    name: `${safe}.txt`,
    mimetype: 'text/plain',
    size: Buffer.byteLength(content),
  }
}

const seedUsers = [
  {
    email: 'admin@southethiopia.gov.et',
    password: process.env.SEED_ADMIN_PASSWORD || 'password123',
    name: 'Super Admin',
    role: 'super_admin',
    active: true,
  },
  {
    email: 'editor@southethiopia.gov.et',
    password: process.env.SEED_EDITOR_PASSWORD || 'password123',
    name: 'Editor User',
    role: 'editor',
    active: true,
  },
  {
    email: 'reporter@southethiopia.gov.et',
    password: process.env.SEED_REPORTER_PASSWORD || 'password123',
    name: 'Reporter User',
    role: 'reporter',
    active: true,
  },
]

main().catch((err) => {
  console.error(err)
  process.exit(1)
})