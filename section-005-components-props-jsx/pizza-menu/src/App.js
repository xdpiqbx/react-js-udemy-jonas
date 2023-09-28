import React from 'react';
import getPizzas from './data.js';

function App() {
  return (
      <div className='container'>
        <Header />
        <Menu />
        <Footer />
    </div>
  );
}

function Header() {
    // const style = {color: "red", fontSize: "48px"}
    const style = {}
    return (
        <header className='header'>
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    )
}

function Menu() {
    const pizzas = getPizzas();
    const numPizzas = pizzas.length
    return (
        <main className='menu'>
            <h2>Menu</h2>

            {
                numPizzas > 0 ?
                <React.Fragment key="if you need it">
                    <p>Authentic Italian cuisine.</p>
                    <ul className='pizzas'>
                        {pizzas.map(({ name, ingredients, photoName, price, soldOut }) => {
                            return <Pizza
                                name={name}
                                ingredients={ingredients}
                                photoName={photoName}
                                price={price}
                                soldOut={soldOut}
                                key={name}
                            />
                        })}
                    </ul>
                </React.Fragment>
                : <p>We're still working on our menu. Come back later :)</p>
            }

        </main>
    )
}

function Pizza({ name, ingredients, photoName, price, soldOut }) {
    // if (soldOut) {
    //     return null
    // }
    return (
        <li className={`pizza ${soldOut && ' sold-out'}`}>
            <img src={photoName} alt={name} width={350} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <p>{soldOut ? "Sold out" : price}</p>
            </div>
        </li>
    )
}

function Footer() {
    // const time = new Date().toLocaleTimeString()
    
    const hour = new Date().getHours()
    const openHour = 7
    const closeHour = 22

    const isOpen = hour >= openHour && hour <= closeHour

    isOpen ? console.log("We are currently open!") : console.log("We are currently closed!")

    // if (!isOpen) {
    //     return (
    //         <p>We're happy to wellcome you between {openHour}:00 and {closeHour}:00</p>
    //     )        
    // }
    return (<footer className='footer'>
        {
            isOpen && (
                <Order closeHour={closeHour} />
            )
        }
    </footer>)
    // return React.createElement("footer", null, "We currently open")
}

function Order({closeHour}) {
    return (
        <div className='order'>
            <p>
                We're open until {closeHour}:00.
                Come visit us or order online.
            </p>
            <button className='btn'>Order</button>
        </div>
    )
}

export default App;
