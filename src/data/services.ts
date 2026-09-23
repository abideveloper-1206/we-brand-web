import api from '@/utils/api';

export type Service = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  overviewImage?: string;
  accent: string;
  tint: string;
  features: string[];
  workflowSteps?: { title: string; description: string; image?: string }[];
};

export const fallbackServices: Service[] = [
  {
    id: "1",
    slug: "branding-identity-design",
    title: "Branding & Identity Design",
    shortDescription: "Create a memorable brand with professional logo design and visual communication.",
    fullDescription: "Your brand is your most valuable asset. We create comprehensive branding and identity systems that include logo design, brand guidelines, packaging, and visual communication strategies. Our designs ensure your brand communicates its core values and stands out in a crowded market.",
    image: "/services/branding_h.png",
    accent: "#4338ca",
    tint: "#eef0ff",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity System", "Brand Strategy"]
  },
  {
    id: "2",
    slug: "website-design-development",
    title: "Website Design & Development",
    shortDescription: "Responsive, SEO-friendly websites designed to convert visitors into customers.",
    fullDescription: "We build modern, blazing-fast, and responsive websites tailored to your business needs. From corporate sites to full-scale e-commerce platforms, our development team uses the latest web technologies to ensure optimal performance, security, and search engine visibility.",
    image: "/services/webdev_h.png",
    accent: "#2563c9",
    tint: "#e8f0ff",
    features: ["Custom Web Development", "E-Commerce Solutions", "CMS Integration", "SEO Optimization"]
  },
  {
    id: "3",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription: "Modern user experiences designed to improve engagement and usability.",
    fullDescription: "Our UI/UX design process puts the user first. We craft intuitive and aesthetically pleasing interfaces for websites, SaaS products, and mobile apps. Through rigorous user research, wireframing, and prototyping, we ensure a seamless and delightful user journey.",
    image: "/services/uiux_h.png",
    accent: "#0b6e97",
    tint: "#e2f4f7",
    features: ["User Research", "Wireframing & Prototyping", "Interaction Design", "Usability Testing"]
  },
  {
    id: "4",
    slug: "mobile-app-development",
    title: "Mobile App Development",
    shortDescription: "Custom Android and iOS applications built with scalable technologies.",
    fullDescription: "Bring your ideas to life on mobile devices. We develop high-performance, native and cross-platform mobile applications for iOS and Android. Our scalable architecture and clean code ensure a smooth experience for your users.",
    image: "/services/mobileapp_h.png",
    accent: "#7c3aed",
    tint: "#f3edff",
    features: ["iOS App Development", "Android App Development", "Cross-Platform Solutions", "App Store Optimization"]
  },
  {
    id: "5",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription: "Comprehensive strategies including Meta Ads, Google Ads, and online growth.",
    fullDescription: "Scale your business with our data-driven digital marketing solutions. We create comprehensive marketing funnels utilizing Google Ads, Meta Ads, SEO, and content marketing to generate qualified leads and drive conversions.",
    image: "/services/digitalmarketing_h.png",
    accent: "#d97706",
    tint: "#fff4e2",
    features: ["Search Engine Optimization (SEO)", "Search Engine Marketing (SEM)", "Lead Generation", "Email Marketing"]
  },
  {
    id: "6",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortDescription: "Creative social media management and performance optimization.",
    fullDescription: "Build a loyal community around your brand. We manage your social media presence across platforms, creating engaging content, planning strategic campaigns, and interacting with your audience to boost brand awareness and engagement.",
    image: "/services/socialmedia_h.png",
    accent: "#db2777",
    tint: "#ffe9f2",
    features: ["Content Creation", "Community Management", "Influencer Marketing", "Social Analytics"]
  },
  {
    id: "7",
    slug: "video-production",
    title: "Video Production & Creative Content",
    shortDescription: "Professional reels, commercial advertisements, and motion graphics.",
    fullDescription: "Capture your audience's attention with high-quality video content. From promotional commercials to corporate documentaries and short-form social reels, our production team handles scripting, shooting, editing, and motion graphics.",
    image: "/services/video_h.png",
    accent: "#111827",
    tint: "#eef0f2",
    features: ["Commercial Video Production", "Motion Graphics", "Social Media Reels", "Corporate Documentaries"]
  },
  {
    id: "8",
    slug: "performance-marketing",
    title: "Performance Marketing",
    shortDescription: "ROI-focused paid advertising campaigns to increase traffic and conversions.",
    fullDescription: "Maximize your marketing budget with ROI-focused performance campaigns. We continuously test, analyze, and optimize your paid advertising to lower acquisition costs and drive sustainable business growth.",
    image: "/services/performance_h.png",
    accent: "#059669",
    tint: "#e3f9ef",
    features: ["Conversion Rate Optimization", "A/B Testing", "Analytics & Reporting", "Retargeting Campaigns"]
  }
];

// For backward compatibility until we replace all `import { services }` with `await fetchServices()`
export const services = fallbackServices;

export const fetchServices = async (): Promise<Service[]> => {
  try {
    const res = await api.get('/api/services?limit=100&sort=order');
    if (res.data?.docs?.length > 0) {
      return res.data.docs.map((doc: any) => ({
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
        shortDescription: doc.shortDescription,
        fullDescription: doc.fullDescription,
        image: doc.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${doc.image.url}` : fallbackServices.find(s => s.slug === doc.slug)?.image || fallbackServices[0].image,
        overviewImage: doc.overviewImage?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${doc.overviewImage.url}` : undefined,
        accent: doc.accent,
        tint: doc.tint,
        features: doc.features?.map((f: any) => f.feature) || [],
        workflowSteps: doc.workflowSteps?.map((s: any) => ({
          title: s.title,
          description: s.description,
          image: s.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${s.image.url}` : undefined
        })) || [],
      }));
    }
    return fallbackServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return fallbackServices;
  }
};

export const fetchServiceBySlug = async (slug: string): Promise<Service | null> => {
  try {
    const res = await api.get(`/api/services?where[slug][equals]=${slug}`);
    if (res.data?.docs?.length > 0) {
      const doc = res.data.docs[0];
      return {
        id: doc.id,
        slug: doc.slug,
        title: doc.title,
        shortDescription: doc.shortDescription,
        fullDescription: doc.fullDescription,
        image: doc.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${doc.image.url}` : fallbackServices.find(s => s.slug === doc.slug)?.image || fallbackServices[0].image,
        overviewImage: doc.overviewImage?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${doc.overviewImage.url}` : undefined,
        accent: doc.accent,
        tint: doc.tint,
        features: doc.features?.map((f: any) => f.feature) || [],
        workflowSteps: doc.workflowSteps?.map((s: any) => ({
          title: s.title,
          description: s.description,
          image: s.image?.url ? `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3002'}${s.image.url}` : undefined
        })) || [],
      };
    }
    return fallbackServices.find(service => service.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return fallbackServices.find(service => service.slug === slug) || null;
  }
};
