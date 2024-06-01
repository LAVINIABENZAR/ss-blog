import { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Post } from "./postInterface";


export const getPosts = async (): Promise<Post[]> => {
    try {
        const { data: articles, error }: PostgrestResponse<Post> = await supabase
          .from('articles')
          .select('*');
    
        if (error) {
          console.error('Error fetching posts:', error);
          throw new Error(error.message);
        }
    
        return articles || [];
      } catch (error) {
        console.error('Unexpected error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
      
}