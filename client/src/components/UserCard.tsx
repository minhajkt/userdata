import { useEffect, useState } from "react";
import { getUsersList } from "../services/apiServices";
import { IUser } from "../interface/IUser";
import { Pagination } from "./Pagination";

const UserCard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);



  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { users, totalPages, totalCount } = await getUsersList(page);
        setUsers(users);
        setTotalPages(totalPages);
        setTotalCount(totalCount);
      } catch (error) {
        setError("Failed to fetch Users List");
        console.error("Failed to fetch", (error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

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
                  style={{ width: "17rem", padding: 0, marginBottom: "2rem" }}
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
      {!loading && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default UserCard;
