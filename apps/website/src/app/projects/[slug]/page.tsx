import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Project",
};

type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  stats: string;
  body: string[];
  updates: { title: string; date: string; body: string }[];
  keyAchievements: string[];
};

const fallbackProjects: ProjectItem[] = [
  {
    slug: "roads",
    title: "Roads",
    description: "Building and upgrading regional road networks to connect communities, facilitate trade, and improve access to markets and services.",
    stats: "500+ km of roads constructed or upgraded",
    body: [
      "The South Ethiopia Regional State is making significant progress in expanding and upgrading its road network. By connecting remote communities to markets, schools, and health centers, road projects are transforming daily life for thousands of residents and unlocking new economic opportunities across the region.",
      "Recent initiatives include the construction of new road segments linking previously isolated villages with district capitals, along with the upgrade of major arterial routes that support trade and movement between zones. Bridge construction is improving all-weather access, reducing reliance on seasonal river crossings.",
      "Beyond connectivity, the expanded road network is stimulating local economies by reducing transport costs and travel times, enabling farmers and traders to reach larger markets, and attracting investment into underserved areas.",
    ],
    keyAchievements: [
      "Construction of 200 km of new roads linking remote communities",
      "Upgrading of major arterial routes across all zones",
      "Bridge construction to improve all-weather access",
    ],
    updates: [
      {
        title: "New Road Segment Connects Rural Communities",
        date: "July 2026",
        body: "The completion of a key road segment has connected previously isolated villages to markets, schools, and health centers, cutting travel time to district capitals in half.",
      },
      {
        title: "Regional Road Fund Launched",
        date: "May 2026",
        body: "A dedicated road maintenance and construction fund has been launched to sustain the expansion of the regional road network over the next five years.",
      },
    ],
  },
  {
    slug: "health",
    title: "Health",
    description: "Constructing and renovating healthcare facilities, expanding access to medical services, and strengthening the regional health system.",
    stats: "25 health facilities built or renovated",
    body: [
      "Access to quality healthcare is a cornerstone of the region's development agenda. The South Ethiopia Regional State is constructing and renovating healthcare facilities, deploying mobile clinics, and training health professionals to bring essential services closer to every community.",
      "New health posts and upgraded hospitals are expanding access in underserved areas, while mobile clinic units are reaching remote communities that previously had limited medical care. Health extension workers are being trained to deliver maternal, child, and preventive services at the community level.",
      "These investments are improving health outcomes across the region, reducing maternal and child mortality and ensuring that all citizens can access the care they need.",
    ],
    keyAchievements: [
      "Construction and renovation of 25 healthcare facilities",
      "Deployment of mobile clinics to underserved areas",
      "Training of over 200 health extension workers",
    ],
    updates: [
      {
        title: "Maternal Health Initiative Expands",
        date: "July 2026",
        body: "A comprehensive maternal and child health program is improving access to quality care across three zones, with 30 new health posts established in underserved areas.",
      },
      {
        title: "Mobile Clinics Reach Remote Communities",
        date: "June 2026",
        body: "New mobile clinic units are now serving remote communities, bringing essential health services closer to families who previously had limited access.",
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    description: "Building new schools, upgrading educational infrastructure, and enhancing the quality of education at all levels across the region.",
    stats: "15 new schools constructed",
    body: [
      "Education is the foundation of long-term development in the South Ethiopia Regional State. The regional government is building new schools, upgrading educational infrastructure, and strengthening teaching quality to ensure every child has access to learning.",
      "Recent progress includes the construction of primary and secondary schools, the training of hundreds of teachers in modern pedagogy, and the establishment of new libraries and digital learning initiatives that broaden access to knowledge.",
      "By investing in education, the region is equipping its youth with the skills and knowledge needed to participate in and drive economic growth for years to come.",
    ],
    keyAchievements: [
      "Construction of 25 new primary schools",
      "Training of 500 teachers in modern pedagogy",
      "Distribution of learning materials to students across the region",
    ],
    updates: [
      {
        title: "Education Reform Reaches New Milestones",
        date: "July 2026",
        body: "School construction and teacher training programs are reporting strong progress, with new libraries established and digital learning initiatives expanding.",
      },
      {
        title: "Teacher Training Program Expanded",
        date: "May 2026",
        body: "A new round of professional development is equipping hundreds of teachers with modern, student-centered teaching methods.",
      },
    ],
  },
  {
    slug: "agriculture",
    title: "Agriculture",
    description: "Supporting farmers with modern techniques, irrigation, inputs, and market linkages to boost productivity and food security.",
    stats: "40,000+ farmers reached",
    body: [
      "Agriculture anchors the economy of the South Ethiopia Regional State, and boosting productivity and food security is a top priority. The regional government is supporting farmers with modern techniques, irrigation, quality inputs, and stronger market linkages.",
      "Through extension programs and innovative irrigation technologies, thousands of farmers have increased production, reduced dependence on unreliable rainfall, and achieved year-round cultivation.",
      "Improved market linkages are helping farmers sell at better prices, while training and technical support are building resilience against drought and other climate challenges.",
    ],
    keyAchievements: [
      "Support for over 40,000 farmers with modern techniques",
      "Expansion of irrigation infrastructure across the region",
      "Improved market linkages for agricultural produce",
    ],
    updates: [
      {
        title: "From Drought to Harvest: Farmers Transform Agriculture",
        date: "July 2026",
        body: "Innovative water harvesting and drip irrigation techniques helped a farming community overcome drought and achieve food security, tripling grain production in two seasons.",
      },
      {
        title: "Irrigation Program Expanded",
        date: "June 2026",
        body: "The regional agriculture bureau is expanding year-round cultivation through new irrigation schemes benefiting thousands of farming households.",
      },
    ],
  },
  {
    slug: "water",
    title: "Water",
    description: "Installing water supply systems, drilling wells, and developing irrigation infrastructure for communities across the region.",
    stats: "40+ water supply systems installed",
    body: [
      "Reliable access to clean water is essential for health, agriculture, and economic activity. The South Ethiopia Regional State is installing water supply systems, drilling wells, and developing irrigation infrastructure to serve communities across the region.",
      "Newly installed water systems are delivering safe drinking water to families who previously depended on distant and unreliable sources, saving time and improving public health.",
      "Irrigation development is supporting year-round farming and food security, while expanded water access is laying the foundation for broader social and economic progress.",
    ],
    keyAchievements: [
      "Installation of 40+ water supply systems",
      "Drilling of wells serving rural communities",
      "Development of irrigation infrastructure",
    ],
    updates: [
      {
        title: "Water Supply Expansion Program Underway",
        date: "July 2026",
        body: "A program to install new water supply schemes is benefiting approximately 150,000 residents across five zones of the region.",
      },
      {
        title: "Clean Water Reaches Remote Villages",
        date: "May 2026",
        body: "Newly installed water systems are delivering clean, safe water to communities that previously relied on distant and unreliable sources.",
      },
    ],
  },
  {
    slug: "ict",
    title: "ICT",
    description: "Deploying digital infrastructure, e-government services, and technology solutions to modernize public administration.",
    stats: "Digital services across all sectors",
    body: [
      "Digital transformation is modernizing public administration and expanding access to government services in the South Ethiopia Regional State. The region is deploying digital infrastructure, e-government services, and technology solutions across all sectors.",
      "Citizens can now access services faster and more transparently through growing online channels, while digital skills programs are equipping young people with the capabilities needed for the modern economy.",
      "By investing in connectivity and digital capacity, the region is building a more efficient, inclusive, and forward-looking public sector.",
    ],
    keyAchievements: [
      "Rollout of e-government services across sectors",
      "Digital skills training through the Ethio Coders program",
      "Establishment of digital infrastructure in regional hubs",
    ],
    updates: [
      {
        title: "Digital Services Transform Government",
        date: "July 2026",
        body: "E-government services are being rolled out across all sectors, allowing citizens to access services faster and more transparently.",
      },
      {
        title: "Ethio Coders Program Empowers Youth",
        date: "June 2026",
        body: "Hundreds of young people are being trained in digital skills through the Ethio Coders program, creating new momentum for job creation.",
      },
    ],
  },
  {
    slug: "women-affairs",
    title: "Women Affairs",
    description: "Implementing programs for gender equality, women's economic empowerment, and protection of women's rights across the region.",
    stats: "Programs in all zones",
    body: [
      "Achieving gender equality and empowering women are central to the region's social development strategy. Programs across the South Ethiopia Regional State are advancing women's economic empowerment, leadership, and protection of rights.",
      "Economic empowerment initiatives are supporting women entrepreneurs with training, access to finance, and market opportunities, while awareness and protection programs are strengthening the rights and safety of women in every zone.",
      "By investing in women, the region is unlocking their full contribution to economic growth, community resilience, and social harmony.",
    ],
    keyAchievements: [
      "Economic empowerment programs for women in all zones",
      "Gender equality and rights protection initiatives",
      "Support for women-led enterprises",
    ],
    updates: [
      {
        title: "Women's Economic Empowerment Program Expands",
        date: "July 2026",
        body: "Programs supporting women-led enterprises and economic empowerment are expanding across all zones of the region.",
      },
      {
        title: "Protection of Women's Rights Strengthened",
        date: "May 2026",
        body: "New initiatives are strengthening the protection of women's rights and promoting gender equality across communities.",
      },
    ],
  },
  {
    slug: "youth",
    title: "Youth",
    description: "Creating opportunities for young people through education, skills training, employment, and entrepreneurship programs.",
    stats: "Thousands of youth empowered",
    body: [
      "Young people are the future of the South Ethiopia Regional State, and creating opportunities for them is a strategic priority. Programs in education, skills training, employment, and entrepreneurship are empowering the region's youth to build successful futures.",
      "A flagship youth employment program has placed thousands of young people in meaningful jobs, while digital skills training and startup grants are enabling young entrepreneurs to launch and grow businesses.",
      "By investing in its youth, the region is building a skilled, dynamic workforce that will drive prosperity for generations to come.",
    ],
    keyAchievements: [
      "Youth employment program placed 5,000+ young people",
      "Digital skills training for young job seekers",
      "Startup and micro-enterprise grants for young entrepreneurs",
    ],
    updates: [
      {
        title: "Youth Employment Program Creates 5,000 Jobs",
        date: "July 2026",
        body: "A targeted youth employment program has successfully placed thousands of young people in meaningful jobs through digital skills training and private sector partnerships.",
      },
      {
        title: "Young Entrepreneurs Receive Grants",
        date: "June 2026",
        body: "Startup and micro-enterprise grants are empowering young entrepreneurs to launch and grow businesses across the region.",
      },
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    description: "Developing and maintaining critical infrastructure including energy, telecommunications, and public facilities to support regional growth.",
    stats: "Major infrastructure across the region",
    body: [
      "Critical infrastructure underpins every aspect of regional life, from energy and telecommunications to public facilities. The South Ethiopia Regional State is developing and maintaining infrastructure that supports economic growth and improves quality of life.",
      "Large-scale investments are expanding the energy and telecommunications networks that power homes, businesses, and public institutions, while new public facilities are strengthening service delivery in communities across the region.",
      "These investments are creating the physical foundation for sustainable growth and a more connected, prosperous region.",
    ],
    keyAchievements: [
      "Large-scale infrastructure investments across the region",
      "Expansion of energy and telecommunications networks",
      "Development of public facilities in all zones",
    ],
    updates: [
      {
        title: "Cabinet Approves Infrastructure Package",
        date: "July 2026",
        body: "The regional cabinet has approved a comprehensive infrastructure development package covering roads, water, energy, and public facilities.",
      },
      {
        title: "Public Facilities Network Expanded",
        date: "June 2026",
        body: "New public facilities are being developed across the region to support communities and strengthen service delivery.",
      },
    ],
  },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project: ProjectItem | undefined = fallbackProjects.find(
    (p) => p.slug === slug,
  );

  if (!project) {
    notFound();
  }

  const title = project.title;
  const description = project.description;
  const stats = project.stats;
  const keyAchievements = project.keyAchievements ?? [];
  const updates = project.updates ?? [];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-green-900 to-green-800 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Projects
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-300">{description}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-yellow-300">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {stats}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {project.body.length > 0 ? (
            <div className="prose max-w-none">
              {project.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mb-4 text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground">Key Achievements</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyAchievements.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-muted/40 p-5">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Latest Updates</h2>
          <div className="mt-4 space-y-6">
            {updates.map((update) => (
              <article
                key={update.title}
                className="rounded-2xl border border-border p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {title}
                  </span>
                  <span>{update.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{update.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{update.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}