import React from 'react'
import DescriptionAdvert from '../../components/molecules/advertisement/DescriptionAdvert'
import Header from '../../components/organisms/header/Header'

function Adv({advert}) {
    console.log(advert)

    return (
        <div>
            <Header/>

            <DescriptionAdvert advert={advert}/>
        </div>
    )
}

export default Adv

export async function getStaticProps( {params}) {

    const advert = await fetch(`http://localhost:4000/advert/${params.id}`)
    .then((res) => res.json())

    return {
        props: {
            advert
        }
    }
}

export async function getStaticPaths() {

    const adverts = await fetch(`http://localhost:4000/advert`)
    .then((res) => res.json())

    return {
        paths: adverts.map((advert) => ({
        params: { id: advert.id.toString() },
        })),
        fallback: false,
    };
}