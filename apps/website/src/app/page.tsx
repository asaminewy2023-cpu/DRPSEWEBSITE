import HeroBanner from "../components/HeroBanner";
import Statistics from "../components/Statistics";
import WelcomeMessage from "../components/WelcomeMessage";
import Initiatives from "../components/Initiatives";
import QuickServices from "../components/QuickServices";
import StrategicPriorities from "../components/StrategicPriorities";
import FeaturedProjects from "../components/FeaturedProjects";
import LatestNews from "../components/LatestNews";
import UpcomingEvents from "../components/UpcomingEvents";
import LatestPublications from "../components/LatestPublications";
import PhotoGallery from "../components/PhotoGallery";
import VideoGallery from "../components/VideoGallery";
import Clusters from "../components/Clusters";
import Partners from "../components/Partners";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Statistics />
      <WelcomeMessage />
      <Initiatives />
      <QuickServices />
      <StrategicPriorities />
      <FeaturedProjects />
      <LatestNews />
      <UpcomingEvents />
      <LatestPublications />
      <PhotoGallery />
      <VideoGallery />
      <Clusters />
      <Partners />
    </>
  );
}
