export type Complete<T> = {
  [P in keyof Required<
    Omit<
      T,
      | 'id'
      | 'createdAt'
      | 'deletedAt'
      | 'deleterId'
      | 'creatorId'
      | 'editedAt'
      | 'editorId'
    >
  >]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};

export type CompleteToUpdate<T> = {
  [P in keyof Partial<
    Omit<
      T,
      | 'id'
      | 'createdAt'
      | 'deletedAt'
      | 'deleterId'
      | 'creatorId'
      | 'editedAt'
      | 'editorId'
    >
  >]: Pick<T, P> extends Partial<Pick<T, P>> ? T[P] : T[P] | undefined;
} & { id: string };
