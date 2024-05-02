const EmbedVideo = () => {
  return (
    <div className="absolute top-[25%] left-[25%] right-[25%] z-40">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/cen0rBKLuYE?si=Bfne3rn2JP8dRmC-"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default EmbedVideo;
