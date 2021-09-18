import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '21693934-b739dad2632fdbf7884e4d0a2',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const fetchImages = async (query, page) => {
  try {
    const { data } = await axios.get('', {
      params: {
        q: query,
        page,
      },
    });
    return data.hits;
  } catch (error) {
    console.log('error', error);
    return [];
  }
};

export default fetchImages;
