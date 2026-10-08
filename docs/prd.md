# Build a Class Diary Image Generator Web App

## 1. Project Goal

Build a beautiful, simple, mobile-friendly web application for creating a **Class Diary image**.

The user will fill out a form with class information and 3 periods. After clicking **Generate Diary**, the application should create a visually polished diary card/image containing the submitted information.

The generated diary must be downloadable as:

* PNG
* JPG/JPEG

The primary user is a teacher, so the application should be extremely simple and practical.

---

# 2. Core User Flow

The complete user flow should be:

```text
Open Website
     ↓
Fill Class Diary Form
     ↓
Click "Generate Diary"
     ↓
Show Generated Image Preview
     ↓
Download PNG / JPG
```

The user should also be able to go back, edit the information, and generate the image again.

No login, backend, database, or server-side image generation is required.

This should be a **frontend-only application**.

---

# 3. Form Requirements

Create a clean and attractive form.

## Basic Information

Fields:

### Date

* Required
* Use a date input where appropriate
* Display the date in a human-readable format in the generated image

### Day

* Required
* Preferably derive automatically from the selected date
* The user should not have to manually type the day unless there is a strong reason

Example:

```text
Date: 07/10/2026
Day: Wednesday
```

### Class

* Required
* Text input
* Example: `Nursery D`

---

# 4. Period Information

There are exactly **3 periods**.

The user should enter:

### Period 1

```text
Period: 1st Period
Subject: __________
Lesson Details: __________
```

### Period 2

```text
Period: 2nd Period
Subject: __________
Lesson Details: __________
```

### Period 3

```text
Period: 3rd Period
Subject: __________
Lesson Details: __________
```

The period names should be fixed/default values.

The user should NOT need to type the period names manually.

---

# 5. Prepared By

Add a required field:

```text
Prepared By
```

Example:

```text
Prepared By: Mrs. Rahman
```

This value must appear at the bottom of the generated diary image.

---

# 6. Form Layout

Use a visually clean form.

Suggested structure:

```text
┌───────────────────────────────────────┐
│          Class Diary Generator        │
│                                       │
│ Date                                   │
│ [ 07/10/2026                       ]  │
│                                       │
│ Day                                    │
│ [ Wednesday                         ]  │
│                                       │
│ Class                                  │
│ [ Nursery D                         ]  │
│                                       │
│ ───────── Period 1 ─────────          │
│ Subject                               │
│ [ English                           ]  │
│ Lesson Details                        │
│ [ Fill in the blanks (Aa–Tt)       ]  │
│                                       │
│ ───────── Period 2 ─────────          │
│ ...                                   │
│                                       │
│ ───────── Period 3 ─────────          │
│ ...                                   │
│                                       │
│ Prepared By                           │
│ [ Mrs. Rahman                       ] │
│                                       │
│        [ Generate Diary ]             │
└───────────────────────────────────────┘
```

The actual implementation should be more polished than this ASCII representation.

---

# 7. Generated Diary Design

The generated image is the most important part of this project.

It should NOT look like a screenshot of a normal HTML form or admin dashboard.

It should look like a **professionally designed digital school diary card**.

Visual direction:

> Elegant + Cute + Floral + Warm + Clean + School Diary

---

# 8. Background Design

Use a beautiful static/hard-coded background.

Include subtle decorative elements such as:

* Flowers
* Leaves
* Small trees
* Botanical illustrations
* Soft natural elements
* Optional subtle school/education-themed decorations

Decorations should primarily appear around the:

* Top corners
* Bottom corners
* Outer edges

Do NOT allow decorations to interfere with the main content.

The central area must remain clean and readable.

The background should be hard-coded/static.

It must not depend on the form data.

---

# 9. Generated Image Structure

Use approximately this structure:

```text
┌──────────────────────────────────────────────┐
│     🌸                         🌸             │
│                                              │
│               CLASS DIARY                    │
│                                              │
│     Date: 07/10/2026                        │
│     Day: Wednesday     Class: Nursery D     │
│                                              │
│  ┌──────────┬──────────┬──────────────────┐  │
│  │ Period   │ Subject  │ Lesson Details   │  │
│  ├──────────┼──────────┼──────────────────┤  │
│  │ 1st      │ English  │ Fill in the ...  │  │
│  ├──────────┼──────────┼──────────────────┤  │
│  │ 2nd      │ Bangla   │ কারচিহ্ন দিয়ে... │  │
│  ├──────────┼──────────┼──────────────────┤  │
│  │ 3rd      │ Math     │ Numbers ...      │  │
│  └──────────┴──────────┴──────────────────┘  │
│                                              │
│  Note: Please complete assigned lessons.   │
│                                              │
│                        Prepared by: Name     │
│                                              │
│     🌿                            🌿          │
└──────────────────────────────────────────────┘
```

This is only a structural reference.

The actual design should be significantly more beautiful.

---

# 10. Header

At the top of the generated image show:

## CLASS DIARY

Then show:

* Date
* Day
* Class

For example:

```text
Date: 07/10/2026
Day: Wednesday
Class: Nursery D
```

Use a visually balanced layout.

Do not simply render them as plain paragraphs.

For example, they can be arranged as three information blocks:

```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ DATE         │ │ DAY          │ │ CLASS        │
│ 07 Oct 2026  │ │ Wednesday    │ │ Nursery D    │
└──────────────┘ └──────────────┘ └──────────────┘
```

Use whichever design looks best.

---

# 11. Main Table

The generated diary must contain a table with exactly:

**3 columns**

```text
Period | Subject | Lesson Details
```

and exactly:

**4 rows**

```text
Header
Period 1
Period 2
Period 3
```

Example:

| Period     | Subject     | Lesson Details             |
| ---------- | ----------- | -------------------------- |
| 1st Period | English     | Fill in the blanks (Aa–Tt) |
| 2nd Period | Bangla      | কারচিহ্ন দিয়ে বর্ণের লেখা |
| 3rd Period | Mathematics | Numbers 1–20               |

---

# 12. Table Styling

The table should look like part of the designed diary, not a default browser table.

Requirements:

* Rounded outer corners if visually appropriate
* Elegant borders
* Clear header styling
* Good cell padding
* Comfortable row spacing
* Strong text contrast
* Responsive text wrapping
* No clipping
* No horizontal overflow
* Lesson Details should receive the largest width

Suggested approximate width:

```text
Period           20%
Subject          25%
Lesson Details   55%
```

Adjust this if necessary for the best visual result.

---

# 13. Bengali Text Support

This is extremely important.

Lesson Details may contain Bengali text.

Examples:

```text
কারচিহ্ন দিয়ে বর্ণের লেখা
ছোট গল্প পড়া
বাংলা বর্ণমালা অনুশীলন
```

The generated image must render Bengali correctly.

Requirements:

* Proper Unicode support
* Bengali-compatible font
* Correct glyph shaping
* No broken characters
* No clipping
* No unexpected line breaks

If a web font is used, ensure the font is loaded before image generation.

Do not generate the image before the required fonts have finished loading.

---

# 14. Long Text Handling

Lesson Details may be long.

For example:

```text
Practice writing Bengali letters with appropriate কারচিহ্ন and complete the exercises from pages 12–15.
```

Or:

```text
বাংলা বর্ণমালার স্বরবর্ণ ও ব্যঞ্জনবর্ণ অনুশীলন এবং খাতায় পাঁচটি করে শব্দ লেখা।
```

The layout must automatically adapt.

Requirements:

* Text wrapping
* Dynamic row height
* No clipping
* No overlap
* No overflow
* No text extending outside the table

Never use fixed heights that can cause content to disappear.

---

# 15. Hard-Coded Note

Include a note in the generated image.

Example:

```text
Note: Please ensure all students complete the assigned lessons.
```

This note must NOT be part of the form.

Keep it in a single easily editable constant/configuration variable.

Example concept:

```ts
const DIARY_NOTE = "...";
```

The exact implementation is up to the coding agent.

---

# 16. Prepared By Section

At the bottom of the generated image:

```text
Prepared by: Mrs. Rahman
```

Use the value entered in the form.

The section should be subtle and elegant.

---

# 17. Image Dimensions

The generated image should preferably be portrait-oriented.

Use a high-resolution canvas suitable for:

* WhatsApp
* Messenger
* Facebook sharing
* Mobile gallery
* Basic printing

Do not make the image unnecessarily huge.

The generated output should remain sharp when viewed on a modern phone.

---

# 18. Image Export

Provide two buttons:

```text
Download PNG
Download JPG
```

PNG should preserve the highest visual quality.

JPG should provide a smaller, share-friendly file.

The exported image must contain:

* Background
* Decorations
* Title
* Date
* Day
* Class
* Table
* Note
* Prepared By

It must NOT contain:

* Form
* Buttons
* Browser UI
* Preview controls
* Download buttons

---

# 19. Image Generation Strategy

Use a reliable client-side image generation solution.

Possible technologies:

* `html-to-image`
* `html2canvas`
* `dom-to-image`
* Canvas API

Choose the solution that gives the best quality and reliability.

Prioritize:

1. Bengali rendering
2. Font support
3. High-resolution output
4. CSS compatibility
5. Background/decorations
6. Text wrapping
7. PNG/JPG export

If using a DOM-to-image approach, create a dedicated component specifically for the export design.

Do not export the entire application page.

---

# 20. Architecture

Keep the application clean and maintainable.

Recommended conceptual structure:

```text
src/
├── components/
│   ├── DiaryForm
│   ├── PeriodForm
│   ├── DiaryPreview
│   ├── DiaryCard
│   ├── DiaryTable
│   └── DownloadButtons
│
├── constants/
│   └── diary.ts
│
├── types/
│   └── diary.ts
│
├── utils/
│   ├── date.ts
│   └── imageExport.ts
│
└── App
```

The exact folder structure may be adjusted according to the existing project.

Do not introduce unnecessary abstractions.

---

# 21. State Management

This application does not require Redux or a backend.

Simple local React state is sufficient unless the existing project already has another state-management convention.

The form data should have a structure conceptually similar to:

```ts
{
  date: string;
  day: string;
  className: string;
  periods: [
    {
      period: "1st Period",
      subject: string;
      lessonDetails: string;
    },
    {
      period: "2nd Period",
      subject: string;
      lessonDetails: string;
    },
    {
      period: "3rd Period",
      subject: string;
      lessonDetails: string;
    }
  ];
  preparedBy: string;
}
```

Use an appropriate TypeScript type/interface.

---

# 22. Validation

Validate required fields before generating.

Required:

* Date
* Class
* Subject for Period 1
* Lesson Details for Period 1
* Subject for Period 2
* Lesson Details for Period 2
* Subject for Period 3
* Lesson Details for Period 3
* Prepared By

If Day is automatically calculated from Date, it does not need separate validation.

Show friendly validation messages.

Do not allow image generation with missing required information.

---

# 23. Date / Day Behavior

When the user selects a date:

```text
07/10/2026
```

automatically determine:

```text
Wednesday
```

Do not rely on the user manually entering the correct day.

Use the browser's date functionality or a lightweight date utility.

Make sure the displayed day is correct according to the selected date.

---

# 24. Responsive Design

The application must work well on:

* Desktop
* Tablet
* Mobile

The form should stack naturally on small screens.

The generated preview should remain readable.

On mobile:

```text
Form
↓
Generate Diary
↓
Preview
↓
Download buttons
```

Do not force a wide desktop layout on mobile.

---

# 25. Loading States

When generating the image:

* Disable download buttons temporarily
* Show a small loading indicator
* Prevent duplicate generation
* Wait until fonts/images/background assets are fully loaded

Example:

```text
Generating diary...
```

After completion:

```text
Diary Ready
```

Keep this simple.

---

# 26. Error Handling

Handle image generation failures gracefully.

If image generation fails:

```text
Unable to generate the diary image.
Please try again.
```

Do not leave the user with a broken or blank preview.

---

# 27. Accessibility

The form should follow basic accessibility practices:

* Proper labels
* Keyboard navigation
* Visible focus states
* Sufficient color contrast
* Accessible buttons
* Useful error messages
* Avoid relying only on color to communicate errors

---

# 28. Performance

Keep the application lightweight.

Avoid:

* Large unnecessary libraries
* Backend APIs
* Database
* Authentication
* Complex state management
* Unnecessary animations

Only use libraries when they materially improve the implementation.

---

# 29. Important Design Rule

Do NOT create a generic dashboard.

This is not an admin application.

The user should feel that they are using a small, delightful **digital school diary creator**.

The generated image is more important than the form UI.

Spend most of the design effort on making the generated diary image beautiful.

---

# 30. Suggested Color Direction

Use a soft, warm palette.

Possible direction:

* Soft pink
* Cream
* Light green
* Warm beige
* Muted floral tones

Do not use excessive bright colors.

The design should feel:

```text
soft
warm
friendly
clean
elegant
```

The exact colors can be selected by the implementation agent.

---

# 31. Decorative Background

The background should preferably use either:

* CSS-generated decorative elements
* SVG illustrations
* Lightweight local assets

Avoid relying on external image URLs that could fail during image generation.

If SVG/CSS decorations are used, ensure the chosen image-export library can correctly capture them.

---

# 32. Preview Design

The preview should show the exact design that will be downloaded.

Do not create one design for preview and another design for export.

Use a dedicated `DiaryCard` component as the source of truth.

Conceptually:

```text
Form Data
    ↓
DiaryCard
    ↓
Preview
    ↓
Image Export
```

This ensures the preview and downloaded image are identical.

---

# 33. Download Naming

Use a meaningful filename.

Example:

```text
class-diary-2026-10-07.png
```

and:

```text
class-diary-2026-10-07.jpg
```

If the class name is safe to use in a filename, it may optionally be included.

Example:

```text
class-diary-nursery-d-2026-10-07.png
```

Sanitize the filename before downloading.

---

# 34. No Backend Requirement

Do NOT create:

* API endpoints
* Database tables
* Authentication
* User accounts
* Server-side rendering for image generation

Everything should work locally in the browser.

---

# 35. Implementation Process

Before writing code:

1. Inspect the existing project structure.
2. Identify the existing framework and styling system.
3. Reuse the project's existing conventions.
4. Check installed dependencies.
5. Avoid installing duplicate libraries.
6. Implement the form.
7. Implement the diary design.
8. Implement preview.
9. Implement PNG/JPG export.
10. Test Bengali text.
11. Test long lesson details.
12. Test mobile layout.
13. Test download output.

Do not unnecessarily rewrite the existing project.

---

# 36. Acceptance Criteria

The implementation is complete only when all of the following work:

### Form

* [ ] User can select Date
* [ ] Day is correctly determined
* [ ] User can enter Class
* [ ] User can enter 3 subjects
* [ ] User can enter 3 lesson details
* [ ] User can enter Prepared By
* [ ] Required validation works

### Generated Diary

* [ ] Beautiful background
* [ ] Floral/botanical decorations
* [ ] CLASS DIARY title
* [ ] Date displayed
* [ ] Day displayed
* [ ] Class displayed
* [ ] Table contains exactly 3 columns
* [ ] Table contains exactly 3 data rows
* [ ] Period column works
* [ ] Subject column works
* [ ] Lesson Details column works
* [ ] Hard-coded note appears
* [ ] Prepared By appears

### Bengali

* [ ] Bengali text renders correctly
* [ ] Bengali text wraps correctly
* [ ] No broken glyphs
* [ ] No clipping

### Export

* [ ] Preview works
* [ ] PNG download works
* [ ] JPG download works
* [ ] Downloaded image matches preview
* [ ] No UI elements appear inside downloaded image
* [ ] Image is high quality

### UX

* [ ] Mobile responsive
* [ ] Desktop responsive
* [ ] Loading state works
* [ ] Error state works
* [ ] User can edit and regenerate
* [ ] No unnecessary features

---

# 37. Final Instruction to Coding Agent

Build this feature completely, not just as a mockup.

Do not stop after creating the form.

The final result must have:

```text
Form
+
Beautiful Diary Design
+
Live Preview
+
PNG Export
+
JPG Export
+
Bengali Text Support
+
Responsive UI
```

Prioritize the visual quality of the generated diary image.

The final generated image should feel like something a teacher would genuinely want to send to parents or students.

Before finishing, test the application with both English and Bengali lesson details, including long text, and make sure the exported PNG/JPG looks correct.
