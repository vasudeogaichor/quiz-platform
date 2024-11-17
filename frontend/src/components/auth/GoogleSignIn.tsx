import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// console.log('GOOGLE_CLIENT_ID - ', GOOGLE_CLIENT_ID)
export default function GoogleSignIn() {
  const handleSuccess = (credentialResponse: any) => {
    console.log("Google Credential Response:", credentialResponse);
    // You can send `credentialResponse.credential` to your backend to verify and log in the user.
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex justify-center mt-4">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
}
