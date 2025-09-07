import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>(); // get token from route
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Invalid verification link",
        });
        return;
      }

      try {
        // match backend format: /verify-email/:token
        await api.get(`/api/v1/auth/verify-email/${token}`);

        Swal.fire({
          icon: "success",
          title: "Email verified successfully 🎉",
          text: "You can now log in with your account",
        }).then(() => {
          navigate("/login");
        });
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Verification failed",
          text: error.response?.data?.message || "Link may have expired",
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <div>Verifying your email...</div>;
};

export default VerifyEmail;