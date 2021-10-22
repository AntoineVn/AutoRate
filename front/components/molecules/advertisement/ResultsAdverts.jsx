import FlipMove from 'react-flip-move'
import Annonce from '../../atoms/advert/Annonce'

function ResultsAdverts({adverts}) {
    return (
        <FlipMove className="">
            {adverts.map(advert => (
                <Annonce key={advert.id} advert={advert}/>
            ))}
            
        </FlipMove>
    )
}

export default ResultsAdverts
