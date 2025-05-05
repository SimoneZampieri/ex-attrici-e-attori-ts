type Person = {
    readonly id: number;
    readonly name: string;
    birth_year: number;
    death_year?: number;
    biography: string;
    image: string;
}

//varie nazionalità
type Nationality = 
  | "American" 
  | "British" 
  | "Australian" 
  | "Israeli-American" 
  | "South African" 
  | "French" 
  | "Indian" 
  | "Israeli" 
  | "Spanish" 
  | "South Korean" 
  | "Chinese";


type Actress = Person & {
    most_famous_movie: [string, string, string];
    awards: string;
    nationality: Nationality;
}