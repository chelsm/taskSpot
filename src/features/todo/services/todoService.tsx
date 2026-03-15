import type { TodoList, Task } from "../../../types/todo";
import { db, auth } from "../../../services/firebase";
import {
  doc,
  query,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  where,
  updateDoc,
  getDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

// --------------
// GET INFO
// --------------

export const getUserLists = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const listsRef = collection(db, "lists");

  const q = query(
    listsRef, 
    where("ownerId", "==", user.uid), 
    orderBy("modifiedAt", "desc")
  );
  // const q = query(listsRef, where("ownerId", "==", user.uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
    };
  }) as TodoList[];
};

export const getListById = async (listId: string) => {
  const listRef = doc(db, "lists", listId);
  const docSnap = await getDoc(listRef);
  if (docSnap.exists()) {
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
    } as TodoList;
  }
  throw new Error("List not found");
};

export const getTasksByListId = async (listId: string) => {
  const tasksRef = collection(db, "lists", listId, "tasks");
  const querySnapshot = await getDocs(tasksRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Task[];
};

// --------------
// CREATE INFO
// --------------

export const createList = async (title: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const now = new Date();
  const docRef = await addDoc(collection(db, "lists"), {
    title,
    ownerId: user.uid,
    users: [user.uid],
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp(),
  });
  return {
    id: docRef.id,
    title,
    ownerId: user.uid,
    users: [user.uid],
    createdAt: now,
    modifiedAt: now,
  };
};

export const createTask = async (listId: string, description: string) => {
  const now = new Date();
  const tasksRef = await addDoc(collection(db, "lists", listId, "tasks"), {
    description,
    completed: false,
    createdAt: now,
    modifiedAt: now,
  });
  return tasksRef;
};

// --------------
// UPDATE INFO
// --------------

export const updateTaskStatus = async (
  listId: string,
  taskId: string,
  completed: boolean,
) => {
  const now = new Date();
  const taskRef = doc(db, "lists", listId, "tasks", taskId);
  const listRef = doc(db, "lists", listId);

  await updateDoc(taskRef, {
    completed,
    modifiedAt: now,
  });
    await updateDoc(listRef, {
    modifiedAt: now,
  });
};

export const updateTaskDescription = async (
  listId: string,
  taskId: string,
  description: string,
) => {
  const now = new Date();
  const taskRef = doc(db, "lists", listId, "tasks", taskId);
  const listRef = doc(db, "lists", listId);

  await updateDoc(taskRef, {
    description,
    modifiedAt: now,
  });
  await updateDoc(listRef, {
    modifiedAt: now,
  });
};

export const updateListTitle = async (listId: string, title: string) => {
  const now = new Date();
  const listRef = doc(db, "lists", listId);
  await updateDoc(listRef, {
    title,
    modifiedAt: now,
  });
};


// --------------
// REMOVE INFO
// --------------

export const deleteTask = async (listId: string, taskId: string) => {
  const taskRef = doc(db, "lists", listId, "tasks", taskId);
  await deleteDoc(taskRef);
};

export const deleteList = async (listId: string) => {
  const tasksRef = collection(db, "lists", listId, "tasks");
  const querySnapshot = await getDocs(tasksRef);
  const deleteTasksPromises = querySnapshot.docs.map((doc) =>
    deleteDoc(doc.ref),
  );
  await Promise.all(deleteTasksPromises);
  const listRef = doc(db, "lists", listId);
  await deleteDoc(listRef);
};
