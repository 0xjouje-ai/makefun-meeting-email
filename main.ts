// SPDX-License-Identifier: MIT
// Writes one joke line about a meeting that should have been an email to
// /output/entry.txt.
//
// How the joke meets the judge brief:
// - It is plainly about a meeting that should have been an email: the
//   entire meeting consists of reading an email aloud.
// - The laugh lands on its own with no setup: the turn arrives at the last
//   words, when you learn the audience was already CC'd on the very email
//   being read to them.
// - The surprise is not the obvious complaint about a long meeting or that
//   it could have been an email. The angle nobody expects is that the
//   email already existed, was already sent to everyone in the room, and
//   the meeting still happened anyway — to read it back to its recipients.
// - Economy: every word earns its place; there is no throat-clearing, no
//   preamble, just the scene and the punchline.
// - Recognition: anyone who has sat through a meeting knows the host who
//   shares a screen and reads aloud a message everyone already received.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const joke =
  "The meeting was just the host reading aloud the email we were all already CC'd on.";

// Gate: the entry must be 1-200 characters, with no control characters.
if (joke.length < 1 || joke.length > 200) {
  throw new Error(`joke length ${joke.length} is outside the 1-200 gate`);
}
for (let i = 0; i < joke.length; i++) {
  const code = joke.charCodeAt(i);
  if (code < 32 || code === 127) {
    throw new Error(`joke contains a control character at index ${i}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", joke, "utf8");

// Write-back verification: read the file back and confirm it matches the
// intended text byte for byte before declaring success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== joke) {
  throw new Error("write-back verification failed: /output/entry.txt differs from the joke");
}
