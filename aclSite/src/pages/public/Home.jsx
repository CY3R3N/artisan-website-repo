import React from "react";
import Hero from "../../components/public/Hero";
import Carousel from "../../components/public/Carousel";
import Ourproduct from "../../components/public/Ourproduct";

import SL1 from "../../assets/images/products/sl-1.png";
import SL2 from "../../assets/images/products/sl-2.png";
import SL3 from "../../assets/images/products/sl-3.png";
import SL4 from "../../assets/images/products/sl-4.png";
import SL5 from "../../assets/images/products/sl-5.png";
import Profile from "../../components/public/Profile";
import Newsevent from "../../components/public/Newsevent";
import Upcommingevent from "../../components/public/Upcommingevent";

function Home() {
  const photos = [SL1, SL2, SL3, SL4, SL5];

  return (
    <>
      <Hero />

      <Carousel items={photos} />

      <Ourproduct />

      <Profile />

      <Upcommingevent />

      <Newsevent />
    </>
  );
}

export default Home;
