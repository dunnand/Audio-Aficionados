========================================================
AUDIO AFICIONADOS — TEACHER GUIDE
A weekly album listening club website
========================================================

QUICK START
-----------
1. Open the "Audio-Aficionados" folder on your computer.
2. Double-click "index.html" to open the site in your web browser.
3. No internet connection is required to use the site itself.
   (Album artwork loads from iTunes when connected to the internet.)
4. No login, no server, and no installation is needed.


OPENING THE WEBSITE
-------------------
Simply open index.html in any modern web browser (Chrome, Edge, Firefox, or Safari).
The site works best in full-screen mode. Press F11 to toggle full screen.


HOW TO START AN ALBUM PRESENTATION
------------------------------------
1. The homepage shows all albums in the library as cards.
2. Find the album you are focusing on this week.
3. (Optional) Click "Review / Edit Before Class" first to check or adjust content.
4. Click "Start Listening Session" to launch the 14-slide presentation.
5. Use the Previous / Next buttons (or arrow keys) to move through the slides.


KEYBOARD SHORTCUTS
------------------
  Right Arrow   — Next slide
  Left Arrow    — Previous slide
  Home or Esc   — Return to Album Selector (homepage)
  R             — Restart the current album presentation


PROJECTOR MODE
--------------
1. In the presentation controls bar at the bottom, click "Projector Mode."
2. This hides all teacher controls, edit buttons, source notes, and dashboard tools.
3. Only the student-facing presentation remains, with clean navigation.
4. Click "Exit Projector" at any time to restore teacher controls.
5. Projector Mode is designed to be safe for classroom display.


TEACHER DASHBOARD
-----------------
The Teacher Dashboard appears at the top of the homepage.
It shows:
  - Current album
  - Next week's album
  - Albums needing teacher review
  - Albums with possible explicit content
  - Albums missing class scores
  - Completed and upcoming album counts
  - Export/Import buttons

Click the arrow next to "Teacher Dashboard" to expand or collapse it.


REVIEWING AN ALBUM BEFORE CLASS
---------------------------------
1. Click "Review / Edit Before Class" on any album card on the homepage.
   OR click the edit button in the presentation controls bar.
2. The Teacher Review screen lets you check every field before presenting.
3. Use the section headers to navigate: Album Basics, Content & Safety,
   Tracklist, Presentation Slides, Class Results, Next Week, and Teacher Notes.
4. Make any changes needed and click "Save Edits" at the top.


EDITING TRACK TITLES OR HIDING TRACKS
---------------------------------------
1. In Teacher Review mode, scroll to the "Tracklist" section.
2. Each track has a "Display Title" field — this is what students see.
   Change it to edit how a track name appears in the presentation.
3. Check "Hidden from student view" to hide any track from the student tracklist.
   Hidden tracks still appear in Teacher Mode with a dimmed indicator.
4. Mark any track as a "Single" to display a badge next to it.
5. Click "Save Edits" when done.


CLASSROOM SAFE MODE
--------------------
Classroom Safe Mode is ON by default.
When active:
  - iTunes will prefer censored album and track names where available.
  - Albums or tracks flagged by iTunes for explicit content will be
    marked "Needs Teacher Review."
  - You can manually edit any track title using the Display Title field.
  - You can hide any track from student view.
  - You can replace or disable album artwork.
  - You can mark an album as "Teacher Approved."

This system does NOT guarantee automatic filtering. Always review albums
before presenting. You have full manual control.

To toggle Safe Mode: use the toggle in the Teacher Dashboard or edit screen.


HIDING ALBUM ARTWORK
---------------------
1. In Teacher Review mode, go to "Content & Safety."
2. Uncheck "Show Artwork" to hide artwork throughout the presentation.
3. Enable "Use Text-Only Fallback" to show a styled text card instead of artwork.
4. Click "Save Edits."


UPDATING CLASS SCORES
----------------------
Option A — During the presentation:
  Navigate to Slide 12 (Vote & Score).
  Click a number from 1–10 to set the class score.
  Type a one-word reaction in the text field.
  The score saves automatically.

Option B — In Teacher Review mode:
  Go to the "Class Results" section.
  Enter the score and one-word reaction.
  Click "Save Edits."


QUICK EDIT THIS SLIDE
----------------------
While viewing a presentation in Teacher Mode, each slide has a
"Quick Edit This Slide" button. This opens only the fields
relevant to the current slide, so you can make fast adjustments
without opening the full edit form.
Examples:
  - On the Tracklist slide: edit track names, singles, hidden tracks,
    release date, and label.
  - On the Discussion slide: edit discussion questions.
  - On the Vote & Score slide: enter class score and one-word reaction.
  - On the Coming Next Week slide: edit the next-week and homework fields.


EXPORTING FULL YEAR DATA
-------------------------
IMPORTANT: Browser data can be lost if the browser cache is cleared.
Export your data regularly to back it up.

1. On the homepage, click "Export Full Year Data" in the Teacher Dashboard.
   OR find it in the Teacher Review screen for any album.
2. A JSON file will download to your computer.
3. Save this file somewhere safe (a USB drive, school folder, or cloud storage).
4. This file contains all teacher edits, class scores, and session notes.


IMPORTING SAVED DATA
---------------------
1. Click "Import Full Year Data" in the Teacher Dashboard.
2. Paste the contents of your exported JSON file, or upload the file.
3. This restores all your teacher edits and class scores.


ADDING FUTURE ALBUMS
---------------------
Open albumLibrary.js in a text editor (Notepad, VS Code, etc.).
Copy the structure of the existing Loveless entry and fill in the
details for the new album. Each album needs:
  - A unique id (example: "purple-rain")
  - A week number
  - All the required fields following the same format

If you are using an AI assistant to help build the site, you can ask it to:
  "Add a new album entry to albumLibrary.js for [Album Name] by [Artist],
  Week [N], following the same format as the existing entries."
  The AI should only edit albumLibrary.js, not the other files.


DIRECT ALBUM LINKS
-------------------
You can link directly to any album's presentation using the album ID in the URL:
  index.html#loveless       — opens the Loveless presentation
  index.html#purple-rain    — opens the Purple Rain presentation
  index.html#ok-computer    — opens the OK Computer presentation

If no hash is in the URL, the homepage / album selector loads instead.


FUTURE AI UPDATE RULES
-----------------------
When asking an AI assistant to update this site, instruct it to:
  1. Only edit albumLibrary.js to add or update album data.
  2. Do NOT redesign the website unless specifically asked.
  3. Do NOT overwrite teacher edits, class scores, or safety notes.
  4. Preserve all existing albums in the library.
  5. When adding a new album, use the complete album entry format.
  6. When updating a score, only change: status, classScore,
     oneWordReaction, and completedDate.
  7. Flag any conflicts in a teacher-facing note instead of silently replacing data.
  8. Keep the site static — no server, login, database, or build tool required.


LISTENING ARCHIVE
-----------------
The Archive shows all albums that have a class score recorded.
Access it from the Teacher Dashboard or from the final slide of any presentation.


FILE STRUCTURE
--------------
  index.html       — Main website file (open this in a browser)
  styles.css       — All visual design and layout
  script.js        — All interactive features and presentation logic
  albumLibrary.js  — Album library data (edit this to add albums)
  README.txt       — This guide


TROUBLESHOOTING
---------------
Artwork not loading?
  - Check your internet connection. iTunes artwork requires internet access.
  - The site still works offline — artwork will show a text fallback card.

Changes not saving?
  - Make sure you click "Save Edits" after making changes in edit mode.
  - Changes are stored in your browser. Do not clear browser data without
    first exporting your full year data to a JSON backup file.

Site looks wrong?
  - Make sure all four files (index.html, styles.css, script.js,
    albumLibrary.js) are in the same folder.
  - Try refreshing the browser (F5 or Ctrl+R).

Keyboard shortcuts not working?
  - Click anywhere on the slide first to make sure the page is focused.


========================================================
Audio Aficionados — A weekly album listening club
========================================================
