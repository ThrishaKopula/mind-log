import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "./SupabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);

    //sign up
    const signUpNewUser = async () => {
        const {data, error} = await supabase.auth.signUp({
            email: 'example@email.com',
            password: 'example-password',
        });

        if(error) {
            console.error("there was a problem signing up: ", error);
            return {success: false, error};
        }
        return {success: true, data};
    };

    useEffect(()=> {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    //sign out
    const signOut = () => {
        const {error} = supabase.auth.signOut();
        if(error){
            console.error("there was an error: ", error);
        }

    }
    return (
        <AuthContext.Provider value={{session, signUpNewUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
