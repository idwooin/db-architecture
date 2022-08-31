import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import Seo from "../components/Seo";
import { useRouter } from "next/router";
export default function Home() {

  const router = useRouter();
  
  return (
    <div className="mx-96 mt-8">
      <Seo title="Nice To UOS25"/>
      <main>
        <article className="">
        <Carousel>
          <div>
            <img src="event/event1.jpg" alt="" />
          </div>
          <div>
            <img src="event/event2.jpg" alt="" />
          </div>
          <div>
            <img src="event/event3.jpg" alt="" />
          </div>
          <div>
            <img src="event/event4.jpg" alt="" />
          </div>
          <div>
            <img src="event/event5.jpg" alt="" />
          </div>
        </Carousel>
        </article>
      </main>
    </div>
  )
}
