export const ADD_PHOTO = "ADD_PHOTO";
export const REMOVE_PHOTO = "REMOVE_PHOTO";
export const FETCH_PHOTOS = "FETCH_PHOTOS";
export const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    payload: photo,
  };
};

export const removePhoto = (photo) => {
  return {
    type: REMOVE_PHOTO,
    payload: photo,
  };
};

export const fetchPhotos = () => {
  return {
    type: FETCH_PHOTOS,
    payload: [
      {
        albumId: 1,
        title: "First Picture (Dog)",
        url: "https://picsum.photos/id/237/200/300",
        thumbnailUrl: "https://picsum.photos/id/237/200/300",
        id: 1,
      },
    ],
  };
};
