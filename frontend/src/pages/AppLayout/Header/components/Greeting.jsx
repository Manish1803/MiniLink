import { useEffect, useState } from "react";

const styles = {
  greeting: {
    fontSize: "1.6rem",
    fontWeight: "600",
  },
  date: {
    fontSize: "1.2rem",
    color: "#878BA9",
    marginLeft: "2rem",
  },
};

function Greeting() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    updatedGreeting();
  }, [currentTime]);

  const updatedGreeting = () => {
    const currentHour = currentTime.getHours();
    if (currentHour < 12) {
      setGreeting("☀️ Good Morning");
    } else if (currentHour < 18) {
      setGreeting("🌤️ Good Afternoon");
    } else {
      setGreeting("🌆 Good Evening");
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <p style={styles.greeting}>{greeting}, Manish</p>
      <p style={styles.date}>{formatDate(currentTime)}</p>
    </div>
  );
}

export default Greeting;
