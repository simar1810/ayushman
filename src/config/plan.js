import { BasicCard, Enterprise, ProPlan } from "@/components/globals/plans/Plan";

export const features = [
  { id: 1, title: "Feature 1", description: "Lorem ipsum dolor" },
  { id: 2, title: "Feature 2", description: "Lorem ipsum dolor" },
  { id: 3, title: "Feature 3", description: "Lorem ipsum dolor" },
  { id: 4, title: "Feature 4", description: "Lorem ipsum dolor" },
];

export const plans = [
  {
    id: 1,
    title: "Free",
    price: "₹1999",
    period: "From ₹7/day",
    pricing: 0,
    features: [
      "Add 3 customers",
      "Add upto 5 workouts and assign upto 5 clients",
      "Add upto 5 meal plans",
      "Add upto 5 marathons",
    ],
    accounts: "No credit card required. Register Now",
    buttonText: () => "Register Now",
    billing_type_text: (months) => months === 1 ? " ." : " .",
    getPricing: (discounts) => discounts ? 0 : 0,
    plan_type: (discounts) => discounts ? "w" : "w",
    Component: BasicCard
  },
  {
    id: 2,
    title: "Basic Plan",
    price: "₹1999",
    period: "From ₹249/month",
    pricing: 249,
    discount_pricing: 199,
    features: [
      "Onboard up to 50 clients",
      "Client progress reports generator",
      "Client physical movement tracker",
      "Custom check-in & diet tracking",
      "Unlimited meal & nutrition plans",
      "Generate a new website",
      "Pre-built nutrition templates",
      "Recipes creation",
      "Automated client follow-ups",
      "Free access to future app features",
      "Marathon & Workout Library"
    ],
    accounts: "1 account",
    buttonText: (renewal) => renewal ? "Renew Now" : "Buy Now",
    billing_type_text: (months) => months === 1 ? "Billed Monthly" : "Billed Yearly",
    getPricing: (discounts, months, code) => {
      if (code === "RUPEE1") {
        return 1;
      } else if (discounts && months === 1) {
        return 199
      } else if (discounts) {
        return 1699
      } else if (months === 1) {
        return 249
      } else {
        return 2199
      }
    },
    plan_type: (discounts, months, code) => {
      if (code === "RUPEE1") {
        return "bdr_basic_rupee1"
      } else if (discounts && months === 1) {
        return "bdr_basic_discounted_x1"
      } else if (discounts) {
        return "bdr_basic_discounted_x12"
      } else if (months === 1) {
        return "bdr_basic_x1"
      } else {
        return "bdr_basic_x12"
      }
    },
    Component: BasicCard
  },
  {
    id: 3,
    title: "Pro Plan",
    price: "₹1999",
    period: "From ₹179/month",
    pricing: 649,
    discount_pricing: 599,
    features: [
      "ALL BASIC PLAN FEATURES WITH",
      "Add up to 100 clients",
      "Personal branding app interface (Your logo & identity)",
      "Personal branded website (A dedicated site for your business)",
      "Personal branded checkup reports (Customized reports with your branding)",
      "Appointment scheduling & management",
      "Zoom Club integration",
      "WhatsApp integration",
    ],
    accounts: "up to 6 accounts",
    popular: true,
    buttonText: (renewal) => renewal ? "Renew Now" : "Buy Now",
    billing_type_text: (months) => months === 1 ? "Billed Monthly" : "Billed Yearly",
    getPricing: (discounts, months, code) => {
      if (code === "RUPEE1") {
        return 1;
      } else if (discounts && months === 1) {
        return 499
      } else if (discounts) {
        return 4499
      } else if (months === 1) {
        return 649
      } else {
        return 6199
      }
    },
    plan_type: (discounts, months, code) => {
      if (code === "RUPEE1") {
        return "bdr_pro_rupee1"
      } else if (discounts && months === 1) {
        return "bdr_pro_discounted_x1"
      } else if (discounts) {
        return "bdr_pro_discounted_x12"
      } else if (months === 1) {
        return "bdr_pro_x1"
      } else {
        return "bdr_pro_x12"
      }
    },
    Component: ProPlan
  },
  {
    id: 4,
    title: "Brand your Own App",
    price: "₹1999",
    period: "From 15,000/-  Yearly Onwards Unlimited accounts",
    features: [
      "Everything in Pro plan +",
      "Add unlimited clients",
      "Your own branded iOS app",
      "Your own branded Android app",
      "Your own App Store listings",
      "Special Marketing Support & Growth call to plan your business with the founder."
    ],
    accounts: "2 accounts",
    buttonText: "Contact Sales",
    salesTeam: true,
    Component: Enterprise
  },
];

export const beforeWellnessZ = [
  {
    id: 1,
    text: "Meal plans & progress tracking take too much time.",
  },
  {
    id: 2,
    text: "Following up with clients is exhausting.",
  },
  {
    id: 3,
    text: "Hard to keep clients accountable & engaged.",
  },
  {
    id: 4,
    text: "Struggle to scale beyond 1-on-1 coaching.",
  },
  {
    id: 5,
    text: "Difficult to automate follow-ups.",
  },
];


export const afterWellnessZ = [
  {
    id: 1,
    text: "Easily create & track meal plans in one place.",
  },
  {
    id: 2,
    text: "Automate client check-ins & reminders.",
  },
  {
    id: 3,
    text: "Keep clients accountable with progress tracking.",
  },
  {
    id: 4,
    text: "Grow your practice with scalable coaching tools.",
  },
  {
    id: 5,
    text: "Simplify client follow-ups.",
  },
];

export const contactFormData = [
  {
    id: 1,
    title: "Name",
    name: "name",
    placeholder: "Please enter your name"
  },
  {
    id: 2,
    title: "Phone",
    name: "phone",
    placeholder: "Please enter your phone Number",
    type: "number"
  },
  {
    id: 3,
    title: "Email",
    name: "email",
    placeholder: "Please enter your email",
    type: "email"
  },
]

export const registerFormData = [
  {
    id: 1,
    title: "Name",
    name: "name",
    placeholder: "Please enter your name"
  },
  {
    id: 2,
    title: "Phone",
    name: "phone",
    placeholder: "Please enter your phone Number",
    type: "number"
  }
]

export const whyChooseUs = [
  {
    id: 1,
    title: "Client Management",
    description: "Manage clients effortlessly with smart tools.",
    thumbnail: "/client.svg"
  },
  {
    id: 2,
    title: "Meal Plan Management",
    description: "Tailor-made meal plans at your fingertips.",
    thumbnail: "/meal-plan.svg"
  },
  {
    id: 3,
    title: "Personal Branding",
    description: "Build your unique identity with ease.",
    thumbnail: "/branding.svg"
  },
  {
    id: 4,
    title: "Website Builder",
    description: "Showcase your services with a professional website.",
    thumbnail: "/website-builder.svg"
  },
]

export const videos = [
  {
    id: "AzUbJLjtXpA", // Replace with actual YouTube Shorts video IDs
    title: "Client Management Tips",
    category: "Client Management",
  },
  {
    id: "AfjWPU4ux8Y",
    title: "Meal Planning Guide",
    category: "Meal Plan Management",
  },
  {
    id: "SPHzEpuP5vA",
    title: "Building Your Brand",
    category: "Personal Branding",
  },
  {
    id: "isGYJT-YofA",
    title: "Website Creation Guide",
    category: "Website Builder",
  },
]

export const faqs = [
  {
    id: 1,
    question: "Why do I need wellnessz app as a coach?",
    answer: "Managing clients manually takes too much time and effort. WellnessZ automates meal planning,\nclient tracking, progress reporting, and reminders—helping you scale your business effortlessly\nwhile delivering better results."


  },
  {
    id: 2,
    question: "How will WellnessZ help me grow my coaching business?",
    answer: "With automated client management, meal & workout tracking, and in-app engagement,\nWellnessZ helps increase client retention, improve accountability, and boost efficiency, allowing\nyou to handle more clients without extra stress."
  },
  {
    id: 3,
    question: "What makes WellnessZ different from other coaching tools?",
    answer: "WellnessZ is built specifically for wellness professionals, combining nutrition planning, client\nprogress tracking, appointment scheduling, and automation in one seamless platform,\neliminating the need for multiple apps"
  },
  {
    id: 4,
    question: "Can I create and assign personalized diet plans?",
    answer: "Yes! You can customize meal plans for each client, choose from 2,000+ verified diet templates,\nand adjust macronutrient & micronutrient visibility to suit their goals"
  },
  {
    id: 5,
    question: "How does the progress report feature work?",
    answer: "WellnessZ automatically tracks client progress (nutrition intake, weight, meal adherence) and\ngenerates reports to help you adjust their plans and ensure they stay on track."
  },
  {
    id: 6,
    question: "Can I schedule and manage client appointments through the app?",
    answer: "Absolutely! You can set, reschedule, and manage all client sessions directly through the app,\nkeeping your coaching structured and hassle-free."
  },
]

export const dietPlansFeatures = [
  "Create & Assign Custom Diet Plans - Tailor meal plans to fit every client's unique goals and preferences in seconds.",
  "Verified Nutrition Plans - Access 2000+ verified diet plans in the app with detailed macronutrient & micronutrient breakdowns.",
  "Automate meal reminders - Keep clients on track with timely notifications to have their next meal on time."
]

export const clientProgressData = [
  "Generate Client Progress Reports - Get detailed insights on nutrition, workouts, and goal achievements in one click and share with your customer.",
  "Schedule & Manage Appointments - Set next coaching sessions directly from the app, keeping clients engaged & accountable.",
  "Automate Meal Reminders - Keep clients on track with timely meal notifications to boost consistency and results."
]