'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'
import foodRepository, { FoodRepo } from '../../lib/food/repo/food.repository';
import toast, { Toaster } from 'react-hot-toast';


const iconSize = 60
var data = [{}]


export default function Home() {

  const [searchInput, setSearchInput] = useState(String)
  const [serverData, setServerData] = useState<any>()
  const [state, updateState] = useState<any>();


  useEffect(
    () => {
      async function getFood() {
        const food = await foodRepository.getAll();
        setServerData(food)
      }
      getFood()
    }, []
  )

  const Breakfast = () => {
    if (serverData) {
      return (
        serverData[0]['breakfast'].map((item: any) => {
          const newfoodItem = { ...item['recipe'], category: "breakfast" }
          return (
            <FoodCard key={item['recipe'].calories} foodItem={newfoodItem} />
          )
        })
      )
    }
    else {
      return (
        <FoodCardPreview />
      )
    }

  }

  const Lunch = () => {
    if (serverData) {
      return (
        serverData[0]['lunch'].map((item: any) => {
          const newfoodItem = { ...item['recipe'], category: "lunch" }
          return (
            <FoodCard key={item['recipe'].calories} foodItem={newfoodItem} />
          )
        })
      )
    }
    else {
      return (
        <FoodCardPreview />
      )
    }

  }

  const Dinner = () => {
    if (serverData) {
      return (
        serverData[0]['dinner'].map((item: any) => {
          const newfoodItem = { ...item['recipe'], category: "dinner" }
          return (
            <FoodCard key={item['recipe'].calories} foodItem={newfoodItem} />
          )
        })
      )
    }
    else {
      return (
        <FoodCardPreview />
      )
    }

  }

  const Snacks = () => {
    if (serverData) {
      return (
        serverData[0]['snacks'].map((item: any) => {
          const newfoodItem = { ...item['recipe'], category: "snacks" }
          return (
            <FoodCard key={item['recipe'].calories} foodItem={newfoodItem} />
          )
        })
      )
    }
    else {
      return (
        <FoodCardPreview />
      )
    }

  }

  const FoodCard = (foodItem: any) => {
    let [mouseEnter, setMouseEnter] = useState(false)
    let [likeStatus, setLikeStatus] = useState(false)

    let [timer, setTimer] = useState<boolean>(false)
    let [basketStatus, setBasketStatus] = useState(false)

    let temptimer = false

    const Tags = () => {
      if (foodItem.foodItem.tags) {
        return (
          (foodItem.foodItem.tags).slice(0, 4).map((element: any, index: number) => {
            return (
              <h3 className='food-tags-item' key={index}>{element}</h3>
            )
          })
        )
      }
      else if (foodItem.foodItem.healthLabels) {
        return (
          (foodItem.foodItem.healthLabels).slice(0, 4).map((element: any, index: number) => {
            return (
              <h3 className='food-tags-item' key={index}>{element}</h3>
            )
          })
        )
      }

    }
    const FavIcon = () => {

      const handleSetFav = (likeStatus: boolean) => {
        if (typeof window !== 'undefined') {
          if(sessionStorage.getItem('fav') !== null) {
            const stringValue = sessionStorage.getItem('fav')
            const value = JSON.parse(stringValue!)
            let favList = [...value, foodItem.foodItem.label]
            sessionStorage.setItem('fav', JSON.stringify(favList))
          }
          
        else {
          sessionStorage.setItem('fav', JSON.stringify([foodItem.foodItem.label]))
          const stringValue = sessionStorage.getItem('fav')
          const value = JSON.parse(stringValue!)
        }
        setLikeStatus(!likeStatus)
        }
      }

      const handleRemoveFav = (likeStatus: boolean) => {
        if (typeof window !== 'undefined') {
            const stringValue = sessionStorage.getItem('fav')
            const value = JSON.parse(stringValue!)
            const index = value.indexOf(foodItem.foodItem.label)
            if (index > -1) {
              value.splice(index, 1)
              let newFavList = value
              sessionStorage.setItem('fav', JSON.stringify(newFavList))
              setLikeStatus(!likeStatus)
            } 
        }
      }

      if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('fav') !== null) {
          const stringValue = sessionStorage.getItem('fav')
          const value = JSON.parse(stringValue!)
          if (value.find((element: string)=> element == foodItem.foodItem.label)){
             return (
              <Image draggable={false} className='filled-heart' src='/filledHeartIcon.png' alt='filled fav icon' width={40} height={40}
                onClick={() => handleRemoveFav(likeStatus)}></Image>
            )
          }
          else return (
            <>
            <Image draggable={false} className='heart' src='/heartIcon.png' alt='fav icon' width={40} height={40}
              onClick={() => handleSetFav(likeStatus)}></Image>
          </>
          )
        }
        else {
          return (
            <>
            <Image draggable={false} className='heart' src='/heartIcon.png' alt='fav icon' width={40} height={40}
              onClick={() => handleSetFav(likeStatus)}></Image>
          </>
          )
        }
      }

      // if (likeStatus === false) {
      //   return (
      //     <>
      //       <Image draggable={false} className='heart' src='/heartIcon.png' alt='fav icon' width={40} height={40}
      //         onClick={() => handleSetFav(likeStatus)}></Image>
      //     </>
      //   )
      // }
      // else return (
      //   <Image draggable={false} className='filled-heart' src='/filledHeartIcon.png' alt='filled fav icon' width={40} height={40}
      //     onClick={() => handleRemoveFav(likeStatus)}></Image>
      // )
    }

    const BasketIcon = () => {

      if (typeof window !== 'undefined') {
        for (var i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          const stringValue = sessionStorage.getItem(key!)
          const value = JSON.parse(stringValue!)

          if (value[0] == foodItem.foodItem.label) {
            useEffect(() => setBasketStatus(true), [])
          }
        }
      }

      function handleAddBasket(cartItem: any): void {
        if (typeof window !== 'undefined') {
          toast.success(`Added ${cartItem.foodItem.label} to shopping list.`, {position: 'top-center'})
          sessionStorage.setItem(cartItem.foodItem.label, JSON.stringify([cartItem.foodItem.label, cartItem.foodItem.category, cartItem.foodItem.calories]))
          for (var i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i)
          }
          setBasketStatus(true)
        }
      }

      function handleRemoveasket(cartItem: any): void {
        if (typeof window !== 'undefined') {
          toast.error(`Removed ${cartItem.foodItem.label} from shopping list.`, {
          position: 'top-center',
        })
          sessionStorage.removeItem(cartItem.foodItem.label);
          setBasketStatus(false)
        }
      }

      if (basketStatus) {
        return (
          <button onClick={() => handleRemoveasket(foodItem)}>Remove</button>
        )
      }

      else return (
        <button onClick={() => handleAddBasket(foodItem)}>Add to shopping list!</button>
      )
    }



    if (mouseEnter == true) {


      try {
        return (
          <div className='food-item-mouseEnter' key={foodItem.foodItem.calories} draggable={true}
            onMouseLeave={() => {
              temptimer = false
              setTimer(false)
              setMouseEnter(false)
            }}
          >
            <div style={{
              display: 'block',
            }}>
              <Image src='/pancake.png' alt='' draggable={false} width={320} height={170} style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}></Image>
              <div style={{
                backgroundColor: 'red',
                height: "auto",
                width: '318px',
                marginTop: -10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',

              }}>
                <FavIcon />
                <BasketIcon />
              </div>
            </div>
          </div>
        )
      } catch (err) {
        console.log(err)
      }
    }
    else {
      try {
        function timeout(ms: number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        return (
          <div className='food-item' key={foodItem.foodItem.calories} draggable={true}
            onMouseEnter={async () => {
              temptimer = true
              setTimer(true)
              await timeout(300)
              // console.log('this is temptimer after timeout', temptimer)
              if (temptimer) {
                setMouseEnter(true)
                // console.log('temptimer is true')
              }

            }}

            onMouseLeave={() => {
              temptimer = false
              setTimer(false)
              setMouseEnter(false)

              // console.log('this is timer on mouse leave', temptimer)
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'end'
            }}>
              <Image src='/pancake.png' alt='' draggable={false} width={220} height={70} style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}></Image>
              {/* <FavIcon /> */}
            </div>
            <div className='food-name'>
              <h3> {foodItem.foodItem.label}</h3>
            </div>
            <div className='food-details'>
              <h3>Calories: {Math.round(foodItem.foodItem.calories)}</h3>
              <h3> </h3>
            </div>
            <div className='food-tags-container'>
              <Tags />
            </div>
          </div>
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  const FoodCardPreview = () => {

    const n = Math.round(1920 / 300)

    return [...Array(n)].map((i: number, index) => {
      return (
        <div className='food-item' key={index} >
          <div style={{
            display: 'flex',
            justifyContent: 'end'
          }}>
            <div style={{
              width: '220px',
              height: '120px',
              background: 'grey'
            }}>
            </div>
          </div>
          <div className='food-name'>
          </div>
          <div className='food-details'>
          </div>
          <div className='food-tags-container'>
          </div>
        </div>
      )
    }
    )

  }

  const MainContent = () => {
    return (
      <>
        <div className='billboard-container'>
          <div className='billboard'>
            <video playsInline autoPlay muted loop style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              WebkitMaskImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(255, 251, 240,0)))"
            }}>
              <source src={'/billboardVideo.mp4'}></source>
            </video>
          </div>
          <div className='billboard-mask'>
            <div className='billboard-mask-name-icons'>
              <h1 className='food-name'> Mask name</h1>
              <button>Add to shopping List</button>
              <button>Add to favs </button>

              <button> more info!</button>
            </div>
            <div className='billboard-mask-tags-container'>
              <h1 className='billboard-mask-tags-item'> tag1 </h1>
              <h1 className='billboard-mask-tags-item'> tag2</h1>
              <h1 className='billboard-mask-tags-item'> tag3</h1>
            </div>
          </div>
        </div>
        <div className='main-content'>
          <div className='section'>
            <h1 className='section-header'>
              Breakfast
            </h1>
            <div className='food-container'>
              <Breakfast />
            </div>
          </div>
          <div className='section'>
            <h1 className='section-header'>
              Lunch
            </h1>
            <div className='food-container'>
              <Lunch />
            </div>
          </div>
          <div className='section'>
            <h1 className='section-header'>
              Dinner
            </h1>
            <div className='food-container'>
              <Dinner />
            </div>
          </div>
          <div className='section'>
            <h1 className='section-header'>
              Snacks
            </h1>
            <div className='food-container'>
              <Snacks />
            </div>
          </div>
        </div>
      </>
    )
  }

  const ViewPortContent = () => {

    const SearchContent = (item: any) => {
      return (
        <>
          <div className='search-section'>
            <h3 className='section-header'>Found {item.item.length} results</h3>
            <div className='search-container' key={item.item.name}>
              {item.item.map((element: any) => {
                return (
                  <div className='search-item-section' >
                    <Image key={item.item.name} src={element.src} alt='' width={250} height={150} style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}></Image>
                    <p style={{}}> {element.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )
    }

    if (searchInput !== '') {
      const nameHolder: {  }[] = []
      data.forEach((element) => {
        if (element) {
          nameHolder.push(element)
        }
      })
      return (
        <><SearchContent item={nameHolder} /></>
      )
    }

    else {
      return (
        <MainContent />
      )
    }

  }

  function handleForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  function handleSearch(event: React.FormEvent<HTMLInputElement>): void {

    var search = (event.target as HTMLTextAreaElement).value.toLowerCase();
    setSearchInput(search)
  }


  const Basket = () => {
    let [showBasket, setShowBasket] = useState<boolean>(false)
    let [basketcontent, setBasketContent] = useState<any>()

    function handleshowBasket(): void {
      setShowBasket(true)
    }

    function handleHideBasket(): void {
      setShowBasket(false)
    }

    // change from any!
    let basket: any[] = []



    if (typeof window !== 'undefined') {
      for (var i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        const value = sessionStorage.getItem(key!)
        basket.push(JSON.parse(value!))
      }
    }




    function handleClearBasket(): void {
      updateState({})
      sessionStorage.clear()
    }

    return (
      <>

        <div className='basket' onMouseEnter={() => handleshowBasket()} onMouseLeave={() => handleHideBasket()} >
          <Link href="/checkout"><Image className='basket' src='/basket.png' alt='calender icon' width={iconSize} height={iconSize} color='black'></Image></Link>
          {showBasket &&
            <div className='drop-down-items-container'>
              {/* change from any.... */}
              {basket.map((item: any, index: number) => {
                return (
                  <Link key={index} href="/checkout"><div key={index}>
                    <ul className='drop-down-items' key={index}> {item[0]}</ul>
                  </div>
                  </Link>
                )
              })}
              {basket.length !== 0 ? <button onClick={() => handleClearBasket()}> remove all</button> : <p> Add items to basket</p>}

            </div>
          }
        </div>
      </>


    )
  }

  return (
    <main>
      <nav className='nav-container'>
        <div className='menu-logo'>
          <Image src='/menu.png' alt='menu icon' width={iconSize} height={iconSize} color='black'></Image>
          <a >Pancake</a>
        </div>
        <div className='nav-icons'>
          <form onSubmit={(event) => handleForm(event)}>
            <input type='text' placeholder='Search for pancakes, tofu, steak flour...' onChange={(event) => handleSearch(event)}></input>
          </form>
          <div className='calender'><Image src='/calender.png' alt='calender icon' width={iconSize} height={iconSize} color='black'></Image></div>
          <Basket />
        </div>
      </nav>
      <div>
        <ViewPortContent />
      </div>
    </main>
  )
}


