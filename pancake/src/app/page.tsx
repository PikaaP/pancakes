'use client';

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'
import React, { SetStateAction } from "react";
import { useState } from 'react';

var data =[
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

  interface CreateFoodCardProps {
    src: string | StaticImageData;
    name: String
    tags: Array<String>
    details: String
  }


  const FoodCard = ({ name, tags, details}: CreateFoodCardProps) => {
  let [likeStatus, setLikeStatus] = useState(false)

    const handleSetFav = (likeStatus: boolean) => {
      const _like = !likeStatus
      setLikeStatus(likeStatus = _like)
    }

    const FavIcon = () => {
      if (likeStatus === false) {
        return (
          <Image className='heart' src='/heartIcon.png' alt='fav icon' width={60} height={60}
            onClick={() => handleSetFav(likeStatus)}
            style={{
              position: 'absolute',
              top: '2px',
            }}></Image>
        )
      }
      else return (
        <Image className='filled-heart' src='/filledHeartIcon.png' alt='filled fav icon' width={80} height={80}
          onClick={() => handleSetFav(likeStatus)}
          style={{
            position: 'absolute',
            top: '2px',
          }}></Image>
      )
    }
    
    return (
      <div className='food-item'>
        <div style={{
          display: 'flex',
          justifyContent: 'end'
        }}>
          <Image src='/pancake.png' alt='' width={350} height={250} style={{
            objectFit: "cover",
            borderRadius: "10px",
          }}></Image>
          <FavIcon/>
        </div>
        <div className='food-name'>
          <h3> {name}</h3>
        </div>
        <div className='food-details'>
          <h3>Time to prepare</h3>
          <h3> {details}</h3>
        </div>
        <div className='food-tags-container'>
          {tags.map((element, index) => {
            return (
              <h3 className='food-tags-item' key={index}>{element}</h3>
            )
          })}
        </div>
      </div>
    )
  }

  const MainContent = () => {
    return(
      <>
      <div className='section'>
          <h1 className='section-header'>
            Top Picks
          </h1>
          <div className='food-container'>
            <FoodCard src='/public/pancake.png' name='example Name1' tags={['placeholder1', 'placeholder2', 'mini']} details={'example Details'}  />
            <FoodCard src='/public/pancake.png' name='example Name2' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name3' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'}/>         
             </div>
        </div>
        <div className='section'>
          <h1 className='section-header'>
            Other picks
          </h1>
          <div className='food-container'>
            {/* <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2', 'mini', 'something even longer']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} /> <FoodCard src ='/public/pancake.png'name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} /> */}
          </div>
        </div>
        <div className='section'>
          <h1 className='section-header'>
            Other other picks
          </h1>
          <div className='food-container'>
            {/* <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2', 'mini', 'something ', 'm']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} />
            <FoodCard src='/public/pancake.png' name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} /> <FoodCard src ='/public/pancake.png'name='example Name' tags={['placeholder1', 'placeholder2']} details={'example Details'} /> */}
          </div>
        </div>
      </>
    )
  }

  const ViewPortContent = () => {
    // would like to change from any
    const SearchContent = (item:any) => {
      return (
       <>
          <div className='section '>
            <h3 className='section-header'>Found {item.item.length} results</h3>
            <div className= 'search-container' key ={item.item.name}>
              {item.item.map((element:any )=> {
                return (
                    <div className='search-item search-item-section' >
                      <Image  key ={item.item.name} src={element.src} alt='' width={250} height={150} style={{
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
        <p><SearchContent item={nameHolder}/></p>
      )
    }
    
    else {
      return (
        <MainContent/>
      )
    }
    
  }
  function handleForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

  }

  function handleSearch(event:React.FormEvent<HTMLInputElement>): void {
    var search = (event.target as HTMLTextAreaElement).value.toLowerCase();
    setSearchInput(search)
  }

  return (
    <main>
      <nav className='nav-container'>
        <div className='menu-logo'>
          <Image src='/menu.png' alt='menu icon' width={60} height={60} color='black'></Image>
          <a >Pancake</a>
        </div>
        <div className='nav-icons'>
          <form onSubmit={(event) => handleForm(event)}>
            <input type='text' placeholder='Search for pancakes, tofu, steak flour...' onChange={(event)=>handleSearch(event)}></input>
          </form>
          <div className='calender'><Image src='/calender.png' alt='calender icon' width={70} height={70} color='black'></Image></div>
          <div className='basket'><Image className='basket' src='/basket.png' alt='calender icon' width={70} height={70} color='black'></Image></div>
        </div>
      </nav>
      <div>
        <ViewPortContent/>
      </div>
    </main>
  )
}
