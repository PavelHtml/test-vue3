import {Person} from "@/types";

export interface RootState {
    persons: Person[] | null
    favorites: Person[]
    search_persons: Person[] | null
    current_persons: Person | null
    person_cache: Map<number, Person[] | null>
    pagination?: Pagination
    load: boolean
    controller: any
}

export interface Pagination {
    prev: number | null
    next: number | null
}