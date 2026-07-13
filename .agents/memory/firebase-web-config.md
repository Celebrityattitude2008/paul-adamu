---
name: Firebase web config secrecy
description: Whether Firebase client SDK config values need secret handling
---
Firebase's client-side web config (apiKey, authDomain, projectId, storageBucket,
messagingSenderId, appId, measurementId) is meant to ship in the client bundle —
it is not a secret. Firebase's actual access control is enforced by Firestore/Storage
security rules and Authentication, not by hiding this config.

**Why:** Treating it as a secret (e.g. refusing to write it to env vars, or blocking
on `requestSecrets`) adds friction with no security benefit; the values are visible
in any deployed bundle regardless.

**How to apply:** Use `setEnvVars` (VITE_-prefixed for Vite apps) for these values
directly rather than routing through `requestSecrets`. Still put the *actual*
security boundary in Firestore/Storage rules (e.g. gate writes on
`request.auth.token.email == "<admin>"`).
