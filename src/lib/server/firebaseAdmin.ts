type Firestore = {
  collection: (collectionPath: string) => {
    doc: (id: string) => {
      get: () => Promise<{ exists: () => boolean; id: string; data: () => unknown }>;
      set: (data: Record<string, unknown>, options: { merge: boolean }) => Promise<void>;
      update: (data: Record<string, unknown>) => Promise<void>;
    };
    where: (
      fieldPath: string,
      opStr: FirebaseFirestoreWhereFilterOp,
      value: string
    ) => {
      orderBy: (fieldPath: string, directionStr: "asc" | "desc") => {
        get: () => Promise<{ docs: Array<{ id: string; data: () => unknown }> }>;
      };
    };
    orderBy: (fieldPath: string, directionStr: "asc" | "desc") => {
      get: () => Promise<{ docs: Array<{ id: string; data: () => unknown }> }>;
    };
  };
};

type FirebaseAdminAppModule = {
  applicationDefault: () => unknown;
  getApps: () => unknown[];
  initializeApp: (options: { credential: unknown }) => unknown;
};

type FirebaseAdminFirestoreModule = {
  getFirestore: (app?: unknown) => Firestore;
  FieldValue: {
    serverTimestamp: () => unknown;
  };
};

type FirebaseFirestoreWhereFilterOp = "==" | "<" | "<=" | ">" | ">=" | "array-contains";

const requireFirebaseAdminModule = <ModuleType>(modulePath: string): ModuleType => {
  const requireFn = eval("require") as NodeJS.Require;
  return requireFn(modulePath) as ModuleType;
};

let adminDb: Firestore | null = null;

const getAdminApp = () => {
  const { applicationDefault, getApps, initializeApp } =
    requireFirebaseAdminModule<FirebaseAdminAppModule>("firebase-admin/app");
  if (getApps().length) {
    return getApps()[0];
  }
  return initializeApp({
    credential: applicationDefault(),
  });
};

export const getAdminDb = (): Firestore => {
  if (!adminDb) {
    const { getFirestore } =
      requireFirebaseAdminModule<FirebaseAdminFirestoreModule>("firebase-admin/firestore");
    adminDb = getFirestore(getAdminApp());
  }
  return adminDb;
};

export const serverTimestamp = (): unknown => {
  const { FieldValue } =
    requireFirebaseAdminModule<FirebaseAdminFirestoreModule>("firebase-admin/firestore");
  return FieldValue.serverTimestamp();
};
