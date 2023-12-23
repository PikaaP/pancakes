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

            for (var i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i)
                const value = sessionStorage.getItem(key!)
                basketData.push(JSON.parse(value!))
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
                                    [{ item: data[j]['recipe'].label }]
                                )
                            }
                        }
                    })
                    .then(() =>  setUserbasket(tempBasket))
            }
           
        },
        []
    )

    const BasketViewPort = () => {

        if (userBasket.length == 0) {
            return (
                <p>nope</p>
            )
        }
        else {
            return (
                <p>data is here now :c</p>
            )
        }
    }

    return (
        <div>
            <button onClick={() => {
                for (var i = 0; i < sessionStorage.length; i++) {
                    const key = sessionStorage.key(i)
                    const value = sessionStorage.getItem(key!)
                    console.log(value)
                }
            }}> X</button>
            <div>
                <BasketViewPort />
            </div>
        </div>

    )


}

export default Checkout