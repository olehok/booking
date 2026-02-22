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

store.subscribe(() => {
    const state = store.getState();

    localStorage.setItem(
        "auth",
        JSON.stringify(state.auth.user)
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites.favorites)
    );

    localStorage.setItem(
        "theme",
        state.theme.mode
    );
});