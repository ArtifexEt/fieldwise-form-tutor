import { courseCatalogs, languageOptions } from "./courses/index.js";

const STORAGE_KEYS = {
  completed: "form-training-completed",
  fontScale: "form-training-font-scale",
  highContrast: "form-training-high-contrast",
  language: "fieldwise-language",
  progress: "fieldwise-progress-v1"
};

const FONT_SCALE_VALUES = {
  normal: "1",
  large: "1.15",
  xlarge: "1.3"
};
const FONT_SCALE_OPTIONS = Object.keys(FONT_SCALE_VALUES);
const DEFAULT_LANGUAGE = "pl";
const storedLanguage = loadValue(STORAGE_KEYS.language, "");
const storedFontScale = loadValue(STORAGE_KEYS.fontScale, "");
const initialLanguage = resolveInitialLanguage(storedLanguage);
const initialFontScale = FONT_SCALE_OPTIONS.includes(storedFontScale) ? storedFontScale : "normal";
const initialLanguagePreferenceChosen = Boolean(courseCatalogs[storedLanguage]);
const initialFontScalePreferenceChosen = FONT_SCALE_OPTIONS.includes(storedFontScale);

let trainings = courseCatalogs[initialLanguage] || courseCatalogs[DEFAULT_LANGUAGE];
let trainingMap = new Map(trainings.map((training) => [training.id, training]));

const state = {
  language: initialLanguage,
  currentTrainingId: null,
  currentSlideIndex: 0,
  completed: loadJSON(STORAGE_KEYS.completed, []),
  progress: loadJSON(STORAGE_KEYS.progress, {}),
  fontScale: initialFontScale,
  languagePreferenceChosen: initialLanguagePreferenceChosen,
  fontScalePreferenceChosen: initialFontScalePreferenceChosen,
  preferencesPanelExpanded: !(initialLanguagePreferenceChosen && initialFontScalePreferenceChosen),
  highContrast: loadValue(STORAGE_KEYS.highContrast, "false") === "true",
  successTimer: null,
  objectUrl: null
};

const elements = {
  body: document.body,
  skipLink: document.querySelector("#skipLink"),
  metaDescription: document.querySelector('meta[name="description"]'),
  appEyebrow: document.querySelector("#appEyebrow"),
  appTitle: document.querySelector("#appTitle"),
  appLead: document.querySelector("#appLead"),
  accessibilityPanel: document.querySelector("#accessibilityPanel"),
  preferencesToggle: document.querySelector("#preferencesToggle"),
  preferencesToggleLabel: document.querySelector("#preferencesToggleLabel"),
  preferencesToggleSummary: document.querySelector("#preferencesToggleSummary"),
  preferenceControls: document.querySelector("#preferenceControls"),
  languageGroup: document.querySelector("#languageGroup"),
  languageLabel: document.querySelector("#languageLabel"),
  languagePicker: document.querySelector("#languagePicker"),
  textSizeGroup: document.querySelector("#textSizeGroup"),
  textSizeLabel: document.querySelector("#textSizeLabel"),
  contrastLabel: document.querySelector("#contrastLabel"),
  heroKicker: document.querySelector("#heroKicker"),
  heroTitle: document.querySelector("#heroTitle"),
  heroCopy: document.querySelector("#heroCopy"),
  guideTitle: document.querySelector("#guideTitle"),
  guideList: document.querySelector(".guide-list"),
  statTrainings: document.querySelector("#statTrainings"),
  statTrainingsLabel: document.querySelector("#statTrainingsLabel"),
  statComplete: document.querySelector("#statComplete"),
  statCompleteLabel: document.querySelector("#statCompleteLabel"),
  statInputTypes: document.querySelector("#statInputTypes"),
  statInputTypesLabel: document.querySelector("#statInputTypesLabel"),
  overallProgressBar: document.querySelector("#overallProgressBar"),
  overallProgressKicker: document.querySelector("#overallProgressKicker"),
  overallProgressTitle: document.querySelector("#overallProgressTitle"),
  overallProgressText: document.querySelector("#overallProgressText"),
  trainingListKicker: document.querySelector("#trainingListKicker"),
  trainingListTitle: document.querySelector("#trainingListTitle"),
  backHomeLabel: document.querySelector("#backHomeLabel"),
  coffeeLabel: document.querySelector("#coffeeLabel"),
  repoLabel: document.querySelector("#repoLabel"),
  homeView: document.querySelector("#homeView"),
  lessonView: document.querySelector("#lessonView"),
  trainingGrid: document.querySelector("#trainingGrid"),
  slideCard: document.querySelector("#slideCard"),
  lessonMeta: document.querySelector("#lessonMeta"),
  lessonTitle: document.querySelector("#lessonTitle"),
  progressBar: document.querySelector("#progressBar"),
  lessonProgressCluster: document.querySelector("#lessonProgressCluster"),
  progressText: document.querySelector("#progressText"),
  nextTrainingButton: document.querySelector("#nextTrainingButton"),
  contrastToggle: document.querySelector("#contrastToggle"),
  liveRegion: document.querySelector("#liveRegion")
};

function resolveInitialLanguage(storedLanguage) {
  if (courseCatalogs[storedLanguage]) {
    return storedLanguage;
  }

  return detectBrowserLanguage();
}

function detectBrowserLanguage() {
  const browserLanguages = typeof navigator === "undefined"
    ? []
    : [
        ...(Array.isArray(navigator.languages) ? navigator.languages : []),
        navigator.language
      ].filter(Boolean);

  for (const language of browserLanguages) {
    const normalized = language.toLowerCase();
    const exactMatch = Object.keys(courseCatalogs).find(
      (code) => normalized === code.toLowerCase()
    );

    if (exactMatch) {
      return exactMatch;
    }

    const primaryLanguage = normalized.split(/[-_]/)[0];
    if (courseCatalogs[primaryLanguage]) {
      return primaryLanguage;
    }
  }

  return DEFAULT_LANGUAGE;
}

const shellCopy = {
  pl: {
    pageTitle: "Formularze bez stresu",
    metaDescription:
      "Proste szkolenia o formularzach: gdzie kliknąć, co wpisać i jak przejść dalej na komputerze oraz telefonie.",
    skipLink: "Przejdź do treści",
    appEyebrow: "Proste ćwiczenia dla osób początkujących",
    appTitle: "Formularze bez stresu",
    appLead:
      "To szkolenie uczy, gdzie kliknąć, co wpisać i jak przejść dalej. Nie trzeba znać kodu ani trudnych nazw. Wystarczy czytać krótkie polecenia i spokojnie ćwiczyć krok po kroku.",
    accessibilityLabel: "Ułatwienia",
    languageLabel: "Język",
    textSizeLabel: "Tekst",
    fontScale: {
      normal: "Zwykły",
      large: "Większy",
      xlarge: "Największy"
    },
    contrast: "Silny kontrast",
    heroKicker: "Desktop i telefon",
    heroTitle: "Nauka formularzy krok po kroku",
    heroCopy:
      "Każdy moduł pokazuje, jak wygląda dane pole, gdzie w nie kliknąć albo stuknąć i jak sprawdzić, czy odpowiedź została wpisana poprawnie.",
    statTrainingsLabel: "szkoleń",
    statCompleteLabel: "ukończone",
    statInputTypesLabel: "typów pól",
    guideTitle: "Zanim zaczniesz",
    guideItems: [
      "Kliknij albo stuknij <strong>raz</strong> w pole. Gdy pojawi się migająca kreska albo zaznaczy się przycisk, możesz działać dalej.",
      "Na komputerze pomagają klawisze <strong>Tab</strong>, <strong>Enter</strong> i <strong>Spacja</strong>. Na telefonie szukaj przycisków <strong>Dalej</strong>, <strong>Idź</strong> albo <strong>Gotowe</strong> na klawiaturze.",
      "Jeśli coś nie wyjdzie, przeczytaj komunikat pod ćwiczeniem. Strona od razu podpowie, co poprawić."
    ],
    overallProgressKicker: "Twój postęp",
    overallProgressTitle: "Zapisujemy, gdzie kończysz",
    progressEmpty:
      "Zacznij dowolny moduł. Postęp zapisze się w tej przeglądarce automatycznie.",
    progressSummary(completed, total, percent) {
      return `Ukończono ${completed} z ${total} szkoleń. Całość: ${percent}%.`;
    },
    trainingListKicker: "Wybór szkolenia",
    trainingListTitle: "Wybierz jedną prostą umiejętność",
    backHome: "Wróć do wyboru",
    nextTraining: "Następne szkolenie",
    preferencesToggleOpen: "Ustawienia",
    preferencesToggleClose: "Ukryj ustawienia",
    preferencesSummary(language, fontSize) {
      return `${language} · tekst: ${fontSize}`;
    },
    startCourse: "Zacznij kurs",
    continueCourse: "Kontynuuj kurs",
    repeatCourse: "Powtórz kurs",
    coffee: "Postaw kawę autorowi",
    repo: "Kod na GitHubie",
    completed: "Ukończone",
    continueFrom(index, total) {
      return `Kontynuuj: ekran ${index} z ${total}`;
    },
    progressScreens(index, total, percent) {
      return `Ekran ${index} z ${total} · ${percent}%`;
    },
    lessonProgressLabel: "Postęp szkolenia",
    tileProgress(index, total) {
      return `${index}/${total} ekranów`;
    },
    inputTypesPrefix: "Pola:",
    buttons: {
      next: "Dalej",
      check: "Sprawdź i dalej",
      back: "Wstecz",
      home: "Wróć do wyboru",
      chooseFile: "Wybierz z urządzenia",
      allDone: "To już wszystkie szkolenia"
    },
    slide: {
      doIt: "Zrób to tak",
      preview: "Tak to wygląda na ekranie",
      important: "Najważniejsze po tym module",
      whatNext: "Co dalej",
      nextCopy:
        "Możesz wrócić do ekranu głównego albo przejść od razu do kolejnego szkolenia.",
      nextModule: "Następny moduł:",
      lastModule:
        "To był ostatni moduł. Możesz teraz powtórzyć dowolne szkolenie.",
      desktopHint: "Desktop: Enter / Tab / Spacja",
      phoneHint: "Telefon: Dalej / Idź / Gotowe"
    },
    preview: {
      clickType: "Kliknij w takie pole, a potem wpisz odpowiedź.",
      textarea: "Większe pole daje więcej miejsca na dłuższy tekst.",
      range: "Przesuń kropkę w lewo lub w prawo, żeby zmienić wartość.",
      checkbox: "Kliknij kratkę albo tekst obok niej.",
      switch: "Włącznik zmienia położenie po kliknięciu.",
      radio: "Tu zaznacza się tylko jedną odpowiedź.",
      select: "Kliknij strzałkę, żeby zobaczyć wszystkie możliwości.",
      file: "Możesz kliknąć przycisk albo przeciągnąć plik do pola.",
      validation:
        "Jeśli coś będzie nie tak, formularz pokaże podpowiedź przy odpowiednim polu.",
      captcha: "Najpierw zaznacz, potem odpowiedz.",
      complex:
        "Większy formularz prowadzi przez kilka decyzji w jednym miejscu."
    },
    file: {
      dropHint: "Przeciągnij zdjęcie tutaj albo wybierz je przyciskiem poniżej.",
      previewTitle: "Podgląd lokalny",
      empty: "Nie wybrano jeszcze pliku.",
      added(name) {
        return `Dodano plik ${name}.`;
      },
      unknownSize: "nieznany rozmiar",
      unknownType: "nieznany typ",
      imageAlt(name) {
        return `Podgląd lokalnego pliku ${name}`;
      }
    },
    validation: {
      nameLabel: "Imię",
      emailLabel: "Adres e-mail",
      postalLabel: "Kod pocztowy",
      namePlaceholder: "Np. Ola",
      emailPlaceholder: "ola@przyklad.pl",
      postalPlaceholder: "12-345",
      shortName: "Imię powinno mieć co najmniej 3 znaki.",
      badEmail: "Adres e-mail musi mieć poprawny format.",
      badPostal: "Kod pocztowy powinien wyglądać jak 12-345.",
      nameMismatch(value) {
        return `Imię powinno brzmieć „Ola”, a wpisano „${escapeHtml(value)}”.`;
      },
      emailMismatch(value) {
        return `Adres e-mail powinien brzmieć „ola@przyklad.pl”, a wpisano „${escapeHtml(value)}”.`;
      },
      postalMismatch(value) {
        return `Kod pocztowy powinien mieć postać „12-345”, a wpisano „${escapeHtml(value)}”.`;
      },
      success: "Brawo. Formularz przeszedł walidację i wszystkie dane są poprawne."
    },
    captcha: {
      checkbox: "Nie jestem robotem",
      answerLabel: "Odpowiedź na pytanie",
      placeholder: "Wpisz wynik"
    },
    complex: {
      name: "Imię",
      email: "Adres e-mail",
      plan: "Pakiet",
      planSingle: "Pojedynczy",
      planFamily: "Rodzinny",
      planTeam: "Zespół",
      contactTime: "Pora kontaktu",
      chooseTime: "Wybierz porę",
      morning: "Rano",
      afternoon: "Popołudnie",
      evening: "Wieczór",
      people: "Liczba osób",
      color: "Kolor etykiety",
      consent: "Zgadzam się na kontakt w sprawie formularza"
    },
    languageChanged(label) {
      return `Zmieniono język na ${label}.`;
    },
    fontChanged(value) {
      return `Ustawiono wielkość tekstu: ${value}.`;
    },
    contrastOn: "Włączono silny kontrast.",
    contrastOff: "Wyłączono silny kontrast.",
    homeAnnounce: "Wrócono do wyboru szkolenia."
  },
  en: {
    pageTitle: "Forms Without Stress",
    metaDescription:
      "Simple form lessons: where to click, what to type, and how to move forward on desktop and phone.",
    skipLink: "Skip to content",
    appEyebrow: "Simple practice for beginners",
    appTitle: "Forms Without Stress",
    appLead:
      "This training teaches where to click, what to type, and how to move forward. No code or difficult names are needed. Read the short instructions and practice step by step.",
    accessibilityLabel: "Preferences",
    languageLabel: "Language",
    textSizeLabel: "Text",
    fontScale: {
      normal: "Regular",
      large: "Larger",
      xlarge: "Largest"
    },
    contrast: "High contrast",
    heroKicker: "Desktop and phone",
    heroTitle: "Learn forms step by step",
    heroCopy:
      "Each module shows what a field looks like, where to click or tap, and how to check that the answer is correct.",
    statTrainingsLabel: "lessons",
    statCompleteLabel: "complete",
    statInputTypesLabel: "field types",
    guideTitle: "Before you start",
    guideItems: [
      "Click or tap <strong>once</strong> inside the field. When the cursor appears or a control is selected, you can continue.",
      "On a computer, <strong>Tab</strong>, <strong>Enter</strong>, and <strong>Space</strong> help. On a phone, look for <strong>Next</strong>, <strong>Go</strong>, or <strong>Done</strong> on the keyboard.",
      "If something does not work, read the message under the exercise. The page will tell you what to fix."
    ],
    overallProgressKicker: "Your progress",
    overallProgressTitle: "We save where you stop",
    progressEmpty:
      "Start any module. Progress will be saved automatically in this browser.",
    progressSummary(completed, total, percent) {
      return `${completed} of ${total} lessons complete. Overall: ${percent}%.`;
    },
    trainingListKicker: "Lesson picker",
    trainingListTitle: "Choose one simple skill",
    backHome: "Back to lessons",
    nextTraining: "Next lesson",
    preferencesToggleOpen: "Preferences",
    preferencesToggleClose: "Hide preferences",
    preferencesSummary(language, fontSize) {
      return `${language} · text: ${fontSize}`;
    },
    startCourse: "Start course",
    continueCourse: "Continue course",
    repeatCourse: "Repeat course",
    coffee: "Buy the author a coffee",
    repo: "Code on GitHub",
    completed: "Complete",
    continueFrom(index, total) {
      return `Continue: screen ${index} of ${total}`;
    },
    progressScreens(index, total, percent) {
      return `Screen ${index} of ${total} · ${percent}%`;
    },
    lessonProgressLabel: "Lesson progress",
    tileProgress(index, total) {
      return `${index}/${total} screens`;
    },
    inputTypesPrefix: "Fields:",
    buttons: {
      next: "Next",
      check: "Check and continue",
      back: "Back",
      home: "Back to lessons",
      chooseFile: "Choose from device",
      allDone: "All lessons complete"
    },
    slide: {
      doIt: "Do it this way",
      preview: "What it looks like",
      important: "Key takeaways",
      whatNext: "What next",
      nextCopy:
        "You can return to the home screen or go straight to the next lesson.",
      nextModule: "Next module:",
      lastModule:
        "That was the final module. You can repeat any lesson now.",
      desktopHint: "Desktop: Enter / Tab / Space",
      phoneHint: "Phone: Next / Go / Done"
    },
    preview: {
      clickType: "Click this kind of field, then type your answer.",
      textarea: "A larger field gives more room for longer text.",
      range: "Move the handle left or right to change the value.",
      checkbox: "Click the box or the text beside it.",
      switch: "The switch moves after you click it.",
      radio: "Only one answer is selected here.",
      select: "Click the arrow to see all options.",
      file: "You can click the button or drag a file into the area.",
      validation:
        "If something is wrong, the form will show a hint beside the right field.",
      captcha: "First check the box, then answer.",
      complex:
        "A larger form guides several decisions in one place."
    },
    file: {
      dropHint: "Drag an image here or choose it with the button below.",
      previewTitle: "Local preview",
      empty: "No file selected yet.",
      added(name) {
        return `Added file ${name}.`;
      },
      unknownSize: "unknown size",
      unknownType: "unknown type",
      imageAlt(name) {
        return `Preview of local file ${name}`;
      }
    },
    validation: {
      nameLabel: "Name",
      emailLabel: "Email address",
      postalLabel: "Postal code",
      namePlaceholder: "Example: Ola",
      emailPlaceholder: "ola@example.com",
      postalPlaceholder: "12-345",
      shortName: "The name should have at least 3 characters.",
      badEmail: "The email address needs a valid format.",
      badPostal: "The postal code should look like 12-345.",
      nameMismatch(value) {
        return `The name should be “Ola”, but you typed “${escapeHtml(value)}”.`;
      },
      emailMismatch(value) {
        return `The email should be “ola@example.com”, but you typed “${escapeHtml(value)}”.`;
      },
      postalMismatch(value) {
        return `The postal code should be “12-345”, but you typed “${escapeHtml(value)}”.`;
      },
      success: "Great. The form passed validation and all data is correct."
    },
    captcha: {
      checkbox: "I am not a robot",
      answerLabel: "Answer to the question",
      placeholder: "Type the result"
    },
    complex: {
      name: "Name",
      email: "Email address",
      plan: "Plan",
      planSingle: "Single",
      planFamily: "Family",
      planTeam: "Team",
      contactTime: "Contact time",
      chooseTime: "Choose a time",
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      people: "Number of people",
      color: "Label color",
      consent: "I agree to be contacted about the form"
    },
    languageChanged(label) {
      return `Language changed to ${label}.`;
    },
    fontChanged(value) {
      return `Text size set to ${value}.`;
    },
    contrastOn: "High contrast on.",
    contrastOff: "High contrast off.",
    homeAnnounce: "Returned to the lesson picker."
  }
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  syncCourseCatalog();
  renderLanguagePicker();
  applyLanguageCopy();
  applyPreferences();
  migrateCompletedProgress();
  renderProgressOverview();
  renderTrainingGrid();
  bindGlobalEvents();
  handleRoute();
}

function bindGlobalEvents() {
  elements.trainingGrid.addEventListener("click", handleTrainingSelection);
  elements.slideCard.addEventListener("click", handleSlideClick);
  elements.slideCard.addEventListener("submit", handleSlideSubmit);
  elements.slideCard.addEventListener("input", handleSlideInput);
  elements.slideCard.addEventListener("change", handleSlideChange);
  elements.slideCard.addEventListener("dragenter", handleDropzoneDrag);
  elements.slideCard.addEventListener("dragover", handleDropzoneDrag);
  elements.slideCard.addEventListener("dragleave", handleDropzoneLeave);
  elements.slideCard.addEventListener("drop", handleDropzoneDrop);
  elements.languagePicker.addEventListener("click", handleLanguageSelection);
  elements.preferencesToggle.addEventListener("click", togglePreferencesPanel);
  document.querySelector("#backHome").addEventListener("click", () => goHome());
  elements.nextTrainingButton.addEventListener("click", openNextTraining);
  elements.contrastToggle.addEventListener("click", toggleContrast);
  document.querySelectorAll("[data-font-scale]").forEach((button) => {
    button.addEventListener("click", () => setFontScale(button.dataset.fontScale));
  });
  window.addEventListener("hashchange", handleRoute);
}

function getCopy() {
  return shellCopy[state.language] || shellCopy[DEFAULT_LANGUAGE];
}

function syncCourseCatalog() {
  trainings = courseCatalogs[state.language] || courseCatalogs[DEFAULT_LANGUAGE];
  trainingMap = new Map(trainings.map((training) => [training.id, training]));
}

function renderLanguagePicker() {
  elements.languagePicker.innerHTML = languageOptions
    .map(
      (language) => `
        <button
          type="button"
          class="flag-button"
          data-language="${language.code}"
          aria-label="${language.label}"
          aria-pressed="${language.code === state.language}"
          title="${language.label}"
        >
          <span aria-hidden="true">${language.flag}</span>
          <span>${language.code.toUpperCase()}</span>
        </button>
      `
    )
    .join("");
}

function applyLanguageCopy() {
  const copy = getCopy();
  document.documentElement.lang = state.language;
  document.title = copy.pageTitle;
  elements.metaDescription.content = copy.metaDescription;
  elements.skipLink.textContent = copy.skipLink;
  elements.appEyebrow.textContent = copy.appEyebrow;
  elements.appTitle.textContent = copy.appTitle;
  elements.appLead.textContent = copy.appLead;
  elements.accessibilityPanel.setAttribute("aria-label", copy.accessibilityLabel);
  elements.languageGroup.setAttribute("aria-label", copy.languageLabel);
  elements.languageLabel.textContent = copy.languageLabel;
  elements.textSizeGroup.setAttribute("aria-label", copy.textSizeLabel);
  elements.textSizeLabel.textContent = copy.textSizeLabel;
  Object.entries(copy.fontScale).forEach(([key, label]) => {
    const node = document.querySelector(`[data-font-copy="${key}"]`);
    if (node) {
      node.textContent = label;
    }
  });
  elements.contrastLabel.textContent = copy.contrast;
  elements.heroKicker.textContent = copy.heroKicker;
  elements.heroTitle.textContent = copy.heroTitle;
  elements.heroCopy.textContent = copy.heroCopy;
  elements.statTrainingsLabel.textContent = copy.statTrainingsLabel;
  elements.statCompleteLabel.textContent = copy.statCompleteLabel;
  elements.statInputTypesLabel.textContent = copy.statInputTypesLabel;
  elements.guideTitle.textContent = copy.guideTitle;
  elements.guideList.innerHTML = copy.guideItems.map((item) => `<li>${item}</li>`).join("");
  elements.overallProgressKicker.textContent = copy.overallProgressKicker;
  elements.overallProgressTitle.textContent = copy.overallProgressTitle;
  elements.trainingListKicker.textContent = copy.trainingListKicker;
  elements.trainingListTitle.textContent = copy.trainingListTitle;
  elements.backHomeLabel.textContent = copy.backHome;
  elements.lessonProgressCluster.setAttribute("aria-label", copy.lessonProgressLabel);
  elements.nextTrainingButton.textContent = copy.nextTraining;
  elements.coffeeLabel.textContent = copy.coffee;
  elements.repoLabel.textContent = copy.repo;
  updatePreferencesPanelState();
}

function handleLanguageSelection(event) {
  const button = event.target.closest("[data-language]");
  if (!button) {
    return;
  }

  setLanguage(button.dataset.language);
}

function setLanguage(language) {
  if (!courseCatalogs[language]) {
    return;
  }

  const wasSetupComplete = hasCompletedPreferenceSetup();
  const languageChanged = language !== state.language;
  state.language = language;
  state.languagePreferenceChosen = true;
  collapsePreferencesAfterNewSetup(wasSetupComplete);
  localStorage.setItem(STORAGE_KEYS.language, language);
  syncCourseCatalog();
  renderLanguagePicker();
  applyLanguageCopy();
  applyPreferences();
  renderProgressOverview();
  renderTrainingGrid();

  if (state.currentTrainingId) {
    if (!trainingMap.has(state.currentTrainingId)) {
      goHome();
    } else {
      renderCurrentSlide({ saveProgress: false });
    }
  }

  const option = languageOptions.find((item) => item.code === language);
  if (languageChanged) {
    announce(getCopy().languageChanged(option?.label || language));
  }
}

function togglePreferencesPanel() {
  if (!hasCompletedPreferenceSetup()) {
    return;
  }

  state.preferencesPanelExpanded = !state.preferencesPanelExpanded;
  updatePreferencesPanelState();
}

function hasCompletedPreferenceSetup() {
  return state.languagePreferenceChosen && state.fontScalePreferenceChosen;
}

function collapsePreferencesAfterNewSetup(wasSetupComplete) {
  if (!wasSetupComplete && hasCompletedPreferenceSetup()) {
    state.preferencesPanelExpanded = false;
  }
}

function updatePreferencesPanelState() {
  const copy = getCopy();
  const setupComplete = hasCompletedPreferenceSetup();
  const isCollapsed = setupComplete && !state.preferencesPanelExpanded;
  const language = languageOptions.find((item) => item.code === state.language);
  const languageSummary = language ? `${language.flag} ${language.code.toUpperCase()}` : state.language.toUpperCase();
  const fontSummary = copy.fontScale[state.fontScale] || copy.fontScale.normal;

  elements.accessibilityPanel.classList.toggle("is-ready", setupComplete);
  elements.accessibilityPanel.classList.toggle("is-collapsed", isCollapsed);
  elements.preferencesToggle.setAttribute("aria-expanded", String(!isCollapsed));
  elements.preferencesToggleLabel.textContent = isCollapsed
    ? copy.preferencesToggleOpen
    : copy.preferencesToggleClose;
  elements.preferencesToggleSummary.textContent = copy.preferencesSummary(languageSummary, fontSummary);
}

function migrateCompletedProgress() {
  let changed = false;
  state.completed.forEach((id) => {
    const training = trainingMap.get(id) || Object.values(courseCatalogs)
      .flat()
      .find((item) => item.id === id);
    if (!training) {
      return;
    }

    const entry = state.progress[id] || {};
    if (!entry.completed) {
      state.progress[id] = {
        ...entry,
        completed: true,
        highestSlideIndex: training.slides.length - 1,
        currentSlideIndex: training.slides.length - 1,
        updatedAt: entry.updatedAt || new Date().toISOString()
      };
      changed = true;
    }
  });

  if (changed) {
    saveProgress();
  }
}

function renderProgressOverview() {
  const copy = getCopy();
  const total = trainings.length;
  const completed = trainings.filter((training) => isTrainingComplete(training.id)).length;
  const totalScreens = trainings.reduce((sum, training) => sum + training.slides.length, 0);
  const savedScreens = trainings.reduce((sum, training) => {
    const progress = getTrainingProgress(training);
    if (!progress.started && !progress.completed) {
      return sum;
    }

    return sum + (progress.completed ? training.slides.length : progress.highestSlideIndex + 1);
  }, 0);
  const percent = totalScreens ? Math.round((savedScreens / totalScreens) * 100) : 0;
  const inputTypes = getInputTypes().length;

  elements.statTrainings.textContent = String(total);
  elements.statComplete.textContent = `${percent}%`;
  elements.statInputTypes.textContent = String(inputTypes);
  elements.overallProgressBar.style.width = `${percent}%`;
  elements.overallProgressText.textContent = savedScreens
    ? copy.progressSummary(completed, total, percent)
    : copy.progressEmpty;
}

function getInputTypes() {
  const inputTypes = new Set();
  trainings.forEach((training) => {
    training.slides.forEach((slide) => {
      getSlideInputTypes(slide).forEach((type) => inputTypes.add(type));
    });
  });

  return [...inputTypes];
}

function getSlideInputTypes(slide) {
  const map = {
    text: ["text"],
    textarea: ["textarea"],
    email: ["email"],
    tel: ["tel"],
    number: ["number"],
    range: ["range"],
    date: ["date"],
    time: ["time"],
    checkbox: ["checkbox"],
    switch: ["checkbox", "switch"],
    radio: ["radio"],
    select: ["select"],
    file: ["file"],
    validation: ["text", "email", "pattern", "required"],
    captcha: ["checkbox", "text"],
    password: ["password"],
    url: ["url"],
    search: ["search"],
    color: ["color"],
    month: ["month"],
    week: ["week"],
    "datetime-local": ["datetime-local"],
    complex: ["text", "email", "radio", "select", "range", "color", "checkbox"]
  };

  return map[slide.control] || [];
}

function getTrainingProgress(training) {
  const entry = state.progress[training.id] || {};
  if (entry.completed || state.completed.includes(training.id)) {
    return {
      started: true,
      completed: true,
      currentSlideIndex: training.slides.length - 1,
      highestSlideIndex: training.slides.length - 1,
      percent: 100
    };
  }

  if (!state.progress[training.id]) {
    return {
      started: false,
      completed: false,
      currentSlideIndex: 0,
      highestSlideIndex: -1,
      percent: 0
    };
  }

  const highestSlideIndex = Math.min(
    Number.isFinite(Number(entry.highestSlideIndex)) ? Number(entry.highestSlideIndex) : -1,
    training.slides.length - 1
  );
  const currentSlideIndex = Math.min(
    Number(entry.currentSlideIndex || 0),
    training.slides.length - 1
  );
  const percent = Math.round(((highestSlideIndex + 1) / training.slides.length) * 100);

  return {
    started: true,
    completed: false,
    currentSlideIndex,
    highestSlideIndex,
    percent: Math.max(0, percent)
  };
}

function isTrainingComplete(id) {
  return Boolean(state.progress[id]?.completed || state.completed.includes(id));
}

function saveCurrentProgress(options = {}) {
  const training = trainingMap.get(state.currentTrainingId);
  if (!training) {
    return;
  }

  const previous = state.progress[training.id] || {};
  const completed = Boolean(options.completed || previous.completed);
  const previousHighest = Number.isFinite(Number(previous.highestSlideIndex))
    ? Number(previous.highestSlideIndex)
    : -1;
  const highestSlideIndex = completed
    ? training.slides.length - 1
    : Math.max(previousHighest, state.currentSlideIndex);
  state.progress[training.id] = {
    ...previous,
    currentSlideIndex: state.currentSlideIndex,
    highestSlideIndex,
    completed,
    updatedAt: new Date().toISOString()
  };
  saveProgress();
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
}

function handleRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("szkolenie/")) {
    const id = hash.replace("szkolenie/", "");
    if (trainingMap.has(id)) {
      openTraining(id, { syncHash: false });
      return;
    }
  }

  goHome({ syncHash: false });
}

function renderTrainingGrid() {
  const copy = getCopy();
  elements.trainingGrid.innerHTML = trainings
    .map((training) => {
      const progress = getTrainingProgress(training);
      const isComplete = progress.completed;
      const completedScreens = isComplete
        ? training.slides.length
        : progress.started
          ? Math.max(0, progress.highestSlideIndex + 1)
          : 0;
      const nextScreen = Math.min(progress.currentSlideIndex + 1, training.slides.length);
      const actionLabel = isComplete
        ? copy.repeatCourse
        : progress.started
          ? copy.continueCourse
          : copy.startCourse;
      const inputTypes = [
        ...new Set(training.slides.flatMap((slide) => getSlideInputTypes(slide)))
      ].slice(0, 4);
      return `
        <button
          type="button"
          class="training-tile ${isComplete ? "is-complete" : ""}"
          data-training-id="${training.id}"
          aria-label="${escapeHtml(`${training.number}. ${training.title}. ${actionLabel}`)}"
        >
          <span class="tile-index">${training.number}</span>
          <h3 class="tile-title">${training.title}</h3>
          <p class="tile-copy">${training.summary}</p>
          <div class="tile-progress" aria-hidden="true">
            <span style="width: ${progress.percent}%"></span>
          </div>
          <p class="tile-progress-copy">
            ${
              isComplete
                ? copy.completed
                : progress.started && progress.highestSlideIndex > 0
                  ? copy.continueFrom(nextScreen, training.slides.length)
                  : copy.tileProgress(completedScreens, training.slides.length)
            }
          </p>
          <div class="tile-tags">
            ${training.tags.map((tag) => `<span class="tile-tag">${tag}</span>`).join("")}
          </div>
          ${
            inputTypes.length
              ? `<p class="tile-inputs"><strong>${copy.inputTypesPrefix}</strong> ${inputTypes.join(", ")}</p>`
              : ""
          }
          <span class="tile-action" aria-hidden="true">
            <span>${actionLabel}</span>
            <span class="tile-action-arrow">→</span>
          </span>
          ${isComplete ? `<span class="tile-status">${copy.completed}</span>` : ""}
        </button>
      `;
    })
    .join("");
  renderProgressOverview();
}

function handleTrainingSelection(event) {
  const button = event.target.closest("[data-training-id]");
  if (!button) {
    return;
  }

  openTraining(button.dataset.trainingId);
}

function openTraining(id, options = {}) {
  const training = trainingMap.get(id);
  if (!training) {
    return;
  }

  clearSuccessTimer();
  revokeObjectUrl();

  state.currentTrainingId = id;
  const saved = getTrainingProgress(training);
  state.currentSlideIndex = options.slideIndex ?? (saved.completed ? 0 : saved.currentSlideIndex);

  elements.homeView.classList.add("is-hidden");
  elements.lessonView.classList.remove("is-hidden");

  if (options.syncHash !== false) {
    window.location.hash = `szkolenie/${id}`;
  }

  renderCurrentSlide({ scrollToStart: true });
}

function goHome(options = {}) {
  clearSuccessTimer();
  revokeObjectUrl();

  state.currentTrainingId = null;
  state.currentSlideIndex = 0;
  elements.lessonView.classList.add("is-hidden");
  elements.homeView.classList.remove("is-hidden");
  elements.nextTrainingButton.hidden = true;
  renderTrainingGrid();

  if (options.syncHash !== false && window.location.hash) {
    window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  }

  announce(getCopy().homeAnnounce);
}

function renderCurrentSlide(options = {}) {
  const training = trainingMap.get(state.currentTrainingId);
  if (!training) {
    return;
  }

  const slide = training.slides[state.currentSlideIndex];
  if (!slide) {
    goHome();
    return;
  }

  const progress = ((state.currentSlideIndex + 1) / training.slides.length) * 100;
  const progressRounded = Math.round(progress);
  const nextTraining = getNextTraining(training.id);
  elements.lessonMeta.textContent = `${training.number}. ${training.subtitle}`;
  elements.lessonTitle.textContent = training.title;
  elements.progressBar.style.width = `${progress}%`;
  elements.progressText.textContent = getCopy().progressScreens(
    state.currentSlideIndex + 1,
    training.slides.length,
    progressRounded
  );
  elements.nextTrainingButton.hidden = slide.type !== "summary" || !nextTraining;
  elements.nextTrainingButton.textContent = nextTraining ? getCopy().nextTraining : "";

  if (slide.type === "summary") {
    markTrainingComplete(training.id);
  } else if (options.saveProgress !== false) {
    saveCurrentProgress();
  }

  elements.slideCard.innerHTML = renderSlide(training, slide);
  focusSlide();
  if (options.scrollToStart) {
    scrollLessonToStart();
  }
  announce(
    `${training.title}. ${slide.title}. ${getCopy().progressScreens(
      state.currentSlideIndex + 1,
      training.slides.length,
      progressRounded
    )}.`
  );
}

function renderSlide(training, slide) {
  if (slide.type === "intro") {
    return renderIntroSlide(training, slide);
  }

  if (slide.type === "exercise") {
    return renderExerciseSlide(training, slide);
  }

  return renderSummarySlide(training, slide);
}

function renderIntroSlide(training, slide) {
  const copy = getCopy();
  const previewExercise = training.slides.find((item) => item.type === "exercise");
  return `
    <div class="slide-layout">
      ${renderSlideTags(slide.tags)}
      <h3>${slide.title}</h3>
      <p class="slide-copy">${slide.body}</p>
      <div class="info-grid">
        <div class="callout">
          <h4>${copy.slide.doIt}</h4>
          <ul class="detail-list">
            ${slide.details.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
        </div>
        <div class="preview-panel">
          <h4>${copy.slide.preview}</h4>
          ${previewExercise ? renderPreviewDemo(previewExercise) : `<p class="microcopy">${slide.note}</p>`}
        </div>
      </div>
      <div class="kbd-panel">
        <h4>${slide.noteTitle}</h4>
        <p class="microcopy">${slide.note}</p>
      </div>
      <div class="action-row">
        <button type="button" class="primary-button" data-action="advance">${copy.buttons.next}</button>
      </div>
    </div>
  `;
}

function renderPreviewDemo(slide) {
  const copy = getCopy();
  switch (slide.control) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "date":
    case "time":
    case "password":
    case "url":
    case "search":
    case "month":
    case "week":
    case "datetime-local":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="input-shell">
            <input
              type="${slide.control}"
              placeholder="${slide.placeholder || ""}"
              disabled
            >
          </div>
          <p class="helper-text">${copy.preview.clickType}</p>
        </div>
      `;
    case "color":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="input-shell">
            <input type="color" value="${slide.value || "#0b7a75"}" disabled>
          </div>
          <p class="helper-text">${copy.preview.clickType}</p>
        </div>
      `;
    case "textarea":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="textarea-shell">
            <textarea placeholder="${slide.placeholder || ""}" disabled></textarea>
          </div>
          <p class="helper-text">${copy.preview.textarea}</p>
        </div>
      `;
    case "range":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="control-row">
            <input
              class="range-input"
              type="range"
              min="${slide.min}"
              max="${slide.max}"
              step="${slide.step}"
              value="${slide.value}"
              disabled
            >
            <output class="range-output">${slide.value}</output>
          </div>
          <p class="helper-text">${copy.preview.range}</p>
        </div>
      `;
    case "checkbox":
      return `
        <div class="preview-demo">
          <label class="choice-option">
            <input type="checkbox" disabled>
            <span>${slide.optionLabel}</span>
          </label>
          <p class="helper-text">${copy.preview.checkbox}</p>
        </div>
      `;
    case "switch":
      return `
        <div class="preview-demo">
          <label class="switch-row">
            <span>${slide.optionLabel}</span>
            <span class="switch-control">
              <input type="checkbox" disabled>
              <span class="switch-visual"></span>
            </span>
          </label>
          <p class="helper-text">${copy.preview.switch}</p>
        </div>
      `;
    case "radio":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="radio-grid">
            ${slide.options
              .map(
                (option, index) => `
                  <label class="radio-option">
                    <input type="radio" name="preview-radio-${index}" ${index === 1 ? "checked" : ""} disabled>
                    <span>${option.label}</span>
                  </label>
                `
              )
              .join("")}
          </div>
          <p class="helper-text">${copy.preview.radio}</p>
        </div>
      `;
    case "select":
      return `
        <div class="preview-demo">
          <label>${slide.fieldLabel}</label>
          <div class="select-shell">
            <select disabled>
              ${slide.options.map((option) => `<option>${option.label}</option>`).join("")}
            </select>
          </div>
          <p class="helper-text">${copy.preview.select}</p>
        </div>
      `;
    case "file":
      return `
        <div class="preview-demo">
          <div class="dropzone">
            <p class="helper-text">${copy.file.dropHint}</p>
            <button type="button" class="dropzone-button" disabled>${copy.buttons.chooseFile}</button>
          </div>
          <p class="helper-text">${copy.preview.file}</p>
        </div>
      `;
    case "validation":
      return `
        <div class="preview-demo">
          <div class="form-field">
            <label>${copy.validation.nameLabel}</label>
            <input type="text" placeholder="${copy.validation.namePlaceholder}" disabled>
          </div>
          <div class="form-field">
            <label>${copy.validation.emailLabel}</label>
            <input type="email" placeholder="${copy.validation.emailPlaceholder}" disabled>
          </div>
          <p class="helper-text">${copy.preview.validation}</p>
        </div>
      `;
    case "captcha":
      return `
        <div class="preview-demo">
          <label class="choice-option">
            <input type="checkbox" disabled>
            <span>${copy.captcha.checkbox}</span>
          </label>
          <div class="form-field">
            <label>${copy.captcha.answerLabel}</label>
            <input type="text" placeholder="${copy.captcha.placeholder}" disabled>
          </div>
          <p class="helper-text">${copy.preview.captcha}</p>
        </div>
      `;
    case "complex":
      return `
        <div class="preview-demo">
          <div class="form-field">
            <label>${copy.complex.name}</label>
            <input type="text" placeholder="Ola" disabled>
          </div>
          <div class="radio-grid">
            <label class="radio-option">
              <input type="radio" checked disabled>
              <span>${copy.complex.planFamily}</span>
            </label>
          </div>
          <p class="helper-text">${copy.preview.complex}</p>
        </div>
      `;
    default:
      return `<p class="microcopy">${slide.note}</p>`;
  }
}

function renderExerciseSlide(training, slide) {
  const copy = getCopy();
  return `
    <div class="slide-layout">
      ${renderSlideTags(slide.tags)}
      <h3>${slide.title}</h3>
      <div class="exercise-panel">
        <form class="exercise-card ${slide.control === "validation" ? "validation-form" : ""} ${slide.control === "captcha" ? "captcha-form" : ""}" data-exercise-form>
          <fieldset>
            <legend>${slide.prompt}</legend>
            ${renderControl(slide)}
            <p class="helper-text">${slide.helper}</p>
          </fieldset>
          <div class="action-row">
            <button type="submit" class="primary-button">${copy.buttons.check}</button>
            <button type="button" class="secondary-button" data-action="back">${copy.buttons.back}</button>
          </div>
          <div class="result-panel" data-result-panel aria-live="polite"></div>
        </form>
        <aside class="kbd-panel">
          <h4>${training.title}</h4>
          <p class="microcopy">${training.summary}</p>
          <div class="slide-tags">
            <span class="hint-badge">${copy.slide.desktopHint}</span>
            <span class="hint-badge">${copy.slide.phoneHint}</span>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderSummarySlide(training, slide) {
  const copy = getCopy();
  const nextTraining = getNextTraining(training.id);
  return `
    <div class="slide-layout">
      ${renderSlideTags(slide.tags)}
      <h3>${slide.title}</h3>
      <div class="summary-grid">
        <div class="callout">
          <h4>${copy.slide.important}</h4>
          <ul class="summary-list">
            ${slide.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </div>
        <div class="kbd-panel">
          <h4>${copy.slide.whatNext}</h4>
          <p class="microcopy">
            ${copy.slide.nextCopy}
          </p>
          ${
            nextTraining
              ? `<p class="microcopy"><strong>${copy.slide.nextModule}</strong> ${nextTraining.number}. ${nextTraining.title}</p>`
              : `<p class="microcopy"><strong>${copy.slide.lastModule}</strong></p>`
          }
        </div>
      </div>
      <div class="action-row">
        <button type="button" class="primary-button" data-action="next-training" ${nextTraining ? "" : "disabled"}>
          ${nextTraining ? copy.nextTraining : copy.buttons.allDone}
        </button>
        <button type="button" class="secondary-button" data-action="home">${copy.buttons.home}</button>
      </div>
    </div>
  `;
}

function renderControl(slide) {
  const copy = getCopy();
  switch (slide.control) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "date":
    case "time":
    case "password":
    case "url":
    case "search":
    case "month":
    case "week":
    case "datetime-local":
      return `
        <div class="form-field">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="input-shell">
            <input
              id="answer"
              name="answer"
              type="${slide.control}"
              placeholder="${slide.placeholder || ""}"
              enterkeyhint="${slide.enterKeyHint || "go"}"
              autocomplete="off"
            >
          </div>
        </div>
      `;
    case "color":
      return `
        <div class="form-field">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="input-shell color-shell">
            <input
              id="answer"
              name="answer"
              type="color"
              value="${slide.value || "#0b7a75"}"
            >
            <output class="range-output" data-color-output>${slide.value || "#0b7a75"}</output>
          </div>
        </div>
      `;
    case "textarea":
      return `
        <div class="form-field">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="textarea-shell">
            <textarea
              id="answer"
              name="answer"
              placeholder="${slide.placeholder || ""}"
            ></textarea>
          </div>
        </div>
      `;
    case "range":
      return `
        <div class="field-cluster">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="control-row">
            <input
              id="answer"
              class="range-input"
              name="answer"
              type="range"
              min="${slide.min}"
              max="${slide.max}"
              step="${slide.step}"
              value="${slide.value}"
            >
            <output for="answer" class="range-output" data-range-output>${slide.value}</output>
          </div>
        </div>
      `;
    case "checkbox":
      return `
        <div class="choice-group">
          <label class="choice-option" for="answer">
            <input id="answer" name="answer" type="checkbox">
            <span>${slide.optionLabel}</span>
          </label>
        </div>
      `;
    case "switch":
      return `
        <div class="choice-group">
          <label class="switch-row" for="answer">
            <span>${slide.optionLabel}</span>
            <span class="switch-control">
              <input id="answer" name="answer" type="checkbox" role="switch">
              <span class="switch-visual"></span>
            </span>
          </label>
        </div>
      `;
    case "radio":
      return `
        <div class="field-cluster">
          <label>${slide.fieldLabel}</label>
          <div class="radio-grid">
            ${slide.options
              .map(
                (option, index) => `
                  <label class="radio-option" for="answer-${index}">
                    <input id="answer-${index}" name="answer" type="radio" value="${option.value}">
                    <span>${option.label}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    case "select":
      return `
        <div class="form-field">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="select-shell">
            <select id="answer" name="answer">
              ${slide.options
                .map((option) => `<option value="${option.value}">${option.label}</option>`)
                .join("")}
            </select>
          </div>
        </div>
      `;
    case "file":
      return `
        <div class="field-cluster">
          <label for="answer">${slide.fieldLabel}</label>
          <div class="dropzone" data-dropzone>
            <p class="helper-text">${copy.file.dropHint}</p>
            <button type="button" class="dropzone-button" data-action="choose-file">${copy.buttons.chooseFile}</button>
            <input
              class="dropzone-input"
              id="answer"
              name="answer"
              type="file"
              accept="image/*"
            >
          </div>
          <div class="preview-panel" data-preview-panel>
            <h4>${copy.file.previewTitle}</h4>
            <p class="preview-meta" data-preview-meta>${copy.file.empty}</p>
          </div>
        </div>
      `;
    case "validation":
      return `
        <div class="field-cluster">
          <div class="form-field">
            <label for="validation-name">${copy.validation.nameLabel}</label>
            <input
              id="validation-name"
              name="validationName"
              type="text"
              required
              minlength="3"
              placeholder="${copy.validation.namePlaceholder}"
              autocomplete="off"
            >
          </div>
          <div class="form-field">
            <label for="validation-email">${copy.validation.emailLabel}</label>
            <input
              id="validation-email"
              name="validationEmail"
              type="email"
              required
              placeholder="${copy.validation.emailPlaceholder}"
              autocomplete="off"
            >
          </div>
          <div class="form-field">
            <label for="validation-postal">${copy.validation.postalLabel}</label>
            <input
              id="validation-postal"
              name="validationPostal"
              type="text"
              required
              inputmode="numeric"
              pattern="\\d{2}-\\d{3}"
              placeholder="${copy.validation.postalPlaceholder}"
              autocomplete="off"
            >
          </div>
        </div>
      `;
    case "captcha":
      return `
        <div class="field-cluster">
          <label class="choice-option" for="captcha-checkbox">
            <input id="captcha-checkbox" name="captchaCheck" type="checkbox">
            <span>${copy.captcha.checkbox}</span>
          </label>
          <div class="form-field">
            <label for="captcha-answer">${copy.captcha.answerLabel}</label>
            <input
              id="captcha-answer"
              name="captchaAnswer"
              type="text"
              inputmode="numeric"
              placeholder="${copy.captcha.placeholder}"
              enterkeyhint="go"
              autocomplete="off"
            >
          </div>
        </div>
      `;
    case "complex":
      return `
        <div class="field-cluster complex-form-grid">
          <div class="form-field">
            <label for="complex-name">${copy.complex.name}</label>
            <input id="complex-name" name="complexName" type="text" placeholder="Ola" autocomplete="off">
          </div>
          <div class="form-field">
            <label for="complex-email">${copy.complex.email}</label>
            <input id="complex-email" name="complexEmail" type="email" placeholder="${copy.validation.emailPlaceholder}" autocomplete="off">
          </div>
          <fieldset class="mini-fieldset">
            <legend>${copy.complex.plan}</legend>
            <div class="radio-grid">
              <label class="radio-option" for="complex-plan-single">
                <input id="complex-plan-single" name="complexPlan" type="radio" value="single">
                <span>${copy.complex.planSingle}</span>
              </label>
              <label class="radio-option" for="complex-plan-family">
                <input id="complex-plan-family" name="complexPlan" type="radio" value="family">
                <span>${copy.complex.planFamily}</span>
              </label>
              <label class="radio-option" for="complex-plan-team">
                <input id="complex-plan-team" name="complexPlan" type="radio" value="team">
                <span>${copy.complex.planTeam}</span>
              </label>
            </div>
          </fieldset>
          <div class="form-field">
            <label for="complex-time">${copy.complex.contactTime}</label>
            <div class="select-shell">
              <select id="complex-time" name="complexTime">
                <option value="">${copy.complex.chooseTime}</option>
                <option value="morning">${copy.complex.morning}</option>
                <option value="afternoon">${copy.complex.afternoon}</option>
                <option value="evening">${copy.complex.evening}</option>
              </select>
            </div>
          </div>
          <div class="field-cluster">
            <label for="complex-people">${copy.complex.people}</label>
            <div class="control-row">
              <input id="complex-people" class="range-input" name="complexPeople" type="range" min="1" max="6" step="1" value="1">
              <output for="complex-people" class="range-output" data-range-output>1</output>
            </div>
          </div>
          <div class="form-field">
            <label for="complex-color">${copy.complex.color}</label>
            <div class="input-shell color-shell">
              <input id="complex-color" name="complexColor" type="color" value="#d86b42">
              <output class="range-output" data-color-output>#d86b42</output>
            </div>
          </div>
          <label class="choice-option complex-consent" for="complex-agreed">
            <input id="complex-agreed" name="complexAgreed" type="checkbox">
            <span>${copy.complex.consent}</span>
          </label>
        </div>
      `;
    default:
      return "";
  }
}

function handleSlideClick(event) {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) {
    return;
  }

  const action = actionTarget.dataset.action;
  switch (action) {
    case "advance":
      nextSlide();
      break;
    case "back":
      previousSlide();
      break;
    case "home":
      goHome();
      break;
    case "next-training":
      openNextTraining();
      break;
    case "choose-file": {
      const input = elements.slideCard.querySelector('input[type="file"]');
      if (input) {
        input.click();
      }
      break;
    }
    default:
      break;
  }
}

function handleSlideSubmit(event) {
  const form = event.target.closest("[data-exercise-form]");
  if (!form) {
    return;
  }

  event.preventDefault();

  const training = trainingMap.get(state.currentTrainingId);
  const slide = training?.slides[state.currentSlideIndex];
  if (!slide) {
    return;
  }

  const result = evaluateSlide(form, slide);
  showResult(form, result);
  announce(result.message);

  if (result.ok) {
    clearSuccessTimer();
    state.successTimer = window.setTimeout(() => {
      nextSlide();
    }, 1200);
  }
}

function handleSlideInput(event) {
  const resultPanel = elements.slideCard.querySelector("[data-result-panel]");
  if (resultPanel) {
    hideResult(resultPanel);
  }

  const range = event.target.closest('input[type="range"]');
  if (range) {
    const output = elements.slideCard.querySelector("[data-range-output]");
    if (output) {
      output.textContent = range.value;
    }
  }

  const color = event.target.closest('input[type="color"]');
  if (color) {
    const output = color.closest(".color-shell")?.querySelector("[data-color-output]");
    if (output) {
      output.textContent = color.value;
    }
  }
}

function handleSlideChange(event) {
  const fileInput = event.target.closest('input[type="file"]');
  if (!fileInput) {
    return;
  }

  if (fileInput.files?.length) {
    delete fileInput._codexFiles;
  }

  updatePreview(fileInput, getSelectedFiles(fileInput));
}

function handleDropzoneDrag(event) {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) {
    return;
  }

  event.preventDefault();
  zone.classList.add("is-dragover");
}

function handleDropzoneLeave(event) {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) {
    return;
  }

  zone.classList.remove("is-dragover");
}

function handleDropzoneDrop(event) {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) {
    return;
  }

  event.preventDefault();
  zone.classList.remove("is-dragover");

  const input = zone.querySelector('input[type="file"]');
  if (!input || !event.dataTransfer?.files?.length) {
    return;
  }

  input._codexFiles = event.dataTransfer.files;
  updatePreview(input, input._codexFiles);
  announce(getCopy().file.added(event.dataTransfer.files[0].name));
}

function evaluateSlide(form, slide) {
  switch (slide.control) {
    case "text":
    case "textarea":
    case "email":
    case "tel":
    case "number":
    case "date":
    case "time":
    case "select":
    case "range":
    case "password":
    case "url":
    case "search":
    case "color":
    case "month":
    case "week":
    case "datetime-local": {
      const value = form.elements.answer?.value ?? "";
      return slide.check(value);
    }
    case "checkbox":
    case "switch":
      return slide.check(Boolean(form.elements.answer?.checked));
    case "radio":
      return slide.check(form.elements.answer?.value || "");
    case "file":
      return slide.check(getSelectedFiles(form.elements.answer));
    case "validation":
      return evaluateValidationForm(form);
    case "captcha":
      return slide.check(Boolean(form.elements.captchaCheck?.checked), form.elements.captchaAnswer?.value ?? "");
    case "complex":
      return slide.check({
        name: form.elements.complexName?.value ?? "",
        email: form.elements.complexEmail?.value ?? "",
        plan: form.elements.complexPlan?.value || "",
        time: form.elements.complexTime?.value || "",
        people: form.elements.complexPeople?.value || "",
        color: form.elements.complexColor?.value || "",
        agreed: Boolean(form.elements.complexAgreed?.checked)
      });
    default:
      return {
        ok: false,
        message: "Tego ćwiczenia nie udało się sprawdzić."
      };
  }
}

function evaluateValidationForm(form) {
  const copy = getCopy();
  const nameField = form.elements.validationName;
  const emailField = form.elements.validationEmail;
  const postalField = form.elements.validationPostal;
  const expectedEmail = state.language === "en" ? "ola@example.com" : "ola@przyklad.pl";

  const customMessages = [
    { field: nameField, message: copy.validation.shortName },
    { field: emailField, message: copy.validation.badEmail },
    { field: postalField, message: copy.validation.badPostal }
  ];

  for (const { field, message } of customMessages) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return {
        ok: false,
        message
      };
    }
  }

  if (nameField.value.trim() !== "Ola") {
    return {
      ok: false,
      message: copy.validation.nameMismatch(nameField.value.trim())
    };
  }

  if (emailField.value.trim().toLowerCase() !== expectedEmail) {
    return {
      ok: false,
      message: copy.validation.emailMismatch(emailField.value.trim())
    };
  }

  if (postalField.value.trim() !== "12-345") {
    return {
      ok: false,
      message: copy.validation.postalMismatch(postalField.value.trim())
    };
  }

  return {
    ok: true,
    message: copy.validation.success
  };
}

function showResult(form, result) {
  const panel = form.querySelector("[data-result-panel]");
  if (!panel) {
    return;
  }

  panel.className = `result-panel is-visible ${result.ok ? "is-success" : "is-error"}`;
  panel.innerHTML = result.message;
}

function hideResult(panel) {
  panel.className = "result-panel";
  panel.textContent = "";
}

function updatePreview(input, files) {
  const previewPanel = elements.slideCard.querySelector("[data-preview-panel]");
  const previewMeta = elements.slideCard.querySelector("[data-preview-meta]");
  if (!previewPanel || !previewMeta) {
    return;
  }

  revokeObjectUrl();
  previewPanel.querySelector("img")?.remove();

  if (!files || files.length === 0) {
    previewMeta.textContent = getCopy().file.empty;
    return;
  }

  const [file] = files;
  previewMeta.textContent = `${file.name} • ${formatBytes(file.size)} • ${file.type || getCopy().file.unknownType}`;

  if (file.type.startsWith("image/")) {
    state.objectUrl = URL.createObjectURL(file);
    const image = document.createElement("img");
    image.src = state.objectUrl;
    image.alt = getCopy().file.imageAlt(file.name);
    image.className = "preview-image";
    previewPanel.appendChild(image);
  }
}

function getSelectedFiles(input) {
  if (input?.files?.length) {
    return input.files;
  }

  return input?._codexFiles || [];
}

function nextSlide() {
  const training = trainingMap.get(state.currentTrainingId);
  if (!training) {
    return;
  }

  revokeObjectUrl();
  clearSuccessTimer();

  if (state.currentSlideIndex < training.slides.length - 1) {
    state.currentSlideIndex += 1;
    renderCurrentSlide();
    return;
  }

  openNextTraining();
}

function previousSlide() {
  clearSuccessTimer();
  revokeObjectUrl();

  if (state.currentSlideIndex > 0) {
    state.currentSlideIndex -= 1;
    renderCurrentSlide();
    return;
  }

  goHome();
}

function openNextTraining() {
  const nextTraining = getNextTraining(state.currentTrainingId);
  if (!nextTraining) {
    goHome();
    return;
  }

  openTraining(nextTraining.id);
}

function getNextTraining(id) {
  const currentIndex = trainings.findIndex((training) => training.id === id);
  if (currentIndex === -1 || currentIndex === trainings.length - 1) {
    return null;
  }

  return trainings[currentIndex + 1];
}

function markTrainingComplete(id) {
  if (!state.completed.includes(id)) {
    state.completed = [...state.completed, id];
    localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(state.completed));
  }

  saveCurrentProgress({ completed: true });
  renderProgressOverview();
}

function setFontScale(value) {
  if (!FONT_SCALE_OPTIONS.includes(value)) {
    return;
  }

  const wasSetupComplete = hasCompletedPreferenceSetup();
  state.fontScale = value;
  state.fontScalePreferenceChosen = true;
  collapsePreferencesAfterNewSetup(wasSetupComplete);
  localStorage.setItem(STORAGE_KEYS.fontScale, value);
  applyPreferences();
  announce(getCopy().fontChanged(value));
}

function toggleContrast() {
  state.highContrast = !state.highContrast;
  localStorage.setItem(STORAGE_KEYS.highContrast, String(state.highContrast));
  applyPreferences();
  announce(state.highContrast ? getCopy().contrastOn : getCopy().contrastOff);
}

function applyPreferences() {
  document.documentElement.style.setProperty("--font-scale", FONT_SCALE_VALUES[state.fontScale] || "1");
  elements.body.dataset.contrast = state.highContrast ? "high" : "default";
  elements.contrastToggle.setAttribute("aria-pressed", String(state.highContrast));

  document.querySelectorAll("[data-font-scale]").forEach((button) => {
    const active = button.dataset.fontScale === state.fontScale;
    button.setAttribute("aria-pressed", String(active));
  });
  updatePreferencesPanelState();
}

function renderSlideTags(tags = []) {
  if (!tags.length) {
    return "";
  }

  return `
    <div class="slide-tags">
      ${tags.map((tag) => `<span class="slide-tag">${tag}</span>`).join("")}
    </div>
  `;
}

function focusSlide() {
  requestAnimationFrame(() => {
    const firstInteractive = elements.slideCard.querySelector(
      "input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );

    if (firstInteractive) {
      focusWithoutScroll(firstInteractive);
      return;
    }

    focusWithoutScroll(elements.slideCard);
  });
}

function focusWithoutScroll(element) {
  try {
    element.focus({ preventScroll: true });
  } catch (error) {
    element.focus();
  }
}

function scrollLessonToStart() {
  requestAnimationFrame(() => {
    const top = elements.lessonView.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, top - 8),
      behavior: "auto"
    });
  });
}

function announce(message) {
  elements.liveRegion.textContent = "";
  window.setTimeout(() => {
    elements.liveRegion.textContent = message;
  }, 10);
}

function clearSuccessTimer() {
  if (state.successTimer) {
    window.clearTimeout(state.successTimer);
    state.successTimer = null;
  }
}

function revokeObjectUrl() {
  if (state.objectUrl) {
    URL.revokeObjectURL(state.objectUrl);
    state.objectUrl = null;
  }
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function loadValue(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return getCopy().file.unknownSize;
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(isoValue) {
  if (!isoValue) {
    return "pustą wartość";
  }

  const date = new Date(`${isoValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return escapeHtml(isoValue);
  }

  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
