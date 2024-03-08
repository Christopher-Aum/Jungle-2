import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItems } from "../../redux/item";
import MiniatureSingleItem from "../MiniatureSingleItem/MiniatureSingleItem";
import './Splash.css'

function HomePage(){
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)
    console.log('Item selector', items)
    // console.log('Item values', Object.values(items))
    // const item_val = Object.values(items)
    // console.log('Item Val', item_val[0])
    useEffect(()=> {
        dispatch(thunkGetItems())
    }, [])

    function HomePageItems(){
        const res = []
        for (let item of Object.values(items)){
            res.push([item])
        }
        console.log('result array', res)
        return res;
    }

    if (!items) return 'Loading...'
    return (
        <>
        <div className="Item-Containers">

        <h2>Computers</h2>
        <div className="Computer-Items">
        { HomePageItems().map((el) => {
            if (el[0].type === 'Computers'){return <MiniatureSingleItem key={el[0].id} item={el[0]} />}
        })}
        </div>
        </div>
        <div className="Item-Containers">

        <h2>Electronics</h2>
        <div className="Computer-Items">
        { HomePageItems().map((el) => {
            if (el[0].type === 'Electronics'){return <MiniatureSingleItem key={el[0].id} item={el[0]} />}
        })}
        </div>
        </div>
        <div className="Item-Containers">

        <h2>Gaming</h2>
        <div className="Computer-Items">
        { HomePageItems().map((el) => {
            if (el[0].type === 'Gaming'){return <MiniatureSingleItem key={el[0].id} item={el[0]} />}
        })}
        </div>
        </div>
        <div className="Item-Containers">

        <h2>Music</h2>
        <div className="Computer-Items">
        { HomePageItems().map((el) => {
            if (el[0].type === 'Music'){return <MiniatureSingleItem key={el[0].id} item={el[0]} />}
        })}
        </div>
        </div>
        <div className="Item-Containers">
        <h2>Home</h2>
        <div className="Computer-Items">
        { HomePageItems().map((el) => {
            if (el[0].type === 'Home'){return <MiniatureSingleItem key={el[0].id} item={el[0]} />}
        })}
        </div>
        </div>

        </>
    )
}

export default HomePage
