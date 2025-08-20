import {GoogleLogin} from "@react-oauth/google"
import './Landing.css'
import { jwtDecode } from "jwt-decode"

export function Landing(token, options) {
    return(
        <>


            <div className={"welcome-section"}>
                <h1 className="login-header">Sign-in 💁‍♂️💁‍♀️</h1>
                <h3 className="login-subheader">Welcome! Feel free to sign-in! </h3>
                <h3 className="login-subheader">Sign-in benefits: purchasing my artworks! </h3>
            </div>

            {/*google login part */}
            <div className="google-login-container">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        console.log(jwtDecode(credentialResponse.credential));
                    }}
                    onError={() => console.log("Login Failed :(")}
                />
                {/*need to add a way to inform user already sign in and which account, */}
            </div>
        </>
    )
}