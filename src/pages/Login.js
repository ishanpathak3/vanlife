import React from "react"
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"


export async function loginAction({ request }){
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try{
        const data = await loginUser({ email, password })
        localStorage.setItem("isLoggedIn", true)
        const response = redirect(pathname)
        response.body = true
        return response
    }
    catch(err){
        return err.message
    }
}

export default function Login(){
    const message = useActionData()
    const navigation = useNavigation()
    return(
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <Form method = "post" className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Logging In....." : "Log In"}
                </button>
             </Form>
            { message && <h3 className="red">{message}</h3>}
        </div>
       
    )
}









// WITH THE NORMAL REACT FORM WITH PREVIOUS VERSION



// export function loginLoader({ request }) {
    //     return new URL(request.url).searchParams.get("message")
    // }


// export default function Login() {
    
//     // const [error, setError] = useState(null)
//     // const [status, setStatus] = useState("idle")
//     // const [loginFormData, setLoginFormData] = useState({ email: "", password: "" })
//     // const message = useLoaderData()


//     // function handleSubmit(e) {
//     //     e.preventDefault()
//     //     setStatus("submitting")
//     //     setError(null)
//     //     loginUser(loginFormData)
//     //         .then(data => console.log(data))
//     //         .catch(err => setError(err))
//     //         .finally(() => setStatus("idle"))
        
//     // }

//     // function handleChange(e) {
//     //     const { name, value } = e.target
//     //     setLoginFormData(prev => ({
//     //         ...prev,
//     //         [name]: value
//     //     }))
//     // }



//     return (
//         <div className="login-container">
//             <h1>Sign in to your account</h1>
//             {message && <h3 className="red">{message}</h3>}
//             {error && <h3 className="red">{error.message}</h3>}
//             <form onSubmit={handleSubmit} className="login-form">
//                 <input
//                     name="email"
//                     onChange={handleChange}
//                     type="email"
//                     placeholder="Email address"
//                     value={loginFormData.email}
//                 />
//                 <input
//                     name="password"
//                     onChange={handleChange}
//                     type="password"
//                     placeholder="Password"
//                     value={loginFormData.password}
//                 />

//                 <button
//                     disabled={status === 'submitting'}
//                 >
//                     {status === 'submitting' ? "Logging in..... " : "Log in"}
//                 </button>
//             </form>
//         </div>
//     )

// }