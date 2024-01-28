'use client';

import Image from 'next/image'
import { useState, useEffect, useRef, ChangeEvent, FocusEvent } from 'react';

import Link from 'next/link'
import foodRepository, { FoodRepo } from '../../lib/food/repo/food.repository';
import toast, { Toaster } from 'react-hot-toast';


import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import AsyncSelect from 'react-select/async';
import { ColourOption, colourOptions } from '../../data';
import { ActionMeta, MultiValue, StylesConfig } from 'react-select';

import chroma from "chroma-js"
var pluralize = require('pluralize')


const iconSize = 60



export default function Home() {

  const [searchInput, setSearchInput] = useState(String)
  const [searchInput2, setSearchInput2] = useState<any>([])

  const [serverData, setServerData] = useState<any>()
  const [state, updateState] = useState<any>();


  useEffect(
    () => {
      async function getFood() {
        const food: any = await foodRepository.getAll();

        const healthlabelslist: any[] = []
        const ingredientslist: any[] = []
        const tagsList: any[] = []

        for (var key in food[0]) {
          food[0][key].map(
            (element: any) => {

              element.recipe.healthLabels.forEach(function (entry: any) {
                healthlabelslist.push(entry.toLowerCase())
              })

              element.recipe.ingredients.map((elements: any) => { return elements.food }).forEach(function (entry: any) {
                ingredientslist.push(entry.toLowerCase())
              })

              if (element.recipe.tags) {
                element.recipe.tags.forEach(function (entry: any) {
                  tagsList.push(entry.toLowerCase())
                })
              }


            }
          )
        }

        const uniqHealthlabelslist = [...new Set(healthlabelslist)];
        const uniqingredientslist = [...new Set(ingredientslist)];
        const uniqtagsList = [...new Set(tagsList)];
        const dataList: any = []

        var newArray = uniqingredientslist.concat(uniqtagsList);
        var newArray2 = newArray.concat(uniqHealthlabelslist);
        var uniqArray = [...new Set(newArray2)]

        var uniqArraySingle = uniqArray.map((item: any) => pluralize.singular(item))

        uniqArraySingle.forEach((element: any, index: number) => {
          dataList.push(
            {
              value: element,
              label: element,
              color: "#" + Math.floor(Math.random() * 16777215).toString(16)
            }
          )
        })

        // console.log(dataList)
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
    let [likeStatus, setLikeStatus] = useState<boolean>(false)
    let [basketStatus, setBasketStatus] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)
    let [More, setMoreStatus] = useState<boolean>(false)

    const FavIcon = () => {

      const handleSetFav = (likeStatus: boolean) => {
        if (typeof window !== 'undefined') {
          try {
            if (sessionStorage.getItem('fav') !== null) {
              const stringValue = sessionStorage.getItem('fav')
              const value = JSON.parse(stringValue!)
              let favList = [...value, foodItem.foodItem.label]
              sessionStorage.setItem('fav', JSON.stringify(favList))
            }

            else {
              sessionStorage.setItem('fav', JSON.stringify([foodItem.foodItem.label]))
            }
            setLikeStatus(!likeStatus)
          } catch (error) {
            toast.error('Favourite list is full :c');
          }
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
          if (value.find((element: string) => element == foodItem.foodItem.label)) {
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
    }

    const BasketIcon = () => {

      function handleAddBasket(): void {
        if (typeof window !== 'undefined') {
          if (sessionStorage.getItem('basket') !== null) {
            const stringValue = sessionStorage.getItem('basket')
            const value = JSON.parse(stringValue!)
            let basketList = [...value, [foodItem.foodItem.label, foodItem.foodItem.category, foodItem.foodItem.calories]]
            sessionStorage.setItem('basket', JSON.stringify(basketList))
          }
          else {
            sessionStorage.setItem('basket', JSON.stringify([[foodItem.foodItem.label, foodItem.foodItem.category, foodItem.foodItem.calories]]))
          }
          setBasketStatus(true)
          toast.success(`Added ${foodItem.foodItem.label} to shopping list.`, { position: 'top-center' })
        }
      }

      function handleRemoveasket(): void {

        if (typeof window !== 'undefined') {
          const stringValue = sessionStorage.getItem('basket')
          const value = JSON.parse(stringValue!)
          let index
          for (var i = 0; i < value.length; i++) {
            if (value[i][0] == foodItem.foodItem.label && value[i][1] == foodItem.foodItem.category) {
              index = i
            }
          }
          value.splice(index, 1)
          let newBasketList = value
          setBasketStatus(false)
          sessionStorage.setItem('basket', JSON.stringify(newBasketList))
          toast.error(`Removed ${foodItem.foodItem.label} from shopping list.`, {
            position: 'top-center',
          })
        }
      }

      if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('basket') !== null) {
          const stringValue = sessionStorage.getItem('basket')
          const value = JSON.parse(stringValue!)
          let test = value.filter((element: any) => element[0] == foodItem.foodItem.name)
          if (value.find((element: Array<string | number>) => element[0] == foodItem.foodItem.label)) {
            return (
              <button onClick={() => handleRemoveasket()}>Remove</button>
            )
          }
          else {
            return (
              <button onClick={() => handleAddBasket()}>Add to shopping list!</button>
            )
          }
        }
        else {
          return (
            <button onClick={() => handleAddBasket()}>Add to shopping list!</button>
          )
        }

      }
    }


    const BasketIcon2 = () => {

      function handleAddBasket(): void {
        // if (typeof window !== 'undefined') {
        //   if (sessionStorage.getItem('basket') !== null) {
        //     const stringValue = sessionStorage.getItem('basket')
        //     const value = JSON.parse(stringValue!)
        //     let basketList = [...value, [foodItem.foodItem.label, foodItem.foodItem.category, foodItem.foodItem.calories]]
        //     sessionStorage.setItem('basket', JSON.stringify(basketList))
        //   }
        //   else {
        //     sessionStorage.setItem('basket', JSON.stringify([[foodItem.foodItem.label, foodItem.foodItem.category, foodItem.foodItem.calories]]))
        //   }
        //   setBasketStatus(true)
        //   toast.success(`Added ${foodItem.foodItem.label} to shopping list.`, { position: 'top-center' })
        // }
      }

      function handleRemoveasket(): void {

        // if (typeof window !== 'undefined') {
        //   const stringValue = sessionStorage.getItem('basket')
        //   const value = JSON.parse(stringValue!)
        //   let index
        //   for (var i = 0; i < value.length; i++) {
        //     if (value[i][0] == foodItem.foodItem.label && value[i][1] == foodItem.foodItem.category) {
        //       index = i
        //     }
        //   }
        //   value.splice(index, 1)
        //   let newBasketList = value
        //   setBasketStatus(false)
        //   sessionStorage.setItem('basket', JSON.stringify(newBasketList))
        //   toast.error(`Removed ${foodItem.foodItem.label} from shopping list.`, {
        //     position: 'top-center',
        //   })
        // }
      }

      if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('basket') !== null) {
          const stringValue = sessionStorage.getItem('basket')
          const value = JSON.parse(stringValue!)
          let test = value.filter((element: any) => element[0] == foodItem.foodItem.name)
          if (value.find((element: Array<string | number>) => element[0] == foodItem.foodItem.label)) {
            return (
              <button onClick={() => handleRemoveasket()}>Remove</button>
            )
          }
          else {
            return (
              <button onClick={() => handleAddBasket()}>Add to shopping list!</button>
            )
          }
        }
        else {
          return (
            <button onClick={() => handleAddBasket()}>Add to shopping list!</button>
          )
        }

      }
    }

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

    const MoreIcon = () => {
      const [open, setOpen] = useState(false);
      const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

      const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const descriptionElementRef = useRef<HTMLElement>(null);
      useEffect(() => {
        if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [open]);

      return (
        <div>
          <Button onClick={handleClickOpen('body')}>Show more</Button>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="Title"
            aria-describedby="Description"
          >
            <DialogTitle id="scroll-dialog-title">Recipe: {foodItem.foodItem.label}</DialogTitle>
            <DialogContent dividers={scroll === 'body'} >

              <video controls playsInline muted loop poster='/pancake.png' style={{
                objectFit: "cover",
              }}>
                <source width={'max'} height={'max'} src={'/billboardVideo.mp4'}></source>
              </video>
              <div>
                <BasketIcon2 />
                <FavIcon />
              </div>
              <h1> Ingredients</h1>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {foodItem.foodItem.ingredientLines.map(
                  (element: any) => {
                    return <li>{element}</li>
                  }
                )}
              </DialogContentText>
              <h1> Instructions</h1>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {foodItem.foodItem.instructionLines.map(
                  (element: any) => {
                    return <li>{element}</li>
                  }
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <BasketIcon2 />
              <FavIcon />
            </DialogActions>
          </Dialog>

        </div>
      )
    }

    function playThumbnail(): void {
      setHover(true)
    }

    function pauseThumbnail(): void {
      setHover(false)
    }

    if (hover !== true) {
      return (
        <div className='food-item' onMouseEnter={() => playThumbnail()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <Image src='/pancake.png' alt='' draggable={false} width={220} height={70} style={{
              objectFit: "cover",
              borderRadius: "10px",
            }}></Image>
          </div>
          <div className='food-name'>
            <h3> {foodItem.foodItem.label}</h3>
          </div>
          <div className='food-details'>
            <h3>Calories: {Math.round(foodItem.foodItem.calories)}</h3>
          </div>
          <div className='food-tags-container'>
            <Tags />
          </div>
        </div>
      )
    }

    else {
      return (
        <div className='food-item-expanded' onMouseLeave={() => pauseThumbnail()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <video controls playsInline muted loop poster='/pancake.png' style={{
              objectFit: "cover",
              borderRadius: "10px",

            }}>
              <source width={380} height={70} src={'/billboardVideo.mp4'}></source>
            </video>
          </div>
          <div>
            <FavIcon />
            <BasketIcon />
            <MoreIcon />
          </div>
          <div className='food-name'>
            <h3> {foodItem.foodItem.label}</h3>
          </div>
          <div className='food-details'>
            <h3>Calories: {Math.round(foodItem.foodItem.calories)}</h3>
          </div>
          <div className='food-tags-container'>
            <Tags />
          </div>
        </div>
      )
    }
  }

  const FoodCardPreview = () => {

    const n = Math.round(1920 / 300)

    return [...Array(n)].map((i: number, index) => {
      return (
        <div className='food-item-preview' key={index} >
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

    const SearchContent = () => {
      const matches: Record<string, any> = {}

      const SearchResults = (category: any) => {

        const [foodData, setFoodData] = useState<any>()
        const searchResult: Object[] = []


        useEffect(() => {
          async function getFood() {
            const food = await foodRepository.getByType(category.category)
            setFoodData(food)
          }
          getFood()
        }, [])

        if (foodData == null) {
          return (
            <></>
          )
        }

        else {
          foodData.forEach((element: any) => {
            const item = element['recipe']

            let matchCount: any = {
              tagList: [],
              ingredientList: [],
              type: String,
            }
            let result = false

            if (item.tags) {
              for (var i = 0; i < searchInput2.length; i++) {
                if (item.tags.some((r: string) => r.toLowerCase().includes(searchInput2[i].label.toLowerCase()))) {
                  matchCount.tagList.push(searchInput2[i])
                  matchCount.type = category.category
                  result = true
                }
              }
            }

            if (item.healthLabels) {
              for (var i = 0; i < searchInput2.length; i++) {
                if (item.healthLabels.some((r: string) => r.toLowerCase().includes(searchInput2[i].label.toLowerCase()))) {
                  matchCount.tagList.push(searchInput2[i])
                  matchCount.type = category.category
                  result = true
                }
              }
            }

            let ingredientList = item.ingredients.map((element: any) => element.food)
            for (var i = 0; i < searchInput2.length; i++) {
              if (ingredientList.some((r: string) => r.toLowerCase().includes(searchInput2[i].label.toLowerCase()))) {
                matchCount.ingredientList.push(searchInput2[i])
                matchCount.type = category.category
                result = true
                // console.log(item.label, searchInput2[i].label, ingredientList)
              }
            }


            if (result) {
              searchResult.push(item)
              matches[item.label] = matchCount
            }
          }
          )
          return (
            <>
              <div className='section'>
                <h1 className='section-header'>

                  {category.category} {searchResult.length}
                </h1>Ï
                <div className='food-container'>
                  {searchResult.map((element: any) => {
                    return (
                      <p>{element.label}</p>
                    )
                  })}
                </div>
              </div>
            </>
          )
        }
      }

      return (
        <>
          <div className='search-section'>
            <h3 className='section-header'>Found X results for X</h3>
            <div className='search-container'>
              <div className='main-content'>
                <div className='section'>
                  <div className='food-container'>
                    <h3>Top Results</h3>
                  </div>
                </div>
                <SearchResults category='Breakfast' />
                <SearchResults category='Lunch' />
                <SearchResults category='Dinner' />
                <SearchResults category='Snacks' />
              </div>
            </div>
          </div>
        </>
      )
    }

    if (searchInput2.length !== 0) {
      return (
        <><SearchContent/></>
      )
    }

    else {
      return (
        <MainContent />
      )
    }

  }

  const Basket = () => {
    let [showBasket, setShowBasket] = useState<boolean>(false)

    function handleshowBasket(): void {
      setShowBasket(true)
    }

    function handleHideBasket(): void {
      setShowBasket(false)
    }

    let basket: string[] = []

    if (typeof window !== 'undefined') {
      const stringValue = sessionStorage.getItem('basket')
      const value = JSON.parse(stringValue!)
      if (value !== null)
        value.forEach((element: any) => {
          basket.push(element)
        });

    }

    function handleClearBasket(): void {
      updateState({})
      sessionStorage.removeItem('basket')
    }

    return (
      <>
        <div className='basket' onMouseEnter={() => handleshowBasket()} onMouseLeave={() => handleHideBasket()} >
          <Link href="/checkout"><Image className='basket' src='/basket.png' alt='calender icon' width={iconSize} height={iconSize} color='black'></Image></Link>
          {showBasket &&
            <div className='drop-down-items-container'>
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

  const placeholderTextList = [
    'Search for pancakes, tofu, steak flour...',
    'Search for miso Soup, fried, noodles, pork...',
    'Search for rice, pizza, soba...',
  ]

  function RandomNumber() {
    const [randomNumber, setRandomNumber] = useState<number>();

    useEffect(() => {
      setRandomNumber(Math.floor(Math.random() * placeholderTextList.length));
    }, []);

    return randomNumber
  }

  function handleForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  function handleSearch(event: React.FormEvent<HTMLInputElement>): void {

    var search = (event.target as HTMLTextAreaElement).value.toLowerCase();
    setSearchInput(search)
  }

  const filterColors = (inputValue: string) => {
    return colourOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: ColourOption[]) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    },);
  };

  function handleInputSelect(newValue: MultiValue<ColourOption>, actionMeta: ActionMeta<ColourOption>) {
    console.log(newValue)
    setSearchInput2(newValue)
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
            <AsyncSelect
              isMulti closeMenuOnSelect={true} cacheOptions loadOptions={loadOptions} defaultOptions onChange={(newValue, actionMeta) => handleInputSelect(newValue, actionMeta)} />
            <input className='search-bar' type='text' placeholder={placeholderTextList[RandomNumber()!]} onChange={(event) => handleSearch(event)}></input>
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


