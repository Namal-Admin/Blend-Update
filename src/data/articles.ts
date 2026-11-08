import { Article, Comment } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'story-top-main',
    title: 'Get the latest news, updates and stories shaping Kenya & the World.',
    excerpt: 'From major economic shifts and international diplomacy to tech frontiers and cultural milestones across continents, unpack the defining stories moving our global society.',
    content: [
      'The modern news landscape demands a lens that connects local realities with global forces. Across Africa and worldwide capitals, transformative policies in digital currency, climate resilience, and trade connectivity are reshaping how societies operate.',
      'In Nairobi, Geneva, and Washington, economic delegations are reviewing milestones in bilateral manufacturing, renewable power infrastructure, and decentralized fintech. The shared objective remains accelerating economic opportunities while safeguarding public interest.',
      'Major infrastructure initiatives—including the expansion of African continental digital corridors, green port modernizations in Mombasa and Rotterdam, and cross-border clean energy grids—are unlocking unprecedented commercial potential.',
      '“We no longer live in insulated silos,” observed global affairs analysts during an international development briefing. “The cross-pollination of African innovation with global capital and technological transfer is driving the next chapter of sustainable progress.”',
      'The Real Blend brings you verified reporting, balanced analysis, and deep human narratives that keep you informed, critical, and ahead of the curve.'
    ],
    category: 'World News',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Global commerce and metropolitan hubs leading international economic renewal.',
    author: 'Victor Ochieng',
    authorRole: 'Senior International Affairs Editor',
    date: 'Today, 08:30 AM',
    readTime: '4 min read',
    isTopStory: true,
    views: 18920,
    commentsCount: 42,
    tags: ['World', 'Africa', 'Economy', 'Diplomacy', 'Global Affairs']
  },
  {
    id: 'story-top-side',
    title: 'Stay informed. Stay ahead.',
    excerpt: 'Pan-African integration accelerates as the African Continental Free Trade Area (AfCFTA) links 1.3 billion consumers under zero-tariff frameworks.',
    content: [
      'In a momentous step for continental solidarity, AfCFTA member states have operationalized the Pan-African Payment and Settlement System (PAPSS) across 30 nations.',
      'The initiative enables African traders and enterprises to settle cross-border transactions in their local currencies, eliminating reliance on intermediary foreign currencies and slashing annual transaction costs by over $5 billion.',
      'From logistics hubs in Durban and Tangier to tech clusters in Nairobi, Lagos, and Kigali, young entrepreneurs are leveraging digital single-window portals to market artisanal goods, software products, and agro-commodities without bureaucratic delays.',
      '“A unified African market is no longer a distant aspiration; it is our lived commercial reality,” noted senior trade envoys in Addis Ababa.'
    ],
    category: 'Africa',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'African Union and regional economic leaders conferring on trade integration in Addis Ababa.',
    author: 'Grace Wanjiru',
    authorRole: 'Pan-African Policy Correspondent',
    date: 'Today, 07:15 AM',
    readTime: '3 min read',
    isSideStory: true,
    views: 13450,
    commentsCount: 29,
    tags: ['AfCFTA', 'Africa', 'Trade', 'Addis Ababa', 'Economy']
  },
  {
    id: 'story-world-climate',
    title: 'Historic global climate agreement unlocks $100B transition fund for emerging nations.',
    excerpt: 'Delegates from 195 nations reach consensus in Geneva on binding clean energy transition grants, grid modernization, and international carbon credit integrity.',
    content: [
      'Negotiators at the United Nations climate summit have concluded a breakthrough multilateral treaty establishing a dedicated $100 billion clean energy financing facility.',
      'The fund prioritizes rapid deployment of utility-scale solar arrays, geothermal exploration, and offshore wind turbines across emerging economies in the Global South.',
      'Key provisions also mandate transparent verification protocols for voluntary carbon markets, ensuring that forest conservation communities in the Congo Basin and the Amazon receive equitable royalties for sequestering atmospheric emissions.',
      '“This pact bridges the trust deficit between industrialized nations and front-line developing states,” declared the UN Climate Chief during the closing plenary.'
    ],
    category: 'World News',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Earth photographed from orbit symbolizing global unity on climate stewardship.',
    author: 'Elena Rostova',
    authorRole: 'Global Environmental Correspondent',
    date: 'Nov 8, 2026',
    readTime: '5 min read',
    views: 16200,
    commentsCount: 51,
    tags: ['UN', 'Climate', 'Global News', 'Sustainability', 'Green Energy']
  },
  {
    id: 'story-africa-tech',
    title: 'Kigali, Cairo and Lagos lead Africa’s surge into artificial intelligence engineering.',
    excerpt: 'Venture investment in African machine learning laboratories quadruples as homegrown models power healthcare diagnostics, indigenous language translation, and precision agriculture.',
    content: [
      'Africa’s technology ecosystem has entered an ambitious second phase. Moving beyond basic payment gateways, software researchers across the continent are engineering state-of-the-art machine learning architectures customized for African infrastructural conditions.',
      'In Kigali, Rwanda, an open-source AI consortium unveiled large multilingual models capable of understanding nuanced regional dialects including Swahili, Hausa, Yoruba, and Amharic with 98% accuracy.',
      'Meanwhile, Egyptian healthtech founders in Cairo are deploying AI triage tools in rural clinics, detecting ocular and cardiological anomalies from standard smartphone camera sensors.',
      '“The global tech narrative has shifted,” said venture partner Amina Diallo. “African software engineers are not merely consumers of Western technology; they are setting the benchmark for resource-efficient AI deployment.”'
    ],
    category: 'Africa',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Young software developers collaborating during a pan-African hackathon.',
    author: 'Tariq Mansoor',
    authorRole: 'Pan-African Technology Reporter',
    date: 'Nov 8, 2026',
    readTime: '4 min read',
    views: 15340,
    commentsCount: 37,
    tags: ['AI', 'Kigali', 'Cairo', 'Lagos', 'African Tech', 'Innovation']
  },
  {
    id: 'story-entertainment-1',
    title: 'Latest entertainment news and celebrity updates.',
    excerpt: 'Get the latest happenings in the entertainment industry — from Gengetone, Afrobeats and Amapiano to international music festivals and cinema breakthroughs.',
    content: [
      'The international music industry is dancing to an African rhythm. From sold-out nights at London’s O2 Arena and New York’s Madison Square Garden to massive streaming charts across Tokyo and Paris, African sounds are dominating the global mainstream.',
      'Over the weekend, an exhilarating music festival brought together Kenyan Gengetone pioneers, Nigerian Afrobeats royalty, and South African Amapiano virtuosos for a landmark 12-hour sonic celebration.',
      'In cinema, African independent directors are making major waves at Cannes and Sundance, securing distribution deals that bring authentic, multi-layered human stories to worldwide subscribers.',
      '“We have created a direct bridge between our streets and the world stage,” shared award-winning record producer Eric Musyoka. “Our beats are magnetic, our visual culture is infectious, and audiences everywhere want more.”'
    ],
    category: 'Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Vibrant concert lights and massive crowds cheering at a global music festival.',
    author: 'Brian Kiprop',
    authorRole: 'Culture & Entertainment Lead',
    date: 'Nov 8, 2026',
    readTime: '3 min read',
    views: 22400,
    commentsCount: 88,
    tags: ['Entertainment', 'Afrobeats', 'Gengetone', 'Music', 'Festivals']
  },
  {
    id: 'story-politics-1',
    title: 'Political developments making headlines across Kenya.',
    excerpt: 'Follow the latest political conversations and developments as national assemblies debate key statutory bills and county governments present their annual audits.',
    content: [
      'The halls of Parliament in Nairobi were charged this week as lawmakers tabled substantive revisions to the statutory fiscal framework, debating public debt caps and local revenue collection measures.',
      'Key opposition legislators and civil society coalitions have insisted on rigorous public participation sessions across all 47 counties before the proposed revenue amendments are enacted.',
      'Meanwhile, County Governors under the Council of Governors (CoG) have renewed calls for timely exchequer releases, cautioning that delayed transfers jeopardize healthcare worker salaries and county medical supplies.',
      'Political analysts observe that with intermediate elections on the horizon, coalitions are actively testing grassroots messaging, particularly targeting the youthful demographic that forms over 65% of the registered electorate.'
    ],
    category: 'Politics',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Parliament buildings in Nairobi during active legislative debate on public revenue policies.',
    author: 'Kevin Mutua',
    authorRole: 'Chief Political Correspondent',
    date: 'Nov 7, 2026',
    readTime: '5 min read',
    views: 12380,
    commentsCount: 45,
    tags: ['Parliament', 'Devolution', 'Bunge', 'Politics', 'Kenya']
  },
  {
    id: 'story-sports-1',
    title: 'Sports updates, results and trending stories.',
    excerpt: 'Follow local and international sporting action — from Champions League football and Formula 1 to marathon legends breaking world records.',
    content: [
      'Sporting arenas around the world delivered thrilling spectacles this past weekend. In European club football, nail-biting Champions League clashes saw tactical masterclasses and stoppage-time winners that reshuffled the championship favorites.',
      'Meanwhile, on the distance running circuit, Kenya and Ethiopia’s elite athletes once again stamped their peerless authority at the world’s major marathons, shattering course records with astonishing tactical discipline.',
      'At home in Kenya, the Mashemeji Derby brought Kasarani Stadium to a fever pitch with over 35,000 passionate supporters roaring in the stands, while Naivasha finalized preparations for the grueling World Rally Championship (WRC) Safari Rally.',
      '“Sport transcends borders like nothing else,” remarked sports commentator Dennis Kemboi. “Whether it is a kid running bare-chested in Eldoret or a striker under the bright lights of Madrid, the pursuit of human excellence unites us all.”'
    ],
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Athletes giving their all in high-intensity international competition.',
    author: 'Dennis Kemboi',
    authorRole: 'Senior Sports Editor',
    date: 'Nov 7, 2026',
    readTime: '3 min read',
    views: 24100,
    commentsCount: 92,
    tags: ['Sports', 'Football', 'Marathon', 'Premier League', 'Athletics']
  },
  {
    id: 'story-technology-1',
    title: 'Technology, innovation and digital transformation.',
    excerpt: 'Explore the latest trends in the digital world: quantum computing strides, next-gen mobile chipsets, and AI agents reshaping enterprise workflows.',
    content: [
      'The pace of technological innovation is accelerating at an unprecedented velocity. Major breakthroughs in semiconductor micro-architecture and neural processing units (NPUs) are bringing desktop-grade generative AI models directly onto handheld mobile devices.',
      'In Silicon Valley, Cambridge, and Tokyo, research labs demonstrated autonomous multi-agent systems capable of conducting scientific literature discovery, synthesizing drug discovery candidates, and optimizing electrical power distribution in smart cities.',
      'Across developing nations, low-earth orbit satellite broadband has expanded high-speed connectivity to over 20,000 remote schools, enabling students to access interactive digital curricula and global educational resources.',
      '“We are standing on the threshold of ubiquitous cognitive computing,” stated frontier AI researcher Dr. Aris Thorne. “The challenge before us is ensuring equitable global access to these transformative capabilities.”'
    ],
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Silicon wafer and advanced microprocessors powering next-generation computing.',
    author: 'Faith Chebet',
    authorRole: 'Global Tech & Innovation Reporter',
    date: 'Nov 6, 2026',
    readTime: '4 min read',
    views: 19800,
    commentsCount: 41,
    tags: ['Tech', 'Semiconductors', 'AI', 'Satellites', 'Global Innovation']
  },
  {
    id: 'story-lifestyle-1',
    title: 'People, culture, relationships and lifestyle stories.',
    excerpt: 'Discover interesting stories and conversations that matter — from modern urban wellness and culinary fusion to mindful living and creative communities.',
    content: [
      'In an era characterized by non-stop screen time and rapid urbanization, individuals across major global capitals are intentionally cultivating slow living, mental mindfulness, and culinary craftsmanship.',
      'From Nairobi’s lush highland tea estates and Cape Town’s coastal vineyards to Tokyo’s micro-roasteries and Paris’s neighborhood bakeries, people are seeking deep community connections over superficial digital metrics.',
      'Conversations surrounding emotional well-being, work-life balance, and sustainable fashion have become central to modern lifestyle philosophy.',
      '“Living well is an intentional art,” explains lifestyle columnist Achieng Mwangi. “It is about celebrating local heritage, honoring our relationships, and finding daily peace in a noisy world.”'
    ],
    category: 'Lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'A warm, inviting gathering of friends enjoying conversation and food.',
    author: 'Achieng Mwangi',
    authorRole: 'Culture & Lifestyle Columnist',
    date: 'Nov 6, 2026',
    readTime: '4 min read',
    views: 11400,
    commentsCount: 27,
    tags: ['Lifestyle', 'Culture', 'Wellness', 'Travel', 'Mindfulness']
  },
  {
    id: 'story-kenya-news-1',
    title: 'Stories and developments from across Kenya.',
    excerpt: 'Stay updated on national developments: coastal blue economy expansion at Lamu Port, agricultural bumper harvests, and county innovation projects.',
    content: [
      'From the turquoise shores of Kilifi to the fertile highlands of Mt. Kenya, communities across the republic are driving impactful grassroots initiatives.',
      'In the Rift Valley breadbasket, favorable seasonal rains and subsidized fertilizer distribution have set the stage for one of the most prolific maize and cereal harvests in recent years, easing food inflation pressures nationwide.',
      'Along the coastal corridor, the inauguration of new feeder berths at the Port of Lamu has spurred fresh blue-economy investments, providing coastal youth with specialized vocational training in maritime logistics and sustainable deep-sea fisheries.',
      'The Real Blend’s county correspondents remain stationed across the nation to deliver uncensored, timely, and balanced coverage reflecting the genuine lived experiences of citizens.'
    ],
    category: 'Kenya News',
    imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&auto=format&fit=crop&q=80',
    imageCaption: 'Scenic sunset over Kenya’s wildlife conservancies and landscape.',
    author: 'Victor Ochieng',
    authorRole: 'National Affairs Editor',
    date: 'Nov 5, 2026',
    readTime: '3 min read',
    views: 12900,
    commentsCount: 23,
    tags: ['Kenya', 'Counties', 'Agriculture', 'Lamu Port', 'Devolution']
  }
];

export const INITIAL_BREAKING_NEWS = [
  'Welcome to The Real Blend — Your source for breaking news, trends and stories from Kenya, Africa and the world.',
  'UN Climate Accord: 195 nations ratify landmark $100B clean energy fund for emerging economies.',
  'AfCFTA reports Pan-African Payment System transactions surpass $20B milestone across 30 nations.',
  'Central Bank of Kenya reports foreign exchange reserves surge to 4.8 months of import cover.',
  'World Athletics confirms global marathon championship schedule with record international entries.'
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'story-top-main': [
    {
      id: 'c1',
      articleId: 'story-top-main',
      authorName: 'Otieno Kennedy',
      text: 'Great reporting by The Real Blend! Expanding the coverage to connect Kenyan issues with global and African developments is exactly what modern digital media needs.',
      timestamp: '2 hours ago',
      likes: 19
    },
    {
      id: 'c2',
      articleId: 'story-top-main',
      authorName: 'Fatima Al-Mansoor',
      text: 'Insightful perspective on regional trade integration and clean energy corridors. Keep up the high standard!',
      timestamp: '1 hour ago',
      likes: 12
    }
  ],
  'story-entertainment-1': [
    {
      id: 'c3',
      articleId: 'story-entertainment-1',
      authorName: 'DJ Kaligraph Fan',
      text: 'African sounds are truly dominating the world stage. Proud to see The Real Blend covering culture with such vibrancy.',
      timestamp: '3 hours ago',
      likes: 31
    }
  ],
  'story-sports-1': [
    {
      id: 'c4',
      articleId: 'story-sports-1',
      authorName: 'Kiprotich Sang',
      text: 'World class athletics and football coverage. The analysis of the upcoming championships is spot on.',
      timestamp: '4 hours ago',
      likes: 24
    }
  ]
};
