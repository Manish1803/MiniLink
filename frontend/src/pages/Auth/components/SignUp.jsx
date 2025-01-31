import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import styles from "./Form.module.css";

function SignUp() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cfpassword: "",
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

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile) newErrors.mobile = "Mobile is required";

    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.cfpassword)
      newErrors.cfpassword = "Confirm Password is required";

    if (formData.password !== formData.cfpassword)
      newErrors.cfpassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await registerUser(formData);
      toast.success(response);
      navigate("/app");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cfpassword: "",
      });
    } catch (error) {
      toast.error(error.message || "Please try again later");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        cfpassword: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.name}</span>
      </div>
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
          type="tel"
          placeholder="Mobile No."
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.mobile}</span>
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
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Confirm Password"
          name="cfpassword"
          value={formData.cfpassword}
          onChange={handleChange}
        />
        <span className={styles.error}>{errors.cfpassword}</span>
      </div>

      <button type="submit" className={styles.btn} disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </button>
    </form>
  );
}

export default SignUp;
