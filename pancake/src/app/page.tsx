'use client';
typeof window === "undefined"

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import React, { SetStateAction } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const iconSize = 60
var data = [
  {
    "name": "Trina",
    "index": 0,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Trina",
    "index": 1,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Trina",
    "index": 2,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Trina",
    "index": 3,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Trina",
    "index": 4,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Trina",
    "index": 5,
    "details": 20,
    "src": "/pancake.png",
    "tags": [
      "dolor",
      "ea",
      "aute",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Santana Winters"
      },
      {
        "id": 1,
        "name": "Bertha Horn"
      },
      {
        "id": 2,
        "name": "Deanna Evans"
      }
    ]
  },
  {
    "name": "Bishop",
    "index": 6,
    "details": 32,
    "src": "/pancake.png",
    "tags": [
      "sit",
      "nisi",
      "laborum",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Wagner Lawson"
      },
      {
        "id": 1,
        "name": "Julia Benton"
      },
      {
        "id": 2,
        "name": "Carey Farley"
      }
    ]
  },
  {
    "name": "Erika",
    "index": 7,
    "details": 28,
    "src": "/pancake.png",
    "tags": [
      "aliqua",
      "magna",
      "nulla",
      "in"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Watts Hensley"
      },
      {
        "id": 1,
        "name": "Sally Bates"
      },
      {
        "id": 2,
        "name": "Young Buckley"
      }
    ]
  },
  {
    "name": "Sasha",
    "index": 8,
    "details": 40,
    "src": "/pancake.png",
    "tags": [
      "elit",
      "reprehenderit",
      "aliqua",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Travis Knapp"
      },
      {
        "id": 1,
        "name": "Edwina Meadows"
      },
      {
        "id": 2,
        "name": "Britney Baxter"
      }
    ]
  },
  {
    "name": "Mccullough",
    "index": 9,
    "details": 38,
    "src": "/pancake.png",
    "tags": [
      "eu",
      "incididunt",
      "et",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mabel Rosales"
      },
      {
        "id": 1,
        "name": "Jeanette Diaz"
      },
      {
        "id": 2,
        "name": "Chris Bird"
      }
    ]
  },
  {
    "name": "Mcintyre",
    "index": 10,
    "details": 28,
    "src": "/pancake.png",
    "tags": [
      "officia",
      "anim",
      "officia",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Price Vincent"
      },
      {
        "id": 1,
        "name": "Anita Medina"
      },
      {
        "id": 2,
        "name": "Elisabeth Bradford"
      }
    ]
  }
]




export default function Home() {


  const [searchInput, setSearchInput] = useState(String)
  let [serverData, setServerData] = useState<any>()

  function collectData(route: string): void {


  }

  useEffect(
    () => {
      axios.get(`http://localhost:3001/all`)
        .then((res) => {
          var responseData = res.data
          setServerData(responseData)
        }).catch((err: Error) => {
          console.log(err)
        })

    }, []
  )

  const Breakfast = () => {
    if (serverData) {
      return (
        serverData[0]['breakfast'].map((item: any) => {
          return (
            <FoodCard key={item['recipe'].calories} foodItem={item['recipe']} />
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
          return (
            <FoodCard key={item['recipe'].calories} foodItem={item['recipe']} />
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
          return (
            <FoodCard key={item['recipe'].calories} foodItem={item['recipe']} />
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
          return (
            <FoodCard key={item['recipe'].calories} foodItem={item['recipe']} />
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
    let [likeStatus, setLikeStatus] = useState(false)

    const handleSetFav = (likeStatus: boolean) => {
      const _like = !likeStatus
      setLikeStatus(likeStatus = _like)
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
    const FavIcon = () => {
      if (likeStatus === false) {
        return (
          <Image draggable={false} className='heart' src='/heartIcon.png' alt='fav icon' width={40} height={40}
            onClick={() => handleSetFav(likeStatus)}
            style={{
              height: 'auto',
              position: 'absolute',
              top: '2px',
            }}></Image>
        )
      }
      else return (
        <Image draggable={false} className='filled-heart' src='/filledHeartIcon.png' alt='filled fav icon' width={40} height={40}
          onClick={() => handleSetFav(likeStatus)}
          style={{
            position: 'absolute',
            top: '2px',
          }}></Image>
      )
    }
    try {
      const delay = 10
      return (
        <div draggable={true} className='food-item'>
          <div key={foodItem.foodItem.calories} draggable={true}>
            <div style={{
              display: 'flex',
              justifyContent: 'end'
            }}>
              <Image src='/pancake.png' alt='' draggable={false} width={220} height={70} style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}></Image>
              <FavIcon />
            </div>
            <div className='food-name'>
              <h3> {foodItem.foodItem.label}</h3>
            </div>
            <div className='food-details'>
              <h3>Calories: {Math.round(foodItem.foodItem.calories)}</h3>
              <h3> </h3>
            </div>
            <div className='food-tags-container'>
                <Tags/>
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.log(error)
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
            width:'100%',
            height:'100%',
            objectFit:'cover',
            WebkitMaskImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(255, 251, 240,0)))"
          }}>
            <source src= {'/billboardVideo.mp4'}></source>
          </video>
        </div>
      </div>
        {/* <div className='section'>
          <h1 className='section-header'> 
            Top Picks
          </h1>
          <div className='food-container'>
          </div>
        </div> */}
        <div className='mainContent'>
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
    // would like to change from any
    const SearchContent = (item: any) => {
      return (
        <>
          <div className='section search-section'>
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
      const nameHolder: { name: string; index: number; details: number; src: string; tags: string[]; friends: { id: number; name: string; }[]; }[] = []
      data.forEach((element) => {
        if (element.name.toLowerCase().includes(searchInput.toLowerCase())) {
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

  function handleDragOver(event: any) {
    event.preventDefault()
  }

  function handleDragEnter(event: any) {
    event.preventDefault()
    return (
      <div style={{ cursor: 'copy' }}></div>
    )
  }

  function handleSearch(event: React.FormEvent<HTMLInputElement>): void {

    var search = (event.target as HTMLTextAreaElement).value.toLowerCase();
    setSearchInput(search)
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
          <div className='basket' onDragEnter={(event) => handleDragEnter(event)} onDragOver={(event) => handleDragOver(event)}><Image className='basket' src='/basket.png' alt='calender icon' width={iconSize} height={iconSize} color='black'></Image></div>
        </div>
      </nav>
      <div>
        <ViewPortContent />
      </div>
    </main>
  )
}
