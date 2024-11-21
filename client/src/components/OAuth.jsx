import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Importing Google Icon from react-icons

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        console.log("Google OAuth process started...");
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Step 1: Sign in with Firebase
            const result = await signInWithPopup(auth, provider);
            console.log("Firebase authentication successful:", result);

            // Step 2: Send user data to backend
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            console.log("Backend response:", data);

            if (!res.ok) {
                // If backend responds with requiresSignup, handle it
                if (data.requiresSignup) {
                    console.log("User requires signup, redirecting...");
                    // Pass the user data to the signup page
                    navigate('/signup', { state: { userData: data } });
                } else {
                    // Handle other errors (e.g., incorrect credentials)
                    throw new Error(data.message || 'Something went wrong');
                }
            } else {
                // Successful sign-in
                dispatch(signInSuccess(data));
                console.log("Google sign-in successful");

                // Redirect after successful login
                navigate("/");
            }
        } catch (error) {
            console.error("Error during Google sign-in:", error.message);
            dispatch(signInFailure(error.message || 'An error occurred during the sign-in process.'));
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="flex items-center justify-center border border-red-700 text-red-700 bg-white p-1 rounded-lg uppercase hover:opacity-95 w-11/12 text-lg"
        >
            <FcGoogle className="mr-2 text-3xl" />
            <span className="flex-1 text-center">Continue with Google</span>
        </button>
    );
};

export default OAuth;
