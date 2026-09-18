export interface ServiceType {
  name: string;
  description: string;
}

export interface ServicePricing {
  duration?: string;
  name?: string;
  price: string;
}

export interface ServicePackage {
  name: string;
  price: string;
  savings?: string;
  bonus?: string;
}

export interface ServiceOption {
  name: string;
  price: string;
  savings?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  overview: string;
  types?: ServiceType[];
  pricing?: ServicePricing[];
  packages?: ServicePackage[];
  additionalOptions?: ServiceOption[];
  image: string;
  consultationType: string;
}

export const servicesData: ServiceItem[] = [
  {
    slug: "massage-reflexology",
    title: "Massage Therapy / Reflexology",
    overview: "Offers various therapeutic massage techniques to relieve stress, tension, and pain while promoting circulation and overall relaxation.",
    types: [
      {
        name: "Swedish Massage",
        description: "Soothing and relaxing massage to relieve stress, ease tension, increase circulation, and calm the body."
      },
      {
        name: "Deep Tissue Therapeutic",
        description: "Targets muscle knots; increases circulation, lymphatic flow, mobility, and provides pain relief."
      },
      {
        name: "Hot Stone Massage",
        description: "Uses heated stones to stimulate circulation, relieve knots and stiff muscles, and relax the entire body with warmth and energy."
      },
      {
        name: "Reflexology (Zone Therapy)",
        description: "Applies pressure to specific reflex points on the feet that correspond to organs and glands to relieve tension, improve circulation, and promote natural body function."
      }
    ],
    pricing: [
      { duration: "30 minutes", price: "$45" },
      { duration: "60 minutes", price: "$75" }
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "massage"
  },
  {
    slug: "far-infrared-sauna",
    title: "Far Infrared Sauna",
    overview: "A relaxing sauna session designed to detoxify, aid weight loss, and naturally relieve inflammation and pain.",
    pricing: [
      { duration: "30 minutes", price: "$30" }
    ],
    packages: [
      { name: "4-session package", price: "$90", savings: "Save $30" }
    ],
    image: "https://images.unsplash.com/photo-1554344056-47143485e1fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "sauna"
  },
  {
    slug: "thermography-scans",
    title: "Thermography Scans",
    overview: "Digital Infrared Thermal Imaging by Three Rivers Thermography of Pittsburgh— a non-invasive, FDA-approved clinical procedure (with no radiation) to detect and monitor diseases (especially breast cancer) up to 8-10 years before mammography.",
    pricing: [
      { name: "Scan", price: "$225" },
      { name: "Scan Review by Dr. Lisa Kellerman, ND Naturopathic Doctor", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "thermography"
  },
  {
    slug: "bioenergetic-testing-zyto",
    title: "Bioenergetic Testing – ZYTO Whole Body Scan",
    overview: "Utilizes the LSA PRO computerized scanner via a hand-held cradle. It assesses the body for allergies or energy blockages through galvanic skin response testing (similar to a lie detector test). Includes a program appointment and health evaluation.",
    pricing: [
      { duration: "30 minutes", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "bioenergetic"
  },
  {
    slug: "allergy-elimination-naet",
    title: "Allergy Elimination with N.A.E.T.",
    overview: "Uses Nambrudipad's allergy elimination technique via acupressure on the spine while the client holds a vial containing the allergen. (Note: An allergy scan must be completed first to identify both food and environmental allergies.)",
    pricing: [
      { duration: "30-minute session", price: "$80" }
    ],
    additionalOptions: [
      { name: "N.A.E.T. Rescan", price: "$129" },
      { name: "N.A.E.T. Allergy Elimination Package (17 treatments, Prepaid only)", price: "$1,200", savings: "Save $160" }
    ],
    image: "https://images.unsplash.com/photo-1512069766972-4b3202a5927f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "naet"
  },
  {
    slug: "harmonic-wave-energy-balancing",
    title: "Harmonic Wave Energy Balancing",
    overview: "An energy balancing treatment using broadband and E-fields to destroy pathogens and accelerate the body's repair process, customized for specific ailments.",
    pricing: [
      { duration: "30 minutes or less", price: "$30" },
      { duration: "60 minutes", price: "$40" }
    ],
    image: "https://images.unsplash.com/photo-1598901865264-4f7235e5fd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "harmonic-wave"
  },
  {
    slug: "colon-hydrotherapy",
    title: "Colon Hydrotherapy",
    overview: "A gentle, warm colon irrigation to remove old fecal matter, retrain bowel function, and promote regular, healthy bowel movements (2-3 per day).",
    pricing: [
      { duration: "60 minutes", price: "$99" }
    ],
    packages: [
      { name: "3-session package", price: "$275", bonus: "Includes a complimentary sauna session" }
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "colon-hydrotherapy"
  },
  {
    slug: "ionic-detox-foot-soak",
    title: "Ionic Detox Foot Soak",
    overview: "A one-hour session that includes an ionic detox foot soak combined with an essential oil cream application for a refreshing detox.",
    pricing: [
      { duration: "60 minutes", price: "$80" }
    ],
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "ionic-detox"
  },
  {
    slug: "ear-candling",
    title: "Ear Candling",
    overview: "A painless method to remove excess ear wax, relieve water or itchiness in the ears, and alleviate sinus pressure.",
    pricing: [
      { duration: "60 minutes", price: "$125" }
    ],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "ear-candling"
  },
  {
    slug: "paraffin-hand-dip",
    title: "Paraffin Hand Dip",
    overview: "A soothing and warm hand treatment that exfoliates, relieves pain, and conditions the skin.",
    pricing: [
      { name: "Single treatment", price: "$10" }
    ],
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "paraffin"
  },
  {
    slug: "bloodwork-review",
    title: "Bloodwork Review",
    overview: "A thorough review of your comprehensive blood panels and laboratory tests by Dr. Lisa Kellerman, ND to identify key nutritional deficiencies and metabolic markers.",
    pricing: [
      { name: "Comprehensive Review", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "bloodwork"
  },
  {
    slug: "hormone-test-review",
    title: "Hormone Test Review",
    overview: "A comprehensive review of hormone test results to help guide your personalized wellness and natural balancing plan.",
    pricing: [
      { duration: "30 minutes", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "hormone"
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find(s => s.slug === slug);
}
