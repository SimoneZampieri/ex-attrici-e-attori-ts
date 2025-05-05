import type { Actress} from "./types/types";
import type { Nationality} from "./types/types";
import type { Actor } from "./types/types";
import type { ExtendedNationality } from "./types/types";

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

//funzione per ottenere più attrici dai loro id
async function getActresses(ids: number[]): Promise<(Actress | null)[]>{
    try{
        const promises = ids.map(id => getActress(id));

        const results = await Promise.all(promises)

        return results;
    } catch(error){
        console.error('Errore nel recuper dati', error);
        return ids.map(() => null)
    }
}

//tipo per creare una nuova attrice senza id
type createActressData = Omit<Actress, 'id'>;

//funzione per creare una nuova attrice
function createActress(actressData: createActressData): Actress {
    //genero un id casuale
    const randomId = Math.floor(Math.random() * 10000) + 1;

    //combino i dati con l'id
    const newActress: Actress = {
        ...actressData,
        id: randomId,
    }
    return newActress;
}

//tipo per aggiornane una attrice esistente
type UpdateActressData = Partial<Omit<Actress, 'id'>>;

//funzione per aggiornane una attrice 
function updateActress(actress: Actress, updates: UpdateActressData): Actress{
    //combino l'originale con gli aggiornamenti
    const updateActress: Actress = {
        ...actress,
        ...updates,
    }
    return updateActress;
}

// Type guard per verificare se i dati sono un Actor
function isActor(data: unknown): data is Actor {
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
    
    // Check known_for array
    if (!Array.isArray(obj.known_for) || 
        obj.known_for.length !== 3 ||
        !obj.known_for.every(movie => typeof movie === 'string')) {
        return false;
    }
    
    // Check awards array
    if (!Array.isArray(obj.awards) || 
        (obj.awards.length !== 1 && obj.awards.length !== 2) ||
        !obj.awards.every(award => typeof award === 'string')) {
        return false;
    }
    
    // Check nazionalità
    return isValidExtendedNationality(obj.nationality);
}

// Funzione che verifica se la nazionalità estesa è valida
function isValidExtendedNationality(nationality: unknown): nationality is ExtendedNationality {
    const validExtendedNationalities: ExtendedNationality[] = [
        "American", "British", "Australian", "Israeli-American", 
        "South African", "French", "Indian", "Israeli", 
        "Spanish", "South Korean", "Chinese",
        "Scottish", "New Zealand", "Hong Kong", "German", "Canadian", "Irish"
    ];
    
    return typeof nationality === 'string' &&
           validExtendedNationalities.includes(nationality as ExtendedNationality);
}

// Funzione per ottenere un attore dall'id
async function getActor(id: number): Promise<Actor | null> {
    try {
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actors/${id}`)
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        if (isActor(data)) {
            return data;
        } else {
            console.error('Dati non validi', data)
            return null;
        }
    } catch (error) {
        console.error('Errore durante il recupero dei dati', error);
        return null;
    }
}

// Funzione per ottenere tutti gli attori
async function getAllActors(): Promise<Actor[]> {
    try {
        const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/actors`)
        if (!response.ok) {
            return []
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            console.error('dati non validi', data);
            return []
        }
        
        // Filtro i dati che corrispondono al tipo Actor
        const actors = data.filter((item: unknown) => isActor(item));
        return actors;
    } catch (error) {
        console.error('Errore nel recupero dei dati', error);
        return []
    }
}

// Funzione per ottenere più attori dai loro id
async function getActors(ids: number[]): Promise<(Actor | null)[]> {
    try {
        const promises = ids.map(id => getActor(id));
        const results = await Promise.all(promises)
        return results;
    } catch (error) {
        console.error('Errore nel recupero dati', error);
        return ids.map(() => null)
    }
}

// Tipo per creare un nuovo attore senza id
type CreateActorData = Omit<Actor, 'id'>;

// Funzione per creare un nuovo attore
function createActor(actorData: CreateActorData): Actor {
    // Genero un id casuale
    const randomId = Math.floor(Math.random() * 10000) + 1;

    // Combino i dati con l'id
    const newActor: Actor = {
        ...actorData,
        id: randomId,
    }
    return newActor;
}

// Tipo per aggiornare un attore esistente
type UpdateActorData = Partial<Omit<Actor, 'id' | 'name'>>;

// Funzione per aggiornare un attore
function updateActor(actor: Actor, updates: UpdateActorData): Actor {
    // Combino l'originale con gli aggiornamenti
    const updatedActor: Actor = {
        ...actor,
        ...updates,
    }
    return updatedActor;
}

//Funzione che ritonra una coppia casuale di attrie e attore
async function createRandomCouple(): Promise<[Actress, Actor] | null>{
    try{
        const actresses = await getAllActresses();
        const actors = await getAllActors();

        //verifico se ci sono attori e attrici
        if(!actresses || actresses.length === 0 || !actors || actors.length === 0){
            console.error('Nessun attore o attrice trovato');
            return null;
        }

        //selezione casuale di entrambi
        const randomActressIndex = Math.floor(Math.random() * actresses.length);
        const randomActress = actresses[randomActressIndex];

        const randomActorIndex = Math.floor(Math.random() * actors.length);
        const randomActor = actors[randomActorIndex];

        return [randomActress, randomActor];
    } catch(error){
        console.error('errore nella creazione della coppia', error);
        return null
    }
}

export {
    getActress, isActress, getAllActresses, getActresses, createActress, updateActress,
    getActor, isActor, getAllActors, getActors, createActor, updateActor, createRandomCouple,
}