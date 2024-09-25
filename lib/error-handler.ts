import { ZodError } from "zod";

import { ERROR_ENUM } from "./constants";

export const errorHandler = (error: unknown): string => {
  let errorMsg: string;

  if (error instanceof ZodError) {
    errorMsg = error.errors[0].message;
  } else if (error instanceof Error) {
    errorMsg = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMsg = String(error.message);
  } else if (typeof error === "string") {
    errorMsg = error;
  } else {
    errorMsg = ERROR_ENUM.TRY_AGAIN_LATER;
  }

  return translateError(errorMsg);
};

const translateError = (msg: string): string => {
  const errorTranslations: Record<string, string> = {
    "auth/claims-too-large":
      "Zbyt duży ładunek danych. Przekroczono limit 1000 bajtów.",
    "auth/email-already-exists": "Podany adres e-mail jest już używany.",
    "auth/id-token-expired": "Token ID wygasł. Zaloguj się ponownie.",
    "auth/id-token-revoked":
      "Token ID został unieważniony. Zaloguj się ponownie.",
    "auth/insufficient-permission":
      "Brak odpowiednich uprawnień do wykonania tej operacji.",
    "auth/internal-error":
      "Wystąpił nieoczekiwany błąd serwera. Spróbuj ponownie później.",
    "auth/invalid-argument":
      "Nieprawidłowy argument. Sprawdź poprawność danych.",
    "auth/invalid-claims":
      "Nieprawidłowe roszczenia niestandardowe. Sprawdź dostarczone atrybuty.",
    "auth/invalid-continue-uri": "Nieprawidłowy URL przekierowania.",
    "auth/invalid-creation-time": "Nieprawidłowy format daty utworzenia.",
    "auth/invalid-credential":
      "Nieprawidłowe poświadczenia. Upewnij się, że używasz właściwego tokenu.",
    "auth/invalid-disabled-field":
      "Nieprawidłowa wartość pola 'disabled'. Musi to być wartość true lub false.",
    "auth/invalid-display-name":
      "Nieprawidłowa nazwa wyświetlana. Musi to być niepusty ciąg znaków.",
    "auth/invalid-dynamic-link-domain":
      "Nieprawidłowa domena dynamicznego linku.",
    "auth/invalid-email": "Nieprawidłowy adres e-mail.",
    "auth/invalid-email-verified":
      "Nieprawidłowa wartość dla pola 'emailVerified'.",
    "auth/invalid-hash-algorithm": "Nieprawidłowy algorytm haszowania.",
    "auth/invalid-hash-block-size":
      "Nieprawidłowy rozmiar bloku dla algorytmu haszującego.",
    "auth/invalid-hash-derived-key-length":
      "Nieprawidłowa długość klucza pochodnego.",
    "auth/invalid-hash-key": "Nieprawidłowy klucz haszujący.",
    "auth/invalid-hash-memory-cost":
      "Nieprawidłowy koszt pamięci dla haszowania.",
    "auth/invalid-hash-parallelization":
      "Nieprawidłowa liczba równoległych operacji haszowania.",
    "auth/invalid-hash-rounds": "Nieprawidłowa liczba rund haszowania.",
    "auth/invalid-hash-salt-separator":
      "Nieprawidłowy separator soli dla haszowania.",
    "auth/invalid-id-token": "Nieprawidłowy token ID.",
    "auth/invalid-last-sign-in-time":
      "Nieprawidłowy format daty ostatniego logowania.",
    "auth/invalid-page-token": "Nieprawidłowy token strony.",
    "auth/invalid-password":
      "Nieprawidłowe hasło. Musi mieć co najmniej 6 znaków.",
    "auth/invalid-password-hash": "Nieprawidłowy hasz hasła.",
    "auth/invalid-password-salt": "Nieprawidłowa sól hasła.",
    "auth/invalid-phone-number":
      "Nieprawidłowy numer telefonu. Musi być zgodny z formatem E.164.",
    "auth/invalid-photo-url": "Nieprawidłowy URL zdjęcia profilowego.",
    "auth/invalid-provider-data":
      "Nieprawidłowe dane dostawcy uwierzytelniania.",
    "auth/invalid-provider-id": "Nieprawidłowy identyfikator dostawcy.",
    "auth/invalid-oauth-responsetype":
      "Musisz ustawić dokładnie jeden typ odpowiedzi OAuth.",
    "auth/invalid-session-cookie-duration":
      "Nieprawidłowy czas trwania sesji. Musi być między 5 minutami a 2 tygodniami.",
    "auth/invalid-uid": "Nieprawidłowy UID. Musi mieć maksymalnie 128 znaków.",
    "auth/invalid-user-import": "Nieprawidłowe dane użytkownika do importu.",
    "auth/maximum-user-count-exceeded":
      "Przekroczono maksymalną liczbę użytkowników do importu.",
    "auth/missing-android-pkg-name": "Brak nazwy pakietu Android.",
    "auth/missing-continue-uri": "Brak URL przekierowania.",
    "auth/missing-hash-algorithm":
      "Brak algorytmu haszowania do importu użytkowników.",
    "auth/missing-ios-bundle-id": "Brak identyfikatora pakietu iOS.",
    "auth/missing-uid": "Brak identyfikatora UID.",
    "auth/missing-oauth-client-secret": "Brak sekretu klienta OAuth.",
    "auth/operation-not-allowed": "Metoda logowania jest wyłączona.",
    "auth/phone-number-already-exists":
      "Podany numer telefonu jest już używany.",
    "auth/project-not-found":
      "Nie znaleziono projektu Firebase dla użytych poświadczeń.",
    "auth/reserved-claims": "Użyto zarezerwowanych roszczeń niestandardowych.",
    "auth/session-cookie-expired": "Ciastko sesji wygasło.",
    "auth/session-cookie-revoked": "Ciastko sesji zostało unieważnione.",
    "auth/too-many-requests": "Zbyt wiele żądań. Spróbuj ponownie później.",
    "auth/uid-already-exists": "Podany UID jest już używany.",
    "auth/unauthorized-continue-uri": "Nieautoryzowany URL przekierowania.",
    "auth/user-not-found": "Użytkownik nie został znaleziony.",
    // Add more error translations here
  };

  for (const [key, translation] of Object.entries(errorTranslations)) {
    if (msg.includes(key)) {
      return translation;
    }
  }

  return msg; // Return the original message if no translation is found
};
