import { store } from "../store/store";
import { hydrateAuth } from "../store/slices/authSlice";
import { hydrateFavorites } from "../store/slices/favoritesSlice";
import { hydrateTheme } from "../store/slices/themeSlice";

export function hydrateState() {
    const savedAuth = localStorage.getItem("auth");
    const savedFavorites = localStorage.getItem("favorites");
    const savedTheme = localStorage.getItem("theme");

    if (savedAuth) {
        store.dispatch(hydrateAuth(JSON.parse(savedAuth)));
    }

    if (savedFavorites) {
        store.dispatch(hydrateFavorites(JSON.parse(savedFavorites)));
    }

    if (savedTheme) {
        store.dispatch(hydrateTheme(savedTheme));
    }
}

let currentAuth;
let currentFavorites;
let currentTheme;

store.subscribe(() => {
    const state = store.getState();

    if (state.auth.user !== currentAuth) {
        currentAuth = state.auth.user;
        if (currentAuth) {
            localStorage.setItem("auth", JSON.stringify(currentAuth));
        } else {
            localStorage.removeItem("auth");
        }
    }

    if (state.favorites.favorites !== currentFavorites) {
        currentFavorites = state.favorites.favorites;
        localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    }

    if (state.theme.mode !== currentTheme) {
        currentTheme = state.theme.mode;
        localStorage.setItem("theme", currentTheme);
    }
});