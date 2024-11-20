import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// console.log('GOOGLE_CLIENT_ID - ', GOOGLE_CLIENT_ID)

export default function GoogleSignIn() {
  const { signupWithGoogle } = useAuth();
  const handleSuccess = async (credentialResponse: any) => {
    await signupWithGoogle(credentialResponse.credential);
  };

  const handleError = () => {
    console.log("Login Failed");
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Failed to sign in with google",
    });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex justify-center mt-4">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
}
