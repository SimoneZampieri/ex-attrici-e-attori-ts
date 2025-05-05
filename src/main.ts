import type { Actress} from "./types/types";
import type { Nationality} from "./types/types";

//type guard che verifica se i dati sono corretti
function isActress(data: unknown): data is Actress {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    
    // accesso alle proprietà dell'oggetto
    const obj = data as Record<string, unknown>;
    
    // Check proprietà base
    if (typeof obj.id !== 'number' ||
        typeof obj.name !== 'string' ||
        typeof obj.biography !== 'string' || 
        typeof obj.image !== 'string' || 
        typeof obj.birth_year !== 'number') {
        return false;
    }
    
    // Check anno di morte opzionale
    if (obj.death_year !== undefined && typeof obj.death_year !== 'number') {
        return false;
    }
    
    // Check most_famous_movies array
    if (!Array.isArray(obj.most_famous_movies) || 
        obj.most_famous_movies.length !== 3) {
        return false;
    }
    
    // Check se tutti i film sono stringhe
    if (!obj.most_famous_movies.every(movie => typeof movie === 'string')) {
        return false;
    }
    
    // Check awards
    if (typeof obj.awards !== 'string') {
        return false;
    }
    
    // Check nazionalità
    return isValidNationality(obj.nationality);
}

//funzione che verifica se la nazionalità è valida
function isValidNationality(nationality: unknown): nationality is Nationality{
    const validNationalities: Nationality[] =[
        "American", "British", "Australian", "Israeli-American", 
        "South African", "French", "Indian", "Israeli", 
        "Spanish", "South Korean", "Chinese"
    ];

    return typeof nationality === 'string' &&
    validNationalities.includes(nationality as Nationality);
}

//funzione per ottenere l'attrice dall'id
async function getActress(id: number): Promise<Actress | null> {
    try{
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses/${id}`)
        if(!response.ok){
            return null;
        }
        const data = await response.json();
        if(isActress(data)){
            return data;
        }else{
            console.error('Dati non validi', data)
            return null;
        }
    } catch(error){
        console.error('Errore durante il recupero dei dati', error);
        return null;
    }
}

//funzione per ottenere tutte le attrici
async function getAllActresses(): Promise<Actress[] | null> {
    try{
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actresses`)
        if(!response.ok){
            return []
        }
        const data = await response.json();
        if(Array.isArray(data)){
            console.error('dati non validi', data);
            return []
        }
        
        //filtro i dati che corrispondono al tipo actress
        const actresses = data.filter((item: unknown) => isActress(item));
        return actresses;
    } catch(error){
        console.error('Errore nel recuper dei dati', error);
        return []
    }
}

export {getActress, isActress, getAllActresses}