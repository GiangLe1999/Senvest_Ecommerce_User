import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import { FC } from "react";

interface Props {
  videos?: string[];
  images: string[];
}

const captureThumbnail = (videoSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";

    video.addEventListener("loadeddata", () => {
      // Set the time to capture the frame (e.g., 1 second)
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const thumbnail = canvas.toDataURL("image/jpeg");
      resolve(thumbnail);
    });

    video.addEventListener("error", (err) => {
      reject(err);
    });
  });
};

const ProductImagesGallery: FC<Props> = ({
  videos = [],
  images,
}): JSX.Element => {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    if (videos.length > 0) {
      const generateThumbnails = async () => {
        const thumbPromises = videos.map((videoSrc) =>
          captureThumbnail(videoSrc)
        );
        const thumbs = await Promise.all(thumbPromises);
        setThumbnails(thumbs);
      };

      generateThumbnails();
    }
  }, [videos]);

  const RenderVideos = videos.map((video, index) => (
    <div key={video} className="w-full h-full">
      <video
        controls
        className="rounded-sm no-select h-full w-auto mx-auto"
        poster={thumbnails[index]}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ));

  const RenderImages = images.map((image, index) => (
    <Image
      key={image}
      src={image}
      alt={`${image} preview`}
      priority={index === 0 && thumbnails.length === 0}
      fill
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
      className="rounded-sm !border no-select"
    />
  ));

  const RenderElements = [...RenderVideos, ...RenderImages];

  return (
    <div>
      <Carousel
        emulateTouch
        infiniteLoop
        showIndicators={false}
        showArrows={false}
        renderThumbs={() => {
          const renderedVideos = thumbnails.map((thumb, index) => (
            <>
              <Image
                src={thumb}
                alt={`Video thumbnail ${index + 1}`}
                priority={index === 0 && thumbnails.length === 0}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />

              <Image
                src="/icons/play.svg"
                width={35}
                height={35}
                alt="Play icon"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-[35px]"
              />
            </>
          ));

          const renderedImages = images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={`${image} preview`}
              priority={
                renderedVideos.length === 0 &&
                index === 0 &&
                thumbnails.length === 0
              }
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          ));

          return [...renderedVideos, ...renderedImages];
        }}
        className="product-images-gallery"
      >
        {RenderElements}
      </Carousel>
    </div>
  );
};

export default ProductImagesGallery;
