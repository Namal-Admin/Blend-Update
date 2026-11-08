export type Category = 
  | 'All'
  | 'Kenya News'
  | 'Africa'
  | 'World News'
  | 'Politics'
  | 'Entertainment'
  | 'Sports'
  | 'Lifestyle'
  | 'Technology';

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: Category;
  imageUrl: string;
  imageCaption?: string;
  author: string;
  authorRole?: string;
  date: string;
  readTime: string;
  isTopStory?: boolean;
  isSideStory?: boolean;
  views?: number;
  commentsCount?: number;
  tags?: string[];
}

export interface NewsTip {
  id: string;
  name: string;
  emailOrPhone: string;
  location: string;
  title: string;
  details: string;
  anonymous: boolean;
  date: string;
  status?: 'pending' | 'reviewed' | 'converted';
}
