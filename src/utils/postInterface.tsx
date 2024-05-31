export interface Instruction {
    text: string;
    image: string;
  }
  
  export interface Post {
    id: number;
    image1: string;
    title: string;
    movie: string;
    ingredients: string[];
    instructions: Instruction[];
    description: string;
  }
  