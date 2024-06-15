import { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Post } from "./postInterface";



export const getPosts = async () => {
   
    try {
      const { data, error }: PostgrestResponse<Post> = await supabase
        .from('articles')
        .select('*');
  
  
      if (error) {
        console.error('Error fetching posts:', error);
        throw new Error(error.message);
      }
  
      if (!data) {
        console.error('No data returned from Supabase');
        throw new Error('No data returned');
      }
  

      console.log('Fetched posts:', data);
      return data;
    } catch (error) {
      console.error('Unexpected error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  };