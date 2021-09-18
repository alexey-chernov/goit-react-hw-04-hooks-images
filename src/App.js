import React, { useState, useEffect } from 'react';
import fetchImages from './services/apiServices';
import Container from './component/Container';
import Searchbar from './component/Searchbar';
import ImageGallery from './component/GalleryImage';
import Button from './component/Button';
import LoaderComponent from './component/Loader';
import Modal from './component/Modal';
import ErrorComponent from './component/Error';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import ScrollUp from './component/ScrollToUp';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchGallary = async () => {
      try {
        const request = await fetchImages(query, page);
        if (request.length === 0) {
          return setError(`Не знайдено результатів для ${query}!`);
        }
        setImages(prevImages => [...prevImages, ...request]);
      } catch (error) {
        setError('Щось пішло не так. Спробуйте ще раз. ');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallary();
  }, [page, query]);

  const renderImages = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
    scrollPage();
  };

  const onOpenModal = e => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    scroll.scrollToBottom();
  };

  return (
    <Container>
      <Searchbar onHandleSubmit={renderImages} />

      <ScrollUp />

      {error && <ErrorComponent texterror={error} />}

      {isLoading && <LoaderComponent />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {!isLoading && images.length > 0 && !error && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}

      <ToastContainer />
    </Container>
  );
}

export default App;
