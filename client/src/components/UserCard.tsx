import { useEffect, useState } from "react";
import { getUsersList } from "../services/apiServices";
import { IUser } from "../interface/IUser";

const UserCard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersList = await getUsersList();
        setUsers(usersList);
      } catch (error) {
        setError("Failed to fetch Users List");
        console.error("Failed to fetch", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Card</h1>
      {loading ? (
        <div>
          <p className="placeholder-glow">
            <span className="placeholder col-12"></span>
          </p>

          <p className="placeholder-wave">
            <span className="placeholder col-12"></span>
          </p>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <div className="row">
        {users.length
          ? users.map((user) => (
              <div className="col-md-3" key={user.id}>
                <div
                  className="card"
                  style={{ width: "16rem", padding: 0, marginBottom: "2rem" }}
                >
                  <img
                    src="./prof.webp"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "fill" }}
                    alt="..."
                  />
                  <div
                    className="card-body"
                    style={{ backgroundColor: "#f6f6f6" }}
                  >
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.phone}</p>
                  </div>
                </div>
              </div>
            ))
          : !loading && !users.length && <p>No user Found</p>}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserCard;
