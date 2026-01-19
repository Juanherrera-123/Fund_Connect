/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

admin.initializeApp();

export const setManagerPendingClaims = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  const uid = typeof request.data?.uid === "string" ? request.data.uid : "";
  if (!uid) {
    throw new HttpsError("invalid-argument", "A valid uid is required.");
  }

  if (request.auth.uid !== uid) {
    throw new HttpsError("permission-denied", "Users can only set their own claims.");
  }

  await admin.auth().setCustomUserClaims(uid, {
    role: "manager",
    status: "pending",
  });

  return {ok: true};
});

export const setManagerActiveClaims = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication required.");
  }

  const role = typeof request.auth.token?.role === "string" ? request.auth.token.role : "";
  const status =
    typeof request.auth.token?.status === "string" ? request.auth.token.status.toLowerCase() : "";
  const hasAccess = role === "master" && (status === "active" || status === "approved");

  if (!hasAccess) {
    throw new HttpsError("permission-denied", "Only active masters can approve managers.");
  }

  const uid = typeof request.data?.uid === "string" ? request.data.uid : "";
  if (!uid) {
    throw new HttpsError("invalid-argument", "A valid uid is required.");
  }

  await admin.auth().setCustomUserClaims(uid, {
    role: "manager",
    status: "active",
  });

  return {ok: true};
});

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
