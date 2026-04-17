import { createSupabaseBrowserClient } from "./supabase.js";

function buildGuestState(detail = "משחק אורח זמין תמיד") {
  return {
    status: "guest",
    detail,
    session: null,
    user: null
  };
}

export function createAuthService() {
  const supabase = createSupabaseBrowserClient();
  const listeners = new Set();
  let state = buildGuestState(supabase ? "אפשר להתחבר עם Google או קישור קסם" : "Supabase עדיין לא הוגדר");

  const emit = () => {
    listeners.forEach((listener) => listener(state));
  };

  const setState = (nextState) => {
    state = nextState;
    emit();
  };

  const buildAuthedState = (session, detail = "מחובר") => ({
    status: "authenticated",
    detail,
    session,
    user: session?.user || null
  });

  const subscribe = (listener) => {
    listeners.add(listener);
    listener(state);
    return () => listeners.delete(listener);
  };

  const init = async () => {
    if (!supabase) {
      emit();
      return;
    }

    const {
      data: { session }
    } = await supabase.auth.getSession();

    setState(session ? buildAuthedState(session) : buildGuestState("אפשר לשחק כאורח או להתחבר"));

    supabase.auth.onAuthStateChange((_event, nextSession) => {
      setState(nextSession ? buildAuthedState(nextSession) : buildGuestState("אפשר לשחק כאורח או להתחבר"));
    });
  };

  const signInWithGoogle = async () => {
    if (!supabase) {
      setState(buildGuestState("Supabase לא הוגדר עדיין"));
      return { ok: false };
    }

    setState({ ...state, status: "loading", detail: "מעביר ל-Google..." });
    const redirectTo = import.meta.env.VITE_APP_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      setState(buildGuestState("החיבור עם Google נכשל"));
      return { ok: false, error };
    }

    return { ok: true };
  };

  const signInWithMagicLink = async (email) => {
    if (!supabase) {
      setState(buildGuestState("Supabase לא הוגדר עדיין"));
      return { ok: false };
    }

    setState({ ...state, status: "loading", detail: "שולח קישור כניסה..." });
    const emailRedirectTo = import.meta.env.VITE_APP_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo
      }
    });

    if (error) {
      setState(buildGuestState("שליחת קישור הקסם נכשלה"));
      return { ok: false, error };
    }

    setState(buildGuestState("שלחנו קישור כניסה למייל"));
    return { ok: true };
  };

  const signOut = async () => {
    if (!supabase) {
      setState(buildGuestState("חזרת למצב אורח"));
      return { ok: true };
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setState(buildGuestState("היציאה נכשלה"));
      return { ok: false, error };
    }

    setState(buildGuestState("חזרת למשחק אורח"));
    return { ok: true };
  };

  return {
    getState: () => state,
    hasSupabase: () => Boolean(supabase),
    init,
    subscribe,
    signInWithGoogle,
    signInWithMagicLink,
    signOut
  };
}
