export interface Price {
  duration: string;
  amount: string;
}

export interface AppProduct {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  prices: Price[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
