export interface Article {
  articleId: number;
  url: string;
  memo: string;
  createdAt: string;
  isRead: boolean;
  remindAt?: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  unreadCount: number;
}

export interface ArticleDetail {
  url: string;
  memo: string;
  remindAt: string | null;
  category: {
    categoryId: number;
    categoryName: string;
  };
}

export interface ArticleListResponse {
  totalArticle: number;
  totalUnreadArticle: number;
  articles: Article[];
}

export interface UnreadArticleResponse {
  totalUnreadArticle: number;
  articles: Article[];
}

export interface DailyReminderArticleResponse {
  totalArticle: number;
  nextRemind: string;
  articles: Article[];
}

export interface ReadStatusResponse {
  finalAcornCount: number;
  isCollected: boolean;
}

export interface CategoryListResponse {
  categories: Category[];
}

export interface AcornCountWithRemindResponse {
  acornCount: number;
  remindDateTime: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// 카테고리 수정
export interface PutCategoryRequest {
  categoryId: number;
  memo: string;
  remindTime: string;
}
