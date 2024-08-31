import Backlog from "../components/MovieList";
import InProgress from "../components/AddReview";
import Completed from "../components/ReviewList";

const Home = () => {

    return(
        <div>
            <Backlog />
            <InProgress />
            <Completed />
        </div>
    )
}

export default Home;