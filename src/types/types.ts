export type Person = {
    readonly id: number;
    readonly name: string;
    birth_year: number;
    death_year?: number;
    biography: string;
    image: string;
}

//varie nazionalità
export type Nationality = 
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


export type Actress = Person & {
    most_famous_movies: [string, string, string];
    awards: string;
    nationality: Nationality;
}

//estendo le nazionlità
export type ExtendedNationality = Nationality | "Scottish" | "New Zealand" | "Hong Kong" | "German" | "Canadian" | "Irish";

export type Actor = Person & {
   known_for: [string, string, string],
   awards: [string, string, string],
   nationality: ExtendedNationality;
}
