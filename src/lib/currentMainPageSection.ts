import { writable, type Writable } from "svelte/store";

export const currentMainPageSection: Writable<CurrentMainPageSection> = writable('Home');

export type CurrentMainPageSection = 'Home' | 'Works' | 'Studio' | 'Contacts';

export function urlToSection(url: string): CurrentMainPageSection | null {
    switch (url) {
        case '/': return 'Home';
        case '/works': return 'Works';
        case '/studio': return 'Studio';
        case '/contacts': return 'Contacts';
        default: return null;
    }
}