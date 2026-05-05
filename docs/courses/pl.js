import { escapeHtml, formatDate, normalizeWhitespace } from "../course-utils.js";

export const plTrainings = [
  {
    id: "text",
    number: "01",
    title: "Krótka odpowiedź i wiadomość",
    subtitle: "Kliknij w pole i wpisz tekst",
    summary:
      "Nauka klikania w zwykłe pole i w większe pole na wiadomość.",
    tags: ["krótki tekst", "wiadomość", "kliknij i wpisz"],
    slides: [
      {
        type: "intro",
        tags: ["Podstawy", "Pisanie"],
        title: "Najpierw kliknij w pole, a dopiero potem pisz.",
        body:
          "To jest najczęstszy rodzaj pola w formularzu. Służy do krótkiej odpowiedzi, na przykład do wpisania imienia, miasta albo jednego zdania.",
        details: [
          "Kliknij albo stuknij raz w jasne pole.",
          "Gdy zobaczysz migającą kreskę, możesz zacząć pisać.",
          "Po wpisaniu odpowiedzi użyj przycisku „Sprawdź i dalej”."
        ],
        markup: '<input type="text" name="first-name">\n<textarea name="message"></textarea>',
        noteTitle: "Spokojnie",
        note:
          "Nie trzeba znać trudnych nazw. Patrz na etykietę pola i rób dokładnie to, o co prosi ekran."
      },
      {
        type: "exercise",
        control: "text",
        tags: ["Ćwiczenie", "Dokładny tekst"],
        title: "Ćwiczenie 1",
        prompt: "Wpisz dokładnie: Cześć!",
        fieldLabel: "Twoja odpowiedź",
        placeholder: "Np. Cześć!",
        enterKeyHint: "next",
        helper:
          "To ćwiczenie sprawdza dokładność. Enter albo przycisk Idź powinien zatwierdzić odpowiedź.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return {
              ok: false,
              message: "Nic nie wpisano. W tym zadaniu potrzebne jest dokładnie „Cześć!”."
            };
          }

          if (typed === "Cześć!") {
            return {
              ok: true,
              message: "Brawo, dokładnie o to chodziło. Krótkie pole tekstowe zdało egzamin."
            };
          }

          return {
            ok: false,
            message: `Miało być „Cześć!”, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "textarea",
        tags: ["Ćwiczenie", "Dłuższa wiadomość"],
        title: "Ćwiczenie 2",
        prompt: "Napisz w wiadomości: Lubię formularze.",
        fieldLabel: "Wiadomość",
        placeholder: "Tu wpisz jedno zdanie",
        helper:
          "W większym polu możesz wpisać dłuższą wiadomość. Do sprawdzenia użyj przycisku pod polem.",
        check(value) {
          const typed = normalizeWhitespace(value);
          if (!typed) {
            return {
              ok: false,
              message: "Pole wiadomości jest puste. Wpisz zdanie „Lubię formularze.”"
            };
          }

          if (typed === "Lubię formularze.") {
            return {
              ok: true,
              message: "Świetnie. To właśnie rola większego pola wiadomości."
            };
          }

          return {
            ok: false,
            message: `Tutaj powinno się znaleźć „Lubię formularze.”, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Tekst ogarnięty.",
        bullets: [
          "Pole tekstowe jest dobre dla krótkiej odpowiedzi.",
          "Większe pole daje przestrzeń na dłuższą wiadomość.",
          "Etykieta i jasny komunikat błędu są równie ważne jak samo pole."
        ]
      }
    ]
  },
  {
    id: "contact",
    number: "02",
    title: "Adres e-mail i telefon",
    subtitle: "Jak wpisać dane kontaktowe",
    summary:
      "Ćwiczenia z polami, które pomagają wpisać adres e-mail i numer telefonu.",
    tags: ["kontakt", "e-mail", "telefon"],
    slides: [
      {
        type: "intro",
        tags: ["Kontakt", "Klawiatura"],
        title: "Niektóre pola pomagają wpisać kontakt łatwiej.",
        body:
          "Pole na e-mail i pole na telefon są przygotowane pod konkretny rodzaj danych. Dzięki temu łatwiej zauważyć, co trzeba wpisać.",
        details: [
          "W polu e-mail wypatruj znaku @.",
          "W polu telefonu najczęściej wpisuje się same cyfry, czasem także spacje.",
          "Jeżeli się pomylisz, popraw tylko ten fragment, który jest błędny."
        ],
        markup: '<input type="email" autocomplete="email">\n<input type="tel" autocomplete="tel">',
        noteTitle: "Dobra wiadomość",
        note:
          "Na telefonie takie pola często same pokazują wygodniejszą klawiaturę."
      },
      {
        type: "exercise",
        control: "email",
        tags: ["Ćwiczenie", "Kontakt"],
        title: "Ćwiczenie 1",
        prompt: "Wpisz adres: kontakt@przyklad.pl",
        fieldLabel: "Adres e-mail",
        placeholder: "kontakt@przyklad.pl",
        enterKeyHint: "next",
        helper:
          "Najpierw sprawdź sam zapis adresu. Wiele przeglądarek zaznacza błąd jeszcze przed wysłaniem formularza.",
        check(value) {
          const typed = value.trim().toLowerCase();
          if (!typed) {
            return {
              ok: false,
              message: "Pole e-mail jest puste. Wpisz dokładnie kontakt@przyklad.pl."
            };
          }

          if (typed === "kontakt@przyklad.pl") {
            return {
              ok: true,
              message: "Super. Pole e-mail rozpoznało poprawny adres."
            };
          }

          return {
            ok: false,
            message: `Miało być „kontakt@przyklad.pl”, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "tel",
        tags: ["Ćwiczenie", "Telefon"],
        title: "Ćwiczenie 2",
        prompt: "Wpisz numer: 555 123 456",
        fieldLabel: "Numer telefonu",
        placeholder: "555 123 456",
        enterKeyHint: "done",
        helper:
          "Spacje są mile widziane. Formularze często zapisują numer po swojemu, ale powinny przyjmować czytelny wpis.",
        check(value) {
          const typed = value.trim();
          const digits = typed.replace(/[^\d]/g, "");
          if (!digits) {
            return {
              ok: false,
              message: "Nie wpisano numeru telefonu."
            };
          }

          if (digits === "555123456") {
            return {
              ok: true,
              message: "Dobrze. Telefon może wyglądać różnie, byle numer był poprawny."
            };
          }

          return {
            ok: false,
            message: `Potrzebny był numer 555 123 456, a teraz widać „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Kontakt bez zgadywania.",
        bullets: [
          "Dobre pole podpowiada, jaki rodzaj danych trzeba wpisać.",
          "Przykład formatu pomaga uniknąć pomyłki.",
          "Numer telefonu warto zapisywać czytelnie, nawet jeśli ma spacje."
        ]
      }
    ]
  },
  {
    id: "numbers",
    number: "03",
    title: "Liczba i suwak",
    subtitle: "Wpisz liczbę albo przesuń suwak",
    summary:
      "Ćwiczenia z wpisywaniem liczby i przesuwaniem suwaka w lewo lub w prawo.",
    tags: ["liczba", "suwak", "przesuń palcem"],
    slides: [
      {
        type: "intro",
        tags: ["Liczby", "Zakres"],
        title: "Czasem wpisujesz liczbę, a czasem przesuwasz suwak.",
        body:
          "W formularzu liczba może mieć postać zwykłego pola do wpisania albo suwaka z kropką do przesuwania. Oba sposoby są poprawne, tylko działają inaczej.",
        details: [
          "Kliknij w pole liczby, jeśli masz wpisać dokładną wartość.",
          "Przesuń kropkę na suwaku, jeśli masz ustawić poziom.",
          "Po ruchu sprawdź liczbę widoczną obok suwaka."
        ],
        markup: '<input type="number" min="0" step="1">\n<input type="range" min="1" max="10">',
        noteTitle: "Wskazówka",
        note:
          "Suwak jest dobry do ustawiania mniej więcej. Gdy liczy się dokładność, lepsze jest zwykłe pole."
      },
      {
        type: "exercise",
        control: "number",
        tags: ["Ćwiczenie", "Liczba"],
        title: "Ćwiczenie 1",
        prompt: "Wpisz liczbę 42.",
        fieldLabel: "Liczba",
        placeholder: "42",
        enterKeyHint: "next",
        helper:
          "Użyj pola liczbowego. Jeśli wpiszesz inny znak, przeglądarka może go odrzucić.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return {
              ok: false,
              message: "Pole liczby jest puste."
            };
          }

          if (Number(typed) === 42) {
            return {
              ok: true,
              message: "Tak jest. Pole liczbowe przyjmuje dokładną wartość."
            };
          }

          return {
            ok: false,
            message: `Tutaj powinna pojawić się liczba 42, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "range",
        tags: ["Ćwiczenie", "Suwak"],
        title: "Ćwiczenie 2",
        prompt: "Ustaw suwak na 7.",
        fieldLabel: "Poziom",
        min: 1,
        max: 10,
        step: 1,
        value: 4,
        helper:
          "Suwak jest wygodny, gdy wartość mieści się w z góry określonym zakresie.",
        check(value) {
          if (Number(value) === 7) {
            return {
              ok: true,
              message: "Idealnie. Suwak zatrzymał się na właściwej wartości."
            };
          }

          return {
            ok: false,
            message: `Potrzebna była wartość 7, a wybrano ${escapeHtml(String(value))}.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Liczby też mają swoje miejsce.",
        bullets: [
          "Zwykłe pole liczby sprawdza się przy dokładnych danych.",
          "Suwak dobrze działa przy krótkim zakresie wartości.",
          "Pokazuj aktualną wartość suwaka również słownie lub liczbowo."
        ]
      }
    ]
  },
  {
    id: "calendar",
    number: "04",
    title: "Data i godzina",
    subtitle: "Jak wybrać termin",
    summary:
      "Ćwiczenia z wybieraniem dnia i godziny bez zgadywania, jak to zapisać.",
    tags: ["data", "godzina", "termin"],
    slides: [
      {
        type: "intro",
        tags: ["Planowanie", "Format"],
        title: "Do terminu służą osobne pola na dzień i godzinę.",
        body:
          "Przy terminie nie trzeba zgadywać zapisu. Po kliknięciu w takie pole zwykle otwiera się kalendarz albo wybór godziny.",
        details: [
          "Kliknij w pole i wybierz dzień z kalendarza, jeśli się pojawi.",
          "W polu godziny wybierz odpowiednią godzinę i minuty.",
          "Na końcu sprawdź, czy wybrany termin zgadza się z poleceniem."
        ],
        markup: '<input type="date">\n<input type="time">',
        noteTitle: "To ułatwia życie",
        note:
          "Takie pola są wygodniejsze niż zwykły tekst, bo same prowadzą rękę krok po kroku."
      },
      {
        type: "exercise",
        control: "date",
        tags: ["Ćwiczenie", "Data"],
        title: "Ćwiczenie 1",
        prompt: "Ustaw datę: 9 maja 2026.",
        fieldLabel: "Data wizyty",
        helper:
          "Jeżeli widzisz picker, możesz skorzystać z kalendarza. Wartość zostanie sprawdzona dokładnie.",
        check(value) {
          if (!value) {
            return {
              ok: false,
              message: "Nie wybrano daty."
            };
          }

          if (value === "2026-05-09") {
            return {
              ok: true,
              message: "Świetnie. Data została ustawiona poprawnie."
            };
          }

          return {
            ok: false,
            message: `Potrzebna była data 9 maja 2026, a wybrano ${formatDate(value)}.`
          };
        }
      },
      {
        type: "exercise",
        control: "time",
        tags: ["Ćwiczenie", "Godzina"],
        title: "Ćwiczenie 2",
        prompt: "Ustaw godzinę: 14:30.",
        fieldLabel: "Godzina",
        helper:
          "W polu czasu najczęściej wpisujesz tylko godziny i minuty.",
        check(value) {
          if (!value) {
            return {
              ok: false,
              message: "Nie ustawiono godziny."
            };
          }

          if (value === "14:30") {
            return {
              ok: true,
              message: "Bardzo dobrze. Godzina jest ustawiona poprawnie."
            };
          }

          return {
            ok: false,
            message: `Powinna pojawić się godzina 14:30, a teraz jest ${escapeHtml(value)}.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Termin gotowy.",
        bullets: [
          "Osobne pola dnia i godziny zmniejszają ryzyko pomyłki.",
          "Dobry podpis pola mówi jasno, czego dotyczy termin.",
          "Warto pamiętać o strefie czasowej i czytelnej nazwie wydarzenia."
        ]
      }
    ]
  },
  {
    id: "choice",
    number: "05",
    title: "Zgoda i włącznik",
    subtitle: "Jak coś zaznaczyć albo włączyć",
    summary:
      "Ćwiczenia z klikaniem małego pola wyboru i przesuwanego włącznika.",
    tags: ["zaznacz", "włącz", "spacja też działa"],
    slides: [
      {
        type: "intro",
        tags: ["Wybór", "Tak / nie"],
        title: "Jedne pola zaznaczasz, a inne po prostu włączasz.",
        body:
          "Czasem trzeba postawić znak w kratce, a czasem przesunąć włącznik. Oba sposoby mówią formularzowi: tak, chcę to włączyć albo potwierdzić.",
        details: [
          "Kliknij w mały kwadrat albo w cały wiersz z tekstem obok.",
          "Przełącznik zwykle przesuwa się w lewo lub w prawo.",
          "Po kliknięciu sprawdź, czy kontrolka zmieniła kolor albo pozycję."
        ],
        markup: '<input type="checkbox">\n<label class="switch">...</label>',
        noteTitle: "Najważniejsze",
        note:
          "Jeśli coś wygląda jak zgoda lub potwierdzenie, najczęściej trzeba to po prostu zaznaczyć."
      },
      {
        type: "exercise",
        control: "checkbox",
        tags: ["Ćwiczenie", "Zgoda"],
        title: "Ćwiczenie 1",
        prompt: "Zaznacz zgodę na kontakt e-mail.",
        fieldLabel: "Zgoda",
        optionLabel: "Wyrażam zgodę na kontakt e-mail.",
        helper:
          "Zaznacz pole kliknięciem, spacją albo dotknięciem etykiety.",
        check(checked) {
          if (checked) {
            return {
              ok: true,
              message: "Brawo. Checkbox został zaznaczony dokładnie tak, jak trzeba."
            };
          }

          return {
            ok: false,
            message: "To ćwiczenie wymaga zaznaczenia zgody."
          };
        }
      },
      {
        type: "exercise",
        control: "switch",
        tags: ["Ćwiczenie", "Ustawienie"],
        title: "Ćwiczenie 2",
        prompt: "Włącz powiadomienia SMS.",
        fieldLabel: "Powiadomienia",
        optionLabel: "Powiadomienia SMS",
        helper:
          "Przełącznik jest wygodny dla stałego ustawienia. Zobacz, że nadal pod spodem działa jak checkbox.",
        check(checked) {
          if (checked) {
            return {
              ok: true,
              message: "Udało się. Przełącznik został włączony."
            };
          }

          return {
            ok: false,
            message: "Tu trzeba włączyć powiadomienia SMS."
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Tak, nie i wszystko jasne.",
        bullets: [
          "Checkbox jest naturalny przy zgodach i listach opcji.",
          "Przełącznik pasuje do ustawień włączonych lub wyłączonych.",
          "Duża etykieta pomaga osobom słabiej widzącym i użytkownikom telefonów."
        ]
      }
    ]
  },
  {
    id: "single-choice",
    number: "06",
    title: "Jedna odpowiedź z listy",
    subtitle: "Jak wybrać tylko jedną możliwość",
    summary:
      "Ćwiczenia z wybieraniem jednej odpowiedzi z kilku możliwości.",
    tags: ["jedna odpowiedź", "lista", "wybór"],
    slides: [
      {
        type: "intro",
        tags: ["Jedna odpowiedź", "Warianty"],
        title: "Jeśli odpowiedź ma być jedna, trzeba wskazać tylko jedną opcję.",
        body:
          "Czasem wszystkie odpowiedzi widać od razu, a czasem trzeba otworzyć listę. W obu przypadkach chodzi o wybranie tylko jednej możliwości.",
        details: [
          "Jeśli widać kilka kółek, kliknij tylko jedno z nich.",
          "Jeśli widzisz strzałkę, kliknij ją i dopiero wtedy wybierz z listy.",
          "Po wyborze sprawdź, czy właściwa odpowiedź jest zaznaczona albo widoczna."
        ],
        markup: '<input type="radio" name="payment">\n<select name="contact-time">...</select>',
        noteTitle: "Nie trzeba się spieszyć",
        note:
          "Jeśli otworzysz listę przez pomyłkę, po prostu wybierz właściwą pozycję jeszcze raz."
      },
      {
        type: "exercise",
        control: "radio",
        tags: ["Ćwiczenie", "Radio"],
        title: "Ćwiczenie 1",
        prompt: "Wybierz metodę płatności: karta.",
        fieldLabel: "Metoda płatności",
        helper:
          "Jedna opcja ma być aktywna. Na komputerze możesz przełączać strzałkami.",
        options: [
          { value: "blik", label: "BLIK" },
          { value: "karta", label: "Karta" },
          { value: "przelew", label: "Przelew" }
        ],
        check(value) {
          if (value === "karta") {
            return {
              ok: true,
              message: "Dobrze. Radio wskazuje teraz dokładnie jedną odpowiedź."
            };
          }

          if (!value) {
            return {
              ok: false,
              message: "Najpierw wybierz jedną metodę płatności."
            };
          }

          return {
            ok: false,
            message: `Trzeba było wybrać „Karta”, a zaznaczono „${escapeHtml(value)}”.`
          };
        }
      },
      {
        type: "exercise",
        control: "select",
        tags: ["Ćwiczenie", "Select"],
        title: "Ćwiczenie 2",
        prompt: "Wybierz porę kontaktu: rano.",
        fieldLabel: "Pora kontaktu",
        helper:
          "Lista wyboru pozwala oszczędzić miejsce. Upewnij się, że nie została na pozycji domyślnej.",
        options: [
          { value: "", label: "Wybierz porę" },
          { value: "rano", label: "Rano" },
          { value: "popoludnie", label: "Popołudnie" },
          { value: "wieczor", label: "Wieczór" }
        ],
        check(value) {
          if (value === "rano") {
            return {
              ok: true,
              message: "Świetnie. Lista wyboru wskazuje odpowiednią porę kontaktu."
            };
          }

          if (!value) {
            return {
              ok: false,
              message: "Wybór jest pusty. Trzeba wskazać jedną porę kontaktu."
            };
          }

          return {
            ok: false,
            message: `Potrzebne było „Rano”, a wybrano „${escapeHtml(value)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Jedna opcja, jasna decyzja.",
        bullets: [
          "Radio jest szybkie, gdy opcji jest niewiele i wszystkie mają być widoczne.",
          "Lista wyboru oszczędza miejsce na telefonie i w gęstych formularzach.",
          "Zawsze warto dać czytelną etykietę, czego dotyczy wybór."
        ]
      }
    ]
  },
  {
    id: "files",
    number: "07",
    title: "Zdjęcie lub plik",
    subtitle: "Jak dodać plik z telefonu lub komputera",
    summary:
      "Ćwiczenie pokazuje, jak dodać zdjęcie z urządzenia albo przeciągnąć je do pola.",
    tags: ["zdjęcie", "plik", "przeciągnij lub wybierz"],
    slides: [
      {
        type: "intro",
        tags: ["Pliki", "Offline"],
        title: "Zdjęcie lub plik dodajesz z własnego urządzenia.",
        body:
          "To ćwiczenie pokazuje wybór pliku z telefonu albo komputera. Nic nie jest tutaj wysyłane do internetu. Plik służy tylko do nauki i lokalnego podglądu.",
        details: [
          "Kliknij przycisk, jeśli chcesz wybrać plik z urządzenia.",
          "Na komputerze możesz też przeciągnąć zdjęcie do dużego pola.",
          "Po wyborze sprawdź podgląd i nazwę pliku."
        ],
        markup: '<input type="file" accept="image/*">',
        noteTitle: "Bez obaw",
        note:
          "Nie trzeba umieć przeciągać plików. Zwykły przycisk wyboru w zupełności wystarczy."
      },
      {
        type: "exercise",
        control: "file",
        tags: ["Ćwiczenie", "Zdjęcie"],
        title: "Ćwiczenie 1",
        prompt: "Dodaj dowolny plik graficzny: JPG, PNG, GIF albo WebP.",
        fieldLabel: "Zdjęcie",
        helper:
          "Możesz kliknąć przycisk albo przeciągnąć plik do strefy. Wszystko działa lokalnie.",
        check(files) {
          if (!files || files.length === 0) {
            return {
              ok: false,
              message: "Nie wybrano jeszcze pliku graficznego."
            };
          }

          const [file] = files;
          if (!file.type.startsWith("image/")) {
            return {
              ok: false,
              message: `To nie wygląda na obraz. Wybrano plik typu ${escapeHtml(file.type || "nieznany")}.`
            };
          }

          return {
            ok: true,
            message: `Bardzo dobrze. Dodano obraz „${escapeHtml(file.name)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Pliki też mogą być przyjazne.",
        bullets: [
          "Przycisk wyboru pliku i drag & drop powinny działać równolegle.",
          "Lokalny podgląd jest pomocny i nie wymaga internetu.",
          "Opis typu pliku zmniejsza liczbę pomyłek już na starcie."
        ]
      }
    ]
  },
  {
    id: "validation",
    number: "08",
    title: "Gdy formularz mówi: popraw to",
    subtitle: "Jak czytać podpowiedzi o błędach",
    summary:
      "Nauka spokojnego poprawiania formularza, kiedy pojawia się komunikat o błędzie.",
    tags: ["błąd", "popraw", "podpowiedź"],
    slides: [
      {
        type: "intro",
        tags: ["Walidacja", "Komunikaty"],
        title: "Czasem formularz zatrzymuje się i prosi o poprawkę.",
        body:
          "To normalne. Formularz może powiedzieć, że brakuje litery, numeru albo całego pola. Taki komunikat nie oznacza porażki, tylko podpowiedź, co trzeba poprawić.",
        details: [
          "Zobacz, przy którym polu pojawił się problem.",
          "Przeczytaj podpowiedź i popraw tylko to jedno miejsce.",
          "Potem spróbuj jeszcze raz bez pośpiechu."
        ],
        markup:
          '<input required minlength="3">\n<input type="email" required>\n<input pattern="\\d{2}-\\d{3}">',
        noteTitle: "To ważne",
        note:
          "Błąd najczęściej widać pod polem albo przy samym polu. Warto przeczytać cały komunikat."
      },
      {
        type: "exercise",
        control: "validation",
        tags: ["Ćwiczenie", "Mini formularz"],
        title: "Ćwiczenie 1",
        prompt:
          "Uzupełnij formularz tak, aby przeszedł walidację: imię Ola, e-mail ola@przyklad.pl, kod 12-345.",
        helper:
          "Jeśli coś będzie nie tak, przeglądarka i komunikat pod formularzem podpowiedzą, co poprawić."
      },
      {
        type: "summary",
        tags: ["Podsumowanie"],
        title: "Walidacja ma wspierać, nie karać.",
        bullets: [
          "Najprostsze sprawdzanie formularza działa od razu w przeglądarce.",
          "Komunikat powinien mówić, co poprawić i gdzie.",
          "Najlepiej, gdy komunikat brzmi prosto i po ludzku."
        ]
      }
    ]
  },
  {
    id: "captcha",
    number: "09",
    title: "Potwierdzenie: nie jestem robotem",
    subtitle: "Prosty pokaz dodatkowego potwierdzenia",
    summary:
      "Ćwiczenie pokazuje dodatkowy krok potwierdzający, że formularz obsługuje człowiek.",
    tags: ["potwierdzenie", "checkbox", "jedno pytanie"],
    slides: [
      {
        type: "intro",
        tags: ["Zaawansowane", "Ostrożnie"],
        title: "Czasem formularz prosi o dodatkowe potwierdzenie.",
        body:
          "Może to być zaznaczenie kratki, jedno proste pytanie albo inne małe zadanie. Tutaj ćwiczymy sam pomysł: zaznacz i odpowiedz spokojnie.",
        details: [
          "Najpierw zaznacz kratkę.",
          "Potem odpowiedz na krótkie pytanie.",
          "Na końcu kliknij przycisk sprawdzający."
        ],
        markup: '<input type="checkbox"> Nie jestem robotem',
        noteTitle: "Najprostsza wersja",
        note:
          "To tylko ćwiczenie pokazujące dodatkowy krok. Liczy się spokój i dokładne czytanie polecenia."
      },
      {
        type: "exercise",
        control: "captcha",
        tags: ["Ćwiczenie", "Demo"],
        title: "Ćwiczenie 1",
        prompt: "Zaznacz checkbox i odpowiedz: ile to 3 + 4?",
        helper:
          "To tylko pokaz idei. Najpierw potwierdź checkbox, potem wpisz wynik działania.",
        check(checked, answer) {
          const typed = answer.trim();
          if (!checked) {
            return {
              ok: false,
              message: "Najpierw zaznacz pole „Nie jestem robotem”."
            };
          }

          if (!typed) {
            return {
              ok: false,
              message: "Brakuje odpowiedzi na pytanie 3 + 4."
            };
          }

          if (typed === "7") {
            return {
              ok: true,
              message: "Brawo. Demo captchy zostało zaliczone poprawnie, ale pamiętaj: to tylko ćwiczenie."
            };
          }

          return {
            ok: false,
            message: `Poprawna odpowiedź to 7, a wpisano „${escapeHtml(typed)}”.`
          };
        }
      },
      {
        type: "summary",
        tags: ["Meta"],
        title: "To już pełna baza startowa.",
        bullets: [
          "Masz za sobą tekst, liczby, datę, wybory, pliki i walidację.",
          "Wiesz już, że prawdziwa captcha potrzebuje czegoś więcej niż sam statyczny front.",
          "Teraz możesz wracać do wybranych szkoleń i ćwiczyć je tyle razy, ile chcesz."
        ]
      }
    ]
  }
];

