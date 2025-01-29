import './App.css';
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import MovieForm from './components/MovieForm';
import {useState} from "react";
import MovieList from "./components/MovieList";
import ReviewForm from './components/ReviewForm';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
import SignUp from './components/Signup';
import SearchResults from './components/SearchResults';
import About from './components/About';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  
  return ( 
    <BrowserRouter>
    <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/form" element={<MovieForm />} />
          <Route path="/movies" element={<MovieList/>} />
          <Route path="/review/form/:movie_id" element={<ReviewForm />} />
          <Route path="/movie/:_id" element={<MovieDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/search-results" element={<SearchResults/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
        <Footer></Footer>
  </BrowserRouter>
  );
}

export default App;
