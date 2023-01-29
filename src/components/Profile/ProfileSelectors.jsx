
import './ProfileSelectors.css'

const ProfileSelectors = ({accountDetailsSelected, setAccountDetailsSelected }) => {
  return (
    <div className="profileSelectorsContainer">
        <table>
            <tbody>
                <tr>
                    <td 
                    className={accountDetailsSelected ? 'selector selected' : 'selector'}
                    onClick={()=>{
                        setAccountDetailsSelected(true)
                        }}
                    >
                    Account Details
                    </td>
                </tr>
                <tr>
                    <td 
                    className={!accountDetailsSelected ? 'selector selected' : 'selector'}
                    onClick={()=>{
                        setAccountDetailsSelected(false)
                        }}
                    >
                    Order History
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ProfileSelectors