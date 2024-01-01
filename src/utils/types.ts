// Type to remove the id, createdAt, and updatedAt fields from an object
export type New<T extends object> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
