// src/utils/storageUtils.js
import { openDB } from "idb"; // npm install idb

const DB_NAME = "check-list-plans-db";
const FILE_STORE = "pdf-files";
const DB_VERSION = 1;

const STORAGE_KEY_FILE_MAP = "check-list-plans-file-map";
const STORAGE_KEY_PLAN_LIST = "check-list-plans-plan-list";
const STORAGE_KEY_SELECTED_PLAN = "check-list-plans-selected-plan";
const STORAGE_KEY_PLANS_DATA = "check-list-plans-data";

// Open the database
async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        db.createObjectStore(FILE_STORE, { keyPath: "name" });
      }
    },
  });
}

// Store a PDF file
export async function storeFile(fileName, fileObj) {
  const db = await getDb();
  return db.put(FILE_STORE, {
    name: fileName,
    file: fileObj,
    timestamp: Date.now(),
  });
}

// Get all stored files
export async function getAllFiles() {
  const db = await getDb();
  return db.getAll(FILE_STORE);
}

// Get a specific file
export async function getFile(fileName) {
  const db = await getDb();
  return db.get(FILE_STORE, fileName);
}

// Check if a file exists
export async function fileExists(fileName) {
  const db = await getDb();
  const key = await db.getKey(FILE_STORE, fileName);
  return key !== undefined;
}

// Save file map to localStorage
export function saveFileMap(fileMap) {
  try {
    // Convert File objects to base64 strings
    const serializable = {};

    Object.entries(fileMap).forEach(([planName, fileData]) => {
      serializable[planName] = {
        name: fileData.name,
        url: fileData.url, // URLs aren't persisted, we'll regenerate them
        lastModified: fileData.file?.lastModified,
        size: fileData.file?.size,
        type: fileData.file?.type,
        // Store the actual file content as base64
        data: fileData.dataUrl || null,
      };
    });

    localStorage.setItem(STORAGE_KEY_FILE_MAP, JSON.stringify(serializable));
    return true;
  } catch (error) {
    console.error("Failed to save files to localStorage:", error);
    return false;
  }
}

// Load file map from localStorage
export function loadFileMap() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_FILE_MAP);
    if (!stored) return {};

    const parsed = JSON.parse(stored);
    const result = {};

    // Reconstruct file objects from stored data
    Object.entries(parsed).forEach(([planName, fileData]) => {
      if (fileData.data) {
        // Create a blob from the base64 data
        const byteString = atob(fileData.data.split(",")[1]);
        const mimeString = fileData.data
          .split(",")[0]
          .split(":")[1]
          .split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], fileData.name, {
          type: fileData.type,
          lastModified: fileData.lastModified,
        });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        result[planName] = {
          name: fileData.name,
          url,
          file,
          dataUrl: fileData.data,
        };
      }
    });

    return result;
  } catch (error) {
    console.error("Failed to load files from localStorage:", error);
    return {};
  }
}

// Save plan list
export function savePlanList(planList) {
  try {
    localStorage.setItem(STORAGE_KEY_PLAN_LIST, JSON.stringify(planList));
    return true;
  } catch (error) {
    console.error("Failed to save plan list:", error);
    return false;
  }
}

// Load plan list
export function loadPlanList() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PLAN_LIST);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load plan list:", error);
    return [];
  }
}

// Save selected plan
export function saveSelectedPlan(plan) {
  localStorage.setItem(STORAGE_KEY_SELECTED_PLAN, plan || "");
}

// Load selected plan
export function loadSelectedPlan() {
  return localStorage.getItem(STORAGE_KEY_SELECTED_PLAN) || null;
}

// Save plans data
export function savePlansData(plansData) {
  try {
    localStorage.setItem(STORAGE_KEY_PLANS_DATA, JSON.stringify(plansData));
    return true;
  } catch (error) {
    console.error("Failed to save plans data:", error);
    return false;
  }
}

// Load plans data
export function loadPlansData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PLANS_DATA);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to load plans data:", error);
    return {};
  }
}

// Check storage availability and size
export function checkStorage() {
  try {
    const testKey = "storage-test";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);

    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      totalSize += (key.length + value.length) * 2; // UTF-16 uses 2 bytes per char
    }

    const sizeInMB = totalSize / (1024 * 1024);
    const remainingInMB = 5 - sizeInMB; // Assuming ~5MB limit

    return {
      available: true,
      totalSize: sizeInMB.toFixed(2) + " MB",
      remaining: remainingInMB.toFixed(2) + " MB",
      isFull: remainingInMB < 0.5, // Warning if less than 0.5MB remains
    };
  } catch (e) {
    return { available: false, error: e.message };
  }
}

// Clear all stored data
export function clearAllStoredData() {
  localStorage.removeItem(STORAGE_KEY_FILE_MAP);
  localStorage.removeItem(STORAGE_KEY_PLAN_LIST);
  localStorage.removeItem(STORAGE_KEY_SELECTED_PLAN);
  localStorage.removeItem(STORAGE_KEY_PLANS_DATA);
}

// Clear all browser storage
export function clearAllStorage() {
  try {
    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    console.log("All browser storage cleared");
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
}

// Clear IndexedDB
export async function clearIndexedDB() {
  try {
    const DBs = await window.indexedDB.databases();
    DBs.forEach((db) => {
      window.indexedDB.deleteDatabase(db.name);
    });
    console.log("IndexedDB cleared");
    return true;
  } catch (error) {
    console.error("Error clearing IndexedDB:", error);
    return false;
  }
}
