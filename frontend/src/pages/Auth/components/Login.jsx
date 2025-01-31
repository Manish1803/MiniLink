import { useNavigate } from "react-router";
import styles from "./Form.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await loginUser(formData);
      toast.success(response);
      navigate("/app");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={`${styles.form} ${styles.login}`} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Email Id"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.email}</span>
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.password}</span>
      </div>

      <button type="submit" className={styles.btn} disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
