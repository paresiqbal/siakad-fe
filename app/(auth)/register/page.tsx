export default function page() {
  return (
    <div>
      <h1>Register Account</h1>
      <form action="submit">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
