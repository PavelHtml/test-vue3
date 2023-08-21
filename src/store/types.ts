import {Person} from "@/types";

export interface RootState {
    peoples: Person[] | null,
    favorites: Person[]
}