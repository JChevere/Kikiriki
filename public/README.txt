KIKIRIKÍ: OFFLINE WEB APP
=========================

This folder is the whole app. Put it online once, then add it to your phone's
home screen. After that it opens full screen and works with no signal.

Files
-----
  index.html             The app
  manifest.webmanifest   Name, colors and icons for the home-screen install
  sw.js                  Offline helper (saves the app on the phone)
  icon-*.png             App icons
  apple-touch-icon.png   iPhone home-screen icon

The site must use https:// for offline mode to work. All the free hosts below
use https automatically.


STEP 1: PUT IT ONLINE (pick one, all free)
------------------------------------------

A) Netlify Drop (easiest, about 1 minute)
   1. On a computer, go to  app.netlify.com/drop
   2. Drag this whole folder onto the page.
   3. You get a link like  https://something.netlify.app
      Create a free account so the site doesn't expire, and rename it
      under Site settings, for example kikiriki-jorge.netlify.app

B) GitHub Pages
   1. Create a repository and upload these files to it.
   2. Go to Settings > Pages > Deploy from branch > main > / (root).
   3. Your link will be  https://YOURNAME.github.io/REPO/

C) Cloudflare Pages
   Go to Workers & Pages > Create > Pages > Upload assets, then drop the folder.


STEP 2: INSTALL IT ON YOUR PHONE
--------------------------------

iPhone / iPad (must use Safari):
   1. Open your link in Safari.
   2. Tap Share (the square with the arrow).
   3. Tap "Add to Home Screen", then "Add".

Android (Chrome):
   1. Open your link.
   2. Tap "Install app" in More > Settings inside Kikirikí, or use
      Chrome's menu > "Install app".

Open it once while you're online. After that it works offline.


MOVING YOUR EXISTING DATA
-------------------------
On iPhone, the home-screen app has its own storage. It does NOT share data
with Safari or with the copy inside Claude.

   1. In the old copy, go to More > Settings > Download backup.
   2. In the installed app, go to More > Settings > Restore from file,
      and pick that backup.

Keep saving a backup now and then. Your data lives only on that phone.


REMINDERS
---------
In the installed app, go to More > Reminders and tap "Add to my calendar".
Your phone's Calendar app then reminds you about the daily coop check,
chores, and the day a treatment's egg withdrawal or a quarantine ends,
even when Kikirikí is closed and offline. On iPhone, tap "Add All".
If you change chores later, add them again (you may need to delete the
old Kikirikí events first so they don't show up twice).

UPDATING THE APP LATER
----------------------
   1. Replace index.html with the new one.
   2. In sw.js, change the VERSION line, for example
      "kikiriki-2026-11-22a" becomes "kikiriki-2026-12-01a".
   3. Upload the folder again (on Netlify: Deploys > drag the folder).

The next time the app opens online, it shows "New version ready" with an
Update button. Your data is kept.
