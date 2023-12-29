import { SignInProps, SignUpProps } from "@components/models/auth";
import { request } from "../hooks/api";




class UserService {
    async SignUp(payload: SignUpProps) {
        try {
        const response = await request(
            "api/register", 
            "POST", 
            payload, 
            false, 
            false, 
            false
            );
        return response;
        } catch (error) {
        throw error;
        }
    }

    async SignIn(payload: SignInProps) {
        try {
          const response = await request(
            "api/login", 
            "POST", 
            payload, 
            false, 
            false, 
            false
            );
          return response;
        } catch (error) {
          throw error;
        }
      }

      async Logout() {
        try {
          const response = await request(
            "api/logout", 
            "POST", 
            {}, 
            true, 
            false, 
            false
            );
          return response;
        } catch (error) {
          throw error;
        }
      }

}

export default UserService;
