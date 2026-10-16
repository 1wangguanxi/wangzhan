export interface CaseStudy {
  id: number;
  cat: string;
  title: string;
  imgs: string[];
  thumbnail: string;
}
export interface School {
  id: number;
  thumbnail: string;
  src: string;
  alt: string;
}
export interface Faq {
  id: number;
  category: string;
  question: string;
  answer: string;
}
export interface Review {
  id: number;
  text: string;
  name: string;
  info: string;
  avatarClass: string;
}
export interface Catalog {
  cases: CaseStudy[];
  schools: School[];
  faqs: Faq[];
  reviews: Review[];
}
