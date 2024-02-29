export interface UpdateBlogPost{
    title: string;
    shortDescription: string;
    content: string;
    featuredImageUrl?: string; // Aqui se agrego el "?" porq existe un error en edit-blogpost.component  this.model.featuredImageUrl = response.url;
    urlHandle: string;
    author: string;
    publishedDate: Date;
    isVisible: boolean;
    categories: string[];
}