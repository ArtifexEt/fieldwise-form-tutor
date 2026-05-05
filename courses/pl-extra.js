import { escapeHtml, formatDate, normalizeWhitespace } from "../course-utils.js";

export const plExtraTrainings = [
  {
    id: "secure-and-search",
    number: "10",
    title: "Hasło, link i wyszukiwanie",
    subtitle: "Pola do bezpiecznego wpisywania i szybkiego szukania",
    summary:
      "Ćwiczenia z hasłem, adresem strony i polem wyszukiwania.",
    tags: ["hasło", "adres URL", "wyszukiwarka"],
    slides: [
      {
        type: "intro",
        tags: ["Bezpieczeństwo", "Szukaj"],
        title: "Nie każde pole pokazuje wpisany tekst tak samo.",
        body:
          "Hasło jest ukrywane kropkami, adres strony musi wyglądać jak link, a wyszukiwarka jest przygotowana do krótkiego zapytania.",
        details: [
          "W polu hasła pisz spokojnie, nawet jeśli widzisz tylko kropki.",
          "Adres strony zaczyna się zwykle od https://.",
          "Wyszukiwarka przyjmuje krótkie słowo albo frazę."
        ],
        markup:
          '<input type="password">\n<input type="url">\n<input type="search">',
        noteTitle: "Łatwy trik",
        note:
          "Jeśli hasło się nie zgadza, wyczyść pole i wpisz je od początku. To często prostsze niż poprawianie pojedynczej litery."
      },
      {
        type: "exercise",
        control: "password",
        tags: ["Ćwiczenie", "Hasło"],
        title: "Ćwiczenie 1",
        prompt: "Wpisz hasło: Bezpieczne-123",
        fieldLabel: "Hasło",
        placeholder: "Wpisz hasło",
        enterKeyHint: "next",
        helper:
          "Znaki mogą być ukryte. To normalne zachowanie pola hasła.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return {
              ok: false,
              message: "Pole hasła jest puste. Wpisz Bezpieczne-123."
            };
          }

          if (typed === "Bezpieczne-123") {
            return {
              ok: true,
              message: "Dobrze. Hasło zostało wpisane poprawnie, mimo że pole ukrywa znaki."
            };
          }

          return {
            ok: false,
            message: "Hasło nie zgadza się z poleceniem. Wyczyść pole i wpisz Bezpieczne-123 jeszcze raz."
          };
        }
      },
      {
        type: "exercise",
        control: "url",
        tags: ["Ćwiczenie", "Link"],
        title: "Ćwiczenie 2",
        prompt: "Wpisz adres: https://przyklad.pl",
        fieldLabel: "Adres strony",
        placeholder: "https://przyklad.pl",
        enterKeyHint: "next",
        helper:
          "Pole adresu strony pomaga zauważyć brak https:// albo kropki w domenie.",
        check(value) {
          const typed = value.trim().toLowerCase().replace(/\/$/, "");
          if (!typed) {
            return {
              ok: false,
              message: "Nie wpisano adresu strony."
            };
          }

          if (typed === "https://przyklad.pl") {
            return {
              ok: true,
              message: "Świetnie. Adres strony ma właściwy format."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był adres https://przyklad.pl, a wpisano „${escapeHtml(value.trim())}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "search",
        tags: ["Ćwiczenie", "Wyszukiwanie"],
        title: "Ćwiczenie 3",
        prompt: "Wyszukaj słowo: faktura",
        fieldLabel: "Szukaj",
        placeholder: "Wpisz szukaną frazę",
        enterKeyHint: "search",
        helper:
          "Pole wyszukiwania działa jak krótki tekst, ale przeglądarka może pokazać przy nim wygodne czyszczenie.",
        check(value) {
          const typed = normalizeWhitespace(value).toLowerCase();
          if (!typed) {
            return {
              ok: false,
              message: "Pole wyszukiwania jest puste."
            };
          }

          if (typed === "faktura") {
            return {
              ok: true,
              message: "Tak jest. Pole wyszukiwania dostało właściwe słowo."
            };
          }

          return {
            ok: false,
            message: `Trzeba było wpisać „faktura”, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Hasło, link i szukanie są oswojone.",
        bullets: [
          "Hasło może wyglądać jak kropki, ale nadal przyjmuje zwykły tekst.",
          "Adres URL powinien wyglądać jak pełny link.",
          "Pole wyszukiwania jest dobre do krótkich zapytań."
        ]
      }
    ]
  },
  {
    id: "calendar-advanced",
    number: "11",
    title: "Kolor, miesiąc, tydzień i pełny termin",
    subtitle: "Rzadziej spotykane pola też mogą być proste",
    summary:
      "Ćwiczenia z kolorem, miesiącem, tygodniem i datą razem z godziną.",
    tags: ["kolor", "miesiąc", "tydzień", "termin"],
    slides: [
      {
        type: "intro",
        tags: ["Kalendarz", "Kolor"],
        title: "Niektóre pola wybiera się z małego narzędzia.",
        body:
          "Kolor, miesiąc, tydzień i pełny termin często wybiera się z panelu przeglądarki. Nie musisz znać dokładnego zapisu, jeśli korzystasz z gotowego wyboru.",
        details: [
          "Przy kolorze kliknij próbkę i wybierz wskazany kolor.",
          "Miesiąc i tydzień mają własne pola, żeby nie wpisywać ich ręcznie.",
          "Pełny termin łączy dzień oraz godzinę w jednym miejscu."
        ],
        markup:
          '<input type="color">\n<input type="month">\n<input type="week">\n<input type="datetime-local">',
        noteTitle: "Bez pośpiechu",
        note:
          "Jeśli panel wyboru wygląda inaczej na telefonie i komputerze, to nadal jest to ten sam typ pola."
      },
      {
        type: "exercise",
        control: "color",
        tags: ["Ćwiczenie", "Kolor"],
        title: "Ćwiczenie 1",
        prompt: "Ustaw kolor na zielono-turkusowy: #0b7a75.",
        fieldLabel: "Kolor etykiety",
        value: "#d86b42",
        helper:
          "Kliknij próbkę koloru. Jeśli przeglądarka pokazuje pole tekstowe, wpisz #0b7a75.",
        check(value) {
          if (value.toLowerCase() === "#0b7a75") {
            return {
              ok: true,
              message: "Pięknie. Kolor został ustawiony na właściwą wartość."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był kolor #0b7a75, a wybrano ${escapeHtml(value)}.`
          };
        }
      },
      {
        type: "exercise",
        control: "month",
        tags: ["Ćwiczenie", "Miesiąc"],
        title: "Ćwiczenie 2",
        prompt: "Wybierz miesiąc: maj 2026.",
        fieldLabel: "Miesiąc rozliczenia",
        helper:
          "Pole miesiąca zapisuje rok i miesiąc razem.",
        check(value) {
          if (!value) {
            return {
              ok: false,
              message: "Nie wybrano miesiąca."
            };
          }

          if (value === "2026-05") {
            return {
              ok: true,
              message: "Dobrze. Wybrano maj 2026."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był maj 2026, a teraz widnieje „${escapeHtml(value)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "week",
        tags: ["Ćwiczenie", "Tydzień"],
        title: "Ćwiczenie 3",
        prompt: "Wybierz tydzień 19 w roku 2026.",
        fieldLabel: "Tydzień pracy",
        helper:
          "Pole tygodnia przydaje się w planach pracy, dyżurach i harmonogramach.",
        check(value) {
          if (!value) {
            return {
              ok: false,
              message: "Nie wybrano tygodnia."
            };
          }

          if (value === "2026-W19") {
            return {
              ok: true,
              message: "Tak jest. To tydzień 19 w roku 2026."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był tydzień 2026-W19, a wybrano „${escapeHtml(value)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "datetime-local",
        tags: ["Ćwiczenie", "Data i godzina"],
        title: "Ćwiczenie 4",
        prompt: "Ustaw termin: 9 maja 2026 o 14:30.",
        fieldLabel: "Termin spotkania",
        helper:
          "To jedno pole łączy datę i godzinę. Warto po wyborze sprawdzić oba elementy.",
        check(value) {
          if (!value) {
            return {
              ok: false,
              message: "Nie ustawiono terminu."
            };
          }

          if (value === "2026-05-09T14:30") {
            return {
              ok: true,
              message: "Świetnie. Dzień i godzina zgadzają się z poleceniem."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był termin ${formatDate("2026-05-09")} o 14:30, a wybrano „${escapeHtml(value)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Rzadkie pola też są do ogarnięcia.",
        bullets: [
          "Kolor, miesiąc i tydzień najlepiej wybierać z narzędzia przeglądarki.",
          "Pełny termin pomaga, gdy dzień i godzina muszą zostać zapisane razem.",
          "Po wyborze zawsze warto przeczytać widoczną wartość jeszcze raz."
        ]
      }
    ]
  },
  {
    id: "complex-form",
    number: "12",
    title: "Bardziej skomplikowany formularz",
    subtitle: "Kilka pól naraz, nadal krok po kroku",
    summary:
      "Jeden większy formularz z tekstem, e-mailem, radiem, selectem, suwakiem, kolorem i zgodą.",
    tags: ["większy formularz", "radio", "select", "suwak"],
    slides: [
      {
        type: "intro",
        tags: ["Pełny formularz", "Spokojny rytm"],
        title: "Duży formularz robi się prostszy, gdy idziesz po kolei.",
        body:
          "W tym module kilka pól pojawia się naraz. Nie trzeba zapamiętywać wszystkiego. Czytaj od góry, wypełniaj jedno pole, potem następne.",
        details: [
          "Najpierw wpisz pola tekstowe.",
          "Potem wybierz jedną opcję, porę kontaktu i poziom na suwaku.",
          "Na końcu zaznacz zgodę i sprawdź formularz."
        ],
        markup:
          '<input type="text">\n<input type="email">\n<input type="radio">\n<select>...</select>\n<input type="range">\n<input type="checkbox">',
        noteTitle: "Najłatwiejsza metoda",
        note:
          "Nie skacz po ekranie. Jedna linia, jedna decyzja, jeden spokojny klik."
      },
      {
        type: "exercise",
        control: "complex",
        tags: ["Ćwiczenie", "Pełny formularz"],
        title: "Ćwiczenie 1",
        prompt:
          "Uzupełnij formularz: Ola, ola@przyklad.pl, pakiet rodzinny, kontakt rano, 3 osoby, kolor #0b7a75 i zgoda.",
        helper:
          "To wygląda jak dużo, ale każde pole sprawdzamy osobno. Komunikat powie dokładnie, co poprawić.",
        check(values) {
          const name = normalizeWhitespace(values.name || "");
          const email = normalizeWhitespace(values.email || "").toLowerCase();
          const plan = values.plan || "";
          const time = values.time || "";
          const people = Number(values.people || 0);
          const color = String(values.color || "").toLowerCase();
          const agreed = Boolean(values.agreed);

          if (name !== "Ola") {
            return {
              ok: false,
              message: `W polu imienia powinno być „Ola”, a teraz jest „${escapeHtml(name || "pusto")}”.`
            };
          }

          if (email !== "ola@przyklad.pl") {
            return {
              ok: false,
              message: `Adres e-mail powinien brzmieć „ola@przyklad.pl”, a wpisano „${escapeHtml(email || "pusto")}”.`
            };
          }

          if (plan !== "family") {
            return {
              ok: false,
              message: "Wybierz pakiet rodzinny w grupie radio."
            };
          }

          if (time !== "morning") {
            return {
              ok: false,
              message: "Na liście kontaktu wybierz porę „Rano”."
            };
          }

          if (people !== 3) {
            return {
              ok: false,
              message: `Suwak powinien wskazywać 3 osoby, a teraz wskazuje ${escapeHtml(String(values.people))}.`
            };
          }

          if (color !== "#0b7a75") {
            return {
              ok: false,
              message: `Kolor powinien być #0b7a75, a wybrano ${escapeHtml(color)}.`
            };
          }

          if (!agreed) {
            return {
              ok: false,
              message: "Na końcu zaznacz zgodę na kontakt."
            };
          }

          return {
            ok: true,
            message: "Brawo. Większy formularz został przejrzany i wypełniony po kolei."
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Duży formularz nie musi być trudny.",
        bullets: [
          "Najlepiej iść od góry do dołu, bez przeskakiwania.",
          "Radio, select, suwak i checkbox rozwiązują różne rodzaje decyzji.",
          "Dobry formularz mówi dokładnie, które pole wymaga poprawki."
        ]
      }
    ]
  }
];
