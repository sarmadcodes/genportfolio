export interface Venture {
  id: string;
  name: string;
  role: string;
  description: string;
  link?: string;
  tags: string[];
  image: string;
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
