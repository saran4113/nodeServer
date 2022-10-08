import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {createContext, lazy, useState ,Suspense} from "react";
import {Routes, Route, Link,useNavigate ,Outlet} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import MainPage from "./component/pages/MainPage";
import data from "./data";
import axios from "axios";
import UseTransitionTest from "./component/pages/UseTransitionTest";
// import Cart from "./component/pages/Cart";
// import DetailPage from "./component/pages/DetailPage";
const DetailPage = lazy(()=>import('./component/pages/DetailPage'))
const Cart = lazy(()=>import('./component/pages/Cart'))

export let Context1 = createContext()

function App() {

  let watched = localStorage.getItem('watched')
  if(null==watched){
    localStorage.setItem('watched',`[]`)
  }

  let [count,setCount] = useState(1);
  let [stock,setStock] = useState([10,11,12]);

  let navigate = useNavigate();
  let [shoes,setShoes] = useState(data);
  let [loading,setLoading] = useState(false)

  let result = useQuery(['user'],()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    }),
      {staleTime : 2000}
  )


  return (

    <div className="App">

        <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand onClick={()=>{navigate('/')}} >Thekary</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>{navigate('/')}}>COMPANY</Nav.Link>
                    <Nav.Link onClick={()=>{navigate('/cart')}}>BRAND</Nav.Link>
                  <Nav.Link onClick={()=>{navigate('/input')}}>깔끔한마음</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                  {result.isLoading && '로딩중'}
                  {result.error && '에러'}
                  {result.data && result.data.name }
                </Nav>
            </Container>
        </Navbar>

        <button onClick={()=>{

            setLoading(true)
            axios.get(`https://codingapple1.github.io/shop/data${count+1}.json`).then((result)=>{
                let copy = [...shoes,...result.data]
                setShoes(copy)
                setCount(count+1)

            }).catch((e)=>{
                alert("없음")
                console.log(e)
            }).finally(()=>{
                setLoading(false)
            })

        }}>버튼</button>
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
            <Route path="/" element={loading?<div>로딩중</div>:<MainPage shoes = {shoes}></MainPage>}/>
            <Route path="/detail/:id" element={

                  <Context1.Provider value={{stock,shoes}}>
                  <DetailPage shoes={shoes}></DetailPage>
                  </Context1.Provider>

            }/>
            <Route path="/cart" element={
              <Cart></Cart>

            }/>
            <Route path="/input" element={
              <UseTransitionTest></UseTransitionTest>
            }/>

            <Route path="*" element={
                <div>404없는페이지</div>
            }/>

        </Routes>
      </Suspense>
    </div>
  );
}


export default App;
