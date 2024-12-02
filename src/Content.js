import React from "react";
import ItemsList from "./ItemsList";

const Content = ({items, handleCheck, handleDelete}) => {

  return (
    <>
      {(items.length)?(
        <ItemsList
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete} />
       ): (<p style={{marginTop:'2rem'}} > Your list is empty </p>)}  
    </>
  )
}

export default Content;


//       const [count, setCount] = useState(99)
//       //const [name, setName] = useState();

//       function decrementFun(){
//         setCount(prevCount => prevCount -1)
//         // setCount((count)=> {return count+1})
//         // setCount((count)=> {return count+1})
//         // setCount((count)=> {return count+1})
        
//       }
//       function incrementFun(){
//         setCount(prevCount => prevCount +1)
//         // setCount(count + 3)
//         // setCount(count + 4)
//       }
//       return (
//         <main>
//           <p>Let's {handlenamechange()} Money</p>
//           <button>Hii to All</button>
//           <button onClick={incrementFun}>+</button>
//           <span>{count}</span>
//           <button onClick={decrementFun}>-</button>
//         </main>
//       );

// changing the text repeatly

    // const [name, setName] = useState('Earn');

    // function handlenamechange(){
    //     const names=['Earn', 'Grow', 'Give'];
    //     const int=Math.floor(Math.random()*names.length);
    //     setName(names[int])
    //   }

    //   <p>Let's {name} Money</p>
    //   <button onClick={handlenamechange}>Hiii to all</button>


// map, filter, reduce()

// mapping

// const numbers = [-2, -1, 0, 1, 2];
// const itemss = numbers.map(n => ({ number: n }));
// console.log(itemss);

// filter and mapping

// const numbers = [-2, -1, 0, 1, 2];
// const itemss = numbers.filter(n=> n>=0).map(n => ({ number: n }));
// console.log(itemss);
// this only return >0 values so 3 valuees only ouutput
 