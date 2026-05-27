export interface ToolkitItem {
  id: string;
  title: string;
  benefit: string;
  longDescription: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarSeed: string;
  tag: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ReviewScore {
  score: number;
  label: string;
  color: string;
}
