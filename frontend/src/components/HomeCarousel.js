import { Carousel, Image } from "react-bootstrap";

const HomeCarousel = () => {
  let imgs = [
    {
      id: 1,
      image: "/images/head2.jpg",
      title: "Best Platform to learn and Grow",
    },
    {
      id: 2,
      image: "/images/col2.png",
      title: "Join Today to meet our Experts",
    },
    {
      id: 3,
      image: "/images/head2.jpg",
      title: "You can take help in your assignments",
    },
  ];

  return (
    <Carousel
      fade
      pause="true"
      className="bg-dark mt-4"
      style={{ height: "58vh" }}
    >
      {imgs.map((img) => (
        <Carousel.Item key={img.id}>
          <Image
            src={img.image}
            alt="Carousel-Image"
            style={{
              width: "85%",
              height: "48vh",
              borderRadius: "0",
              objectFit: "cover",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <Carousel.Caption className="carousel-caption">
            <h2>{img.title}</h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
