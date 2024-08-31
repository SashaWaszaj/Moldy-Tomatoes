import './App.css';
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import MovieForm from './components/MovieForm';
import {useState} from "react";
import MovieList from "./components/MovieList";
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';

function App() {
  const [movieList, setMovieList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const updateMovieList = (newMovie) => {
    setMovieList([...movieList, newMovie]);
  };

  const updateReviewList = (newReview) => {
    setReviewList([...reviewList, newReview]);
  }

  const deleteMovieFromList = (_id) => {
    const tempList = [...movieList];
    for(let i = 0; i < tempList.length; i ++){
      if(tempList[i]._id == _id){
        tempList.splice(i, 1);
      }
    }
    setMovieList(tempList);
  }
  
  return ( 
    <BrowserRouter>
    <div className="App" >
      <header style={{ display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems:"center", margin:"5px 100px" }}>
        <div><h1 style={{ fontSize:"50px" }}>Moldy Tomatos</h1> </div>
        <div><button style={{ cursor:"pointer", border: "1px solid", padding: "8px", backgroundColor:"#d53c2a", color:"white", borderRadius:"10px" }}>Logout</button></div>
      </header>
      <main>
        <Routes>
          <Route path="/movie/form" element={<MovieForm updateMovieList={updateMovieList} />} />
          <Route path="/" element={<MovieList updateMovieList={updateMovieList} deleteMovieFromList={deleteMovieFromList}/>} />
          <Route path="/movie/reviews/:_id" element={<ReviewList updateReviewList={updateReviewList} deleteMovieFromList={deleteMovieFromList}/>}/>
          <Route path="/review/form/:_id" element={<ReviewForm updateReviewList={updateReviewList} />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
  );
}

export default App;
