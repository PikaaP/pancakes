'use client';
"use strict";

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image'

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import Link from 'next/link'


const Checkout = () => {
    let [userBasket, setUserbasket] = useState<any>([])

    useEffect(
        () => {
            let basketData: any[] = []
            let tempBasket: any[] = []

            if (sessionStorage.getItem('basket') !== null) {
                const stringValue = sessionStorage.getItem('basket')
                basketData = JSON.parse(stringValue!)
            }

            for (var i = 0; i < basketData.length; i++) {
                const name = basketData[i][0]
                const type = basketData[i][1]
                const calories = basketData[i][2]
                axios.get(`http://localhost:3001/${type}`)
                    .then((res) => {
                        const data = res.data
                        for (var j = 0; j < data.length; j++) {
                            if (data[j]['recipe'].label == name && data[j]['recipe'].calories == calories) {
                                tempBasket.push(
                                    [{ item: data[j]['recipe'] }]
                                )
                            }
                        }
                    })
                    .then(() => setUserbasket(tempBasket))
            }
        }, []
    )

    const BasketViewPort = () => {

        if (userBasket.length == 0) {
            return (
                <p>Basket is empty</p>
            )
        }
        else {
            return (
                userBasket.map((element: any) => {
                    return (
                        <div className='basket-viewport-content' key={element[0].item.label}>
                            <p> {element[0].item.label} </p>
                        </div>

                    )
                })
            )
        }
    }

    return (
        <div>
            <button onClick={() => {
                console.log(sessionStorage.getItem('basket'))
            }}> (temp log basket)</button>
            <div className=''>
                <BasketViewPort />
            </div>
        </div>

    )


}

export default Checkout