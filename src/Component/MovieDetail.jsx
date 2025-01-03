import React, { useEffect, useState } from "react";
// Import libraries for smooth scrolling and infinite scroll
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme
import "slick-carousel/slick/slick.css"; // Import slick-carousel styles

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/film/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleDownload = async (downloadHref, downloadId) => {
    setProcessingId(downloadId);

    if (downloadHref.startsWith("https://instant")) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/test?url=${encodeURIComponent(downloadHref)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the original URL");
        }
        const data = await response.json();
        if (data.redirectedUrl) {
          window.open(data.redirectedUrl, "_blank");
        } else {
          toast.error("Failed to redirect. Try again.");
        }
      } catch (error) {
        console.error("Error processing download link:", error);
        toast.error("Failed to process download. Try again.");
      } finally {
        setProcessingId(null);
      }
    } else {
      window.open(downloadHref, "_blank");
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 h-screen w-screen flex items-center justify-center">
        <ClipLoader size={100} loading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center h-screen w-screen  mt-10 text-red-600">
        <p>Error loading movie details: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center mt-10 text-gray-600">
        <p>No movie data available</p>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 1500,
    swipeToSlide: true,
    arrows: false,
    pauseOnHover: false,
    cssEase: "linear",
    focusOnSelect: true,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        {movie.filmTitle}
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Preview Images
      </h2>
      <Slider {...settings} className="mb-6">
        {movie.imageData.map((image, index) => (
          <div
            key={index}
            className="px-2 mb-4 w-full sm:w-[80vmax] md:w-[60vmax] lg:w-[50vmax]"
          >
            <div className="pb-[56.25%] relative">
              <img
                src={image}
                alt={`Movie Preview ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        ))}
      </Slider>
      <div className=" mb-6">
        <p className="text-gray-700 mt-2">
          <strong>Directed By:</strong> {movie.directedBy || "Unknown"}
        </p>
        <p className="text-gray-700">
          <strong>IMDB Rating:</strong> {movie.imdbRating || "N/A"}
        </p>
      </div>
      <div className="storydiv mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Storyline</h2>
        <p
          className="text-gray-700 mt-4"
          dangerouslySetInnerHTML={{
            __html: movie.description || "No description available.",
          }}
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Download Options
      </h2>
      <div className="space-y-4">
        {movie.downloadData.map((download) => (
          <div
            key={download._id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-md"
          >
            <span className="text-gray-800">{download.title}</span>
            <button
              onClick={() =>
                handleDownload(
                  download.downloadHref || download.finalLink,
                  download._id
                )
              }
              className="text-blue-600 hover:text-blue-800 flex items-center"
              disabled={processingId === download._id}
            >
              {processingId === download._id ? (
                <ClipLoader size={20} loading={true} />
              ) : (
                "Download"
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
