import { store } from "../store/store";
import { hydrateAuth } from "../store/slices/authSlice";
import { hydrateFavorites } from "../store/slices/favoritesSlice";

export function hydrateState() {
    const savedAuth = localStorage.getItem("auth");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedAuth) {
        store.dispatch(hydrateAuth(JSON.parse(savedAuth)));
    }

    if (savedFavorites) {
        store.dispatch(hydrateFavorites(JSON.parse(savedFavorites)));
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
});