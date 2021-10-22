import FlipMove from 'react-flip-move'
import Admin from '../atoms/Admin'

function AdministrationMap({users}) {
    return (
        <FlipMove className="">
            {users.map(user => (
                <Admin key={user.id} user={user}/>
            ))}
            
        </FlipMove>
    )
}

export default AdministrationMap
