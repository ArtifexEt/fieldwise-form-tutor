import { escapeHtml, formatDate, normalizeWhitespace } from "../course-utils.js";

export const enTrainings = [
  {
    id: "text",
    number: "01",
    title: "Short answer and message",
    subtitle: "Click a field and type text",
    summary: "Practice a short text field and a larger message field.",
    tags: ["short text", "message", "type"],
    slides: [
      {
        type: "intro",
        tags: ["Basics", "Typing"],
        title: "Click the field first, then type.",
        body:
          "This is the most common form field. It is used for a name, a city, or one short sentence.",
        details: [
          "Click or tap once inside the light field.",
          "When the cursor appears, start typing.",
          "Use the check button when your answer is ready."
        ],
        markup: '<input type="text" name="first-name">\n<textarea name="message"></textarea>',
        noteTitle: "Easy rhythm",
        note:
          "Read the label, click once, type slowly, then check. That is enough."
      },
      {
        type: "exercise",
        control: "text",
        tags: ["Exercise", "Exact text"],
        title: "Exercise 1",
        prompt: "Type exactly: Hello!",
        fieldLabel: "Your answer",
        placeholder: "Example: Hello!",
        enterKeyHint: "next",
        helper: "This exercise checks exact typing.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return { ok: false, message: "The field is empty. Type exactly Hello!" };
          }

          if (typed === "Hello!") {
            return { ok: true, message: "Nice. The short text field is complete." };
          }

          return { ok: false, message: `It should be “Hello!”, but you typed “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "exercise",
        control: "textarea",
        tags: ["Exercise", "Longer message"],
        title: "Exercise 2",
        prompt: "Write this message: I like forms.",
        fieldLabel: "Message",
        placeholder: "Type one sentence here",
        helper: "A larger field gives you more room for a sentence or message.",
        check(value) {
          const typed = normalizeWhitespace(value);
          if (!typed) {
            return { ok: false, message: "The message is empty. Type “I like forms.”" };
          }

          if (typed === "I like forms.") {
            return { ok: true, message: "Great. That is exactly what a message field is for." };
          }

          return { ok: false, message: `The message should be “I like forms.”, but you typed “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Text fields are ready.",
        bullets: [
          "A text field is best for a short answer.",
          "A textarea is better for a longer message.",
          "A clear label matters as much as the field itself."
        ]
      }
    ]
  },
  {
    id: "contact",
    number: "02",
    title: "Email and phone",
    subtitle: "Enter contact details",
    summary: "Practice fields that help with an email address and a phone number.",
    tags: ["contact", "email", "phone"],
    slides: [
      {
        type: "intro",
        tags: ["Contact", "Keyboard"],
        title: "Some fields are shaped for one kind of answer.",
        body:
          "Email and phone fields help the browser show the right keyboard and catch simple mistakes.",
        details: [
          "An email usually contains @.",
          "A phone number is mostly digits, sometimes with spaces.",
          "If something is wrong, fix only the part that needs work."
        ],
        markup: '<input type="email" autocomplete="email">\n<input type="tel" autocomplete="tel">',
        noteTitle: "Good to know",
        note: "On a phone, these fields often open a more helpful keyboard."
      },
      {
        type: "exercise",
        control: "email",
        tags: ["Exercise", "Contact"],
        title: "Exercise 1",
        prompt: "Type this address: contact@example.com",
        fieldLabel: "Email address",
        placeholder: "contact@example.com",
        enterKeyHint: "next",
        helper: "Check the @ sign and the dot near the end.",
        check(value) {
          const typed = value.trim().toLowerCase();
          if (!typed) {
            return { ok: false, message: "The email field is empty." };
          }

          if (typed === "contact@example.com") {
            return { ok: true, message: "Good. The email address is correct." };
          }

          return { ok: false, message: `It should be contact@example.com, but you typed “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "exercise",
        control: "tel",
        tags: ["Exercise", "Phone"],
        title: "Exercise 2",
        prompt: "Type this number: 555 123 456",
        fieldLabel: "Phone number",
        placeholder: "555 123 456",
        enterKeyHint: "done",
        helper: "Spaces are fine. The important part is the digits.",
        check(value) {
          const typed = value.trim();
          const digits = typed.replace(/[^\d]/g, "");
          if (!digits) {
            return { ok: false, message: "No phone number was entered." };
          }

          if (digits === "555123456") {
            return { ok: true, message: "Good. The number is correct and readable." };
          }

          return { ok: false, message: `The number should be 555 123 456, but the field shows “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Contact fields are clear.",
        bullets: [
          "A good field hints at the kind of data it needs.",
          "Examples help prevent small mistakes.",
          "Readable spacing in phone numbers is helpful."
        ]
      }
    ]
  },
  {
    id: "numbers",
    number: "03",
    title: "Number and slider",
    subtitle: "Type a number or move a slider",
    summary: "Practice exact numbers and a range slider.",
    tags: ["number", "slider", "range"],
    slides: [
      {
        type: "intro",
        tags: ["Numbers", "Range"],
        title: "A number can be typed or chosen with a slider.",
        body:
          "Use a number field when the value must be exact. Use a slider when the value is picked from a short range.",
        details: [
          "Click the number field to type an exact value.",
          "Drag the slider handle left or right.",
          "Read the value shown next to the slider."
        ],
        markup: '<input type="number" min="0" step="1">\n<input type="range" min="1" max="10">',
        noteTitle: "Simple rule",
        note: "Exact value: type it. Approximate level: move the slider."
      },
      {
        type: "exercise",
        control: "number",
        tags: ["Exercise", "Number"],
        title: "Exercise 1",
        prompt: "Type the number 42.",
        fieldLabel: "Number",
        placeholder: "42",
        enterKeyHint: "next",
        helper: "The browser may reject letters in this field.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return { ok: false, message: "The number field is empty." };
          }

          if (Number(typed) === 42) {
            return { ok: true, message: "Correct. The number field has the exact value." };
          }

          return { ok: false, message: `The value should be 42, but you typed “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "exercise",
        control: "range",
        tags: ["Exercise", "Slider"],
        title: "Exercise 2",
        prompt: "Set the slider to 7.",
        fieldLabel: "Level",
        min: 1,
        max: 10,
        step: 1,
        value: 4,
        helper: "Move the handle and watch the number beside it.",
        check(value) {
          if (Number(value) === 7) {
            return { ok: true, message: "Perfect. The slider stopped at the right value." };
          }

          return { ok: false, message: `The slider should be 7, but it is ${escapeHtml(String(value))}.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Numbers have their place.",
        bullets: [
          "Use number fields for exact values.",
          "Use sliders for short ranges.",
          "Always show the current slider value."
        ]
      }
    ]
  },
  {
    id: "calendar",
    number: "04",
    title: "Date and time",
    subtitle: "Choose an appointment time",
    summary: "Practice choosing a day and a time.",
    tags: ["date", "time", "appointment"],
    slides: [
      {
        type: "intro",
        tags: ["Planning", "Format"],
        title: "Dates and times have their own fields.",
        body:
          "These fields often open a calendar or a time picker, so you do not have to guess the format.",
        details: [
          "Click the date field and choose a day.",
          "Use the time field for hours and minutes.",
          "Check the selected value before moving on."
        ],
        markup: '<input type="date">\n<input type="time">',
        noteTitle: "Helpful by design",
        note: "The picker may look different on a phone and a computer."
      },
      {
        type: "exercise",
        control: "date",
        tags: ["Exercise", "Date"],
        title: "Exercise 1",
        prompt: "Set the date to May 9, 2026.",
        fieldLabel: "Visit date",
        helper: "Use the calendar if it appears.",
        check(value) {
          if (!value) {
            return { ok: false, message: "No date was selected." };
          }

          if (value === "2026-05-09") {
            return { ok: true, message: "Great. The date is correct." };
          }

          return { ok: false, message: `The date should be May 9, 2026, but you selected ${formatDate(value, "en-US")}.` };
        }
      },
      {
        type: "exercise",
        control: "time",
        tags: ["Exercise", "Time"],
        title: "Exercise 2",
        prompt: "Set the time to 14:30.",
        fieldLabel: "Time",
        helper: "Most time fields use hours and minutes.",
        check(value) {
          if (!value) {
            return { ok: false, message: "No time was selected." };
          }

          if (value === "14:30") {
            return { ok: true, message: "Very good. The time is correct." };
          }

          return { ok: false, message: `The time should be 14:30, but it is ${escapeHtml(value)}.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "The appointment is ready.",
        bullets: [
          "Date and time fields reduce format mistakes.",
          "A clear label explains what the appointment is for.",
          "Always check both the day and the hour."
        ]
      }
    ]
  },
  {
    id: "choice",
    number: "05",
    title: "Consent and switch",
    subtitle: "Check something or turn it on",
    summary: "Practice a checkbox and a switch-style checkbox.",
    tags: ["checkbox", "switch", "space key"],
    slides: [
      {
        type: "intro",
        tags: ["Choice", "Yes / no"],
        title: "Some fields are checked, others are turned on.",
        body:
          "A checkbox and a switch both answer yes or no. The label tells you what the yes means.",
        details: [
          "Click the square or the label beside it.",
          "A switch moves left or right.",
          "Check that the control changed state."
        ],
        markup: '<input type="checkbox">\n<label class="switch">...</label>',
        noteTitle: "Most important",
        note: "If it looks like consent or a setting, you usually need to check or turn it on."
      },
      {
        type: "exercise",
        control: "checkbox",
        tags: ["Exercise", "Consent"],
        title: "Exercise 1",
        prompt: "Check the consent for email contact.",
        fieldLabel: "Consent",
        optionLabel: "I agree to be contacted by email.",
        helper: "Click the box, the label, or use Space when focused.",
        check(checked) {
          return checked
            ? { ok: true, message: "Correct. The checkbox is checked." }
            : { ok: false, message: "This exercise needs the consent checked." };
        }
      },
      {
        type: "exercise",
        control: "switch",
        tags: ["Exercise", "Setting"],
        title: "Exercise 2",
        prompt: "Turn on SMS notifications.",
        fieldLabel: "Notifications",
        optionLabel: "SMS notifications",
        helper: "A switch is useful for a setting that stays on or off.",
        check(checked) {
          return checked
            ? { ok: true, message: "Done. The switch is on." }
            : { ok: false, message: "Turn on SMS notifications." };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Yes and no are clear.",
        bullets: [
          "Checkboxes work well for consent and lists.",
          "Switches work well for settings.",
          "Large labels help on phones and for accessibility."
        ]
      }
    ]
  },
  {
    id: "single-choice",
    number: "06",
    title: "One answer from a list",
    subtitle: "Choose only one option",
    summary: "Practice radio buttons and a select menu.",
    tags: ["radio", "select", "one answer"],
    slides: [
      {
        type: "intro",
        tags: ["One answer", "Options"],
        title: "When only one answer is allowed, choose one option.",
        body:
          "Radio buttons show all options at once. A select menu saves space and opens a list.",
        details: [
          "If you see circles, choose one of them.",
          "If you see an arrow, open the list and choose.",
          "Check that the right option is selected."
        ],
        markup: '<input type="radio" name="payment">\n<select name="contact-time">...</select>',
        noteTitle: "No rush",
        note: "If you choose the wrong option, simply choose the right one."
      },
      {
        type: "exercise",
        control: "radio",
        tags: ["Exercise", "Radio"],
        title: "Exercise 1",
        prompt: "Choose payment method: card.",
        fieldLabel: "Payment method",
        helper: "Only one option should be active.",
        options: [
          { value: "blik", label: "BLIK" },
          { value: "card", label: "Card" },
          { value: "transfer", label: "Bank transfer" }
        ],
        check(value) {
          if (value === "card") {
            return { ok: true, message: "Good. Radio buttons now point to one answer." };
          }

          if (!value) {
            return { ok: false, message: "Choose one payment method first." };
          }

          return { ok: false, message: `Choose “Card”, not “${escapeHtml(value)}”.` };
        }
      },
      {
        type: "exercise",
        control: "select",
        tags: ["Exercise", "Select"],
        title: "Exercise 2",
        prompt: "Choose contact time: morning.",
        fieldLabel: "Contact time",
        helper: "A select menu saves space. Make sure it is not left on the placeholder.",
        options: [
          { value: "", label: "Choose a time" },
          { value: "morning", label: "Morning" },
          { value: "afternoon", label: "Afternoon" },
          { value: "evening", label: "Evening" }
        ],
        check(value) {
          if (value === "morning") {
            return { ok: true, message: "Great. The select menu shows the right time." };
          }

          if (!value) {
            return { ok: false, message: "The choice is empty. Pick one contact time." };
          }

          return { ok: false, message: `Choose “Morning”, not “${escapeHtml(value)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "One clear choice.",
        bullets: [
          "Radio buttons are quick when there are only a few options.",
          "Select menus save space on phones.",
          "The label should explain what the choice is about."
        ]
      }
    ]
  },
  {
    id: "files",
    number: "07",
    title: "Photo or file",
    subtitle: "Add a file from your device",
    summary: "Practice choosing an image or dragging it into a drop area.",
    tags: ["photo", "file", "drag or choose"],
    slides: [
      {
        type: "intro",
        tags: ["Files", "Local"],
        title: "A file is added from your own device.",
        body:
          "This exercise only previews the file locally. Nothing is uploaded.",
        details: [
          "Click the button to choose a file.",
          "On a computer, you can also drag the file into the large area.",
          "Check the preview and file name."
        ],
        markup: '<input type="file" accept="image/*">',
        noteTitle: "No pressure",
        note: "Dragging is optional. The regular choose button is enough."
      },
      {
        type: "exercise",
        control: "file",
        tags: ["Exercise", "Image"],
        title: "Exercise 1",
        prompt: "Add any image file: JPG, PNG, GIF, or WebP.",
        fieldLabel: "Image",
        helper: "Click the button or drag a file into the area. Everything stays local.",
        check(files) {
          if (!files || files.length === 0) {
            return { ok: false, message: "No image file has been selected yet." };
          }

          const [file] = files;
          if (!file.type.startsWith("image/")) {
            return { ok: false, message: `That does not look like an image. File type: ${escapeHtml(file.type || "unknown")}.` };
          }

          return { ok: true, message: `Very good. Added image “${escapeHtml(file.name)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Files can be friendly too.",
        bullets: [
          "A choose button and drag-and-drop should both work.",
          "A local preview is helpful and does not need the internet.",
          "A clear file type note prevents mistakes."
        ]
      }
    ]
  },
  {
    id: "validation",
    number: "08",
    title: "When a form says: fix this",
    subtitle: "Read error hints calmly",
    summary: "Practice correcting a form after an error message appears.",
    tags: ["error", "fix", "hint"],
    slides: [
      {
        type: "intro",
        tags: ["Validation", "Messages"],
        title: "A form may stop and ask for a correction.",
        body:
          "That is normal. The message tells you what to fix, not that you failed.",
        details: [
          "Look for the field with the problem.",
          "Read the hint below or near that field.",
          "Fix that one place and try again."
        ],
        markup:
          '<input required minlength="3">\n<input type="email" required>\n<input pattern="\\d{2}-\\d{3}">',
        noteTitle: "Important",
        note: "Read the whole message before changing the field."
      },
      {
        type: "exercise",
        control: "validation",
        tags: ["Exercise", "Mini form"],
        title: "Exercise 1",
        prompt:
          "Complete the form so it passes: name Ola, email ola@example.com, postal code 12-345.",
        helper: "If something is wrong, the browser and the message below the form will help."
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Validation should help, not punish.",
        bullets: [
          "Basic browser validation works without extra code.",
          "A good message says what to fix and where.",
          "Plain language is best."
        ]
      }
    ]
  },
  {
    id: "captcha",
    number: "09",
    title: "Confirm: I am not a robot",
    subtitle: "A simple extra confirmation",
    summary: "Practice a small extra step before a form is accepted.",
    tags: ["confirmation", "checkbox", "question"],
    slides: [
      {
        type: "intro",
        tags: ["Advanced", "Careful"],
        title: "Some forms ask for one extra confirmation.",
        body:
          "It might be a checkbox, a simple question, or another small task. This demo teaches the idea only.",
        details: [
          "First check the box.",
          "Then answer the short question.",
          "Finally use the check button."
        ],
        markup: '<input type="checkbox"> I am not a robot',
        noteTitle: "Simple demo",
        note: "This is only a practice version, not a real security system."
      },
      {
        type: "exercise",
        control: "captcha",
        tags: ["Exercise", "Demo"],
        title: "Exercise 1",
        prompt: "Check the box and answer: what is 3 + 4?",
        helper: "First check the box, then type the result.",
        check(checked, answer) {
          const typed = answer.trim();
          if (!checked) {
            return { ok: false, message: "First check “I am not a robot”." };
          }

          if (!typed) {
            return { ok: false, message: "The answer to 3 + 4 is missing." };
          }

          if (typed === "7") {
            return { ok: true, message: "Correct. The demo confirmation is complete." };
          }

          return { ok: false, message: `The correct answer is 7, but you typed “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Meta"],
        title: "The starting set is complete.",
        bullets: [
          "You have practiced text, numbers, dates, choices, files, and validation.",
          "A real captcha needs more than a static front end.",
          "You can return to any lesson and practice again."
        ]
      }
    ]
  },
  {
    id: "secure-and-search",
    number: "10",
    title: "Password, link, and search",
    subtitle: "Secure text and quick lookup fields",
    summary: "Practice password, URL, and search inputs.",
    tags: ["password", "URL", "search"],
    slides: [
      {
        type: "intro",
        tags: ["Security", "Search"],
        title: "Not every field shows typed text the same way.",
        body:
          "A password is hidden, a website address must look like a link, and a search field is meant for short queries.",
        details: [
          "In a password field, keep typing even if you only see dots.",
          "A website address usually starts with https://.",
          "A search field accepts a short word or phrase."
        ],
        markup:
          '<input type="password">\n<input type="url">\n<input type="search">',
        noteTitle: "Easy trick",
        note: "If a password is wrong, clearing the whole field is often easier than fixing one letter."
      },
      {
        type: "exercise",
        control: "password",
        tags: ["Exercise", "Password"],
        title: "Exercise 1",
        prompt: "Type the password: Secure-123",
        fieldLabel: "Password",
        placeholder: "Type the password",
        enterKeyHint: "next",
        helper: "The characters may be hidden. That is normal.",
        check(value) {
          const typed = value.trim();
          if (!typed) {
            return { ok: false, message: "The password field is empty. Type Secure-123." };
          }

          if (typed === "Secure-123") {
            return { ok: true, message: "Good. The password is correct even though the field hides it." };
          }

          return { ok: false, message: "The password does not match. Clear the field and type Secure-123 again." };
        }
      },
      {
        type: "exercise",
        control: "url",
        tags: ["Exercise", "Link"],
        title: "Exercise 2",
        prompt: "Type this address: https://example.com",
        fieldLabel: "Website address",
        placeholder: "https://example.com",
        enterKeyHint: "next",
        helper: "A URL field helps catch a missing https:// or dot.",
        check(value) {
          const typed = value.trim().toLowerCase().replace(/\/$/, "");
          if (!typed) {
            return { ok: false, message: "No website address was typed." };
          }

          if (typed === "https://example.com") {
            return { ok: true, message: "Great. The website address has the right shape." };
          }

          return { ok: false, message: `The address should be https://example.com, but you typed “${escapeHtml(value.trim())}”.` };
        }
      },
      {
        type: "exercise",
        control: "search",
        tags: ["Exercise", "Search"],
        title: "Exercise 3",
        prompt: "Search for the word: invoice",
        fieldLabel: "Search",
        placeholder: "Type a search phrase",
        enterKeyHint: "search",
        helper: "A search field is like short text, with search-friendly browser behavior.",
        check(value) {
          const typed = normalizeWhitespace(value).toLowerCase();
          if (!typed) {
            return { ok: false, message: "The search field is empty." };
          }

          if (typed === "invoice") {
            return { ok: true, message: "Correct. The search field has the right word." };
          }

          return { ok: false, message: `Type “invoice”, not “${escapeHtml(typed)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Password, link, and search are familiar now.",
        bullets: [
          "A password can look like dots and still accept text.",
          "A URL should look like a full link.",
          "A search field is best for a short query."
        ]
      }
    ]
  },
  {
    id: "calendar-advanced",
    number: "11",
    title: "Color, month, week, and full date",
    subtitle: "Less common fields, still simple",
    summary: "Practice color, month, week, and datetime-local inputs.",
    tags: ["color", "month", "week", "date and time"],
    slides: [
      {
        type: "intro",
        tags: ["Calendar", "Color"],
        title: "Some fields open a small picker.",
        body:
          "Color, month, week, and full date-time fields often use a browser picker, so you do not need to memorize the exact format.",
        details: [
          "For color, click the sample and choose the requested color.",
          "Month and week fields keep their own format.",
          "A full date-time field combines the day and the hour."
        ],
        markup:
          '<input type="color">\n<input type="month">\n<input type="week">\n<input type="datetime-local">',
        noteTitle: "No rush",
        note: "The picker may look different across devices, but the field type is the same."
      },
      {
        type: "exercise",
        control: "color",
        tags: ["Exercise", "Color"],
        title: "Exercise 1",
        prompt: "Set the color to teal: #0b7a75.",
        fieldLabel: "Label color",
        value: "#d86b42",
        helper: "Click the color sample. If you see a text box, type #0b7a75.",
        check(value) {
          if (value.toLowerCase() === "#0b7a75") {
            return { ok: true, message: "Nice. The color is set correctly." };
          }

          return { ok: false, message: `The color should be #0b7a75, but it is ${escapeHtml(value)}.` };
        }
      },
      {
        type: "exercise",
        control: "month",
        tags: ["Exercise", "Month"],
        title: "Exercise 2",
        prompt: "Choose the month: May 2026.",
        fieldLabel: "Billing month",
        helper: "A month field stores the year and month together.",
        check(value) {
          if (!value) {
            return { ok: false, message: "No month was selected." };
          }

          if (value === "2026-05") {
            return { ok: true, message: "Good. May 2026 is selected." };
          }

          return { ok: false, message: `The month should be 2026-05, but it is “${escapeHtml(value)}”.` };
        }
      },
      {
        type: "exercise",
        control: "week",
        tags: ["Exercise", "Week"],
        title: "Exercise 3",
        prompt: "Choose week 19 in 2026.",
        fieldLabel: "Work week",
        helper: "Week fields are useful for schedules and duty rosters.",
        check(value) {
          if (!value) {
            return { ok: false, message: "No week was selected." };
          }

          if (value === "2026-W19") {
            return { ok: true, message: "Correct. That is week 19 in 2026." };
          }

          return { ok: false, message: `The week should be 2026-W19, but it is “${escapeHtml(value)}”.` };
        }
      },
      {
        type: "exercise",
        control: "datetime-local",
        tags: ["Exercise", "Date and time"],
        title: "Exercise 4",
        prompt: "Set the appointment to May 9, 2026 at 14:30.",
        fieldLabel: "Appointment",
        helper: "This one field combines a date and a time.",
        check(value) {
          if (!value) {
            return { ok: false, message: "No appointment was selected." };
          }

          if (value === "2026-05-09T14:30") {
            return { ok: true, message: "Great. The day and time are correct." };
          }

          return { ok: false, message: `The appointment should be ${formatDate("2026-05-09", "en-US")} at 14:30, but it is “${escapeHtml(value)}”.` };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "Less common fields are manageable.",
        bullets: [
          "Color, month, and week are easiest with the browser picker.",
          "A full date-time field keeps the day and hour together.",
          "After choosing, read the visible value once more."
        ]
      }
    ]
  },
  {
    id: "complex-form",
    number: "12",
    title: "A more complex form",
    subtitle: "Several fields at once, still step by step",
    summary:
      "One larger form with text, email, radio, select, slider, color, and consent.",
    tags: ["larger form", "radio", "select", "slider"],
    slides: [
      {
        type: "intro",
        tags: ["Full form", "Calm rhythm"],
        title: "A larger form is easier when you move line by line.",
        body:
          "This module shows several fields at once. You do not need to remember everything. Read from top to bottom and complete one field at a time.",
        details: [
          "Start with the text fields.",
          "Then choose one option, a contact time, and a slider value.",
          "Finish by checking the consent."
        ],
        markup:
          '<input type="text">\n<input type="email">\n<input type="radio">\n<select>...</select>\n<input type="range">\n<input type="checkbox">',
        noteTitle: "Easiest method",
        note: "One line, one decision, one calm click."
      },
      {
        type: "exercise",
        control: "complex",
        tags: ["Exercise", "Full form"],
        title: "Exercise 1",
        prompt:
          "Complete the form: Ola, ola@example.com, family plan, morning contact, 3 people, color #0b7a75, and consent.",
        helper:
          "It looks like a lot, but each field is checked separately. The message tells you exactly what to fix.",
        check(values) {
          const name = normalizeWhitespace(values.name || "");
          const email = normalizeWhitespace(values.email || "").toLowerCase();
          const plan = values.plan || "";
          const time = values.time || "";
          const people = Number(values.people || 0);
          const color = String(values.color || "").toLowerCase();
          const agreed = Boolean(values.agreed);

          if (name !== "Ola") {
            return { ok: false, message: `The name should be “Ola”, but it is “${escapeHtml(name || "empty")}”.` };
          }

          if (email !== "ola@example.com") {
            return { ok: false, message: `The email should be “ola@example.com”, but it is “${escapeHtml(email || "empty")}”.` };
          }

          if (plan !== "family") {
            return { ok: false, message: "Choose the family plan in the radio group." };
          }

          if (time !== "morning") {
            return { ok: false, message: "Choose “Morning” in the contact time list." };
          }

          if (people !== 3) {
            return { ok: false, message: `The slider should show 3 people, but it shows ${escapeHtml(String(values.people))}.` };
          }

          if (color !== "#0b7a75") {
            return { ok: false, message: `The color should be #0b7a75, but it is ${escapeHtml(color)}.` };
          }

          if (!agreed) {
            return { ok: false, message: "Check the contact consent at the end." };
          }

          return { ok: true, message: "Excellent. The larger form was completed one step at a time." };
        }
      },
      {
        type: "summary",
        tags: ["Summary"],
        title: "A large form does not have to be hard.",
        bullets: [
          "Move from top to bottom instead of jumping around.",
          "Radio, select, slider, and checkbox each solve a different kind of choice.",
          "A good form says exactly which field needs a correction."
        ]
      }
    ]
  }
];
