export type Release = {
  id: number;
  basic_information: {
    title: string;
    year: number;
    thumb: string;
    cover_image: string;
    artists: [Artist];
    styles: string[];
  };
};

export type Artist = {
  name: string;
};
