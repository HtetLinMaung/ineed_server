export interface ITag {
  color: string;
  title: string;
}

export interface INeedCreate {
  header: string;
  body: string;
  tags: [ITag];
  user: string;
}
